---
title: Management
description: Managing a new schema
---    

# Management

## Create a new Schema

:::: tabs
=== GUI
Head to "Schemaverse" on the left menu.

<figure><img src="/assets/Screenshot_2023-07-03_at_22.13.50.png" alt=""><figcaption></figcaption></figure>

Click on "Create from blank"

<figure><img src="/assets/Screenshot_2023-07-03_at_22.15.04.png" alt=""><figcaption></figcaption></figure>

More information on each format can be found under the [produce/consume](produce-consume/) section.

=== Code
Javascript
```javascript:line-numbers
await memphisConnection.createSchema({schemaName: "<schema-name>", schemaType: "<schema-type>", schemaFilePath: "<schema-file-path>" });
```

Python
```python:line-numbers
await memphis.create_schema("<schema-name>", "<schema-type>", "<schema-file-path>")
```

Go
```go:line-numbers
err := conn.CreateSchema("<schema-name>", "<schema-type>", "<schema-file-path>")
```

.NET
```c#:line-numbers
await client.CreateSchema("<schema-name>", "<schema-type>", "<schema-file-path>")
```
::::

## Detach a Schema

:::: tabs
=== GUI
Head to the designated station

<figure><img src="/assets/Screenshot_2023-07-03_at_22.57.55.png" alt=""><figcaption></figcaption></figure>

Click on "Detach" on the upper-center panel

<figure><img src="/assets/Screenshot_2023-07-03_at_22.59.39.png" alt=""><figcaption></figcaption></figure>

::: danger
Please remember that detaching a schema will enable "any" events to get ingested by the station.
:::

=== Code
Javascript
```javascript:line-numbers
await memphisConnection.detachSchema({ stationName: '<station-name>' });
```

Python
```python:line-numbers
await memphis.detach_schema("<station-name>")
```

Go
```go:line-numbers
err := conn.DetachSchema("<station-name>")
```
.NET
```c#:line-numbers
await client.DetachSchema(stationName: station.Name);
```
::::

## Enforce (attach) a Schema

:::: tabs
=== Gui
Head to the designated station.\
On the top-left corner, click on "Enforce schema"

<figure><img src="/assets/Screenshot_2023-07-03_at_23.05.21.png" alt=""><figcaption></figcaption></figure>

Choose the required schema.

<figure><img src="/assets/Screenshot_2023-07-03_at_23.06.28.png" alt=""><figcaption></figcaption></figure>

=== Code
Javascript
```javascript:line-numbers
await memphisConnection.enforceSchema({ name: '<schema-name>', stationName: '<station-name>' });
```

Python
```python:line-numbers
await memphis.enforce_schema("<schema-name>", "<station-name>")
```

Go
```go:line-numbers
err := conn.EnforceSchema("<schema-name>", "<station-name>")
```

.NET
```c#:line-numbers
await client.EnforceSchema(stationName: "<station-name>", schemaName: "<schema-name>");
```
::::