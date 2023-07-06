---
cover: /Memphis_concepts_(2).jpeg
title: Consumer Group
description: This section descibes what is a consumer group
---

# Consumer Group

## What is a consumer group?

A consumer group is a group of consumers, usually multiple clients grouped with the same characteristics and/or replicas/workers of the same application/client.

The added layer of a consumer group enables ordering control and avoids duplicate processing of messages within the same type of consumer(s).

Each message will be delivered in parallel to all consumer groups.

<figure><img src="/assets/consumer_group.jpeg" alt=""><figcaption><p>Each consumer group gets the same messages</p></figcaption></figure>

<figure><img src="/assets/consumer_group_2.jpeg" alt=""><figcaption><p>Inside the consumer group, a message will be delivered to only one consumer</p></figcaption></figure>

There is no [consumer](./consumer) without a consumer group.
