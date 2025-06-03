export type Category = "webdev" | "solodev" | "nextjs" | "productivity";

export type NewsItem = {
  favicon: string;
  title: string;
  description: string;
  category: string;
  link: string;
  date: string;
};
