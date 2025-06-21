import { CreateOperations } from "@/lib/db/create";
import { DeleteOperations } from "@/lib/db/delete";
import { ReadOperations } from "@/lib/db/read";
import { UpdateOperations } from "@/lib/db/update";
import client from "@/lib/mongodb";
import { Tool, ToolItem } from "@/types/tool";
import { Filter, ObjectId } from "mongodb";

export async function getTools(filter: Filter<Tool> = {}) {
  const db = client.db("webarc");
  const readOps = new ReadOperations<Tool>(db, "tools");

  return readOps.findMany(filter, {
    sort: { createdAt: -1 },
  });
}

export async function getToolsPaginated(
  page: number = 1,
  limit: number = 12,
  filter: Filter<Tool> = {},
  sort: Record<string, 1 | -1> = { createdAt: -1 },
) {
  const db = client.db("webarc");
  const readOps = new ReadOperations<Tool>(db, "tools");

  return readOps.findPaginated(filter, { page, limit, sort });
}

export async function getToolsByCursor(
  cursor?: string,
  limit: number = 12,
  filter: Filter<Tool> = {},
) {
  const db = client.db("webarc");
  const collection = db.collection<Tool>("tools");

  const query: Filter<Tool> = { ...filter };
  if (cursor) {
    query._id = { $lt: new ObjectId(cursor) } as any;
  }

  const tools = await collection
    .find(query)
    .sort({ _id: -1 })
    .limit(limit + 1)
    .toArray();

  const hasMore = tools.length > limit;
  const toolsToReturn = hasMore ? tools.slice(0, limit) : tools;
  const nextCursor = hasMore ? tools[limit - 1]?._id.toString() : null;

  return {
    tools: toolsToReturn,
    nextCursor,
    hasMore,
  };
}

export async function getToolById(id: string) {
  const db = client.db("webarc");
  const readOps = new ReadOperations<Tool>(db, "tools");

  return readOps.findById(id);
}

export async function getToolsByCategory(category: string) {
  return getTools({ category });
}

export async function getToolsByCategories(categories: string[]) {
  return getTools({ category: { $in: categories } });
}

export async function getFeaturedTools() {
  return getTools({ featured: true });
}

export async function getPublishedTools() {
  return getTools({ draft: false });
}

export async function searchTools(searchTerm: string) {
  const searchRegex = new RegExp(searchTerm, "i");
  return getTools({
    $or: [
      { title: { $regex: searchRegex } },
      { description: { $regex: searchRegex } },
    ],
  });
}

export async function getToolByUrl(url: string) {
  return getTools({ url });
}

export async function createTool(data: ToolItem) {
  const db = client.db("webarc");
  const createOps = new CreateOperations<Tool>(db, "tools");

  return createOps.createOne(data);
}

export async function createManyTools(data: ToolItem[]) {
  const db = client.db("webarc");
  const createOps = new CreateOperations<Tool>(db, "tools");

  return createOps.createMany(data);
}

export async function updateTool(id: string, data: ToolItem) {
  const db = client.db("webarc");
  const updateOps = new UpdateOperations<Tool>(db, "tools");

  return updateOps.updateById(id, { $set: data });
}

export async function updateToolAndReturn(id: string, data: ToolItem) {
  const db = client.db("webarc");
  const updateOps = new UpdateOperations<Tool>(db, "tools");

  return updateOps.findOneAndUpdate({ _id: id } as Filter<Tool>, {
    $set: data,
  });
}

export async function updateManyTools(filter: Filter<Tool>, data: ToolItem) {
  const db = client.db("webarc");
  const updateOps = new UpdateOperations<Tool>(db, "tools");

  return updateOps.updateMany(filter, { $set: data });
}

export async function deleteTool(id: string) {
  const db = client.db("webarc");
  const deleteOps = new DeleteOperations<Tool>(db, "tools");

  return deleteOps.deleteById(id);
}

export async function deleteToolAndReturn(id: string) {
  const db = client.db("webarc");
  const deleteOps = new DeleteOperations<Tool>(db, "tools");

  return deleteOps.findOneAndDelete({ _id: id } as Filter<Tool>);
}

export async function deleteAllTools() {
  const db = client.db("webarc");
  const deleteOps = new DeleteOperations<Tool>(db, "tools");

  return deleteOps.deleteMany({});
}

