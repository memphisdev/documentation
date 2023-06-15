<template>
    <a :href="url">
        <slot></slot>
    </a>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps(['url'])
const url = ref(props.url)
</script>

<style scoped>
a{
   color: var(--vp-c-brand) !important;
}
</style>
  