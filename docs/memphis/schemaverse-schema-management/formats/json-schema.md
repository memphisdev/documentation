---
title: JSON Schema
description: This section describes integrating JSON Schema with Memphis
---
# JSON Schema

[JSON Schema](https://json-schema.org/) is a vocabulary that allows you to annotate and validate JSON documents.\
It provides clear human- and machine-readable documentation and offers data validation which is useful for Automated testing�ensuring the quality of client-submitted data.

### Supported Features

* Versioning
* Embedded serialization
* Producer Live evolution
* Import packages (soon)
* Import types (soon)

## Getting started

### Attach a schema

#### Step 1: Create a new schema

::: tabs
=== GUI
Head to the "Schemaverse" page

<figure><img src="/assets/Screen_Shot_2022-11-10_at_15.22.17_(1).png" alt=""><figcaption></figcaption></figure>

Create a new schema by clicking on "Create from blank"

<figure><img src="/assets/Screen_Shot_2023-01-08_at_23.21.55.png" alt=""><figcaption></figcaption></figure>

=== SDK
Soon.
:::

#### Step 2: Attach

::: tabs
=== GUI
Head to your station, and on the top-left corner, click on "+ Attach schema"

<figure><img src="/assets/Screen_Shot_2022-11-10_at_16.02.31.png" alt=""><figcaption></figcaption></figure>

<figure><img src="/assets/Screen_Shot_2022-11-10_at_16.02.38.png" alt=""><figcaption></figcaption></figure>

=== SDK
It can be found through the different [SDKs](broken-reference) docs.
:::

### Produce a message (Serialization)

::: tabs
=== Node.js
Memphis abstracts the need for external serialization functions and embeds them within the SDK.

In node.js, we can simply produce an object. Behind the scenes, the object will be serialized based on the attached schema and data format - protobuf.

**Example schema:**

```json
{
	"$schema": "http://json-schema.org/draft-04/schema#",
	"title": "contact_details",
	"type": "object",
	"properties": {
		"fname": {
			"type": "string"
		},
		"lname": {
			"type": "string"
		}
	}
}
```

**Code:**

```javascript:line-numbers
const memphis = require("memphis-dev");

(async function () {
    try {
        await memphis.connect({
            host: "MEMPHIS_BROKER_URL",
            username: "APPLICATION_USER",
            password: "PASSWORD"
        });
        const producer = await memphis.producer({
            stationName: "STATION_NAME",
            producerName: "PRODUCER_NAME"
        });
        var payload = {
            fname: "Daniel",
            lname: "Craig",
        };
        try {
            await producer.produce({
                message: payload
        });
        } catch (ex) {
            console.log(ex.message)
        }
    } catch (ex) {
        console.log(ex);
        memphis.close();
    }
})();
```
=== go
Memphis abstracts the need for external serialization functions and embeds them within the SDK.

**Example schema:**

```json
{
	"$schema": "http://json-schema.org/draft-04/schema#",
	"title": "contact_details",
	"type": "object",
	"properties": {
		"fname": {
			"type": "string"
		},
		"lname": {
			"type": "string"
		}
	}
}
```

**Code:**

```go
package main

import (
    "fmt"
    "os"
    "github.com/memphisdev/memphis.go"
)

func main() {
    conn, err := memphis.Connect("MEMPHIS_BROKER_URL", "APPLICATION_TYPE_USERNAME", memphis.Password("PASSWORD"))
    if err != nil {
        os.Exit(1)
    }
    defer conn.Close()
    p, err := conn.CreateProducer("STATION_NAME", "PRODUCER_NAME")

    hdrs := memphis.Headers{}
    hdrs.New()
    err = hdrs.Add("key", "value")

    if err != nil {
        fmt.Printf("Header failed: %v\n", err)
        os.Exit(1)
    }
	msg := make(map[string]interface{})
	msg["fname"] = "Daniel"
	msg["lname"] = "Craig"

    err = p.Produce(msg, memphis.MsgHeaders(hdrs))

    if err != nil {
        fmt.Printf("Produce failed: %v\n", err)
        os.Exit(1)
    }
}

```

=== python
Memphis abstracts the need for external serialization functions and embeds them within the SDK.

**Example schema:**

```json
{
	"$schema": "http://json-schema.org/draft-04/schema#",
	"title": "contact_details",
	"type": "object",
	"properties": {
		"fname": {
			"type": "string"
		},
		"lname": {
			"type": "string"
		}
	}
}
```

**Code:**

```python
import asyncio
import json
from memphis import Memphis, Headers, MemphisError, MemphisConnectError, MemphisSchemaError

async def main():
    memphis = Memphis()
    await memphis.connect(host="MEMPHIS_HOST", username="MEMPHIS_USERNAME", password="PASSWORD")
    producer = await memphis.producer(
        station_name="STATION_NAME", producer_name="PRODUCER_NAME")

    headers = Headers()
    headers.add("key", "value")

    msg = '{ "fname":"John", "lname":"Mayer"}'
    msg = json.loads(msg)

    try:
        await producer.produce(msg, headers=headers)

    except Exception as e:
        print(e)
    finally:
        await asyncio.sleep(3)

    await memphis.close()

if __name__ == '__main__':
    asyncio.run(main())
```
=== TypeScript
Memphis abstracts the need for external serialization functions and embeds them within the SDK.

**Example schema:**

```json
{
	"$schema": "http://json-schema.org/draft-04/schema#",
	"title": "contact_details",
	"type": "object",
	"properties": {
		"fname": {
			"type": "string"
		},
		"lname": {
			"type": "string"
		}
	}
}
```

**Code:**

```typescript
import memphis from 'memphis-dev';
import type { Memphis } from 'memphis-dev/types';

(async function () {
    let memphisConnection: Memphis;

    try {
        memphisConnection = await memphis.connect({
            host: 'MEMPHIS_BROKER_URL',
            username: 'APPLICATION_TYPE_USERNAME',
            password: 'PASSWORD'
        });

        const producer = await memphisConnection.producer({
            stationName: 'STATION_NAME',
            producerName: 'PRODUCER_NAME'
        });

        const headers = memphis.headers()
        headers.add('key', 'value');
        const msg = {
            fname: "Bob",
            lname: "Marley",
        }
        await producer.produce({
            message: msg,
            headers: headers
        });

        memphisConnection.close();
    } catch (ex) {
        console.log(ex);
    }
})();
```
:::
