import { Category } from "./types";

export const categoryGradients: Record<Category, string> = {
  UX: "from-pink-50 to-pink-100",
  Tech: "from-blue-50 to-blue-100",
  Platform: "from-green-50 to-green-100",
};
export const news: Array<{
  emoji: string;
  title: string;
  description: string;
  category: Category;
  link: string;
  date: string; // ISO date string
}> = [
  // --- 2024-06-10 (3 cards) ---
  {
    emoji: "📰",
    title: "Automated News Scraping",
    description:
      "Webarc.day continuously scrapes top web dev news sources for the latest updates.",
    category: "Tech",
    link: "https://github.com/webarcday/webarc.day#scraping",
    date: "2024-06-10",
  },
  {
    emoji: "🧠",
    title: "Curated for Developers",
    description:
      "All news is filtered and organized for web professionals and enthusiasts.",
    category: "UX",
    link: "https://webarc.day/about",
    date: "2024-06-10",
  },
  {
    emoji: "⚡",
    title: "Real-Time Updates",
    description:
      "Stay ahead with instant updates as soon as new articles are published.",
    category: "Platform",
    link: "https://webarc.day/roadmap",
    date: "2024-06-10",
  },
  // --- 2024-06-09 (2 cards) ---
  {
    emoji: "🔗",
    title: "Source Diversity",
    description:
      "Aggregates news from blogs, official docs, and community forums.",
    category: "Tech",
    link: "https://webarc.day/sources",
    date: "2024-06-09",
  },
  {
    emoji: "🎯",
    title: "Topic Tagging",
    description:
      "Find news by framework, language, or trending topic with smart tags.",
    category: "UX",
    link: "https://webarc.day/tags",
    date: "2024-06-09",
  },
  // --- 2024-06-08 (5 cards) ---
  {
    emoji: "🔍",
    title: "Powerful Search",
    description:
      "Quickly search the archive for any web development topic or keyword.",
    category: "Platform",
    link: "https://webarc.day/search",
    date: "2024-06-08",
  },
  {
    emoji: "📅",
    title: "Daily Digest",
    description: "Get a daily summary of the most important web dev news.",
    category: "Platform",
    link: "https://webarc.day/digest",
    date: "2024-06-08",
  },
  {
    emoji: "🌐",
    title: "Global Coverage",
    description:
      "Covers news from international sources for a worldwide perspective.",
    category: "Tech",
    link: "https://webarc.day/global",
    date: "2024-06-08",
  },
  {
    emoji: "💬",
    title: "Community Picks",
    description: "See what the web dev community is reading and recommending.",
    category: "UX",
    link: "https://webarc.day/community",
    date: "2024-06-08",
  },
  {
    emoji: "🛠️",
    title: "API Access Launched",
    description: "Developers can now access the news feed via our public API.",
    category: "Tech",
    link: "https://webarc.day/api",
    date: "2024-06-08",
  },
  // --- 2024-06-07 (1 card) ---
  {
    emoji: "📊",
    title: "Analytics Dashboard",
    description: "Track trending topics and most-read articles in real time.",
    category: "Platform",
    link: "https://webarc.day/analytics",
    date: "2024-06-07",
  },
  // --- 2024-06-06 (4 cards) ---
  {
    emoji: "📝",
    title: "Editorial Highlights",
    description: "Our editors hand-pick the best reads of the week for you.",
    category: "UX",
    link: "https://webarc.day/highlights",
    date: "2024-06-06",
  },
  {
    emoji: "🔒",
    title: "Privacy Improvements",
    description:
      "We've updated our privacy policy and improved user data protection.",
    category: "Platform",
    link: "https://webarc.day/privacy",
    date: "2024-06-06",
  },
  {
    emoji: "🧩",
    title: "Plugin Marketplace",
    description:
      "Integrate webarc.day with your favorite tools using new plugins.",
    category: "Tech",
    link: "https://webarc.day/plugins",
    date: "2024-06-06",
  },
  {
    emoji: "🎉",
    title: "Milestone: 10,000 Users!",
    description:
      "Thank you to our amazing community for helping us reach this milestone.",
    category: "UX",
    link: "https://webarc.day/community",
    date: "2024-06-06",
  },
  // --- 2024-06-05 (3 cards) ---
  {
    emoji: "🧪",
    title: "Beta Feature: Custom Feeds",
    description: "Test our new custom feed builder for personalized news.",
    category: "Platform",
    link: "https://webarc.day/beta-feeds",
    date: "2024-06-05",
  },
  {
    emoji: "📢",
    title: "Changelog Published",
    description:
      "Read about the latest updates and improvements to webarc.day.",
    category: "Tech",
    link: "https://webarc.day/changelog",
    date: "2024-06-05",
  },
  {
    emoji: "🤝",
    title: "Partner Integrations",
    description: "We now support integrations with leading dev platforms.",
    category: "Tech",
    link: "https://webarc.day/integrations",
    date: "2024-06-05",
  },
];
