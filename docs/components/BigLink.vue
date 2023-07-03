<template>
  <div data-v-29ec59c0="" ref="playDiv" class="pager container">
        <a data-v-29ec59c0="" class="pager-link" :href="url">
            <span data-v-29ec59c0="" class="title">{{ title }}&nbsp;&nbsp;</span>
            <svg width="3mm" height="3mm" version="1.1" viewBox="0 0 3.9616 3.9616" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><g transform="translate(-36.123 -92.115)"><g transform="matrix(.26458 0 0 .26458 35.062 90.786)"><path d="m0 0h24v24h-24z" fill="none"/><path d="m 9,5 v 2 h 6.59 L 4,18.59 5.41,20 17,8.41 V 15 h 2 V 5 Z"/></g><path class="path" transform="scale(.26458)" d="m137.27 362.39-0.66807-0.66808 11.635-11.636h-6.6832v-1.8814h9.902v9.902h-1.8814v-6.6832l-11.636 11.635z" /></g></svg>
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

.path{
    fill:var(--vp-c-subtitle);
    stroke:#222;
    stroke-width:.09902;
}

.container:hover{
    .title{
        color: var(--vp-c-brand);
    }
    .path{
        fill: var(--vp-c-brand);
    }
}
</style>
