---
title: Rest Quickstart
description: A quickstart on how to use the Rest client library
---

## Getting started

Tip: Please make sure your 'REST gateway' component is exposed either through localhost or public IP<br>
Tip: The REST gateway URL for the **sandbox** environment is:<br>
https://restgw.sandbox.memphis.dev

### Authenticate

First, you have to authenticate to get a JWT token.\
The JWT token is valid by default for 15 minutes.

#### Example:

```
curl --location --request POST 'rest_gateway:4444/auth/authenticate' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "root",
    "connection_token": "memphis",
    "password": "memphis, // connect with only one of the following methods: connection token / password
    "token_expiry_in_minutes": 60,
    "refresh_token_expiry_in_minutes": 10000092
}'
```

Expected output:&#x20;

```
{"expires_in":3600000,"jwt":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NzQ3MTg0MjV9._A-fRI78fPPHL6eUFoWZjp21UYVcjXwGWiYtacYPZR8","jwt_refresh_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjIyNzQ3MjAzNDV9.d89acaIr4CaBp7csm-jmJv0J45YrD_slvlEOKu2rs7Q","refresh_token_expires_in":600005520000}
```

#### Parameters

`username`: Memphis application-type username\
`connection_token`: Memphis application-type connection token\
`token_expiry_in_minutes`: Initial token expiration time.\
`refresh_token_expiry_in_minutes`: When should

### Refresh Token

Before the JWT token expires, you must call the refresh token to get a new one, or after authentication failure.\
The refresh JWT is valid by default for 5 hours.

#### Example:

```
curl --location --request POST 'rest_gateway:4444/auth/refreshToken' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jwt_refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjIyNzQ3MjA2NjB9.Furfr5EZlBlglVPSjtU4x02z_jbWhu5pIByhCRh6FU8",
    "token_expiry_in_minutes": 60,
    "refresh_token_expiry_in_minutes": 10000092
}'
```

Expected output:

```
{"expires_in":3600000,"jwt":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NzQ3MTg3NTF9.EO5ersr0kQxQNRI0XlbqzOryt-F1-MmFGXRKn2sM8Yw","jwt_refresh_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjIyNzQ3MjA2NzF9.E621wF_ieC-9rq4IgrsqYMPApAPS8YDgkT8R-69-Y5E","refresh_token_expires_in":600005520000}
```

### Produce a single message

Attach the JWT token to every request.\
JWT token as '`Bearer`' as a header.

#### Supported content types:

* text
* application/json
* application/x-protobuf

#### Example:

```
curl --location --request POST 'rest_gateway:4444/stations/<station_name>/produce/single' \
--header 'Authorization: Bearer eyJhbGciOiJIU**********.e30.4KOGRhUaqvm-qSHnmMwX5VrLKsvHo33u3UdJ0qYP0kI' \
--header 'Content-Type: application/json' \
--data-raw '{"message": "New Message"}'
```

#### If you don't have the option to add the authorization header, you can send the JWT via query parameters:

```
curl --location --request POST 'rest_gateway:4444/stations/<station_name>/produce/single?authorization=eyJhbGciOiJIU**********.e30.4KOGRhUaqvm-qSHnmMwX5VrLKsvHo33u3UdJ0qYP0kI' \
--header 'Content-Type: application/json' \
--data-raw '{"message": "New Message"}'
```

Expected output:

```
{"error":null,"success":true}
```

#### Error Example:

```
{"error":"Schema validation has failed: jsonschema: '' does not validate with file:///Users/user/memphisdev/memphis-rest-gateway/123#/required: missing properties: 'field1', 'field2', 'field3'","success":false}
```

### Produce a batch of messages&#x20;

Attach the JWT token to every request.\
JWT token as '`Bearer`' as a header.

#### Supported content types:

* application/json

#### Example:

```
curl --location --request POST 'rest_gateway:4444/stations/<station_name>/produce/batch' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.4KOGRhUaqvm-qSHnmMwX5VrLKsvHo33u3UdJ0qYP0kI' \
--header 'Content-Type: application/json' \
--data-raw '[
    {"message": "x"},
    {"message": "y"},
    {"message": "z"}
]'
```

Expected output:

```
{"error":null,"success":true}
```

#### Error Examples:

```
{"errors":["Schema validation has failed: jsonschema: '' does not validate with file:///Users/user/memphisdev/memphis-rest-gateway/123#/required: missing properties: 'field1'","Schema validation has failed: jsonschema: '' does not validate with file:///Users/user/memphisdev/memphis-rest-gateway/123#/required: missing properties: 'field1'"],"fail":2,"sent":1,"success":false}
```