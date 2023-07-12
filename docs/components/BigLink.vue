<template>
  <div ref="playDiv" class="pager container">
        <a class="pager-link" :href="url">
            <span class="title">{{ title }}&nbsp;&nbsp;</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6.5 5.4999L10.6 1.3999" stroke="#6557FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M11.0001 3.4V1H8.6001" stroke="#6557FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M5.5 1H4.5C2 1 1 2 1 4.5V7.5C1 10 2 11 4.5 11H7.5C10 11 11 10 11 7.5V6.5" stroke="#6557FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
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

svg{
    margin-top: 0.3rem;
    margin-left: 0.2rem;
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
  color: var(--vp-c-brand);
  transition: color 0.25s;
}
</style>
