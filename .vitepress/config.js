import { defineConfig } from 'vitepress'
import { tabsMarkdownPlugin } from 'vitepress-plugin-tabs'
import { fileURLToPath, URL } from 'node:url'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  vite: {
    resolve: {
      alias: [
        {
          find: /^.*\/VPDocFooter\.vue$/,
          replacement: fileURLToPath(
            new URL('./components/MemphisFooter.vue', import.meta.url)
          )
        }
      ]
    }
  },
  title: "Memphis",
  description: "Memphis Documentation",
  srcDir: 'docs',
  base: '/documentation/',
  ignoreDeadLinks: true,
  lastUpdated: true,
  head: [
    ['link', { rel: 'icon', href: '/documentation/favicon.ico' }],
    [
      'script', {
        async: '',
        src: 'https://www.googletagmanager.com/gtag/js?id=G-DDDELH98SH',
      }],
    [
      'script',
      {},
      "window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'G-DDDELH98SH');",
    ],
  ],
  markdown: {
    config(md) {
      md.use(tabsMarkdownPlugin)
    }
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Docs', link: '/docs/getting-started/1-installation' },
      { text: 'SDK', link: '/sdk/welcome' },
    ],

    logo: {
      light: '/color_logo.svg',
      dark: '/color_logo_dark_theme.svg'
    },

    siteTitle: false,

    search: {
      provider: 'local'
    },

    sidebar: {
      '/docs/': docs(),
      '/sdk/': sdk()
    },

    editLink: {
      pattern: 'https://github.com/memphisdev/documentation/edit/gh-pages/docs/:path'
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})

export function sdk() {
  return [
    {
      text: 'Documentation How-To',
      items: [
        {
          text: 'Components',
          link: '/sdk/docs/components/index',
          collapsed: true,
          items: [
            { text: 'BigLink', link: '/sdk/docs/components/biglink' },
            { text: 'Embed', link: '/sdk/docs/components/embed' },
            { text: 'HeaderImage', link: '/sdk/docs/components/headerimage' },
            { text: 'Index', link: '/sdk/docs/components/index-component' },
            { text: 'Subtitle', link: '/sdk/docs/components/subtitle' }
          ]
        },
        {
          text: 'Usage',
          link: '/sdk/docs/usage',
        }
      ]
    },
    {
      text: `Client Library SDK's`,
      items: [
        {
          text: 'REST (Webhook)',
          link: '/sdk/client-libraries/rest/index',
          collapsed: true,
          items: [
            { text: 'Overview', link: '/sdk/client-libraries/rest/overview' },
            { text: 'Quick Start', link: '/sdk/client-libraries/rest/quick-start' },
            { text: 'API Reference', link: '/sdk/client-libraries/rest/api-reference' },
            { text: 'GitHub', link: 'https://github.com/memphisdev/memphis-rest-gateway' }
          ]
        },
        {
          text: 'Node.js / TypeScript / NestJS',
          link: '/sdk/client-libraries/node/index',
          collapsed: true,
          items: [
            { text: 'Overview', link: '/sdk/client-libraries/node/overview' },
            { text: 'Quick Start', link: '/sdk/client-libraries/node/quick-start' },
            { text: 'API Reference', link: '/sdk/client-libraries/node/api-reference' },
            { text: 'GitHub', link: 'https://github.com/memphisdev/memphis.js' }
          ]
        },
        {
          text: 'Go',
          link: '/sdk/client-libraries/go/index',
          collapsed: true,
          items: [
            { text: 'Overview', link: '/sdk/client-libraries/go/overview' },
            { text: 'Quick Start', link: '/sdk/client-libraries/go/quick-start' },
            { text: 'API Reference', link: '/sdk/client-libraries/go/api-reference' },
            { text: 'GitHub', link: 'https://github.com/memphisdev/memphis.go' }
          ]
        },
        {
          text: 'Python',
          link: '/sdk/client-libraries/python/index',
          collapsed: true,
          items: [
            { text: 'Overview', link: '/sdk/client-libraries/python/overview' },
            { text: 'Quick Start', link: '/sdk/client-libraries/python/quick-start' },
            { text: 'API Reference', link: '/sdk/client-libraries/python/api-reference' },
            { text: 'GitHub', link: 'https://github.com/memphisdev/memphis.py' }
          ]
        },
        {
          text: 'Kotlin',
          link: '/sdk/client-libraries/kotlin/index',
          collapsed: true,
          items: [
            { text: 'Overview', link: '/sdk/client-libraries/kotlin/overview' },
            { text: 'Quick Start', link: '/sdk/client-libraries/kotlin/quick-start' },
            { text: 'API Reference', link: '/sdk/client-libraries/kotlin/api-reference' },
            { text: 'GitHub', link: 'https://github.com/memphisdev/memphis.kt' }
          ]
        },
        {
          text: '.NET',
          link: '/sdk/client-libraries/net/index',
          collapsed: true,
          items: [
            { text: 'Overview', link: '/sdk/client-libraries/net/overview' },
            { text: 'Quick Start', link: '/sdk/client-libraries/net/quick-start' },
            { text: 'API Reference', link: '/sdk/client-libraries/net/api-reference' },
            { text: 'GitHub', link: 'https://github.com/memphisdev/memphis.net' }
          ]
        },
        {
          text: 'Java',
          link: '/sdk/client-libraries/java/index',
          collapsed: true,
          items: [
            { text: 'Overview', link: '/sdk/client-libraries/java/overview' },
            { text: 'Quick Start', link: '/sdk/client-libraries/java/quick-start' },
            { text: 'API Reference', link: '/sdk/client-libraries/java/api-reference' },
            { text: 'GitHub', link: 'https://github.com/memphisdev/memphis.java' }
          ]
        },
        {
          text: 'Rust',
          link: '/sdk/client-libraries/rust/index',
          collapsed: true,
          items: [
            { text: 'Overview', link: '/sdk/client-libraries/rust/overview' },
            { text: 'Quick Start', link: '/sdk/client-libraries/rust/quick-start' },
            { text: 'API Reference', link: '/sdk/client-libraries/rust/api-reference' },
            { text: 'GitHub', link: '' }
          ]
        },
        {
          text: 'Scala',
          link: '/sdk/client-libraries/scala/index',
          collapsed: true,
          items: [
            { text: 'Overview', link: '/sdk/client-libraries/scala/overview' },
            { text: 'Quick Start', link: '/sdk/client-libraries/scala/quick-start' },
            { text: 'API Reference', link: '/sdk/client-libraries/scala/api-reference' },
            { text: 'GitHub', link: '' }
          ]
        }
      ]
    }
  ]
}

