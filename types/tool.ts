import { BaseDocument } from "@/lib/db/types";

export interface ToolItem {
  title: string;
  description: string;
  category: string;
  url: string;
  draft: boolean;
  featured: boolean;
}

export interface Tool extends ToolItem, BaseDocument {}
