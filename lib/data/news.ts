import { CreateOperations } from "@/lib/db/create";
import { DeleteOperations } from "@/lib/db/delete";
import { ReadOperations } from "@/lib/db/read";
import { UpdateOperations } from "@/lib/db/update";
import client from "@/lib/mongodb";
import type {
  NewsCursorResult,
  NewsDocument,
  NewsFilter,
  NewsItem,
  NewsItemInput,
  NewsPaginatedResult,
  NewsSearchOptions,
  NewsStats,
  NewsUpdateInput,
} from "@/types/news";
import { ObjectId } from "mongodb";

export async function getNews(filter: NewsFilter = {}) {
  const db = client.db("webarc");
  const readOps = new ReadOperations<NewsDocument>(db, "posts");
  return readOps.findMany(filter);
}

export async function getNewsPaginated(
  page: number = 1,
  limit: number = 12,
  filter: NewsFilter = {},
  sort: Record<string, 1 | -1> = { _id: -1 },
): Promise<NewsPaginatedResult> {
  const db = client.db("webarc");
  const readOps = new ReadOperations<NewsDocument>(db, "posts");
  const result = await readOps.findPaginated(filter, { page, limit, sort });

  return {
    posts: result.data.map((doc) => ({
      id: doc._id,
      favicon: doc.favicon,
      title: doc.title,
      description: doc.description,
      category: doc.category,
      link: doc.link,
      date: doc.date,
    })),
    total: result.total,
    page: result.page,
    totalPages: result.totalPages,
    hasMore: result.hasMore,
  };
}

export async function getNewsByCursor(
  cursor?: string,
  limit: number = 12,
  filter: NewsFilter = {},
): Promise<NewsCursorResult> {
  const db = client.db("webarc");
  const collection = db.collection<NewsDocument>("posts");

  const query: any = { ...filter };

  if (cursor) {
    try {
      query._id = { $lt: new ObjectId(cursor) };
    } catch (error) {
      console.error("Invalid cursor format:", error);
      return { posts: [], nextCursor: null, hasMore: false, total: 0 };
    }
  }

  const [posts, total] = await Promise.all([
    collection
      .find(query)
      .sort({ _id: -1 })
      .limit(limit + 1)
      .toArray(),
    collection.countDocuments(query),
  ]);

  const hasMore = posts.length > limit;
  const postsToReturn = hasMore ? posts.slice(0, limit) : posts;
  const nextCursor = hasMore ? posts[limit - 1]._id.toString() : null;

  return {
    posts: postsToReturn.map((doc) => ({
      id: doc._id,
      favicon: doc.favicon,
      title: doc.title,
      description: doc.description,
      category: doc.category,
      link: doc.link,
      date: doc.date,
    })),
    nextCursor,
    hasMore,
    total,
  };
}

export async function getNewsById(id: string): Promise<NewsItem | null> {
  const db = client.db("webarc");
  const readOps = new ReadOperations<NewsDocument>(db, "posts");
  const doc = await readOps.findById(id);

  if (!doc) return null;

  return {
    id: doc._id,
    favicon: doc.favicon,
    title: doc.title,
    description: doc.description,
    category: doc.category,
    link: doc.link,
    date: doc.date,
  };
}

export async function getNewsByCategory(category: string): Promise<NewsItem[]> {
  return getNews({ category });
}

export async function getNewsByCategories(
  categories: string[],
): Promise<NewsItem[]> {
  return getNews({ category: { $in: categories } });
}

export async function getFeaturedNews(): Promise<NewsItem[]> {
  return getNews({ featured: true, draft: false });
}

export async function getPublishedNews(): Promise<NewsItem[]> {
  return getNews({ draft: false });
}

export async function getDraftNews(): Promise<NewsItem[]> {
  return getNews({ draft: true });
}

