<template>
    <h1>{{ page_title }}</h1>
    <h2>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 1.875C10.3452 1.875 10.625 2.15482 10.625 2.5C10.625 4.17173 11.4672 5.89577 12.7857 7.21431C14.1042 8.53284 15.8283 9.375 17.5 9.375C17.8452 9.375 18.125 9.65482 18.125 10C18.125 10.3452 17.8452 10.625 17.5 10.625C15.8283 10.625 14.1042 11.4672 12.7857 12.7857C11.4672 14.1042 10.625 15.8283 10.625 17.5C10.625 17.8452 10.3452 18.125 10 18.125C9.65482 18.125 9.375 17.8452 9.375 17.5C9.375 15.8283 8.53284 14.1042 7.21431 12.7857C5.89577 11.4672 4.17173 10.625 2.5 10.625C2.15482 10.625 1.875 10.3452 1.875 10C1.875 9.65482 2.15482 9.375 2.5 9.375C4.17173 9.375 5.89577 8.53284 7.21431 7.21431C8.53284 5.89577 9.375 4.17173 9.375 2.5C9.375 2.15482 9.65482 1.875 10 1.875Z" fill="#FFC633"/>
            <path d="M16.0417 1.04166C16.2196 1.04166 16.3737 1.16494 16.4128 1.33849L16.608 2.205C16.7413 2.79667 17.2033 3.25872 17.795 3.392L18.6615 3.58719C18.8351 3.62628 18.9583 3.78043 18.9583 3.95832C18.9583 4.13622 18.8351 4.29036 18.6615 4.32946L17.795 4.52465C17.2033 4.65793 16.7413 5.11998 16.608 5.71164L16.4128 6.57816C16.3737 6.75171 16.2196 6.87499 16.0417 6.87499C15.8638 6.87499 15.7096 6.75171 15.6705 6.57816L15.4753 5.71164C15.3421 5.11998 14.88 4.65793 14.2883 4.52465L13.4218 4.32946C13.2483 4.29036 13.125 4.13622 13.125 3.95832C13.125 3.78043 13.2483 3.62628 13.4218 3.58719L14.2883 3.392C14.88 3.25872 15.3421 2.79667 15.4753 2.205L15.6705 1.33849C15.7096 1.16494 15.8638 1.04166 16.0417 1.04166Z" fill="#FFC633"/>
            <path d="M3.95817 13.125C4.13607 13.125 4.29021 13.2483 4.32931 13.4218L4.5245 14.2883C4.65778 14.88 5.11982 15.3421 5.71149 15.4753L6.57801 15.6705C6.75155 15.7096 6.87484 15.8638 6.87484 16.0417C6.87484 16.2196 6.75155 16.3737 6.57801 16.4128L5.71149 16.608C5.11982 16.7413 4.65778 17.2033 4.5245 17.795L4.32931 18.6615C4.29021 18.8351 4.13607 18.9583 3.95817 18.9583C3.78027 18.9583 3.62613 18.8351 3.58704 18.6615L3.39184 17.795C3.25856 17.2033 2.79652 16.7413 2.20485 16.608L1.33834 16.4128C1.16479 16.3737 1.0415 16.2196 1.0415 16.0417C1.0415 15.8638 1.16479 15.7096 1.33834 15.6705L2.20485 15.4753C2.79652 15.3421 3.25856 14.88 3.39184 14.2883L3.58704 13.4218C3.62613 13.2483 3.78027 13.125 3.95817 13.125Z" fill="#FFC633"/>
        </svg>
        In this section:
    </h2>
    <BigLink class="spacer" v-for="page in pages" :url="page.link" :title="page.text"> 
    </BigLink>
</template>

<script setup>
    // import { ref, onMounted, watch } from 'vue'
    import { useData, withBase } from 'vitepress';
    import { onMounted, ref } from 'vue'
    import { useSidebar } from 'vitepress/theme'
    import BigLink from './BigLink.vue'
    const sidebar = useSidebar().sidebar.value

    const { page } = useData()
    const pagePath = `/${page.value.relativePath.split('.')[0]}`
    const page_title_inner = ""
    const page_title = ref(page_title_inner)

    function parseSidebar(sidebar) {
        let child_pages;
        for(const item of sidebar){
            if (item.link !== undefined && item.link === pagePath) {
                child_pages = []
                for (const child of item.items) {
                    child_pages.push({
                        text: child.text,
                        link: child.link
                    })
                }
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

    const pages = ref(parseSidebar(sidebar));
</script>

<style scoped>  
    h2{
        font-size: 24px;
    }
    .spacer {
        margin-top: 0.5rem;
    }   

    svg{
        display: inline;
    }
</style>