export async function deleteToolsByCategory(category: string) {
  const db = client.db("webarc");
  const deleteOps = new DeleteOperations<Tool>(db, "tools");

  return deleteOps.deleteMany({ category });
}

export async function getToolCategories() {
  const db = client.db("webarc");
  const collection = db.collection<Tool>("tools");

  return collection.distinct("category");
}

export async function getToolsCount(filter: Filter<Tool> = {}) {
  const db = client.db("webarc");
  const readOps = new ReadOperations<Tool>(db, "tools");

  return readOps.count(filter);
}

export async function toolExistsByUrl(url: string) {
  const db = client.db("webarc");
  const readOps = new ReadOperations<Tool>(db, "tools");

  return readOps.exists({ url });
}

export async function getToolsStats() {
  const db = client.db("webarc");
  const collection = db.collection<Tool>("tools");

  const [totalTools, publishedTools, featuredTools, categories] =
    await Promise.all([
      collection.countDocuments({}),
      collection.countDocuments({ draft: false }),
      collection.countDocuments({ featured: true }),
      collection.distinct("category"),
    ]);

  return {
    total: totalTools,
    published: publishedTools,
    featured: featuredTools,
    categories: categories.length,
  };
}

export async function upsertToolByUrl(data: ToolItem) {
  const db = client.db("webarc");
  const collection = db.collection<Tool>("tools");

  const result = await collection.updateOne(
    { url: data.url },
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
      _id: result.upsertedId.toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    } as Tool;
  } else {
    return collection.findOne({ url: data.url }) as Promise<Tool | null>;
  }
}

export async function toggleToolFeatured(id: string) {
  const db = client.db("webarc");
  const updateOps = new UpdateOperations<Tool>(db, "tools");

  const tool = await getToolById(id);
  if (!tool) {
    throw new Error("Tool not found");
  }

  const newFeaturedStatus = !tool.featured;
  return updateOps.updateById(id, { $set: { featured: newFeaturedStatus } });
}

export async function toggleToolDraft(id: string) {
  const db = client.db("webarc");
  const updateOps = new UpdateOperations<Tool>(db, "tools");

  const tool = await getToolById(id);
  if (!tool) {
    throw new Error("Tool not found");
  }

  const newDraftStatus = !tool.draft;
  return updateOps.updateById(id, { $set: { draft: newDraftStatus } });
}

