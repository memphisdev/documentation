<template>
  <div class="playDiv" >
        <a class="pager-link prev container" target="_blank" :href="link">
          <div class="image-wrapper">
            <img class="img" :src="icon"/>
          </div>
          <div>
            <h3 class="pageTitle">{{ title }}</h3>
            <p class="pageDomain">{{ domain }}</p>
          </div>
          <svg class="icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path class="icon-stroke" d="M8.6665 7.33337L14.1332 1.8667" stroke="#6B6B74" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path class="icon-stroke" d="M14.6663 4.53337V1.33337H11.4663" stroke="#6B6B74" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path class="icon-stroke" d="M7.3335 1.33337H6.00016C2.66683 1.33337 1.3335 2.66671 1.3335 6.00004V10C1.3335 13.3334 2.66683 14.6667 6.00016 14.6667H10.0002C13.3335 14.6667 14.6668 13.3334 14.6668 10V8.66671" stroke="#6B6B74" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
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

.playDiv{
  background: #313136;
  border-radius: 6px;
  height: 77px;
  width: 715px;
  margin-top: 20px;
  margin-bottom: 20px;
}

.icon{
  position: absolute;
  top: 15px;
  right: 15px;
}
.container{
  position: relative;
  padding: 5px;
  display: flex;
  border-width: 1px;
  border-radius: 5px;
  margin-bottom: 15px;
  color: var(--vp-c-text-1);
  text-decoration: none !important;
}

.pageTitle{
  max-width: 595px;
  margin-bottom: 3px;
  margin-top: 0px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.pageDomain{
  margin-top: 0px;
  margin-bottom: 5px;
  font-size: 17px;
}

.img{
  width:27px;
  height:auto;
  opacity: 1 !important;
}

.image-wrapper{
  display: grid;
  place-content: center;
  width: 45px;
  height: 45px;
  border-radius: 6px;
  margin-right: 20px;
  background: linear-gradient(144.03deg, rgba(255, 198, 51, 0.25) 4.75%, rgba(97, 223, 198, 0.25) 45.3%, rgba(101, 87, 255, 0.25) 93.22%);
}


.container:hover{
  .icon-stroke{
    stroke: var(--vp-c-brand);
  }
}

.pager-link {
  border: 1.5px solid #313136;
  border-radius: 8px;
  padding: 11px 16px 13px;
  width: 100%;
  height: 100%;
  transition: border-color 0.2s;
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



