<template>
  <a class="card" :href="link" :target="link_target">
    <svg
      v-if="type == 'Architecture'"
      class="icon"
      width="47"
      height="47"
      viewBox="0 0 47 47"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle opacity="0.15" cx="23.5" cy="23.5" r="23.5" fill="#6557FF" />
      <path
        d="M32 18C32 15.832 28.337 14 24 14C19.663 14 16 15.832 16 18V20C16 22.168 19.663 24 24 24C28.337 24 32 22.168 32 20V18ZM24 31C19.663 31 16 29.168 16 27V30C16 32.168 19.663 34 24 34C28.337 34 32 32.168 32 30V27C32 29.168 28.337 31 24 31Z"
        fill="#6557FF"
        fill-opacity="0.4"
      />
      <path
        d="M32 22C32 24.168 28.337 26 24 26C19.663 26 16 24.168 16 22V25C16 27.168 19.663 29 24 29C28.337 29 32 27.168 32 25V22Z"
        fill="#6557FF"
      />
    </svg>
    <svg
      class="icon"
      v-if="type == 'API and SDKs'"
      width="47"
      height="47"
      viewBox="0 0 47 47"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle opacity="0.15" cx="23.5" cy="23.5" r="23.5" fill="#6557FF" />
      <g clip-path="url(#clip0_6931_14204)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M33.6385 20.122C34.1206 20.6041 34.1206 21.3855 33.6385 21.8676L30.3469 25.1592C29.8648 25.6413 29.0834 25.6413 28.6013 25.1592C28.1192 24.6772 28.1192 23.8957 28.6013 23.4137L31.893 20.122C32.375 19.6399 33.1565 19.6399 33.6385 20.122Z"
          fill="#6557FF"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M22.9399 16.0074C22.7084 15.7758 22.3945 15.6458 22.0671 15.6458C21.7397 15.6458 21.4257 15.7758 21.1943 16.0074L18.7255 18.4762C17.9027 19.2991 16.973 20.9892 16.6806 22.9186C16.425 24.6057 16.6467 26.5682 17.9215 28.3329L14.6115 31.6428C14.1295 32.1249 14.1295 32.9063 14.6115 33.3884C15.0936 33.8705 15.8752 33.8705 16.3572 33.3884L19.6672 30.0784C21.4318 31.3528 23.3939 31.5744 25.0808 31.3188C27.0102 31.0265 28.7004 30.0967 29.5233 29.2738L31.9919 26.8051C32.474 26.323 32.474 25.5416 31.9919 25.0595L22.9399 16.0074Z"
          fill="#6557FF"
          fill-opacity="0.4"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M27.8778 14.3615C28.3599 14.8437 28.3599 15.6251 27.8778 16.1072L24.5862 19.3988C24.1042 19.8809 23.3226 19.8809 22.8405 19.3988C22.3585 18.9168 22.3585 18.1353 22.8405 17.6533L26.1322 14.3615C26.6143 13.8795 27.3958 13.8795 27.8778 14.3615Z"
          fill="#6557FF"
        />
      </g>
      <defs>
        <clipPath id="clip0_6931_14204">
          <rect
            width="24"
            height="24"
            fill="white"
            transform="translate(12 12)"
          />
        </clipPath>
      </defs>
    </svg>
    <svg
      v-if="type == 'Key Concepts'"
      class="icon"
      width="47"
      height="47"
      viewBox="0 0 47 47"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle opacity="0.15" cx="23.5" cy="23.5" r="23.5" fill="#6557FF" />
      <path
        d="M24 17.5515C22.7764 16.7395 21.3097 16.2656 19.7344 16.2656C15.4696 16.2656 12 19.7352 12 23.9999C12 28.2647 15.4696 31.7343 19.7344 31.7343C21.3097 31.7343 22.7764 31.2605 24 30.4483C21.9112 29.062 21.9112 18.9379 24 17.5515Z"
        fill="#6557FF"
        fill-opacity="0.4"
      />
      <path
        d="M28.2656 16.2656C26.6902 16.2656 25.2236 16.7394 24 17.5515C26.0888 18.9379 26.0888 29.0621 24 30.4484C25.2236 31.2605 26.6902 31.7344 28.2656 31.7344C32.5304 31.7344 36 28.2647 36 24C36 19.7353 32.5303 16.2656 28.2656 16.2656Z"
        fill="#6557FF"
        fill-opacity="0.4"
      />
      <path
        d="M27.0352 24.0001L27.4371 23.2965C27.3933 22.8136 27.305 22.3434 27.1763 21.8899L26.4727 21.1872L26.6222 20.4839C26.0132 19.2962 25.106 18.2856 24.0001 17.5515C22.894 18.2856 21.9867 19.2962 21.3778 20.484L21.9089 21.178L20.8238 21.8901C20.695 22.3435 20.6067 22.8138 20.563 23.2968L21.0235 24L20.563 24.7032C20.6067 25.1861 20.6951 25.6564 20.8238 26.1099L21.5626 26.8202L21.3779 27.5162C21.9868 28.7039 22.8941 29.7144 24.0001 30.4484C25.106 29.7144 26.0133 28.7037 26.6222 27.5159L26.4532 26.8127L27.1762 26.11C27.305 25.6565 27.3933 25.1862 27.4371 24.7032L27.0352 24.0001Z"
        fill="#6557FF"
      />
      <path
        d="M27.4371 23.2965C27.3933 22.8136 27.305 22.3434 27.1762 21.8899L26.4727 21.1872L26.6221 20.4839C26.0132 19.2962 25.1059 18.2856 24 17.5515V30.4484C25.106 29.7143 26.0133 28.7036 26.6222 27.5159L26.4531 26.8127L27.1762 26.1099C27.3049 25.6564 27.3933 25.1861 27.437 24.7031L27.0351 24.0001L27.4371 23.2965Z"
        fill="#6557FF"
      />
      <path
        d="M20.8247 21.8903H27.1757C27.0365 21.4002 26.8507 20.9296 26.6223 20.4841H21.3782C21.1498 20.9296 20.9639 21.4002 20.8247 21.8903Z"
        fill="#6557FF"
      />
      <path
        d="M27.1755 21.8903C27.0362 21.4002 26.8504 20.9296 26.622 20.4841H24V21.8903H27.1755Z"
        fill="#6557FF"
      />
      <path
        d="M20.5312 23.9999C20.5312 24.237 20.5425 24.4714 20.5635 24.7031H27.4366C27.4576 24.4714 27.4688 24.237 27.4688 23.9999C27.4688 23.7629 27.4575 23.5285 27.4366 23.2968H20.5635C20.5425 23.5285 20.5312 23.7629 20.5312 23.9999Z"
        fill="#6557FF"
      />
      <path
        d="M27.4365 24.7031C27.4575 24.4714 27.4688 24.237 27.4688 23.9999C27.4688 23.7629 27.4575 23.5285 27.4365 23.2968H24V24.7031H27.4365Z"
        fill="#6557FF"
      />
      <path
        d="M21.3782 27.5159H26.6223C26.8507 27.0704 27.0365 26.5997 27.1758 26.1096H20.8247C20.9639 26.5997 21.1498 27.0704 21.3782 27.5159Z"
        fill="#6557FF"
      />
      <path
        d="M26.622 27.5159C26.8505 27.0704 27.0363 26.5997 27.1755 26.1096H24V27.5159H26.622Z"
        fill="#6557FF"
      />
    </svg>

    <div class="card-text">
      <h3>{{ type }}</h3>
      <div class="arrow-container">
        <div>
          <p><slot></slot></p>
        </div>
        <svg
          class="arrow-icon"
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="15" cy="15" r="14.5" stroke="#2F2F32" />
          <g clip-path="url(#clip0_6931_14198)">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M15.4469 11.4444L17.8722 13.8413L10.635 13.8744C10.5242 13.8748 10.4146 13.8971 10.3125 13.9399C10.2104 13.9827 10.1177 14.0452 10.0397 14.1239C9.9618 14.2025 9.90014 14.2958 9.85829 14.3983C9.81644 14.5009 9.79521 14.6107 9.79584 14.7214C9.79635 14.8321 9.81867 14.9416 9.86153 15.0436C9.90438 15.1456 9.96693 15.2382 10.0456 15.3161C10.1243 15.394 10.2175 15.4555 10.32 15.4974C10.4224 15.5392 10.5322 15.5604 10.6428 15.5597L17.8785 15.5275L15.4855 17.9488C15.4075 18.0273 15.3458 18.1205 15.3038 18.2229C15.2618 18.3253 15.2404 18.435 15.2409 18.5457C15.2413 18.6564 15.2636 18.7659 15.3063 18.8679C15.3491 18.97 15.4116 19.0627 15.4902 19.1406C15.6492 19.2979 15.8641 19.3856 16.0877 19.3846C16.3113 19.3835 16.5253 19.2938 16.6828 19.1351L20.6187 15.1606C20.7474 15.0298 20.8188 14.8533 20.8174 14.6698C20.8159 14.4863 20.7416 14.3109 20.6108 14.1822L16.6332 10.2463C16.4744 10.0891 16.2597 10.0014 16.0362 10.0024C15.8127 10.0034 15.5988 10.0931 15.4414 10.2518C15.3635 10.3305 15.3018 10.4237 15.2598 10.5262C15.2179 10.6287 15.1966 10.7385 15.1971 10.8493C15.1976 10.96 15.2199 11.0696 15.2628 11.1717C15.3057 11.2738 15.3683 11.3665 15.4469 11.4444Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_6931_14198">
              <rect
                width="11.0204"
                height="11.0204"
                fill="white"
                transform="matrix(-1 0 0 1 20.8164 9.18365)"
              />
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>
  </a>
