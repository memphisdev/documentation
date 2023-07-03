<template>
    <h1>{{ page_title }}</h1>
    <h2>In this section:</h2>
    <BigLink class="spacer" v-for="page in child_pages" :url="page.link" :title="page.text"> 
    </BigLink>
</template>

<script setup>
    // import { ref, onMounted, watch } from 'vue'
    import { useData } from 'vitepress';
    import { onMounted, ref } from 'vue'
    import { sidebar_export } from '/sidebar.js'
    import BigLink from './BigLink.vue'

    const { page } = useData()
    const pagePath = `/${page.value.relativePath.split('.')[0]}`
    const page_title_inner = ""
    const page_title = ref(page_title_inner)

    function parseSidebar(sidebar) {
        let child_pages;
        for(const item of sidebar){
            if (item.link !== undefined && item.link === pagePath) {
                child_pages = item.items
                page_title.value = item.text
            } else if (item.items !== undefined){
                child_pages = parseSidebar(item.items);
            }
            if (child_pages !== undefined) {
                break;
            }
        }

        return child_pages
    }

    const child_pages = ref(parseSidebar(sidebar_export));
</script>

<style scoped>  
    .spacer {
        margin-top: 0.5rem;
    }
</style>