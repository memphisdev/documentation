<template>
  <div ref="playDiv" class="pager container">
        <a class="pager-link" :href="url">
            <span class="title">{{ title }}&nbsp;&nbsp;</span>
            <svg width="3mm" height="3mm" version="1.1" viewBox="0 0 3.9616 3.9616" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><g transform="translate(-36.123 -92.115)"><path class="path" d="m36.331 95.869-0.17676-0.17676 3.0784-3.0787h-1.7683v-0.49778h2.6199v2.6199h-0.49778v-1.7683l-3.0787 3.0784z"/></g></svg>
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
    stroke:0;
    stroke-width:0;
}


.container:hover{
    .title{
        color: var(--vp-c-brand);
    }
    .path{
        fill: var(--vp-c-brand);
    }
}

.pager-link {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 11px 16px 13px;
  width: 100%;
  height: 100%;
  transition: border-color 0.25s;
}

.pager-link:hover {
  border-color: var(--vp-c-brand);
}

.pager-link.next {
  margin-left: auto;
  text-align: right;
}

.desc {
  display: block;
  line-height: 20px;
  font-size: 12px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.title {
  display: block;
  line-height: 20px;
  font-size: 14px;
  font-weight: 500;
  /* color: var(--vp-c-brand); */
  transition: color 0.25s;
}
</style>
