import { defineConfig } from 'vitepress'
import { tabsMarkdownPlugin } from 'vitepress-plugin-tabs'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Memphis",
  description: "Memphis Documentation",
  srcDir: 'docs',
  base: '/documentation/',
  ignoreDeadLinks: true,
  lastUpdated: true,
  build: {
    rollupOptions: {
      external: [
        '/components/ContainerLink.vue',
        '/components/BigLink.vue',
        '/components/Embed.vue',
        '/components/HeaderImage.vue'
      ]
    }
  },
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
      pattern: 'https://github.com/memphisdev/documentation/edit/master/:path'
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
            { text: 'ContainerLink', link: '/sdk/docs/components/containerlink' },
            { text: 'Embed', link: '/sdk/docs/components/embed' },
            { text: 'HeaderImage', link: '/sdk/docs/components/headerimage' },
            { text: 'Index', link: '/sdk/docs/components/index-component' },
            { text: 'Subtitle', link: '/sdk/docs/components/subtitle' }
          ]
        },
        {
          text: 'Usage',
          link: '/sdk/docs/components/usage',
        }
      ]
    },
    {
      text: `Client Library SDK's`,
      items: [
        {
          text: 'REST (Webhook)',
          link: '/',
          collapsed: true,
          items: [
            { text: 'Overview', link: '/sdk/rest/overview' },
            { text: 'Quick Start', link: '/sdk/rest/quick-start' },
            { text: 'API Reference', link: '/sdk/rest/api-reference' },
            { text: 'GitHub', link: 'https://github.com/memphisdev/memphis-rest-gateway' }
          ]
        },
        {
          text: 'Node.js / TypeScript / NestJS',
          link: '/',
          collapsed: true,
          items: [
            { text: 'Overview', link: '/sdk/node/overview' },
            { text: 'Quick Start', link: '/sdk/node/quick-start' },
            { text: 'API Reference', link: '/sdk/node/api-reference' },
            { text: 'GitHub', link: 'https://github.com/memphisdev/memphis.js' }
          ]
        },
        {
          text: 'Go',
          link: '/',
          collapsed: true,
          items: [
            { text: 'Overview', link: '/sdk/go/overview' },
            { text: 'Quick Start', link: '/sdk/go/quick-start' },
            { text: 'API Reference', link: '/sdk/go/api-reference' },
            { text: 'GitHub', link: 'https://github.com/memphisdev/memphis.go' }
          ]
        },
        {
          text: 'Python',
          link: '/',
          collapsed: true,
          items: [
            { text: 'Overview', link: '/sdk/python/overview' },
            { text: 'Quick Start', link: '/sdk/python/quick-start' },
            { text: 'API Reference', link: '/sdk/python/api-reference' },
            { text: 'GitHub', link: 'https://github.com/memphisdev/memphis.py' }
          ]
        },
        {
          text: 'Kotlin',
          link: '/',
          collapsed: true,
          items: [
            { text: 'Overview', link: '/sdk/kotlin/overview' },
            { text: 'Quick Start', link: '/sdk/kotlin/quick-start' },
            { text: 'API Reference', link: '/sdk/kotlin/api-reference' },
            { text: 'GitHub', link: 'https://github.com/memphisdev/memphis.kt' }
          ]
        },
        {
          text: '.NET',
          link: '/',
          collapsed: true,
          items: [
            { text: 'Overview', link: '/sdk/net/overview' },
            { text: 'Quick Start', link: '/sdk/net/quick-start' },
            { text: 'API Reference', link: '/sdk/net/api-reference' },
            { text: 'GitHub', link: 'https://github.com/memphisdev/memphis.net' }
          ]
        },
        {
          text: 'Java',
          link: '/',
          collapsed: true,
          items: [
            { text: 'Overview', link: '/sdk/java/overview' },
            { text: 'Quick Start', link: '/sdk/java/quick-start' },
            { text: 'API Reference', link: '/sdk/java/api-reference' },
            { text: 'GitHub', link: 'https://github.com/memphisdev/memphis.java' }
          ]
        },
        {
          text: 'Rust',
          link: '/',
          collapsed: true,
          items: [
            { text: 'Overview', link: '/sdk/rust/overview' },
            { text: 'Quick Start', link: '/sdk/rust/quick-start' },
            { text: 'API Reference', link: '/sdk/rust/api-reference' },
            { text: 'GitHub', link: '' }
          ]
        },
        {
          text: 'Scala',
          link: '/',
          collapsed: true,
          items: [
            { text: 'Overview', link: '/sdk/scala/overview' },
            { text: 'Quick Start', link: '/sdk/scala/quick-start' },
            { text: 'API Reference', link: '/sdk/scala/api-reference' },
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
        { text: 'Step 1 - Installation', link: '/docs/getting-started/1-installation' },
        { text: 'Step 2 - Hello World', link: '/docs/getting-started/2-hello-world' },
        { text: 'Tutorials', link: '/docs/getting-started/tutorial' },
        { text: 'Use Cases', link: '/docs/getting-started/3-use-cases' },
        { text: 'Public Case Studies', link: '/docs/getting-started/public-case-studies' },
        { text: 'How to Contribute?', link: '/docs/getting-started/how-to-contribute' },
        { text: 'Roadmap', link: 'https://github.com/orgs/memphisdev/projects/2' }
      ]
    },
    {
      text: '⭐ Memphis',
      items: [
        { text: 'Overview', link: '/docs/memphis/overview' },
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
                    { text: 'AVRO', link: '/docs/memphis/schemaverse-schema-management/getting-started/formats/avro' },
                  ]
                },
              ]
            },
            { text: 'Comparison', link: '/docs/memphis/schemaverse-schema-management/comparison' },
            { text: 'KB', link: '/docs/memphis/schemaverse-schema-management/kb' },
          ]
        },
        { text: 'Memphis Configuration', link: '/docs/memphis/memphis-configuration' },
        { text: 'Benchmark', link: '/docs/memphis/benchmark' },
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
            { text: 'ZeroMQ vs Memphis', link: '/docs/memphis/comparisons/zeromq-vs-memphis' }
          ]
        },
        { text: 'Privacy', link: '/docs/memphis/privacy' }
      ]
    },
    {
      text: '☁ Memphis Cloud',
      items: [
        { text: 'Private Beta', link: 'https://memphis.dev/cloud/' }
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
        { text: 'Kotlin', link: 'https://github.com/memphisdev/memphis.kt' },
        { text: '.NET', link: 'https://github.com/memphisdev/memphis.net' },
        { text: 'Java', link: 'https://github.com/memphisdev/memphis.java' },
        { text: 'NATS Jetstream', link: '/docs/client-libraries/nats-jetstream' },
        { text: 'Rust', link: '/docs/client-libraries/rust' },
        { text: 'Scala', link: '/docs/client-libraries/scala' },
      ]
    },
    {
      text: 'Dashboard (GUI)',
      items: [
        { text: 'General', link: '/docs/dashboard-gui/general' },
        { text: 'Signup', link: '/docs/dashboard-gui/signup' },
        { text: 'Login', link: '/docs/dashboard-gui/login' },
        { text: 'Overview', link: '/docs/dashboard-gui/overview' },
        { text: 'Stations', link: '/docs/dashboard-gui/stations' },
        { text: 'Users', link: '/docs/dashboard-gui/users' },
        { text: 'Profile', link: '/docs/dashboard-gui/profile' },
      ]
    },
    {
      text: '🔌 Platform Integrations',
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