export function docs() {
  return [
    {
      text: '👉 Getting Started',
      items: [
        { text: 'Introduction', link: '/docs/getting-started/introduction' },
        { text: 'Quickstart', link: '/docs/getting-started/2-hello-world' },
        { text: 'Tutorials', link: '/docs/getting-started/tutorial' },
        { text: 'How others use Memphis', link: '/docs/getting-started/public-case-studies' },
        { text: 'How to Contribute?', link: '/docs/getting-started/how-to-contribute' },
        { text: 'Roadmap', link: 'https://memphis.dev/roadmap' }
      ]
    },
    {
      text: '☁ Memphis Cloud',
      items: [
        { text: 'Getting Started', link: '/docs/memphis-cloud/getting-started' },
        { text: 'Pricing', link: 'https://memphis.dev/pricing' }
      ]
    },
    {
      text: '⭐ Memphis Broker',
      items: [
        { text: 'Architecture', link: '/docs/memphis/architecture' },
        {
          text: 'Key Concepts',
          collapsed: true,
          link: '/docs/memphis/concepts/index',
          items: [
            { text: 'Message broker', link: '/docs/memphis/concepts/message-broker' },
            { text: 'Station', link: '/docs/memphis/concepts/station' },
            { text: 'Producer API', link: '/docs/memphis/concepts/producer' },
            { text: 'Consumer API', link: '/docs/memphis/concepts/consumer' },
            { text: 'Consumer Group', link: '/docs/memphis/concepts/consumer-groups' },
            { text: 'Storage and Redundancy', link: '/docs/memphis/concepts/storage-and-redundancy' },
            { text: 'Security/Authentication', link: '/docs/memphis/concepts/security' },
            { text: 'Scaling', link: '/docs/memphis/concepts/scaling' },
            { text: 'Ordering', link: '/docs/memphis/concepts/ordering' },
            { text: 'Dead-letter Station (DLS)', link: '/docs/memphis/concepts/dead-letter' },
            { text: 'Delayed Messages', link: '/docs/memphis/concepts/delayed-messages' },
            { text: 'Idempotency (Duplicate processing)', link: '/docs/memphis/concepts/idempotency' },
            { text: 'Failover Scenarios', link: '/docs/memphis/concepts/failover-scenarios' },
            { text: 'Troubleshooting process', link: '/docs/memphis/concepts/troubleshooting-process' }
          ]
        },
        {
          text: 'Schemaverse',
          collapsed: true,
          link: '/docs/memphis/schemaverse-schema-management/index',
          items: [
            {
              text: '⭐ Getting Started',
              collapsed: false,
              link: '/docs/memphis/schemaverse-schema-management/getting-started/index',
              items: [
                { text: 'Management', link: '/docs/memphis/schemaverse-schema-management/getting-started/management' },
                {
                  text: 'Produce/Consume',
                  collapsed: true,
                  link: '/docs/memphis/schemaverse-schema-management/getting-started/formats/index',
                  items: [
                    { text: 'Protobuf', link: '/docs/memphis/schemaverse-schema-management/getting-started/formats/protobuf' },
                    { text: 'JSON Schema', link: '/docs/memphis/schemaverse-schema-management/getting-started/formats/json-schema' },
                    { text: 'GraphQL', link: '/docs/memphis/schemaverse-schema-management/getting-started/formats/graphql' },
                    { text: 'Avro', link: '/docs/memphis/schemaverse-schema-management/getting-started/formats/avro' },
                  ]
                },
              ]
            },
            { text: 'Comparison', link: '/docs/memphis/schemaverse-schema-management/comparison' },
            { text: 'KB', link: '/docs/memphis/schemaverse-schema-management/kb' },
          ]
        },
        { text: 'Memphis Configuration', link: '/docs/memphis/memphis-configuration' },
        {
          text: 'Comparisons',
          collapsed: true,
          link: '/docs/memphis/comparisons/index',
          items: [
            { text: 'NATS Jetstream vs Memphis', link: '/docs/memphis/comparisons/nats-vs-memphis' },
            { text: 'RabbitMQ vs Memphis', link: '/docs/memphis/comparisons/rabbitmq-vs-memphis' },
            { text: 'AWS SQS vs Memphis', link: '/docs/memphis/comparisons/aws-sqs-vs-memphis' },
            { text: 'Apache Kafka vs Memphis', link: '/docs/memphis/comparisons/apache-kafka-vs-memphis' },
            { text: 'Apache Pulsar vs Memphis', link: '/docs/memphis/comparisons/apache-pulsar-vs-memphis' },
            { text: 'ZeroMQ vs Memphis', link: '/docs/memphis/comparisons/zeromq-vs-memphis' },
            { text: 'Apache NiFi vs Memphis', link: '/docs/memphis/comparisons/apache-nifi-vs-memphis' }
          ]
        },
        { text: 'Privacy', link: 'https://memphis.dev/privacy-policy/' }
      ]
    },
    {
      text: '⭐ Memphhis Schemaverse',
      items: [
        { text: 'Overvew', link: '/docs/memphis/schemaverse-schema-management/schemaverse-schema-management' },
        {
          text: 'Getting Started',
          collapsed: false,
          link: '/docs/memphis/schemaverse-schema-management/getting-started/index',
          items: [
            { text: 'Management', link: '/docs/memphis/schemaverse-schema-management/getting-started/management' },
            {
              text: 'Produce/Consume',
              collapsed: true,
              link: '/docs/memphis/schemaverse-schema-management/getting-started/formats/index',
              items: [
                { text: 'Protobuf', link: '/docs/memphis/schemaverse-schema-management/getting-started/formats/protobuf' },
                { text: 'JSON Schema', link: '/docs/memphis/schemaverse-schema-management/getting-started/formats/json-schema' },
                { text: 'GraphQL', link: '/docs/memphis/schemaverse-schema-management/getting-started/formats/graphql' },
                { text: 'Avro', link: '/docs/memphis/schemaverse-schema-management/getting-started/formats/avro' },
              ]
            },
          ]
        },
        { text: 'Comparison', link: '/docs/memphis/schemaverse-schema-management/comparison' },
        { text: 'KB', link: '/docs/memphis/schemaverse-schema-management/kb' },
      ]
    },
    {
      text: '📦 Deployment',
      items: [
        {
          text: 'Terraform',
          collapsed: true,
          link: '/docs/deployment/cloud-deployment/index',
          items: [
            { text: 'Deploy on AWS', link: '/docs/deployment/cloud-deployment/deploy-on-aws' },
            { text: 'Deploy on GCP', link: '/docs/deployment/cloud-deployment/deploy-on-gcp' },
            { text: 'Deploy on DigitalOcean', link: '/docs/deployment/cloud-deployment/deploy-on-digitalocean' },
            { text: 'Deploy on Azure', link: '/docs/deployment/cloud-deployment/deploy-on-azure' },
          ]
        },
        {
          text: 'Kubernetes',
          collapsed: true,
          link: '/docs/deployment/kubernetes/index',
          items: [
            { text: '1 - Installation', link: '/docs/deployment/kubernetes/1-installation' },
            { text: '2 - Access', link: '/docs/deployment/kubernetes/2-access' },
            { text: '3 - Upgrade', link: '/docs/deployment/kubernetes/how-to-upgrade' },
          ]
        },
        { text: 'Docker', link: '/docs/deployment/docker-compose' },
        { text: 'Production Best Pracices', link: '/docs/deployment/production-best-practices' }
      ]
    },
    {
      text: 'Client Libraries',
      items: [
        { text: 'REST (Webhook)', link: 'https://github.com/memphisdev/memphis-rest-gateway' },
        { text: 'Node.js / TypeScript / NestJS', link: 'https://github.com/memphisdev/memphis.js' },
        { text: 'Go', link: 'https://github.com/memphisdev/memphis.go' },
        { text: 'Python', link: 'https://github.com/memphisdev/memphis.py' },
        { text: 'Kotlin (Community)', link: 'https://github.com/memphisdev/memphis.kt' },
        { text: '.NET', link: 'https://github.com/memphisdev/memphis.net' },
        { text: 'Java', link: 'https://github.com/memphisdev/memphis.java' },
        { text: 'Rust (Community)', link: 'https://github.com/turulix/memphis-rust-community' },
        { text: 'NATS Jetstream', link: '/docs/client-libraries/nats-jetstream' },
        { text: 'Scala', link: '/docs/client-libraries/scala' },
      ]
    },
    {
      text: 'Web Console (GUI)',
      items: [
        { text: 'Dashboard', link: '/docs/web-console-gui/overview' },
        { text: 'Stations', link: '/docs/web-console-gui/stations' },
        { text: 'Users', link: '/docs/web-console-gui/users' },
        { text: 'Schemaverse', link: 'https://docs.memphis.dev/memphis/memphis/schemaverse-schema-management' }
      ]
    },
    {
      text: '🔌 Integrations Center',
      items: [
        {
          text: 'Monitoring',
          collapsed: true,
          link: '/docs/integrations/monitoring/index',
          items: [
            { text: 'Elasticsearch Observability', link: '/docs/integrations/monitoring/elasticsearch-observability' },
            { text: 'Datadog', link: '/docs/integrations/monitoring/datadog' },
            { text: 'Grafana', link: '/docs/integrations/monitoring/grafana' },
          ]
        },
        {
          text: 'Notifications',
          collapsed: true,
          link: '/docs/integrations/notifications/index',
          items: [
            { text: 'Slack', link: '/docs/integrations/notifications/slack' },
          ]
        },
        {
          text: 'Storage',
          collapsed: true,
          link: '/docs/integrations/storage/index',
          items: [
            { text: 'Amazon S3', link: '/docs/integrations/storage/amazon-s3' },
          ]
        },
        {
          text: 'Other platforms',
          collapsed: true,
          link: '/docs/integrations/other-platforms/index',
          items: [
            { text: 'PostHog', link: 'https://github.com/PostHog/posthog-memphisdev-app' },
            { text: 'Argo', link: '/docs/integrations/other-platforms/argo-and-memphis' },
          ]
        },
      ]
    },
    {
      text: '🗒 Release Notes',
      items: [
        { text: 'KB', link: '/docs/release-notes/kb' },
        {
          text: 'Releases',
          collapsed: true,
          link: '/docs/release-notes/releases/index',
          items: [
            { text: 'v1.1.0-latest', link: '/docs/release-notes/releases/v1.1.0-latest' },
            { text: 'v1.0.3-stable', link: '/docs/release-notes/releases/v1.0.3-stable' },
            { text: 'v1.0.2', link: '/docs/release-notes/releases/v1.0.2' },
            { text: 'v1.0.1', link: '/docs/release-notes/releases/v1.0.1' },
            { text: 'v1.0.0 - GA', link: '/docs/release-notes/releases/v1.0.0-lts' },
            { text: 'v0.4.5 - beta', link: '/docs/release-notes/releases/latest-v0.4.5-beta' },
            { text: 'v0.4.4 - beta', link: '/docs/release-notes/releases/v0.4.4-beta' },
            { text: 'v0.4.3 - beta', link: '/docs/release-notes/releases/v0.4.3-beta' },
            { text: 'v0.4.2 - beta', link: '/docs/release-notes/releases/v0.4.2-beta' },
            { text: 'v0.4.1- beta', link: '/docs/release-notes/releases/v0.4.1-beta' },
            { text: 'v0.4.0 - beta', link: '/docs/release-notes/releases/v0.4.0-beta' },
            { text: 'v0.3.6 - beta', link: '/docs/release-notes/releases/v0.3.6-beta' },
            { text: 'v0.3.5 - beta', link: '/docs/release-notes/releases/v0.3.5-beta' },
            { text: 'v0.3.0 - beta', link: '/docs/release-notes/releases/v0.3.0-beta' },
            { text: 'v0.2.2 - beta', link: '/docs/release-notes/releases/v0.2.2-beta' },
            { text: 'v0.2.1 - beta', link: '/docs/release-notes/releases/v0.2.1-beta' },
            { text: 'v0.2.0- beta', link: '/docs/release-notes/releases/v0.2.0-beta' },
            { text: 'v0.1.0 - beta', link: '/docs/release-notes/releases/v0.1.0-beta' },
          ]
        },
      ]
    },
  ]
}