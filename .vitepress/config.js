import { defineConfig } from "vitepress";
import { tabsMarkdownPlugin } from "vitepress-plugin-tabs";
import { fileURLToPath, URL } from "node:url";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  vite: {
    resolve: {
      alias: [
        {
          find: /^.*\/VPDocFooter\.vue$/,
          replacement: fileURLToPath(
            new URL("./components/MemphisFooter.vue", import.meta.url)
          ),
        },
      ],
    },
  },
  title: "Memphis",
  description: "Memphis Documentation",
  srcDir: "docs",
  base: "/documentation/",
  ignoreDeadLinks: true,
  lastUpdated: true,
  head: [
    ["link", { rel: "icon", href: "/documentation/favicon.ico" }],
    [
      "script",
      {
        async: "",
        src: "https://www.googletagmanager.com/gtag/js?id=G-DDDELH98SH",
      },
    ],
    [
      "script",
      {},
      "window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'G-DDDELH98SH');",
    ],
  ],
  markdown: {
    config(md) {
      md.use(tabsMarkdownPlugin);
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Docs", link: "/docs/getting-started/1-installation" },
      { text: "SDK", link: "/sdk/welcome" },
    ],

    logo: {
      light: "/color_logo.svg",
      dark: "/color_logo_dark_theme.svg",
    },

    siteTitle: false,

    search: {
      provider: "local",
    },

    sidebar: {
      "/docs/": docs(),
      "/sdk/": sdk(),
      "/contribution/": contribution(),
    },

    editLink: {
      pattern:
        "https://github.com/memphisdev/documentation/edit/gh-pages/docs/:path",
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/memphisdev/memphis" },
    ],
  },
});

export function sdk() {
  return [
    {
      text: `Client Library SDK's`,
      items: [
        {
          text: "REST (Webhook)",
          link: "/sdk/client-libraries/rest/index",
          collapsed: true,
          items: [
            {
              text: "Quick Start",
              link: "/sdk/client-libraries/rest/quick-start",
            },
            {
              text: "API Reference",
              link: "/sdk/client-libraries/rest/api",
            },
            {
              text: "GitHub",
              link: "https://github.com/memphisdev/memphis-rest-gateway",
            },
          ],
        },
        {
          text: "Node.js / TypeScript / NestJS",
          link: "/sdk/client-libraries/node/index",
          collapsed: true,
          items: [
            {
              text: "Quick Start",
              link: "/sdk/client-libraries/node/quick-start",
            },
            {
              text: "API Reference",
              link: "/sdk/client-libraries/node/api",
            },
            {
              text: "GitHub",
              link: "https://github.com/memphisdev/memphis.js",
            },
          ],
        },
        {
          text: "Go",
          link: "/sdk/client-libraries/go/index",
          collapsed: true,
          items: [
            {
              text: "Quick Start",
              link: "/sdk/client-libraries/go/quick-start",
            },
            {
              text: "API Reference",
              link: "/sdk/client-libraries/go/api",
            },
            {
              text: "GitHub",
              link: "https://github.com/memphisdev/memphis.go",
            },
          ],
        },
        {
          text: "Python",
          link: "/sdk/client-libraries/python/index",
          collapsed: true,
          items: [
            {
              text: "Quick Start",
              link: "/sdk/client-libraries/python/quick-start",
            },
            {
              text: "API Reference",
              link: "/sdk/client-libraries/python/api",
            },
            {
              text: "GitHub",
              link: "https://github.com/memphisdev/memphis.py",
            },
          ],
        },
        {
          text: "Kotlin (Community)",
          link: "/sdk/client-libraries/kotlin/index",
          collapsed: true,
          items: [
            {
              text: "Quick Start",
              link: "/sdk/client-libraries/kotlin/quick-start",
            },
            {
              text: "API Reference",
              link: "/sdk/client-libraries/kotlin/api",
            },
            {
              text: "GitHub",
              link: "https://github.com/memphisdev/memphis.kt",
            },
          ],
        },
        {
          text: ".NET",
          link: "/sdk/client-libraries/net/index",
          collapsed: true,
          items: [
            {
              text: "Quick Start",
              link: "/sdk/client-libraries/net/quick-start",
            },
            {
              text: "API Reference",
              link: "/sdk/client-libraries/net/api",
            },
            {
              text: "GitHub",
              link: "https://github.com/memphisdev/memphis.net",
            },
          ],
        },
        {
          text: "Java",
          link: "/sdk/client-libraries/java/index",
          collapsed: true,
          items: [
            {
              text: "Quick Start",
              link: "/sdk/client-libraries/java/quick-start",
            },
            {
              text: "API Reference",
              link: "/sdk/client-libraries/java/api",
            },
            {
              text: "GitHub",
              link: "https://github.com/memphisdev/memphis.java",
            },
          ],
        },
        {
          text: "Rust (Community)",
          link: "/sdk/client-libraries/rust/index",
          collapsed: true,
          items: [
            {
              text: "Quick Start",
              link: "/sdk/client-libraries/rust/quick-start",
            },
            {
              text: "API Reference",
              link: "/sdk/client-libraries/rust/api",
            },
            { text: "GitHub", link: "" },
          ],
        },
        {
          text: "Scala",
          link: "/sdk/client-libraries/scala/index",
          collapsed: true,
          items: [
            {
              text: "Quick Start",
              link: "/sdk/client-libraries/scala/quick-start",
            },
            {
              text: "API Reference",
              link: "/sdk/client-libraries/scala/api",
            },
            { text: "GitHub", link: "" },
          ],
        },
      ],
    },
  ];
}

