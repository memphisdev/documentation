<template>
    <h3>
        {{ subtitle }}
    </h3>
</template>

<script setup>
    import { useData } from 'vitepress';
    import { ref } from 'vue'
    const { frontmatter } = useData();
    const subtitle = ref(frontmatter._value.description)
</script>

<style scoped>  
    h3{
        color: var(--vp-c-subtitle);
        font-size: 1.2rem;
    }
</style>