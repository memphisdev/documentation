<template>
  <div data-v-29ec59c0="" ref="playDiv" class="pager container">
        <a data-v-29ec59c0="" class="pager-link" :href="url">
            <span data-v-29ec59c0="" class="title">{{ title }}</span>
            <svg data-v-ab7b801f="" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" height="24px" viewBox="0 0 24 24" width="24px" class="icon"><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M9 5v2h6.59L4 18.59 5.41 20 17 8.41V15h2V5H9z"></path></svg>
        </a>
    </div>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps(['url', 'title'])
const title = ref(props.title)
const url = ref(props.url)

</script>

<style scoped>
.pager-link{
    display: flex;
}

.container{
    width: 100%;
}
.icon{
    margin-top: 0.2rem;
}

.title{
    font-size: large;
    color: var(--vp-c-text-1);
}

.container:hover{
    .title{
        color: var(--vp-c-brand);
    }
}
</style>
