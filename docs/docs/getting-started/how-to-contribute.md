---
description: Contribution Instructions
title: Contribution Instructions
---
# How to contribute?

That's amazing that you reached this page!

Memphis is and always will be open-source and community-driven. Our community is our power. :blue_heart:

## Why should you become a contributor?

::: tip User Review:
"Working on Memphis helped me earn many of the skills I later used for my studies in university and my actual job. I think working on open source projects helps me as much as it helps the project!"
:::

Contributing to open source can be a rewarding way to learn, teach, and build experience in just about any skill you can imagine.

Whether it’s coding, user interface design, graphic design, writing, or organizing, if you’re looking for practice, there’s a task for you on an open-source project.

## Getting started

### 1. Establish a local memphis environment

&nbsp;&nbsp; 0\. Join to Memphis [discord](https://discord.gg/WZpysvAeTf) channel

&nbsp;&nbsp; 1\. Install [Golang](https://go.dev/doc/install)

&nbsp;&nbsp; 2\. Fork Memphis [broker](https://github.com/memphisdev/memphis-broker)

&nbsp;&nbsp; 3\. Clone the forked repo to your local station

&nbsp;&nbsp; 4\. Run a local "memphis-metadata" db using docker

```
curl -s https://memphisdev.github.io/memphis-docker/docker-compose-dev-env.yml -o docker-compose-dev-env.yml && docker compose -f docker-compose-dev-env.yml -p memphis up
```

&nbsp;&nbsp; 5\. Install broker dependencies - enter the cloned directory and run

```
go get -d -v .
```

&nbsp;&nbsp; 6\. Run the broker in debug mode (If you're using vscode, click F5) or run via terminal via:

```
DEV_ENV="true" DOCKER_ENV="true" ANALYTICS="false" go run main.go
```

### 2. You are

* [Frontend Developer](how-to-contribute#frontend-contributions)
* [Backend Developer](how-to-contribute#backend-contributions)
* [Data Engineer](how-to-contribute#data-engineer)
* [DevOps](how-to-contribute#devops)

#### Frontend Contributions

&nbsp;&nbsp; 1\. The source files of the UI can be found in a directory called ״[ui\_src](https://github.com/memphisdev/memphis-broker/tree/master/ui\_src)״

&nbsp;&nbsp; 2\. Navigate to "ui\_src" dir

&nbsp;&nbsp; 3\. Install dependencies by running `npm install`

&nbsp;&nbsp; 4\. Run the UI locally by running `npm start`

&nbsp;&nbsp; 5\. Start coding! Here are some ["Good first issues"](https://github.com/memphisdev/memphis-broker/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22)

&nbsp;&nbsp; 6\. Once done - push your code and create a pull request to merge your updates with memphis main repo

#### Backend Contributions

Once you have established[ memphis dev environment](how-to-contribute#1.-establish-memphis-dev-environment), you can start coding.

Memphis backend opportunities are -&nbsp;&nbsp;

1. Memphis Broker
2. SDKs: [Python](https://github.com/memphisdev/memphis.py), [Go](https://github.com/memphisdev/memphis.go), [Node.js](https://github.com/memphisdev/memphis.js), or [future SDKs](https://github.com/orgs/memphisdev/projects/2/views/1?filterQuery=label%3A%22epic%3A+sdk%22)
3. [Memphis CLI](https://github.com/memphisdev/memphis-cli)

Grab a ["Good first issue"](https://github.com/memphisdev/memphis-broker/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22), and once done - push your changes and open a "pull request"

#### Data Engineer

As a data engineer, it would be great to get your feedback, potential use cases, QA, and push memphis to the limit in terms of data workloads would be an amazing contribution, as at the end of the day, you are our champion!

#### DevOps

As a DevOps engineer, you can find multiple paths of contribution

1. [Helm deployment](https://github.com/memphisdev/memphis-k8s)
2. [Terraform](https://github.com/memphisdev/memphis-terraform)&nbsp;&nbsp;
3. [Docker](https://github.com/memphisdev/memphis-docker)
4. DevOps [Roadmap](https://github.com/orgs/memphisdev/projects/2/views/1?filterQuery=label%3A%22epic%3A+deployment%22)
