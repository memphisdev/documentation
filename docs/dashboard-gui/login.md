---
title: Memphis 
description: Memphis.Dev Rusk SDK github issue
---
<script setup>
import ContainerLink from 'docs/components/ContainerLink.Vue'
</script>
# Login

## Initial users

### Docker:

* **Username:** root
* **Password:** memphis

### Kubernetes:

* **Username:** root
* **Password (Run the following to generate):**

```
 kubectl get secret memphis-creds -n memphis -o jsonpath="{.data.ROOT_PASSWORD}" | base64 --decode
```

::: tip
Additional new users can be added through the <ContainerLink url='./users'>Users page</ContainerLink>.
:::
