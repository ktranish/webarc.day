import { BaseDocument } from "@/lib/db/types";

export interface NewsItem {
  id: string;
  favicon: string;
  title: string;
  description: string;
  category: string;
  link: string;
  date: string;
}

export interface NewsDocument extends NewsItem, BaseDocument {
  _id: string;
  draft?: boolean;
  featured?: boolean;
  source?: string;
  tags?: string[];
  readTime?: number;
  author?: string;
  publishedAt?: Date;
  _timestamp?: number;
}

export interface NewsItemInput {
  favicon: string;
  title: string;
  description: string;
  category: string;
  link: string;
  date: string;
  draft?: boolean;
  featured?: boolean;
  source?: string;
  tags?: string[];
  readTime?: number;
  author?: string;
  publishedAt?: Date;
  _timestamp?: number;
}

export interface NewsUpdateInput extends Partial<NewsItemInput> {}

export interface NewsFilter {
  draft?: boolean;
  featured?: boolean;
  category?: string | { $in: string[] };
  source?: string | { $in: string[] };
  tags?: { $in: string[] };
  author?: string;
  date?: {
    $gte?: string;
    $lte?: string;
  };
  _id?: { $lt?: string; $gt?: string };
}

export interface NewsSearchOptions {
  searchTerm: string;
  fields?: string[];
  caseSensitive?: boolean;
}

export interface NewsStats {
  total: number;
  byCategory: Record<string, number>;
  bySource: Record<string, number>;
  featured: number;
  drafts: number;
  published: number;
}

export interface NewsCursorResult {
  posts: NewsItem[];
  nextCursor: string | null;
  hasMore: boolean;
  total: number;
}

export interface NewsPaginatedResult {
  posts: NewsItem[];
  total: number;
  page: number;
  totalPages: number;
  hasMore: boolean;
}