export async function seedTools(): Promise<{
  success: boolean;
  inserted: number;
  updated: number;
  errors: string[];
}> {
  try {
    const db = client.db("webarc");
    const collection = db.collection<Tool>("tools");
    let inserted = 0;
    let updated = 0;
    const errors: string[] = [];
    const seed = [
      {
        category: "IDE",
        description:
          "Tabnine is the world's most contextually aware AI software development platform, helping mature engineering teams speed up and simplify.",
        title: "Tabnine",
        url: "https://www.tabnine.com/",
        featured: false,
      },
      {
        category: "IDE",
        description:
          "Fine is a software development tool for startup founders, builders and developers.",
        title: "Fine",
        url: "https://www.fine.dev/",
        featured: false,
      },
      {
        category: "IDE",
        description:
          "GoCodeo is an AI-driven development platform that automates coding, testing, and deployment - right inside your IDE.",
        title: "GoCodeo",
        url: "https://www.gocodeo.com/",
        featured: false,
      },
      {
        category: "IDE",
        description:
          "Trae (/treɪ/) IDE is your helpful coding partner. It offers features like AI Q&A, code auto-completion, and agent-based AI programming capabilities.",
        title: "Trae",
        url: "https://www.trae.ai/",
        featured: false,
      },
      {
        category: "IDE",
        description:
          "OneCompiler is a versatile, AI-powered Online IDE supporting over 70+ programming languages, designed for developers to write, compile, and execute code seamlessly.",
        title: "OneCompiler",
        url: "https://onecompiler.com/",
        featured: false,
      },
      {
        category: "IDE",
        description:
          "WebStorm is a development tool specially designed for web development. It includes all the tools needed to create, edit, and debug code in JavaScript, HTML, CSS, XML, and other web-related languages.",
        title: "WebStorm",
        url: "https://www.jetbrains.com/webstorm/",
        featured: false,
      },
      {
        category: "IDE",
        description:
          "Selenium IDE (Integrated Development Environment) is a browser extension that allows users to record and replay their interactions with a web application, effectively creating automated test scripts.",
        title: "Selenium",
        url: "https://www.selenium.dev/selenium-ide/",
        featured: false,
      },
      {
        category: "DevOps",
        description:
          "Cycle is the leading LowOps platform, built to simplify both container orchestration and infrastructure management. Deploy to your own infrastructure, whether that's on-premise or across multiple clouds.",
        title: "Cycle",
        url: "https://cycle.io/",
        featured: false,
      },
      {
        category: "DevOps",
        description:
          "Beam is a new cloud platform designed to streamline the deployment of serverless workloads on both CPUs and GPUs.",
        title: "Beam",
        url: "https://www.beam.cloud/",
        featured: false,
      },
      {
        category: "DevOps",
        description:
          "Fly.io makes it easy to scale, reduce latency, and deliver fast, reliable performance without the complexity of traditional cloud setups.",
        title: "Fly",
        url: "https://fly.io/",
        featured: false,
      },
      {
        category: "DevOps",
        description:
          "Kinsta is a premium managed WordPress hosting platform built for speed, security, and ease of use.",
        title: "Kinsta",
        url: "https://kinsta.com/",
        featured: false,
      },
      {
        category: "DevOps",
        description:
          "Koyeb is a developer-friendly serverless platform designed to let businesses easily deploy reliable and scalable applications globally.",
        title: "Koyeb",
        url: "https://www.koyeb.com/",
        featured: false,
      },
      {
        category: "DevOps",
        description:
          "Qoddi is a fully managed application hosting platform that simplifies deployment for developers.",
        title: "Qoddi",
        url: "https://qoddi.com/",
        featured: false,
      },
      {
        category: "DevOps",
        description:
          "Quix is a telemetry analytics platform that enables you to consolidate high frequency sensor data in a centralized cloud data store.",
        title: "Quix",
        url: "https://quix.io/",
        featured: false,
      },
      {
        category: "DevOps",
        description:
          "Railway is a deployment platform designed to streamline the software development life-cycle, starting with instant deployments and effortless scale, extending to CI/CD integrations and built-in observability.",
        title: "Railway",
        url: "https://railway.com/",
        featured: false,
      },
      {
        category: "DevOps",
        description:
          "Reflex is an open-source framework that enables developers to quickly build beautiful, interactive web applications using only Python.",
        title: "Reflex",
        url: "https://reflex.dev/",
        featured: false,
      },
      {
        category: "DevOps",
        description:
          "Zeabur is a platform that help you deploy your service with one click, No matter what programming language you use, what framework you use.",
        title: "Zaebur",
        url: "https://zeabur.com/",
        featured: false,
      },
      {
        category: "Testing",
        description:
          "ApiDog is a powerful GUI-based tool designed for comprehensive API development and testing.",
        title: "ApiDog",
        url: "https://apidog.com/",
        featured: false,
      },
      {
        category: "Testing",
        description:
          "Applitools is an AI-powered testing platform built for speed, scalability, and accuracy.",
        title: "Applitools",
        url: "https://applitools.com/",
        featured: false,
      },
      {
        category: "Testing",
        description:
          "Beeceptor is a REST API mocking tool that helps developers simulate APIs quickly, especially when backend services are unfinished or unavailable.",
        title: "Beeceptor",
        url: "https://beeceptor.com/",
        featured: false,
      },
      {
        category: "Testing",
        description:
          "Blackfire is a performance testing and monitoring tool designed to help developers crush performance bottlenecks with data-driven insights and actionable recommendations.",
        title: "Blackfire",
        url: "https://www.blackfire.io/",
        featured: false,
      },
      {
        category: "Testing",
        description:
          "Chromatic is a visual testing & review tool that scans every possible UI state across browsers to catch visual and functional bugs before they reach users.",
        title: "Chromatic",
        url: "https://www.chromatic.com/",
        featured: false,
      },
      {
        category: "Testing",
        description:
          "Anteon is an open-source distributed performance testing and Kubernetes monitoring platform designed to help you gain deep visibility into your infrastructure without modifying your code.",
        title: "Anteon",
        url: "https://getanteon.com/",
        featured: false,
      },
      {
        category: "Testing",
        description:
          "Fiberplane is an embeddable API playground for Hono, a lightweight TypeScript framework built for edge and serverless environments.",
        title: "Fiberplane",
        url: "https://fiberplane.com/",
        featured: false,
      },
      {
        category: "Testing",
        description:
          "Firecamp is a DX-first, open-source API development platform and a powerful alternative to Postman.",
        title: "Firecamp",
        url: "https://firecamp.io/",
        featured: false,
      },
      {
        category: "Testing",
        description:
          "Loadmill is an automated testing platform that simulates real user behavior across multiple devices and platforms to support continuous delivery.",
        title: "Loadmil",
        url: "https://www.loadmill.com/",
        featured: false,
      },
      {
        category: "Testing",
        description:
          "Synth is an open-source platform that helps developers improve AI agents by analyzing real-world performance and automatically generating fine-tuned models using synthetic data.",
        title: "Synth",
        url: "https://www.usesynth.ai/",
        featured: false,
      },
      {
        category: "Testing",
        description:
          "Testim is an AI-powered test automation platform designed to accelerate the creation and maintenance of stable, low-code tests for web, mobile, and Salesforce applications.",
        title: "Testim",
        url: "https://www.testim.io/",
        featured: false,
      },
      {
        category: "CI/CD",
        description:
          "CircleCI is a modern CI/CD platform that helps development teams automate the build, test, and deployment process.",
        title: "CircleCI",
        url: "https://circleci.com/",
        featured: false,
      },
      {
        category: "CI/CD",
        description:
          "Depot is a high-performance build tool designed to accelerate Docker image creation in CI/CD pipelines.",
        title: "Depot",
        url: "https://depot.dev/",
        featured: false,
      },
      {
        category: "CI/CD",
        description:
          "GitLab is an all-in-one DevOps platform that combines source code management, CI/CD, security, and project management into a single application.",
        title: "GitLab",
        url: "https://about.gitlab.com/",
        featured: false,
      },
      {
        category: "CI/CD",
        description:
          "Gitpod is a cloud-based development platform that provides automated, ready-to-code environments for every project.",
        title: "Gitpod",
        url: "https://www.gitpod.io/",
        featured: false,
      },
      {
        category: "CI/CD",
        description:
          "Spacelift is a CI/CD platform purpose-built for infrastructureas-code, supporting tools like Terraform, OpenTofu, Pulumi, AWS CloudFormation, Kubernetes, and Ansible.",
        title: "Spacelift",
        url: "https://spacelift.io/",
        featured: false,
      },
      {
        category: "CMS",
        description:
          "Contentful is a headless CMS that delivers content via APIs, enabling developers to build scalable, personalized digital experiences across platforms.",
        title: "Contentful",
        url: "https://www.contentful.com/",
        featured: false,
      },
      {
        category: "CMS",
        description:
          "DatoCMS is a performant, API-first headless CMS built for modern web development.",
        title: "DatoCMS",
        url: "https://www.datocms.com/",
        featured: false,
      },
      {
        category: "CMS",
        description:
          "Ghost is a modern publishing platform designed for professional creators and publishers.",
        title: "Ghost",
        url: "https://ghost.org/",
        featured: false,
      },
      {
        category: "CMS",
        description:
          "Strapi is an open-source, fully customizable headless CMS built with JavaScript.",
        title: "Strapi",
        url: "https://strapi.io/",
        featured: false,
      },
      {
        category: "Code Quality",
        description:
          "Codacy is an enterprise-grade platform that ensures secure, high-quality code—especially in AI-accelerated development workflows.",
        title: "Codacy",
        url: "https://www.codacy.com/",
        featured: false,
      },
      {
        category: "Code Quality",
        description:
          "CodeRabbit is an AI-powered code review platform that cuts review time and bugs in half by automating pull request management.",
        title: "CodeRabbit",
        url: "https://www.coderabbit.ai/",
        featured: false,
      },
      {
        category: "Code Quality",
        description:
          "Ellipsis is an AI-powered developer tool that automates code reviews and bug fixes directly on pull requests.",
        title: "Ellipsis",
        url: "https://www.ellipsis.dev/",
        featured: false,
      },
      {
        category: "Code Quality",
        description:
          "SonarSource offers developer-first tools like SonarQube and SonarCloud to ensure code quality and security across firstparty, AI-generated, and open-source code.",
        title: "SonarSource",
        url: "https://www.sonarsource.com/",
        featured: false,
      },
      {
        category: "Database",
        description:
          "Airtable is a flexible database and spreadsheet hybrid designed for building modern business apps and automating workflows.",
        title: "Airtable",
        url: "https://www.airtable.com/",
        featured: false,
      },
      {
        category: "Database",
        description:
          "AITable is an API-oriented Airtable alternative that combines a visual database with powerful automation capabilities.",
        title: "AITable",
        url: "https://aitable.ai/",
        featured: false,
      },
      {
        category: "Database",
        description:
          "CrateDB is a distributed, open-source SQL database designed for real-time analytics, search, and AI applications.",
        title: "CrateDB",
        url: "https://cratedb.com/",
        featured: false,
      },
      {
        category: "Database",
        description:
          "Neon is a serverless Postgres database platform built for speed, scalability, and developer productivity. ",
        title: "Neon",
        url: "https://neon.com/",
        featured: false,
      },
      {
        category: "Database",
        description:
          "Neuledge is an intelligent web scraper and abstract ORM that delivers clean, structured data from any website.",
        title: "Neuledge",
        url: "https://neuledge.com/",
        featured: false,
      },
      {
        category: "Database",
        description:
          "Outerbase is an AI-powered database UI that makes it easy for engineers, researchers, and analysts to interact with any database.",
        title: "Outerbase",
        url: "https://www.outerbase.com/",
        featured: false,
      },
      {
        category: "Datebase",
        description:
          "PlanetScale is a hosted, managed MySQL database platform built for speed, reliability, and massive scale.",
        title: "PlanetScale",
        url: "https://planetscale.com/",
        featured: false,
      },
      {
        category: "Database",
        description:
          "Upstash is a serverless data platform optimized for Redis and Kafka, offering low-latency, cost-efficient solutions for modern applications.",
        title: "Upstash",
        url: "https://upstash.com/",
        featured: false,
      },
      {
        category: "Security",
        description:
          "Bearer is a static application security testing (SAST) tool designed for JavaScript and Ruby stacks.",
        title: "Bearer",
        url: "https://www.bearer.com/",
        featured: false,
      },
      {
        category: "Security",
        description:
          "GitGuardian is a real-time security platform that scans GitHub and other repositories for exposed secrets and credentials.",
        title: "GitGuardian",
        url: "https://www.gitguardian.com/",
        featured: false,
      },
      {
        category: "Security",
        description:
          "Infisical is an open-source, end-to-end encrypted secrets management platform that automates the secure handling of application secrets.",
        title: "Infisical",
        url: "https://infisical.com/",
        featured: false,
      },
      {
        category: "Security",
        description:
          "Pixee is an AI-powered automated product security engineer that triages vulnerability scanner alerts and delivers code fixes directly.",
        title: "Pixee",
        url: "https://www.pixee.ai/",
        featured: false,
      },
      {
        category: "Security",
        description:
          "Snyk is a comprehensive security platform that protects AIgenerated code and AI-native applications.",
        title: "Snyk",
        url: "https://snyk.io/",
        featured: false,
      },
      {
        category: "Security",
        description:
          "Socket is a developer-first security platform that protects your code by detecting and blocking vulnerable or malicious opensource dependencies.",
        title: "Socket",
        url: "https://socket.dev/",
        featured: false,
      },
      {
        category: "Security",
        description:
          "EasyPost offers the industry's most reliable shipping API suite designed to simplify parcel shipping for e-commerce businesses.",
        title: "EasyPost",
        url: "https://www.easypost.com/",
        featured: false,
      },
      {
        category: "Automation",
        description:
          "Abstra is a Python-based, no-code workflow automation platform tailored for modern finance and operations teams.",
        title: "Abstra",
        url: "https://www.abstra.io/",
        featured: false,
      },
      {
        category: "Automation",
        description:
          "Lil'bots is a platform for building, deploying, and sharing AIpowered automation scripts using JavaScript or Python.",
        title: "Lil'bots",
        url: "https://www.lilbots.io/",
        featured: false,
      },
      {
        category: "Automation",
        description:
          "n8n is a source-available, fair-code licensed workflow automation platform designed for technical teams.",
        title: "n8n",
        url: "https://n8n.io/",
        featured: false,
      },
      {
        category: "Automation",
        description:
          "Potpie is an open-source platform for creating AI agents that understand and interact with your codebase",
        title: "Potpie",
        url: "https://potpie.ai/",
        featured: false,
      },
      {
        category: "Automation",
        description:
          "Trigger.dev is an open-source platform for building background jobs and workflows using standard async code.",
        title: "Trigger.dev",
        url: "https://trigger.dev/",
        featured: false,
      },
      {
        category: "BaaS",
        description:
          "Appwrite is an open-source, all-in-one backend platform designed for frontend and mobile developers.",
        title: "Appwrite",
        url: "https://appwrite.io/",
        featured: false,
      },
      {
        category: "BaaS",
        description:
          "Encore is an open-source TypeScript backend framework designed for building robust, type-safe applications.",
        title: "Encore",
        url: "https://encore.dev/",
        featured: false,
      },
      {
        category: "BaaS",
        description:
          "Jamsocket is a platform for building and scaling backends for real-time applications, such as collaborative tools and live-sync experiences.",
        title: "Jamsocket",
        url: "https://jamsocket.com/",
        featured: false,
      },
      {
        category: "BaaS",
        description:
          "Supabase is an open-source backend-as-a-service that serves as a Firebase alternative, built on top of PostgreSQL.",
        title: "Supabase",
        url: "https://supabase.com/",
        featured: false,
      },
      {
        category: "IaaS",
        description:
          "Pulumi is a modern infrastructure-as-code (IaC) platform that enables developers to define and manage cloud infrastructure using familiar programming languages like Python, TypeScript, Go, and C#.",
        title: "Pelumi",
        url: "https://www.pulumi.com/",
        featured: false,
      },
      {
        category: "IaaS",
        description:
          "Terraform by HashiCorp is an open-source infrastructure-ascode (IaC) tool that uses a domain-specific language (HCL) to provision and manage infrastructure across cloud providers and on-prem systems.",
        title: "Terraform",
        url: "https://www.hashicorp.com/en/products/terraform",
        featured: false,
      },
      {
        category: "IaaS",
        description:
          "Terrateam is a GitOps-first, open-source infrastructure orchestration platform that automates IaC workflows for tools like Terraform, OpenTofu, Terragrunt, CDKTF, and Pulumi.",
        title: "Terrateam",
        url: "https://terrateam.io/",
        featured: false,
      },
      {
        category: "Integrations",
        description:
          "Apideck is a unified API platform that simplifies integration with multiple third-party services, especially in accounting and CRM",
        title: "Apideck",
        url: "https://www.apideck.com/",
        featured: false,
      },
      {
        category: "Integrations",
        description:
          "Nango is a comprehensive platform for product integrations, offering hundreds of pre-built connectors to over 400 APIs.",
        title: "Nango",
        url: "https://www.nango.dev/",
        featured: false,
      },
      {
        category: "Integrations",
        description:
          "OpenInt is an open-source platform providing zero-shot integrations tailored for AI-powered code generation.",
        title: "OpenInt",
        url: "https://www.openint.dev/",
        featured: false,
      },
      {
        category: "Integrations",
        description:
          "Panora is an AI-powered assistant designed to help warehouse businesses grow by automating data entry into Warehouse Management Systems (WMS) and ERP platforms.",
        title: "Panora",
        url: "https://getpanora.com/",
        featured: false,
      },
      {
        category: "Integrations",
        description:
          "Revert is an open-source unified API platform designed to help businesses build, maintain, and scale integrations with ticketing and customer support systems.",
        title: "Revert",
        url: "https://www.revert.dev/",
        featured: false,
      },
      {
        category: "Integrations",
        description:
          "Sequin is a platform that enables developers to build integrations with third-party services using familiar SQL operations like select, insert, update, and delete.",
        title: "Sequin",
        url: "https://sequin.io/",
        featured: false,
      },
      {
        category: "Integrations",
        description:
          "Vessel is a developer-first native integration platform designed to help teams build deep, customer-facing integrations quickly.",
        title: "Vessel",
        url: "https://www.vessel.dev/",
        featured: false,
      },
      {
        category: "Integrations",
        description:
          "YepCode is a developer-first platform for securely running AIgenerated code and serverless functions.",
        title: "YepCode",
        url: "https://yepcode.io/",
        featured: false,
      },
      {
        category: "Localization",
        description:
          "Lingo is an AI-powered localization platform designed to help teams quickly translate apps, websites, and entire databases.",
        title: "Lingo",
        url: "https://lingo.dev/en",
        featured: false,
      },
      {
        category: "Localization",
        description:
          "Localazy is an automated localization platform tailored for developers to translate software products, apps, and content efficiently.",
        title: "Localazy",
        url: "https://localazy.com/",
        featured: false,
      },
      {
        category: "Localization",
        description:
          "Locize is a translation management system designed to simplify continuous localization workflows.",
        title: "Locize",
        url: "https://www.locize.com/",
        featured: false,
      },
      {
        category: "Localization",
        description:
          "Tolgee is an open-source, web-based localization platform designed to save developer time by allowing translators and teams to modify texts directly within the app.",
        title: "Tolgee",
        url: "https://tolgee.io/",
        featured: false,
      },
      {
        category: "Scraping",
        description:
          "Apify is a full-stack platform for web scraping, automation, and AI agents",
        title: "Apify",
        url: "https://apify.com/",
        featured: false,
      },
      {
        category: "Scraping",
        description:
          "Browserless is a cloud-based browser automation platform designed to scrape and automate websites, including those with CAPTCHA and bot protection.",
        title: "Browserless",
        url: "https://www.browserless.io/",
        featured: false,
      },
      {
        category: "Scraping",
        description:
          "CorsFix is a fast and unlimited CORS proxy designed to eliminate cross-origin resource sharing (CORS) errors.",
        title: "CorsFix",
        url: "https://corsfix.com/",
        featured: false,
      },
      {
        category: "Scraping",
        description:
          "Crawlbase is an all-in-one data crawling and scraping platform tailored for business developers.",
        title: "Crawlbase",
        url: "https://crawlbase.com/",
        featured: false,
      },
      {
        category: "Scraping",
        description:
          "ScrapingAnt is an enterprise-grade web scraping API offering fast, reliable, and feature-rich scraping powered by headless Chrome.",
        title: "ScrapingAnt",
        url: "https://scrapingant.com/",
        featured: false,
      },
      {
        category: "Scraping",
        description:
          "ScrapingBee is a web scraping API that uses headless browsers and rotating proxies to prevent blocks and ensure successful data extraction.",
        title: "ScrapingBee",
        url: "https://www.scrapingbee.com/",
        featured: false,
      },
      {
        category: "Scraping",
        description:
          "SearchApi is a real-time Google Search API that enables easy and reliable scraping of search engine results pages (SERPs).",
        title: "SearchApi",
        url: "https://www.searchapi.io/",
        featured: false,
      },
      {
        category: "Scraping",
        description:
          "SerpApi is a real-time search engine scraping API that enables developers to access data from Google and other search engines easily and efficiently.",
        title: "SerpApi",
        url: "https://serpapi.com/",
        featured: false,
      },
      {
        category: "Scraping",
        description:
          "WebScrapingHQ offers an AI-powered web scraping platform tailored for e-commerce and data-driven applications.",
        title: "WebScrapingHQ",
        url: "https://www.webscrapinghq.com/",
        featured: false,
      },
      {
        category: "Scraping",
        description:
          "ZenRows is a web scraping API designed to deliver structured data at scale with minimal effort.",
        title: "ZenRows",
        url: "https://www.zenrows.com/",
        featured: false,
      },
      {
        category: "Analytics",
        description:
          "Baremetrics is a subscription analytics platform built for Stripe and related billing tools like Chargebee.",
        title: "Baremetrics",
        url: "https://baremetrics.com/",
        featured: false,
      },
      {
        category: "Analytics",
        description:
          "DevActivity is a developer analytics platform that tracks and analyzes software development contributions to improve team performance.",
        title: "DevActivity",
        url: "https://devactivity.com/",
        featured: false,
      },
      {
        category: "Analytics",
        description:
          "Heap is a comprehensive product analytics platform that automatically captures every user interaction on web and mobile apps.",
        title: "Heap",
        url: "https://www.heap.io/",
        featured: false,
      },
      {
        category: "Analytics",
        description:
          "Mixpanel is a product analytics platform that helps teams understand user behavior, track key metrics, and measure the impact of product and marketing decisions.",
        title: "Mixpanel",
        url: "https://mixpanel.com/",
        featured: false,
      },
      {
        category: "Analytics",
        description:
          "Pirsch is a privacy-focused web analytics platform that serves as a lightweight, cookie-free alternative to Google Analytics.",
        title: "Pirsch",
        url: "https://pirsch.io/",
        featured: false,
      },
      {
        category: "Analytics",
        description:
          "Plausible is a simple, lightweight, and open-source web analytics tool designed as a privacy-friendly alternative to Google Analytics.",
        title: "Plausible",
        url: "https://plausible.io/",
        featured: false,
      },
      {
        category: "Analytics",
        description:
          "PoeticMetric is a privacy-first, open-source website analytics tool designed as a regulation-compliant alternative to Google Analytics.",
        title: "PoeticMetric",
        url: "https://www.poeticmetric.com/",
        featured: false,
      },
      {
        category: "Analytics",
        description:
          "PostHog is an open-source product analytics platform that empowers developers to analyze user behavior, run experiments, monitor performance, and deploy new features— all within a single unified tool.",
        title: "PostHog",
        url: "https://posthog.com/",
        featured: false,
      },
      {
        category: "Analytics",
        description:
          "Segment by Twilio is a leading customer data platform that collects, cleans, and consolidates user data in real time.",
        title: "Segment",
        url: "https://segment.com/",
        featured: false,
      },
      {
        category: "Analytics",
        description:
          "Tinybird is a real-time analytics backend platform that transforms data streams into instantly queryable APIs",
        title: "Tinybird",
        url: "https://www.tinybird.co/",
        featured: false,
      },
      {
        category: "Auth",
        description:
          "Aserto is a cloud-native authorization platform that provides fine-grained, scalable access control for applications and APIs.",
        title: "Aserto",
        url: "https://www.aserto.com/",
        featured: false,
      },
      {
        category: "Auth",
        description:
          "Auth0 is a comprehensive authentication and authorization platform that helps developers secure user access while protecting against attackers.",
        title: "Auth0",
        url: "https://auth0.com/",
        featured: false,
      },
      {
        category: "Auth",
        description:
          "Clerk is a comprehensive user management platform tailored for React, React Native, and Next.js applications",
        title: "Clerk",
        url: "https://clerk.com/",
        featured: false,
      },
      {
        category: "Auth",
        description:
          "BetterAuth is a comprehensive, open-source authentication and authorization framework for TypeScript applications.",
        title: "BetterAuth",
        url: "https://www.better-auth.com/",
        featured: false,
      },
      {
        category: "Auth",
        description:
          "FusionAuth is a modern Customer Identity and Access Management (CIAM) platform that offers security-centric authentication as a service.",
        title: "FusionAuth",
        url: "https://fusionauth.io/",
        featured: false,
      },
      {
        category: "Auth",
        description:
          "Hanko is a customizable, lightweight, and open-source authentication platform designed for quick integration and secure user management.",
        title: "Hanko",
        url: "https://www.hanko.io/",
        featured: false,
      },
      {
        category: "Auth",
        description:
          "MojoAuth is a unified API platform providing secure and scalable OTP-based authentication solutions.",
        title: "MojoAuth",
        url: "https://mojoauth.com/",
        featured: false,
      },
    ] as {
      category: string;
      description: string;
      title: string;
      url: string;
      featured: false;
    }[];

    const batchSize = 50;
    for (let i = 0; i < seed.length; i += batchSize) {
      const batch = seed.slice(i, i + batchSize);

      const ops = batch.map((tool) => ({
        updateOne: {
          filter: { url: tool.url },
          update: {
            $set: {
              ...tool,
              draft: false,
              updatedAt: new Date(),
            },
            $setOnInsert: {
              createdAt: new Date(),
            },
          },
          upsert: true,
        },
      }));

      try {
        const result = await collection.bulkWrite(ops);
        inserted += result.upsertedCount || 0;
        updated += result.modifiedCount || 0;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        errors.push(`Batch ${Math.floor(i / batchSize) + 1}: ${errorMessage}`);
      }
    }

    return {
      success: errors.length === 0,
      inserted,
      updated,
      errors,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return {
      success: false,
      inserted: 0,
      updated: 0,
      errors: [errorMessage],
    };
  }
}
