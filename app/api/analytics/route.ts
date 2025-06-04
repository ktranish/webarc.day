import { calculateGrowth, getDateRange, getDaysBetween } from "@/lib/utils";
import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { NextResponse } from "next/server";

const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: {
    client_email: process.env.GOOGLE_ANALYTICS_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_ANALYTICS_PRIVATE_KEY?.replace(
      /\\n/g,
      "\n",
    ),
  },
});

export async function GET() {
  try {
    const [currentStart, currentEnd] = getDateRange();
    const [lastStart, lastEnd] = getDateRange(1);

    // Get metrics for both periods
    const [currentMetrics, lastMetrics] = await Promise.all([
      getMetrics(currentStart, currentEnd),
      getMetrics(lastStart, lastEnd),
    ]);

    // Calculate growth rates
    const visitorGrowth = calculateGrowth(
      currentMetrics.visitors,
      lastMetrics.visitors,
    );
    const pageviewGrowth = calculateGrowth(
      currentMetrics.pageviews,
      lastMetrics.pageviews,
    );

    // Calculate average daily metrics for more accurate comparison
    const currentDays = getDaysBetween(currentStart, currentEnd);
    const lastDays = getDaysBetween(lastStart, lastEnd);

    const currentDailyVisitors = currentMetrics.visitors / currentDays;
    const lastDailyVisitors = lastMetrics.visitors / lastDays;
    const currentDailyPageviews = currentMetrics.pageviews / currentDays;
    const lastDailyPageviews = lastMetrics.pageviews / lastDays;

    // Calculate daily growth rates
    const dailyVisitorGrowth = calculateGrowth(
      currentDailyVisitors,
      lastDailyVisitors,
    );
    const dailyPageviewGrowth = calculateGrowth(
      currentDailyPageviews,
      lastDailyPageviews,
    );

    return NextResponse.json({
      visitors: currentMetrics.visitors,
      pageviews: currentMetrics.pageviews,
      growth: dailyVisitorGrowth, // Use daily growth for more accurate comparison
      dailyMetrics: {
        visitors: Math.round(currentDailyVisitors),
        pageviews: Math.round(currentDailyPageviews),
      },
      periodGrowth: {
        visitors: visitorGrowth,
        pageviews: pageviewGrowth,
      },
      dateRanges: {
        current: {
          start: currentStart.toISOString(),
          end: currentEnd.toISOString(),
        },
        last: {
          start: lastStart.toISOString(),
          end: lastEnd.toISOString(),
        },
      },
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 },
    );
  }
}

async function getMetrics(startDate: Date, endDate: Date) {
  const [response] = await analyticsDataClient.runReport({
    property: `properties/${process.env.GOOGLE_ANALYTICS_PROPERTY_ID}`,
    dateRanges: [
      {
        startDate: startDate.toISOString().split("T")[0],
        endDate: endDate.toISOString().split("T")[0],
      },
    ],
    metrics: [{ name: "activeUsers" }, { name: "screenPageViews" }],
  });

  return {
    visitors: Number(response.rows?.[0]?.metricValues?.[0]?.value || 0),
    pageviews: Number(response.rows?.[0]?.metricValues?.[1]?.value || 0),
  };
}
