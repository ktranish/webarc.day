import { NextResponse } from "next/server";
import { BetaAnalyticsDataClient } from "@google-analytics/data";

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
    const [startDate, endDate] = getDateRange();
    const [lastStartDate, lastEndDate] = getDateRange(1);

    const [currentMetrics, lastMetrics] = await Promise.all([
      getMetrics(startDate, endDate),
      getMetrics(lastStartDate, lastEndDate),
    ]);

    const growth = calculateGrowth(currentMetrics, lastMetrics);

    return NextResponse.json({
      visitors: currentMetrics.visitors,
      pageviews: currentMetrics.pageviews,
      growth,
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 },
    );
  }
}

function getDateRange(monthsAgo = 0) {
  const end = new Date();
  const start = new Date();
  start.setMonth(start.getMonth() - monthsAgo);
  start.setDate(1);
  start.setHours(0, 0, 0, 0);
  end.setHours(23, 59, 59, 999);
  return [start, end];
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

function calculateGrowth(
  current: { visitors: number },
  last: { visitors: number },
) {
  if (last.visitors === 0) return 100;
  return Math.round(((current.visitors - last.visitors) / last.visitors) * 100);
}
