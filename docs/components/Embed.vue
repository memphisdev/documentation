<template>
  <div ref="playDiv" >
        <a class="pager-link prev container" target="_blank" :href="link">
          <div class="image-wrapper">
            <img class="img" :src="icon"/>
          </div>
          <div>
            <h3 class="pageTitle">{{ title }}</h3>
            <p class="pageDomain">{{ domain }}</p>
          </div>
        </a>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'  
import config from '/meta_data.json'
const title = ref('')
const domain = ref('')
const icon = ref('')
const props = defineProps(['url'])
const link = ref(props.url)

onMounted( async () =>{    
  // const response = await fetch('/meta_data.json');
  // if (!response.ok) {
  //   console.log("Error loading meta_data.json from /meta_data.json");
  // }else{
    // const data = await response.json();
    const my_data = config[props.url];

    title.value = my_data.title;
    domain.value = my_data.site_name;
    icon.value = my_data.favicon;
  // }
  
}) 
</script>

<style scoped>
.container{
    padding: 5px;
    display: flex;
    border-width: 1px;
    border-radius: 5px;
    margin-bottom: 15px;
    color: var(--vp-c-text-1);
    text-decoration: none !important;
}

.pageTitle{
  max-width: 600px;
  margin-bottom: 3px;
  margin-top: 0px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.pageDomain{
  margin-top: 0px;
  margin-bottom: 5px;
}

.img{
  width:35px;
  height:35px;
  margin-right: 10px;
}

.image-wrapper{
  display: grid;
  place-content: center;
  margin-left: 10px;
  margin-right: 10px;
}


.container:hover{
  .pageTitle{
    color: var(--vp-c-brand);
    text-decoration: underline;
    text-decoration-color: var(--vp-c-brand);
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