</template>

<script setup>
import { ref } from "vue";
import { withBase } from "vitepress";
const props = defineProps(["type"]);
const type = ref(props.type);
const link = ref("");
const link_target = ref("_self");

if (type.value == "Architecture") {
  link.value = withBase("/docs/memphis/architecture");
} else if (type.value == "API and SDKs") {
  link.value = withBase("/sdk/welcome.html");
} else if (type.value == "Key Concepts") {
  link.value = withBase("/docs/memphis/concepts/");
}
</script>

<style scoped>
:root.dark .arrow-icon > g > path {
  fill: white;
}

:root.dark .arrow-icon > circle {
  stroke: #3e3e42;
}

.arrow-icon > g > path {
  fill: hsla(240, 4%, 22%, 1);
  transition: fill 0.2s ease-in-out;
}

.arrow-icon > circle {
  stroke: hsla(240, 4%, 90%, 1);  
  transition: stroke 0.2s ease-in-out;
}
.card:hover {
  .arrow-icon > circle,
  .arrow-icon > rect {
    stroke: var(--vp-c-brand);
  }
  .arrow-icon > g > path {
    fill: var(--vp-c-brand);
  }
  cursor: pointer;  
}
.card {
  background-color: #f6f6f7;
  border-radius: 8px;
  width: 369px;
  height: 190px;
  position: relative;
}

.arrow-container {
  display: flex;
  flex-direction: row;
}

.arrow-icon {
  position: absolute;
  bottom: 0.3rem;
  right: 10px;
  margin-left: 5px;
}

.icon {
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
  margin-top: 18%;
}

:root.dark .card-text {
  background-color: #252529;
}

.card-text > h3 {
  font-size: 20px;
  font-weight: 600;
  padding-top: 10px;
  padding-bottom: 10px;
  color: var(--vp-c-text-1);
}

.card-text > div > div {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  width: 295px;
  height: 50px;
  margin-right: 25px;
}


</style>
