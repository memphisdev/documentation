<template>
  <div class="pager playDiv">
        <a class="pager-link prev container" :href="url">
            <div class="image-wrapper">
              <svg width="27" height="21" viewBox="0 0 27 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_6566_24431)">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M13.1488 19.0389C13.0831 19.2973 12.9511 19.5199 12.7577 19.7342C12.5472 19.964 12.2533 20.1607 11.9391 20.3153C11.2237 20.6672 10.3938 20.7732 9.57533 20.6693L9.56995 20.6686L9.56453 20.668C8.82269 20.5925 8.10895 20.2915 7.54951 19.794L0.928946 13.3379L0.928316 13.3373C0.740544 13.1526 0.612683 12.999 0.530093 12.8162C0.439286 12.6152 0.395437 12.4205 0.39502 12.2009L0.452609 8.63211L0.451666 8.61632C0.43055 8.26323 0.552438 7.92199 0.853915 7.60263L0.856195 7.60022L0.858435 7.59777C1.06805 7.36866 1.36059 7.17235 1.67369 7.01788C2.37871 6.69121 3.23992 6.57912 4.05772 6.67968C4.87994 6.78079 5.61353 7.09069 6.08805 7.55746L6.08905 7.55844L12.7268 14.0029L12.7351 14.0103C12.9289 14.1796 13.0658 14.3974 13.1618 14.657C13.2275 14.8348 13.267 14.9914 13.279 15.1448L13.1933 18.7697V18.7745C13.1933 18.8328 13.1759 18.932 13.1488 19.0389Z" fill="#FFC633"/>
                <path d="M16.0283 6.48511C16.1387 6.65137 16.2272 6.83175 16.291 7.02203C16.3735 7.26821 16.4346 7.65229 16.43 7.90934L16.4081 9.18948L20.8281 13.5359C21.3876 14.0336 22.1013 14.3346 22.8432 14.41L22.8486 14.4106L22.8539 14.4113C23.6725 14.5152 24.5022 14.4092 25.2177 14.0574C25.532 13.9027 25.8258 13.706 26.0363 13.4763C26.2297 13.262 26.3617 13.0393 26.4273 12.7809C26.4546 12.6739 26.4719 12.5748 26.4719 12.5166V12.5117L26.5576 8.88683C26.5549 8.85165 26.5507 8.81619 26.545 8.78025L16.0283 6.48511Z" fill="#6557FF"/>
                <path d="M26.5449 8.77954C26.5262 8.66107 26.4914 8.53715 26.4404 8.39918C26.3445 8.13951 26.2075 7.9218 26.0138 7.75236L26.0054 7.74501L19.3677 1.30057L19.3667 1.29959C18.8922 0.832818 18.1586 0.522904 17.3364 0.421807C16.5186 0.321252 15.6573 0.433337 14.9522 0.760006C14.6392 0.914471 14.3466 1.11079 14.1371 1.33989L14.1348 1.34234L14.1326 1.34476C13.8311 1.66411 13.7092 2.00536 13.7303 2.35844L13.7312 2.37423L13.6733 5.09199C14.4094 5.2695 15.1116 5.52791 15.6231 6.02311C15.7791 6.15931 15.9152 6.31491 16.0283 6.48525L26.5449 8.77954Z" fill="#6557FF"/>
                <path d="M15.363 12.7387C15.3751 12.7263 15.387 12.7137 15.399 12.7011C15.6306 12.4568 15.7954 12.1586 15.8781 11.8346C15.9094 11.7126 15.9267 11.5877 15.9299 11.462L15.9988 7.81166C15.9961 7.93474 15.9539 7.71431 15.9243 7.83391C15.951 7.71335 15.9966 7.94192 15.9987 7.81959L15.9988 7.81931C16.0023 7.61005 15.9704 7.4008 15.9032 7.20039C15.7967 6.88273 15.6059 6.59889 15.3502 6.3783C14.2253 5.28029 12.0157 5.00367 10.4317 5.75732C10.0735 5.92296 9.75104 6.15488 9.48192 6.4404C9.09568 6.85582 8.91172 7.34401 8.94778 7.8332L8.94113 8.14627L15.363 12.7387L15.3627 12.7388L8.94113 8.14627L8.91016 9.60354L13.1207 13.6915C13.1451 13.7129 13.1688 13.7348 13.1918 13.7572C13.6305 13.6935 14.057 13.5712 14.4463 13.387C14.7893 13.2274 15.0998 13.0077 15.3627 12.7388L15.363 12.7387Z" fill="#61DFC6"/>
                </g>
                <defs>
                <clipPath id="clip0_6566_24431">
                <rect width="27" height="21" fill="white" transform="translate(-0.000488281)"/>
                </clipPath>
                </defs>
              </svg>
            </div>
            <div class="text">
              <h3 class="pageTitle">{{ title }}</h3>
              <p class="pageDomain"></p>
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
import { ref } from 'vue'
const props = defineProps(['url', 'title'])
const title = ref(props.title)
const url = ref(props.url)
</script>

<style scoped>
.playDiv{
  background: #f6f6f7;
  border-color: #f6f6f7;
  border-radius: 6px;
  height: 77px;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
}

:root.dark .playDiv{
  background: #313136;
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

.text{
  position: relative;
}
.pageTitle{
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical; 
  overflow: hidden;
  margin-top: 0px;
  padding-right: 20px;
  word-break: break-all;
}

.pageDomain{
  position: absolute;
  margin-top: 0px;
  margin-bottom: 5px;
  font-size: 14px;
  color: var(--vp-c-text-2);
  bottom: -8px;
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
  border: 1.5px solid #f6f6f7;
  border-radius: 8px;
  padding: 11px 16px 13px;
  width: 100%;
  height: 100%;
  transition: border-color 0.2s;
}

:root.dark .pager-link {
  border: 1.5px solid #313136;
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

</style>
