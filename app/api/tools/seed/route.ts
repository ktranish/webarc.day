import client from "@/lib/mongodb";

const INITIAL_TOOLS = [
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
      "Quix is a telemetry analytics platform that enables you to consolidate high frequency sensor data in a centralized cloud data store",
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
    category: "Observability",
    description:
      "Lightrun is a developer observability platform that allows you to securely add logs, metrics, and traces to your live applications in real time—without stopping or redeploying them.",
    title: "Lightrun",
    url: "https://lightrun.com/",
    featured: false,
  },
  {
    category: "Productivity",
    description:
      "Linear app is a product development tool that streamlines issues, projects, and product roadmaps, primarily for software development teams.",
    title: "Linear",
    url: "https://linear.app/",
    featured: false,
  },
  {
    category: "Observability",
    description:
      "Rookout is a cloud-based debugging platform that enables developers to debug live production applications without stopping or redeploying them.",
    title: "Rookout",
    url: "https://www.rookout.com/",
    featured: false,
  },
];

export async function GET() {
  try {
    const db = client.db("webarc");
    const collection = db.collection("tools");

    // Insert tools with simple upsert based on URL
    const ops = INITIAL_TOOLS.map((tool) =>
      collection.updateOne(
        { url: tool.url },
        {
          $set: {
            ...tool,
            draft: false,
          },
        },
        { upsert: true },
      ),
    );

    await Promise.all(ops);

    return new Response(
      JSON.stringify({ message: "Tools seeded successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (e: unknown) {
    const error = e instanceof Error ? e.message : "Unknown error occurred";
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
}
