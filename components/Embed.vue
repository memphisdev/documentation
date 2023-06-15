<template>
  <div class="container">
    <img class="img" :src="icon"/>
    <div>
      <h3 class="pageTitle">{{ title }}</h3>
      <p class="pageDomain">{{ domain }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const title = ref('')
const domain = ref('')
const icon = ref('')
const props = defineProps(['url'])

onMounted( async () =>{    
    try {
        const page_response = await fetch(props.url, {
          method: 'GET',
          headers: {
            'Content-Type': 'text/html',
          },
        });
        const page_text = await page_response.text();
        const parser = new DOMParser(); 
        const doc = parser.parseFromString(page_text, 'text/html');
        title.value = doc.title;
        const split_title = doc.title.split("-");
        for (const part of split_title){
          const part_split = part.trim().split(" ");
          if (part_split.length == 1){
            domain.value = part;
          }
        }

        const icon_link = doc.querySelector("link[rel*='icon']");
        if (icon_link){
          icon.value = icon_link.href;
        }
      } catch (error) {
        console.log(error);
      }
}) 
</script>

<style scoped>
.container{
    border: solid;
    width: 800px;
    padding: 5px;
    display: flex;
    border-width: 1px;
    border-radius: 5px;
    margin-bottom: 15px;
}

.pageTitle{
  width: 730px;
  margin-bottom: 3px;
  margin-top: 0px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.pageDomain{
  margin-bottom: 5px;
}

.img{
  width:50px;
  height:50px;
  margin-right: 10px;
}
</style>



