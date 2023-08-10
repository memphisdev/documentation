<template>
    <div @click="click" class="card">
        <div class="background">
            <img data-type = "cloud" v-if="type == 'Quick Start Cloud'" src="/assets/cloud_quick_start.svg" alt="">
            <img data-type = "source" v-if="type == 'Quick Start Open Source'" src="/assets/open_source_quick_start.svg" alt="">
        </div>
         <div class="card-text">
            <h3>{{ type }}</h3>  
            <div class="arrow-container">
                <div>
                    <p><slot></slot></p>
                </div>
                <svg class="arrow-icon" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="15" cy="15" r="14.5" stroke="#2F2F32"/>
                    <g clip-path="url(#clip0_6931_14198)">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M15.4469 11.4444L17.8722 13.8413L10.635 13.8744C10.5242 13.8748 10.4146 13.8971 10.3125 13.9399C10.2104 13.9827 10.1177 14.0452 10.0397 14.1239C9.9618 14.2025 9.90014 14.2958 9.85829 14.3983C9.81644 14.5009 9.79521 14.6107 9.79584 14.7214C9.79635 14.8321 9.81867 14.9416 9.86153 15.0436C9.90438 15.1456 9.96693 15.2382 10.0456 15.3161C10.1243 15.394 10.2175 15.4555 10.32 15.4974C10.4224 15.5392 10.5322 15.5604 10.6428 15.5597L17.8785 15.5275L15.4855 17.9488C15.4075 18.0273 15.3458 18.1205 15.3038 18.2229C15.2618 18.3253 15.2404 18.435 15.2409 18.5457C15.2413 18.6564 15.2636 18.7659 15.3063 18.8679C15.3491 18.97 15.4116 19.0627 15.4902 19.1406C15.6492 19.2979 15.8641 19.3856 16.0877 19.3846C16.3113 19.3835 16.5253 19.2938 16.6828 19.1351L20.6187 15.1606C20.7474 15.0298 20.8188 14.8533 20.8174 14.6698C20.8159 14.4863 20.7416 14.3109 20.6108 14.1822L16.6332 10.2463C16.4744 10.0891 16.2597 10.0014 16.0362 10.0024C15.8127 10.0034 15.5988 10.0931 15.4414 10.2518C15.3635 10.3305 15.3018 10.4237 15.2598 10.5262C15.2179 10.6287 15.1966 10.7385 15.1971 10.8493C15.1976 10.96 15.2199 11.0696 15.2628 11.1717C15.3057 11.2738 15.3683 11.3665 15.4469 11.4444Z" fill="white"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_6931_14198">
                    <rect width="11.0204" height="11.0204" fill="white" transform="matrix(-1 0 0 1 20.8164 9.18365)"/>
                    </clipPath>
                    </defs>
                </svg>
            </div> 
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, withBase } from 'vitepress'
const router = useRouter()
const props = defineProps(['type'])
const type = ref(props.type)


function click(event){
    if(type.value == 'Quick Start Cloud'){
        router.go(withBase('/docs/getting-started/2-hello-world'))
    }
    else if(type.value == 'Quick Start Open Source'){
        router.go(withBase('/docs/memphis-cloud/getting-started'))
    }
}
</script>

<style scoped>      
    :root.dark .arrow-icon > g > path{
        fill: white;
    }

    :root.dark .arrow-icon > circle {
        stroke: #3e3e42;
    }

    .arrow-icon > g > path{
        fill: hsla(240, 4%, 22%, 1);
    }

    .arrow-icon > circle {
        stroke: hsla(240, 4%, 90%, 1);
    }

    .card:hover{
        .arrow-icon > circle,
        .arrow-icon > rect{
            stroke: var(--vp-c-brand);
        }
        .arrow-icon > g > path {
            fill: var(--vp-c-brand);
        }
        cursor: pointer;
    }

    img{
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
    }

    .background > img[data-type="cloud"]{
        background: linear-gradient(94.46deg, rgba(78, 205, 196, 0.08) 0%, rgba(101, 87, 255, 0.08) 100%);
    }

    .background > img[data-type="source"]{
        background: linear-gradient(94.46deg, rgba(255, 198, 51, 0.08) 0%, rgba(101, 87, 255, 0.08) 100%);
    }

    .card{  
        background-color: #f6f6f7;
        border-radius: 8px;
        width: 569px;
        height: 305px;  
        position: relative;
    }

    .arrow-container{
        display: flex;
        flex-direction: row;
    }

    .arrow-icon{
        position: absolute;
        bottom: 0.3rem;
        right: 10px;
        margin-left: 5px;
    }

    .icon{
        position: absolute;
        top: 20px;
        left: 30px;
    }

    :root.dark .card {
        background-color: rgba(37, 37, 41, 1);
    }

    .card-text {
        position: absolute;
        padding-left: 2rem;
        padding-right: 1rem;
        background-color: #f6f6f7;  
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
    }

    :root.dark .card-text{
        background-color: #252529;
    }

    .card-text > h3{
        font-size: 20px;
        font-weight: 600;
        padding-top: 20px;
        padding-bottom: 10px;
    }

    .card-text > div > div{
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical; 
        overflow: hidden;
        width: 500px;
        height: 50px;
        margin-right: 20px;
    }

</style>