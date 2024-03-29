---
title: NATS Jetstream
description: NATS API Compatibility
cover: /NATS_+_Memphis.jpeg
---

# NATS

<Subtitle></Subtitle>

## Introduction

The motivation behind adding compatibility to NATS API 

* To enable Memphis users to enjoy the broad reach and integrations of the NATS ecosystem.
* To enable a lift & shift migration from NATS to Memphis.

## Limitations

* NATS SDKs version - Compatibility with NATS Jetstream 2.9 and above.
* The following Memphis features will not be supported when using NATS SDK:
  * Producers/Consumers observability
  * Schemaverse
  * Dead-letter station - resend unacked messages

## Getting Started

### For NATS Jetstream users

1. Change NATS `hostname` to Memphis `hostname`

### For NATS Core users

All of NATS core features will be supported when communicating with Memphis, but without performing the below procedure, Memphis platform will not be able to control the created objects.

Memphis operates at the stream level. For a NATS `subject` to be visible and managed by Memphis, it must first be wrapped by a `stream`.

Follow the below instructions based on your Memphis type of authentication:

#### When using Memphis password-based authentication (Default for the OS and Cloud):

```bash:line-numbers
nats stream add  -s <MEMPHIS_BROKER_URL>:6666 --user=<MEMPHIS_CLIENT_USER> --password=<MEMPHIS_CLIENT_USER_PASSWORD>
```

#### (Cloud only) Using Memphis password-based authentication (with account ID indication):

```bash:line-numbers
nats stream add  -s <MEMPHIS_BROKER_URL>:6666 --user=<MEMPHIS_CLIENT_USER>$<ACCOUNT_ID> --password=<MEMPHIS_CLIENT_USER_PASSWORD>
```

#### When using Memphis Connection token-based authentication (Legacy OS):

```bash:line-numbers
nats stream add  -s <MEMPHIS_BROKER_URL>:6666 --user=<MEMPHIS_APPLICATION_USER>::<MEMPHIS_CONNECTION_TOKEN> 
```

#### Allowed characters for `stream` name

* a-z/A-Z
* 0-9
* \_ -

Any other character will not be accepted.

## Important to know

* Messages' producers' names will be displayed as "Unknown".
* `stream` names in NATS are case sensitive, while in Memphis, they are lower-cased, so please consider using only lower-cased names.
* In case a station has been created using Memphis GUI/SDK, and you want to produce some messages into it using NATS CLI, you will have to send the messages into a subject called `<stream_name>$<partition_number(starts from 1)>.final`.&#x20;
* In case your station name contains a '`.`' sign replace it with '`#`' sign in the subject name level.

## Example

Using Memphis NATS API compatibility to integrate Memphis with Argo

<BigLink url="/docs/integrations/other-platforms/argo-and-memphis" title="Argo"/>

