---
title: NATS Jetstream
description: NATS API Compatibility
cover: /NATS_+_Memphis.jpeg
---

# NATS

<Subtitle></Subtitle>

<br>
<BigLink url="/docs/getting-started/1-installation" title="Step 1 - Installation"/>

## Introduction

The motivation -

* To enable Memphis users to enjoy the broad reach and integrations of the NATS ecosystem.
* To enable NATS users to make use of Memphis without code changes

## Limitations

* NATS SDKs version - Compatibility with NATS Jetstream 2.9 and above.
* Without Memphis SDK, the following Memphis features will not be supported:
  * Producers/Consumers' observability
  * Schemaverse

## For NATS Jetstream users

Simply change NATS `hostname` to Memphis `hostname`

## For NATS Core users

All of NATS core features will be supported when communicating with Memphis, but without performing the below procedure, Memphis platform will not be able to control those NATS `subjects`.

Memphis operates at the stream level. For a NATS "subject" to be seen and managed by Memphis, it must first be wrapped by a stream.

### Using Memphis Connection token-based authentication:

```bash:line-numbers
nats stream add  -s <MEMPHIS_BROKER_URL>:6666 --user=<MEMPHIS_APPLICATION_USER>::<MEMPHIS_CONNECTION_TOKEN> 
```

### Using Memphis password-based authentication:

```bash:line-numbers
nats stream add  -s <MEMPHIS_BROKER_URL>:6666 --user=<MEMPHIS_APPLICATION_USER> --password=<MEMPHIS_APPLICATION_USER_PASSWORD>
```

### (Cloud) Using Memphis password-based authentication:

```bash:line-numbers
nats stream add  -s <MEMPHIS_BROKER_URL>:6666 --user=<MEMPHIS_APPLICATION_USER>$<ACCOUNT_ID> --password=<MEMPHIS_APPLICATION_USER_PASSWORD>
```

## Instructions for specific integrations

<BigLink url="/docs/integrations/other-platforms/argo-and-memphis" title="Argo"/>