export async function searchNews(
  searchTerm: string,
  options: Partial<NewsSearchOptions> = {},
): Promise<NewsItem[]> {
  const db = client.db("webarc");
  const collection = db.collection<NewsDocument>("posts");

  const {
    fields = ["title", "description", "category"],
    caseSensitive = false,
  } = options;

  const searchRegex = new RegExp(searchTerm, caseSensitive ? "" : "i");
  const searchQuery = {
    $or: fields.map((field) => ({ [field]: searchRegex })),
  };

  const docs = await collection.find(searchQuery).sort({ _id: -1 }).toArray();

  return docs.map((doc) => ({
    id: doc._id,
    favicon: doc.favicon,
    title: doc.title,
    description: doc.description,
    category: doc.category,
    link: doc.link,
    date: doc.date,
  }));
}

export async function getNewsByLink(link: string): Promise<NewsItem | null> {
  const db = client.db("webarc");
  const collection = db.collection<NewsDocument>("posts");
  const doc = await collection.findOne({ link });

  if (!doc) return null;

  return {
    id: doc._id,
    favicon: doc.favicon,
    title: doc.title,
    description: doc.description,
    category: doc.category,
    link: doc.link,
    date: doc.date,
  };
}

export async function createNews(data: NewsItemInput): Promise<NewsItem> {
  const db = client.db("webarc");
  const createOps = new CreateOperations<NewsDocument>(db, "posts");
  const doc = await createOps.createOne(data);

  return {
    id: doc._id,
    favicon: doc.favicon,
    title: doc.title,
    description: doc.description,
    category: doc.category,
    link: doc.link,
    date: doc.date,
  };
}

export async function createManyNews(
  data: NewsItemInput[],
): Promise<NewsItem[]> {
  const db = client.db("webarc");
  const createOps = new CreateOperations<NewsDocument>(db, "posts");
  const docs = await createOps.createMany(data);

  return docs.map((doc) => ({
    id: doc._id,
    favicon: doc.favicon,
    title: doc.title,
    description: doc.description,
    category: doc.category,
    link: doc.link,
    date: doc.date,
  }));
}

export async function updateNews(
  id: string,
  data: NewsUpdateInput,
): Promise<void> {
  const db = client.db("webarc");
  const updateOps = new UpdateOperations<NewsDocument>(db, "posts");
  await updateOps.updateById(id, { $set: data });
}

export async function updateNewsAndReturn(
  id: string,
  data: NewsUpdateInput,
): Promise<NewsItem | null> {
  const db = client.db("webarc");
  const updateOps = new UpdateOperations<NewsDocument>(db, "posts");
  const doc = await updateOps.findOneAndUpdate({ _id: id } as any, {
    $set: data,
  });

  if (!doc) return null;

  return {
    id: doc._id,
    favicon: doc.favicon,
    title: doc.title,
    description: doc.description,
    category: doc.category,
    link: doc.link,
    date: doc.date,
  };
}

export async function updateManyNews(
  filter: NewsFilter,
  data: NewsUpdateInput,
): Promise<void> {
  const db = client.db("webarc");
  const updateOps = new UpdateOperations<NewsDocument>(db, "posts");
  await updateOps.updateMany(filter as any, { $set: data });
}

export async function deleteNews(id: string): Promise<void> {
  const db = client.db("webarc");
  const deleteOps = new DeleteOperations<NewsDocument>(db, "posts");
  await deleteOps.deleteById(id);
}

export async function deleteNewsAndReturn(
  id: string,
): Promise<NewsItem | null> {
  const db = client.db("webarc");
  const deleteOps = new DeleteOperations<NewsDocument>(db, "posts");
  const doc = await deleteOps.findOneAndDelete({ _id: id } as any);

  if (!doc) return null;

  return {
    id: doc._id,
    favicon: doc.favicon,
    title: doc.title,
    description: doc.description,
    category: doc.category,
    link: doc.link,
    date: doc.date,
  };
}

export async function deleteAllNews(): Promise<void> {
  const db = client.db("webarc");
  const deleteOps = new DeleteOperations<NewsDocument>(db, "posts");
  await deleteOps.deleteMany({} as any);
}

export async function deleteNewsByCategory(category: string): Promise<void> {
  const db = client.db("webarc");
  const deleteOps = new DeleteOperations<NewsDocument>(db, "posts");
  await deleteOps.deleteMany({ category } as any);
}

