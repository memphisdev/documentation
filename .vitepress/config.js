import { defineConfig } from 'vitepress'
import { tabsMarkdownPlugin } from 'vitepress-plugin-tabs'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Memphis",
  description: "Memphis Documentation",
  srcDir: 'docs',
  base: '/docs/',
  head: [
    ['link', { rel: 'icon', href: '../assets/favicon.ico' }],
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
    config(md){
      md.use(tabsMarkdownPlugin)
    }
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Docs', link: '/getting-started/1-installation' }
    ],

    logo: {
      light: '../assets/color_logo.svg',
      dark: '../assets/color_logo_dark_theme.svg'
    },

    siteTitle: false,

    search: {
      provider: 'local'
    },

    sidebar: [
      {
        text: '👉 Getting Started',
        items: [
          { text: 'Step 1 - Installation', link: '/getting-started/1-installation' },
          { text: 'Step 2 - Hello World', link: '/getting-started/2-hello-world' },
          { text: 'Tutorials', link: '/getting-started/tutorial' },
          { text: 'Use Cases', link: '/getting-started/3-use-cases' },
          { text: 'Public Case Studies', link: '/getting-started/public-case-studies' },
          { text: 'How to Contribute?', link: '/getting-started/how-to-contribute' },
          { text: 'Roadmap', link: 'https://github.com/orgs/memphisdev/projects/2' }
        ]
      },
      {
        text: '⭐ Memphis',
        items: [
          { text: 'Overview', link: '/memphis/overview' },
          { text: 'Architecture', link: '/memphis/architecture' },
          { text: 'Key Concepts',
            collapsed: true,
            items:[
              { text: 'Message broker', link: '/memphis/concepts/message-broker' },
              { text: 'Station', link: '/memphis/concepts/station' },
              { text: 'Producer API', link: '/memphis/concepts/producer' },
              { text: 'Consumer API', link: '/memphis/concepts/consumer' },
              { text: 'Consumer Group', link: '/memphis/concepts/consumer-groups' },
              { text: 'Storage and Redundancy', link: '/memphis/concepts/storage-and-redundancy' },
              { text: 'Security/Authentication', link: '/memphis/concepts/security' },
              { text: 'Scaling', link: '/memphis/concepts/scaling' },
              { text: 'Ordering', link: '/memphis/concepts/ordering' },
              { text: 'Dead-letter Station (DLS)', link: '/memphis/concepts/dead-letter' },
              { text: 'Delayed Messages', link: '/memphis/concepts/delayed-messages' },
              { text: 'Idempotency (Duplicate processing)', link: '/memphis/concepts/idempotency' },
              { text: 'Failover Scenarios', link: '/memphis/concepts/failover-scenarios' },
              { text: 'Troubleshooting process', link: '/memphis/concepts/troubleshooting-process' }
          ] },
          { text: 'Schemaverse', 
            collapsed: true,
            link: '/memphis/schemaverse-schema-management/index',
            items:[
              { text: '⭐ Getting Started', 
                collapsed: false,
                items:[
                { text: 'Protobuf', link: '/memphis/schemaverse-schema-management/formats/protobuf' },
                { text: 'JSON Schema', link: '/memphis/schemaverse-schema-management/formats/json-schema' },
                { text: 'GraphQL', link: '/memphis/schemaverse-schema-management/formats/graphql' },
                { text: 'AVRO', link: '/memphis/schemaverse-schema-management/formats/avro' },
              ] },
              { text: 'Comparison', link: '/memphis/schemaverse-schema-management/comparison' },
              { text: 'KB', link: '/memphis/schemaverse-schema-management/kb' },
          ] },
          { text: 'Memphis Configuration', link: '/memphis/memphis-configuration' },
          { text: 'Benchmark', link: '/memphis/benchmark' },
          { text: 'Comparisons', 
            collapsed: true,
            items:[
            { text: 'NATS Jetstream vs Memphis', link: '/memphis/comparisons/nats-vs-memphis' },
            { text: 'RabbitMQ vs Memphis', link: '/memphis/comparisons/rabbitmq-vs-memphis' },
            { text: 'AWS SQS vs Memphis', link: '/memphis/comparisons/aws-sqs-vs-memphis' },
            { text: 'Apache Kafka vs Memphis', link: '/memphis/comparisons/apache-kafka-vs-memphis' },
            { text: 'Apache Pulsar vs Memphis', link: 'memphis/comparisons/apache-pulsar-vs-memphis' },
            { text: 'ZeroMQ vs Memphis', link: '/memphis/comparisons/zeromq-vs-memphis' }
          ] },
          { text: 'Privacy', link: '/memphis/privacy' }
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
          { text: 'Terraform', 
            collapsed: true,
            items:[
            { text: 'Deploy on AWS', link: '/deployment/cloud-deployment/deploy-on-aws' },
            { text: 'Deploy on GCP', link: '/deployment/cloud-deployment/deploy-on-gcp' },
            { text: 'Deploy on DigitalOcean', link: '/deployment/cloud-deployment/deploy-on-digitalocean' },
            { text: 'Deploy on Azure', link: '/deployment/cloud-deployment/deploy-on-azure' },
          ] },
          { text: 'Kubernetes', 
            collapsed: true,
            items:[
            { text: '1 - Installation', link: '/deployment/kubernetes/1-installation' },
            { text: '2 - Access', link: '/deployment/kubernetes/2-access' },
            { text: '3 - Upgrade', link: '/deployment/kubernetes/how-to-upgrade' },
          ] },
          { text: 'Docker', link: '/deployment/docker-compose' },
          { text: 'Production Best Pracices', link: '/deployment/production-best-practices' }
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
          { text: 'NATS Jetstream', link: '/client-libraries/nats-jetstream' },
          { text: 'Rust', link: '/client-libraries/rust' },
          { text: 'Scala', link: '/client-libraries/scala' },
        ]
      },
      {
        text: 'Dashboard (GUI)',
        items: [
          { text: 'General', link: '/dashboard-gui/general' },
          { text: 'Signup', link: '/dashboard-gui/signup' },
          { text: 'Login', link: '/dashboard-gui/login' },
          { text: 'Overview', link: '/dashboard-gui/overview' },
          { text: 'Stations', link: '/dashboard-gui/stations' },
          { text: 'Users', link: '/dashboard-gui/users' },
          { text: 'Profile', link: '/dashboard-gui/profile' },
        ]
      },
      {
        text: '🔌 Integrations',
        items: [
          { text: 'Monitoring', 
            collapsed: true,
            items:[
            { text: 'Elasticsearch Observability', link: '/integrations/monitoring/elasticsearch-observability' },
            { text: 'Datadog', link: '/integrations/monitoring/datadog' },
            { text: 'Grafana', link: '/integrations/monitoring/grafana' },
          ] },
          { text: 'Notifications', 
            collapsed: true,
            items:[
            { text: 'Slack', link: '/integrations/notifications/slack' },
          ] },
          { text: 'Storage', 
            collapsed: true,
            items:[
            { text: 'Amazon S3', link: '/integrations/storage/amazon-s3' },
          ] },
          { text: 'Other platforms', 
            collapsed: true,
            items:[
            { text: 'PostHog', link: 'https://github.com/PostHog/posthog-memphisdev-app' },
            { text: 'Argo', link: '/integrations/other-platforms/argo-and-memphis' },
          ] },
        ]
      },
      {
        text: '🗒 Release Notes',
        items: [
          { text: 'KB', link: '/release-notes/kb' },
          { text: 'Releases', 
            collapsed: true,
            items:[
              { text: 'v1.0.3-latest', link: '/release-notes/releases/v1.0.3-latest' },
              { text: 'v1.0.2-stable', link: '/release-notes/releases/v1.0.2-stable' },
              { text: 'v1.0.1', link: '/release-notes/releases/v1.0.1' },
              { text: 'v1.0.0 - GA', link: '/release-notes/releases/v1.0.0-lts' },
              { text: 'v0.4.5 - beta', link: '/release-notes/releases/latest-v0.4.5-beta' },
              { text: 'v0.4.4 - beta', link: '/release-notes/releases/v0.4.4-beta' },
              { text: 'v0.4.3 - beta', link: '/release-notes/releases/v0.4.3-beta' },
              { text: 'v0.4.2 - beta', link: '/release-notes/releases/v0.4.2-beta' },
              { text: 'v0.4.1- beta', link: '/release-notes/releases/v0.4.1-beta' },
              { text: 'v0.4.0 - beta', link: '/release-notes/releases/v0.4.0-beta' },
              { text: 'v0.3.6 - beta', link: '/release-notes/releases/v0.3.6-beta' },
              { text: 'v0.3.5 - beta', link: '/release-notes/releases/v0.3.5-beta' },
              { text: 'v0.3.0 - beta', link: '/release-notes/releases/v0.3.0-beta' },
              { text: 'v0.2.2 - beta', link: '/release-notes/releases/v0.2.2-beta' },
              { text: 'v0.2.1 - beta', link: '/release-notes/releases/v0.2.1-beta' },
              { text: 'v0.2.0- beta', link: '/release-notes/releases/v0.2.0-beta' },
              { text: 'v0.1.0 - beta', link: '/release-notes/releases/v0.1.0-beta' },
          ] },
        ]
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