export function docs() {
  return [
    {
      text: "👉 Getting Started",
      items: [
        { text: "Introduction", link: "/docs/getting-started/introduction" },
        { text: "Quick start", link: "/docs/getting-started/2-hello-world" },
        { text: "Tutorials", link: "/docs/getting-started/tutorial" },
        {
          text: "How others use Memphis",
          link: "/docs/getting-started/public-case-studies",
        },
        {
          text: "How to Contribute?",
          link: "/docs/getting-started/how-to-contribute",
        },
        { text: "Roadmap", link: "https://memphis.dev/roadmap" },
      ],
    },
    {
      text: "☁ Memphis Cloud",
      items: [
        {
          text: "Getting Started",
          link: "/docs/memphis-cloud/getting-started",
        },
        { text: "Pricing", link: "https://memphis.dev/pricing" },
      ],
    },
    {
      text: "⭐ Memphis Broker",
      items: [
        { text: "Architecture", link: "/docs/memphis/architecture" },
        {
          text: "Key Concepts",
          collapsed: true,
          link: "/docs/memphis/concepts/index",
          items: [
            {
              text: "Message broker",
              link: "/docs/memphis/concepts/message-broker",
            },
            { text: "Station", link: "/docs/memphis/concepts/station" },
            { text: "Producer API", link: "/docs/memphis/concepts/producer" },
            { text: "Consumer API", link: "/docs/memphis/concepts/consumer" },
            {
              text: "Consumer Group",
              link: "/docs/memphis/concepts/consumer-groups",
            },
            {
              text: "Storage and Redundancy",
              link: "/docs/memphis/concepts/storage-and-redundancy",
            },
            {
              text: "Security/Authentication",
              link: "/docs/memphis/concepts/security",
            },
            { text: "Scaling", link: "/docs/memphis/concepts/scaling" },
            { text: "Ordering", link: "/docs/memphis/concepts/ordering" },
            {
              text: "Dead-letter Station (DLS)",
              link: "/docs/memphis/concepts/dead-letter",
            },
            {
              text: "Delayed Messages",
              link: "/docs/memphis/concepts/delayed-messages",
            },
            {
              text: "Idempotency (Duplicate processing)",
              link: "/docs/memphis/concepts/idempotency",
            },
            {
              text: "Failover Scenarios",
              link: "/docs/memphis/concepts/failover-scenarios",
            },
            {
              text: "Troubleshooting process",
              link: "/docs/memphis/concepts/troubleshooting-process",
            },
          ],
        },
        {
          text: "Memphis Configuration",
          link: "/docs/memphis/memphis-configuration",
        },
        {
          text: "Comparisons",
          collapsed: true,
          link: "/docs/memphis/comparisons/index",
          items: [
            {
              text: "NATS Jetstream vs Memphis",
              link: "/docs/memphis/comparisons/nats-vs-memphis",
            },
            {
              text: "RabbitMQ vs Memphis",
              link: "/docs/memphis/comparisons/rabbitmq-vs-memphis",
            },
            {
              text: "AWS SQS vs Memphis",
              link: "/docs/memphis/comparisons/aws-sqs-vs-memphis",
            },
            {
              text: "Apache Kafka vs Memphis",
              link: "/docs/memphis/comparisons/apache-kafka-vs-memphis",
            },
            {
              text: "Apache Pulsar vs Memphis",
              link: "/docs/memphis/comparisons/apache-pulsar-vs-memphis",
            },
            {
              text: "ZeroMQ vs Memphis",
              link: "/docs/memphis/comparisons/zeromq-vs-memphis",
            },
            {
              text: "Apache NiFi vs Memphis",
              link: "/docs/memphis/comparisons/apache-nifi-vs-memphis",
            },
          ],
        },
        { text: "Privacy", link: "https://memphis.dev/privacy-policy/" },
      ],
    },
    {
      text: "⭐ Memphis Schemaverse",
      items: [
        {
          text: "Overvew",
          link: "/docs/memphis-schemaverse/schemaverse-schema-management",
        },
        {
          text: "Getting Started",
          collapsed: true,
          link: "/docs/memphis-schemaverse/getting-started/index",
          items: [
            {
              text: "Management",
              link: "/docs/memphis-schemaverse/getting-started/management",
            },
            {
              text: "Produce/Consume",
              collapsed: true,
              link: "/docs/memphis-schemaverse/getting-started/formats/index",
              items: [
                {
                  text: "Protobuf",
                  link: "/docs/memphis-schemaverse/getting-started/formats/protobuf",
                },
                {
                  text: "JSON Schema",
                  link: "/docs/memphis-schemaverse/getting-started/formats/json-schema",
                },
                {
                  text: "GraphQL",
                  link: "/docs/memphis-schemaverse/getting-started/formats/graphql",
                },
                {
                  text: "Avro",
                  link: "/docs/memphis-schemaverse/getting-started/formats/avro",
                },
              ],
            },
          ],
        },
        {
          text: "Comparison",
          link: "/docs/memphis-schemaverse/comparison",
        },
        { text: "KB", link: "/docs/memphis-schemaverse/kb" },
      ],
    },
    {
      text: "⭐ Memphis Functions",
      items: [
        {
          text: "Overview",
          link: "/docs/memphis-functions/overview",
        },
        {
          text: "Getting Started",
          link: "/docs/memphis-functions/getting-started",
        },
        {
          text: "memphis.yaml",
          link: "/docs/memphis-functions/memphis.yaml",
        },
      ],
    },
    {
      text: "📦 Open-Source Installation",
      items: [
        {
          text: "Terraform",
          collapsed: true,
          link: "/docs/open-source-installation/cloud-deployment/index",
          items: [
            {
              text: "Deploy on AWS",
              link: "/docs/open-source-installation/cloud-deployment/deploy-on-aws",
            },
            {
              text: "Deploy on GCP",
              link: "/docs/open-source-installation/cloud-deployment/deploy-on-gcp",
            },
            {
              text: "Deploy on DigitalOcean",
              link: "/docs/open-source-installation/cloud-deployment/deploy-on-digitalocean",
            },
            {
              text: "Deploy on Azure",
              link: "/docs/open-source-installation/cloud-deployment/deploy-on-azure",
            },
          ],
        },
        {
          text: "Kubernetes",
          collapsed: true,
          link: "/docs/open-source-installation/kubernetes/index",
          items: [
            {
              text: "1 - Installation",
              link: "/docs/open-source-installation/kubernetes/1-installation",
            },
            {
              text: "2 - Access",
              link: "/docs/open-source-installation/kubernetes/2-access",
            },
            {
              text: "3 - Upgrade",
              link: "/docs/docs/open-source-installation/kubernetes/how-to-upgrade",
            },
          ],
        },
        {
          text: "Docker",
          link: "/docs/open-source-installation/docker-compose",
        },
        {
          text: "Production Best Pracices",
          link: "/docs/open-source-installation/production-best-practices",
        },
      ],
    },
    {
      text: "Client Libraries",
      items: [
        {
          text: "REST (Webhook)",
          link: "https://github.com/memphisdev/memphis-rest-gateway",
        },
        {
          text: "Node.js / TypeScript / NestJS",
          link: "https://github.com/memphisdev/memphis.js",
        },
        { text: "Go", link: "https://github.com/memphisdev/memphis.go" },
        { text: "Python", link: "https://github.com/memphisdev/memphis.py" },
        {
          text: "Kotlin (Community)",
          link: "https://github.com/memphisdev/memphis.kt",
        },
        { text: ".NET", link: "https://github.com/memphisdev/memphis.net" },
        { text: "Java", link: "https://github.com/memphisdev/memphis.java" },
        {
          text: "Rust (Community)",
          link: "https://github.com/turulix/memphis-rust-community",
        },
        {
          text: "NATS Jetstream",
          link: "/docs/client-libraries/nats-jetstream",
        },
        { text: "Scala", link: "/docs/client-libraries/scala" },
      ],
    },
    {
      text: "🖥 Web Console (GUI)",
      items: [
        { text: "Dashboard", link: "/docs/web-console-gui/overview" },
        { text: "Stations", link: "/docs/web-console-gui/stations" },
        { text: "Users", link: "/docs/web-console-gui/users" },
        {
          text: "Schemaverse",
          link: "https://docs.memphis.dev/memphis/memphis/schemaverse-schema-management",
        },
      ],
    },
    {
      text: "🔌 Integrations Center",
      link: "/docs/integrations-center/index",
      items: [
        {
          text: "Change Data Capture (CDC)",
          collapsed: true,
          link: " /docs/integrations-center/change-data-capture-cdc/index",
          items: [
            {
              text: "Dabezium",
              link: " /docs/integrations-center/change-data-capture-cdc/debezium",
            },
          ],
        },
        {
          text: "Monitoring",
          collapsed: true,
          link: "/docs/grations/monitoring/index",
          items: [
            {
              text: "Elasticsearch Observability",
              link: "/docs/platform-integrations/monitoring/elasticsearch-observability",
            },
            {
              text: "Datadog",
              link: "/docs/platform-integrations/monitoring/datadog",
            },
            {
              text: "Grafana",
              link: "/docs/platform-integrations/monitoring/grafana",
            },
          ],
        },
        {
          text: "Notifications",
          collapsed: true,
          link: "/docs/platform-integrations/notifications/index",
          items: [
            {
              text: "Slack",
              link: "/docs/platform-integrations/notifications/slack",
            },
          ],
        },
        {
          text: "Storage tiering",
          collapsed: true,
          link: "/docs/platform-integrations/storage/index",
          items: [
            {
              text: "S3-Compatible Object Storage",
              link: "/docs/platform-integrations/storage/amazon-s3",
            },
          ],
        },
        {
          text: "Source Code",
          collapsed: true,
          link: " /docs/integrations-center/source-code/index",
          items: [
            {
              text: "GitHub",
              link: " /docs/integrations-center/source-code/github",
            },
          ],
        },
        {
          text: "Other platforms",
          collapsed: true,
          link: "/docs/platform-integrations/other-platforms/index",
          items: [
            {
              text: "Argo",
              link: "/docs/platform-integrations/other-platforms/argo-and-memphis",
            },
          ],
        },
      ],
    },
    {
      text: "🗒 Release Notes",
      items: [
        { text: "KB", link: "/docs/release-notes/kb" },
        {
          text: "Releases",
          collapsed: true,
          link: "/docs/release-notes/releases/index",
          items: [
            {
              text: "v1.2.0-latest",
              link: "/docs/release-notes/releases/v1.2.0-latest",
            },
            {
              text: "v1.1.1-stable",
              link: "/docs/release-notes/releases/v1.1.1-stable",
            },
            {
              text: "v1.1.0",
              link: "/docs/release-notes/releases/v1.1.0",
            },
            {
              text: "v1.0.3",
              link: "/docs/release-notes/releases/v1.0.3",
            },
            { text: "v1.0.2", link: "/docs/release-notes/releases/v1.0.2" },
            { text: "v1.0.1", link: "/docs/release-notes/releases/v1.0.1" },
            {
              text: "v1.0.0 - GA",
              link: "/docs/release-notes/releases/v1.0.0-lts",
            },
            {
              text: "v0.4.5 - beta",
              link: "/docs/release-notes/releases/latest-v0.4.5-beta",
            },
            {
              text: "v0.4.4 - beta",
              link: "/docs/release-notes/releases/v0.4.4-beta",
            },
            {
              text: "v0.4.3 - beta",
              link: "/docs/release-notes/releases/v0.4.3-beta",
            },
            {
              text: "v0.4.2 - beta",
              link: "/docs/release-notes/releases/v0.4.2-beta",
            },
            {
              text: "v0.4.1- beta",
              link: "/docs/release-notes/releases/v0.4.1-beta",
            },
            {
              text: "v0.4.0 - beta",
              link: "/docs/release-notes/releases/v0.4.0-beta",
            },
            {
              text: "v0.3.6 - beta",
              link: "/docs/release-notes/releases/v0.3.6-beta",
            },
            {
              text: "v0.3.5 - beta",
              link: "/docs/release-notes/releases/v0.3.5-beta",
            },
            {
              text: "v0.3.0 - beta",
              link: "/docs/release-notes/releases/v0.3.0-beta",
            },
            {
              text: "v0.2.2 - beta",
              link: "/docs/release-notes/releases/v0.2.2-beta",
            },
            {
              text: "v0.2.1 - beta",
              link: "/docs/release-notes/releases/v0.2.1-beta",
            },
            {
              text: "v0.2.0- beta",
              link: "/docs/release-notes/releases/v0.2.0-beta",
            },
            {
              text: "v0.1.0 - beta",
              link: "/docs/release-notes/releases/v0.1.0-beta",
            },
          ],
        },
      ],
    },
  ];
}

export function contribution() {
  return [
    {
      text: "Documentation How-To",
      items: [
        {
          text: "Components",
          link: "/contribution/components/index",
          collapsed: true,
          items: [
            { text: "BigLink", link: "/contribution/components/biglink" },
            { text: "Embed", link: "/contribution/components/embed" },
            {
              text: "HeaderImage",
              link: "/contribution/components/headerimage",
            },
            { text: "Index", link: "/contribution/components/index-component" },
            { text: "Subtitle", link: "/contribution/components/subtitle" },
          ],
        },
        {
          text: "Usage",
          link: "/contribution/usage",
        },
      ],
    },
  ];
}