export async function getNewsCategories(): Promise<string[]> {
  const db = client.db("webarc");
  const collection = db.collection<NewsDocument>("posts");
  const categories = await collection.distinct("category");
  return categories.filter((cat): cat is string => cat !== undefined);
}

export async function getNewsSources(): Promise<string[]> {
  const db = client.db("webarc");
  const collection = db.collection<NewsDocument>("posts");
  const sources = await collection.distinct("source");
  return sources.filter((source): source is string => source !== undefined);
}

export async function getNewsCount(filter: NewsFilter = {}): Promise<number> {
  const db = client.db("webarc");
  const collection = db.collection<NewsDocument>("posts");
  return collection.countDocuments(filter as any);
}

export async function newsExistsByLink(link: string): Promise<boolean> {
  const db = client.db("webarc");
  const collection = db.collection<NewsDocument>("posts");
  const count = await collection.countDocuments({ link }, { limit: 1 });
  return count > 0;
}

export async function getNewsStats(): Promise<NewsStats> {
  const db = client.db("webarc");
  const collection = db.collection<NewsDocument>("posts");

  const [total, featured, drafts, published, categoryStats, sourceStats] =
    await Promise.all([
      collection.countDocuments({}),
      collection.countDocuments({ featured: true }),
      collection.countDocuments({ draft: true }),
      collection.countDocuments({ draft: false }),
      collection
        .aggregate([
          {
            $group: {
              _id: "$category",
              count: { $sum: 1 },
            },
          },
          {
            $sort: { count: -1 },
          },
        ])
        .toArray(),
      collection
        .aggregate([
          {
            $group: {
              _id: "$source",
              count: { $sum: 1 },
            },
          },
          {
            $sort: { count: -1 },
          },
        ])
        .toArray(),
    ]);

  const byCategory: Record<string, number> = {};
  categoryStats.forEach((stat: any) => {
    byCategory[stat._id] = stat.count;
  });

  const bySource: Record<string, number> = {};
  sourceStats.forEach((stat: any) => {
    bySource[stat._id] = stat.count;
  });

  return {
    total,
    byCategory,
    bySource,
    featured,
    drafts,
    published,
  };
}

export async function toggleNewsFeatured(id: string): Promise<void> {
  const db = client.db("webarc");
  const updateOps = new UpdateOperations<NewsDocument>(db, "posts");

  const news = await getNewsById(id);
  if (!news) {
    throw new Error("News not found");
  }

  const doc = await db.collection<NewsDocument>("posts").findOne({ _id: id });
  if (!doc) {
    throw new Error("News not found");
  }

  const newFeaturedStatus = !doc.featured;
  await updateOps.updateById(id, { $set: { featured: newFeaturedStatus } });
}

export async function toggleNewsDraft(id: string): Promise<void> {
  const db = client.db("webarc");
  const updateOps = new UpdateOperations<NewsDocument>(db, "posts");

  const news = await getNewsById(id);
  if (!news) {
    throw new Error("News not found");
  }

  const doc = await db.collection<NewsDocument>("posts").findOne({ _id: id });
  if (!doc) {
    throw new Error("News not found");
  }

  const newDraftStatus = !doc.draft;
  await updateOps.updateById(id, { $set: { draft: newDraftStatus } });
}

export async function upsertNewsByLink(data: NewsItemInput): Promise<NewsItem> {
  const db = client.db("webarc");
  const collection = db.collection<NewsDocument>("posts");

  const result = await collection.updateOne(
    { link: data.link },
    {
      $set: {
        ...data,
        updatedAt: new Date(),
      },
      $setOnInsert: {
        createdAt: new Date(),
      },
    },
    { upsert: true },
  );

  if (result.upsertedId) {
    return {
      ...data,
      id: result.upsertedId.toString(),
    } as NewsItem;
  } else {
    const doc = await collection.findOne({ link: data.link });
    if (!doc) throw new Error("Failed to upsert news");

    return {
      id: doc._id,
      favicon: doc.favicon,
      title: doc.title,
      description: doc.description,
      category: doc.category,
      link: doc.link,
      date: doc.date,
    };
  }
}
