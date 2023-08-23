---
description: Offload stored messages to Amazon S3
cover: /Amazon_S3_+_Memphis.jpeg
title: Amazon S3
---
# S3-Compatible Object Storage

<Subtitle></Subtitle>

## Introduction

The common pattern of message brokers is to delete messages after passing the defined retention policy, like time/size/number of messages.\
Memphis offers a 2nd storage tier for longer, possibly infinite retention of stored messages.\
Each message that expels from the station will be automatically migrated to a 2nd storage tier.

S3-compatible storage providers offer cost-efficient object storage and can act as a 2nd tier storage option for ingested messages. Examples of S3-compatible object storage providers are AWS S3, Backblaze B2, Digital Ocean Spaces, or self-hosted like Minio.

## Getting Started

### Step 1: Establishing the connection

<figure><img src="/assets/Screenshot_2023-07-13_at_22.13.47.png" alt=""><figcaption></figcaption></figure>

Configuring the connection does not necessarily means that the storage tiering is enabled across all the stations or by default. The actual usage will occur on step 2, per station, and upon configuration.

### Step 2: Obtain the needed information

:::: tabs
=== AWS S3
1. Create an IAM user with programmatic access and write permission to a specific bucket.\
   **Copy and document** both the `Access key` and the `Secret access key`
2. Create a new S3 bucket. It can be in any region and block all traffic. \
   As long as the IAM user has permission to write to it.
3. In the S3 integration modal, insert the following:
   * Memphis: Secret access key -> IAM: Secret access key
   * Memphis: Access Key ID -> IAM: Access Key ID
   * Memphis: Region -> S3: Bucket's region
   * Memphis: Bucket name -> S3: Bucket name
4. Connect
:::

### Step 3: Activate

Each station can be managed and use the second storage tier independently.

<figure><img src="/assets/Screen_Shot_2023-02-20_at_16.48.26.png" alt=""><figcaption></figcaption></figure>

## How to read the migrated data

### Step 1:

## How to restore data from an S3 bucket to a Memphis station

### Step 1:

::: tip
To understand the architecture behind storage tiering, please head [here](../../memphis/concepts/storage-and-redundancy).
:::
