<template>
    <div v-if="has_cover"> 
        <figure><img :src="source" alt=""><figcaption></figcaption></figure>
        <br>
    </div>
    <div v-else hidden>
    </div>
</template>

<script setup>
    import { ref, onMounted, watch } from 'vue'
    import { useData, withBase } from 'vitepress';
    const source = ref('')
    const { frontmatter } = useData();
    const { page } = useData();
    const has_cover = ref(false)

    onMounted(() => {
        if (frontmatter._value.cover != undefined) {
            has_cover.value = true
            source.value = withBase(frontmatter._value.cover)
        }
    })

    watch (page, () => {
        if (frontmatter._value.cover != undefined) {
            has_cover.value = true
            source.value = withBase(frontmatter._value.cover)
        } else {
            has_cover.value = false
        }
    })
</script>

<style scoped>  
    .VPDocAside{
        bottom: 200px !important;
    }
</style>
  