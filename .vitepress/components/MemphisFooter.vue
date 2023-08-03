<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import { normalizeLink } from 'vitepress/dist/client/theme-default/support/utils'
import { useEditLink } from 'vitepress/dist/client/theme-default/composables/edit-link'
import { usePrevNext } from 'vitepress/dist/client/theme-default/composables/prev-next'
import VPIconEdit from 'vitepress/dist/client/theme-default/components/icons/VPIconEdit.vue'
import VPLink from 'vitepress/dist/client/theme-default/components/VPLink.vue'
import VPDocFooterLastUpdated from 'vitepress/dist/client/theme-default/components/VPDocFooterLastUpdated.vue'

const { theme, page, frontmatter } = useData()

const editLink = useEditLink()
const control = usePrevNext()

const hasEditLink = computed(() => {
  return theme.value.editLink && frontmatter.value.editLink !== false
})
const hasLastUpdated = computed(() => {
  return page.value.lastUpdated && frontmatter.value.lastUpdated !== false
})
const showFooter = computed(() => {
  return hasEditLink.value || hasLastUpdated.value || control.value.prev || control.value.next
})
</script>

<template>
  <footer v-if="showFooter" class="VPDocFooter">
    <slot name="doc-footer-before" />

    <div v-if="hasEditLink || hasLastUpdated" class="edit-info">
      <div v-if="hasEditLink" class="edit-link">
        <VPLink class="edit-link-button" :href="editLink.url" :no-icon="true">
          <svg class="edit-icon" width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.99996 14.6667H5.33329C3.1334 14.6667 2.03346 14.6667 1.35004 13.9833C0.666626 13.2998 0.666626 12.1999 0.666626 10V6.66667C0.666626 4.46678 0.666626 3.36683 1.35004 2.68342C2.03346 2 3.1334 2 5.33329 2H7.33329C9.53318 2 10.6331 2 11.3165 2.68342C12 3.36683 12 4.46678 12 6.66667V7.33333" stroke="#9D9FA6" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M8.89848 14.5705L8.79393 14.0815L8.89848 14.5705ZM8.09619 13.7682L8.58513 13.8727L8.09619 13.7682ZM8.68045 12.0745L8.3269 11.7209L8.68045 12.0745ZM10.5922 13.9862L10.2386 13.6326L10.5922 13.9862ZM13.1975 10.3182L13.6305 10.0682V10.0682L13.1975 10.3182ZM12.7974 11.781L13.151 12.1345L12.7974 11.781ZM13.1975 11.332L13.6305 11.582V11.582L13.1975 11.332ZM12.3485 9.46914L12.5985 9.03613L12.3485 9.46914ZM10.8857 9.86923L11.2392 10.2228L10.8857 9.86923ZM11.3346 9.46914L11.0846 9.03613L11.3346 9.46914ZM12.4439 11.4274L10.2386 13.6326L10.9457 14.3398L13.151 12.1345L12.4439 11.4274ZM9.034 12.428L11.2392 10.2228L10.5321 9.51568L8.3269 11.7209L9.034 12.428ZM8.79393 14.0815C8.67697 14.1065 8.58352 14.1265 8.50321 14.1414C8.42217 14.1565 8.36906 14.1636 8.33304 14.1659C8.29606 14.1682 8.29862 14.1638 8.32169 14.1698C8.35307 14.1779 8.39576 14.1981 8.43215 14.2345L7.72504 14.9416C7.9409 15.1575 8.21054 15.1757 8.39651 15.1639C8.57351 15.1526 8.78927 15.1051 9.00303 15.0594L8.79393 14.0815ZM7.60724 13.6636C7.56153 13.8774 7.51405 14.0931 7.50279 14.2701C7.49096 14.4561 7.50919 14.7257 7.72504 14.9416L8.43215 14.2345C8.46854 14.2709 8.48876 14.3136 8.49686 14.345C8.50281 14.368 8.49842 14.3706 8.50077 14.3336C8.50307 14.2976 8.51019 14.2445 8.52525 14.1634C8.54018 14.0831 8.56012 13.9897 8.58513 13.8727L7.60724 13.6636ZM12.4439 10.2228C12.6889 10.4678 12.739 10.524 12.7645 10.5682L13.6305 10.0682C13.5226 9.8812 13.3504 9.71515 13.151 9.51568L12.4439 10.2228ZM13.151 12.1345C13.3504 11.9351 13.5226 11.769 13.6305 11.582L12.7645 11.082C12.739 11.1262 12.6889 11.1824 12.4439 11.4274L13.151 12.1345ZM12.7645 10.5682C12.8563 10.7272 12.8563 10.923 12.7645 11.082L13.6305 11.582C13.9009 11.1136 13.9009 10.5366 13.6305 10.0682L12.7645 10.5682ZM13.151 9.51568C12.9515 9.31621 12.7854 9.14408 12.5985 9.03613L12.0985 9.90216C12.1427 9.92768 12.1989 9.97779 12.4439 10.2228L13.151 9.51568ZM11.2392 10.2228C11.4842 9.97779 11.5404 9.92768 11.5846 9.90216L11.0846 9.03613C10.8976 9.14408 10.7316 9.31621 10.5321 9.51568L11.2392 10.2228ZM12.5985 9.03613C12.1301 8.76571 11.553 8.76571 11.0846 9.03613L11.5846 9.90216C11.7436 9.81037 11.9395 9.81037 12.0985 9.90216L12.5985 9.03613ZM10.2386 13.6326C10.1083 13.763 9.93016 13.8473 9.67702 13.9119C9.55022 13.9443 9.41495 13.9693 9.2642 13.9954C9.11935 14.0204 8.95351 14.0474 8.79393 14.0815L9.00303 15.0594C9.13756 15.0306 9.27542 15.0082 9.43445 14.9808C9.58758 14.9543 9.75637 14.9237 9.92439 14.8808C10.2609 14.7949 10.6355 14.65 10.9457 14.3398L10.2386 13.6326ZM8.58513 13.8727C8.61926 13.7131 8.64626 13.5473 8.67129 13.4024C8.69733 13.2517 8.72236 13.1164 8.75473 12.9896C8.81936 12.7365 8.90365 12.5584 9.034 12.428L8.3269 11.7209C8.01669 12.0311 7.87173 12.4057 7.78581 12.7423C7.74291 12.9103 7.71234 13.0791 7.68589 13.2322C7.65841 13.3912 7.63601 13.5291 7.60724 13.6636L8.58513 13.8727Z" fill="#9D9FA6"/>
            <path d="M9.66667 1.33331V2.66665M6.33333 1.33331V2.66665M3 1.33331V2.66665" stroke="#9D9FA6" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M3.66663 10H6.33329M3.66663 6.66669H8.99996" stroke="#9D9FA6" stroke-linecap="round"/>
          </svg>

          {{ editLink.text }} 
        </VPLink>
      </div>

      <div v-if="hasLastUpdated" class="last-updated">
        <VPDocFooterLastUpdated />
      </div>
    </div>

    <nav v-if="control.prev?.link || control.next?.link" class="prev-next">
      <div class="pager">
        <svg class="arrow" width="12.965mm" height="12.965mm" version="1.1" viewBox="0 0 12.965 12.965" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><g transform="translate(-64.655 -108.23)" fill="none"><g transform="matrix(.26458 0 0 .26458 68.757 112.59)"><path d="m8.7699 2.6926-3.9613 3.915 11.821 0.054c0.1808 6.8e-4 0.3598 0.03701 0.5266 0.10693s0.3182 0.17205 0.4455 0.30055 0.2281 0.28084 0.2964 0.44831c0.0684 0.16746 0.103 0.34676 0.102 0.52764-8e-4 0.18077-0.0373 0.3596-0.1073 0.52627-0.07 0.16668-0.1721 0.31792-0.3006 0.44509-0.1285 0.12716-0.2808 0.22776-0.4482 0.29604-0.1673 0.06828-0.3465 0.1029-0.5273 0.10189l-11.818-0.05272 3.9086 3.9548c0.12739 0.1283 0.22825 0.2804 0.29682 0.4477 0.06856 0.1673 0.10349 0.3464 0.10277 0.5272s-0.03706 0.3597-0.10695 0.5264-0.17195 0.318-0.30036 0.4453c-0.25961 0.2569-0.61057 0.4002-0.97579 0.3985s-0.71484-0.1482-0.97207-0.4075l-6.4286-6.4916c-0.21021-0.21364-0.32695-0.50203-0.32454-0.80173 0.0024111-0.29971 0.12377-0.58619 0.33739-0.79641l6.4967-6.4286c0.2594-0.2568 0.61014-0.40011 0.97515-0.39842s0.71442 0.14823 0.97143 0.40742c0.12735 0.12846 0.22814 0.28076 0.29661 0.4482s0.10328 0.34671 0.10245 0.5276c-8.4e-4 0.18089-0.0373 0.35984-0.10732 0.52663s-0.17221 0.31815-0.30074 0.44543z" clip-rule="evenodd" fill="#6557ff" fill-rule="evenodd"/></g><g transform="matrix(.26458 0 0 .26458 64.655 108.23)"><circle cx="24.5" cy="24.5" r="24.2" fill="#6557ff" fill-opacity=".1" stroke="#6557ff" stroke-width=".6"/></g></g></svg>
        <a v-if="control.prev?.link" class="pager-link prev" :href="normalizeLink(control.prev.link)">
          <span class="desc" v-html="theme.docFooter?.prev || 'Previous page'"></span>
          <span class="title" v-html="control.prev.text"></span>
        </a>
      </div>
      <div class="pager">
        <a v-if="control.next?.link" class="pager-link next" :href="normalizeLink(control.next.link)">
          <span class="desc" v-html="theme.docFooter?.next || 'Next page'"></span>
          <span class="title" v-html="control.next.text"></span>
        </a>
        <svg class="arrow" width="12.965mm" height="12.965mm" version="1.1" viewBox="0 0 12.965 12.965" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><g transform="translate(-64.655 -108.23)" fill="none"><g transform="matrix(-.26458 0 0 .26458 73.519 112.59)"><path d="m8.7699 2.6926-3.9613 3.915 11.821 0.054c0.1808 6.8e-4 0.3598 0.03701 0.5266 0.10693s0.3182 0.17205 0.4455 0.30055 0.2281 0.28084 0.2964 0.44831c0.0684 0.16746 0.103 0.34676 0.102 0.52764-8e-4 0.18077-0.0373 0.3596-0.1073 0.52627-0.07 0.16668-0.1721 0.31792-0.3006 0.44509-0.1285 0.12716-0.2808 0.22776-0.4482 0.29604-0.1673 0.06828-0.3465 0.1029-0.5273 0.10189l-11.818-0.05272 3.9086 3.9548c0.12739 0.1283 0.22825 0.2804 0.29682 0.4477 0.06856 0.1673 0.10349 0.3464 0.10277 0.5272s-0.03706 0.3597-0.10695 0.5264-0.17195 0.318-0.30036 0.4453c-0.25961 0.2569-0.61057 0.4002-0.97579 0.3985s-0.71484-0.1482-0.97207-0.4075l-6.4286-6.4916c-0.21021-0.21364-0.32695-0.50203-0.32454-0.80173 0.0024111-0.29971 0.12377-0.58619 0.33739-0.79641l6.4967-6.4286c0.2594-0.2568 0.61014-0.40011 0.97515-0.39842s0.71442 0.14823 0.97143 0.40742c0.12735 0.12846 0.22814 0.28076 0.29661 0.4482s0.10328 0.34671 0.10245 0.5276c-8.4e-4 0.18089-0.0373 0.35984-0.10732 0.52663s-0.17221 0.31815-0.30074 0.44543z" clip-rule="evenodd" fill="#6557ff" fill-rule="evenodd"/></g><g transform="matrix(-.26458 0 0 .26458 77.62 108.23)"><circle cx="24.5" cy="24.5" r="24.2" fill="#6557ff" fill-opacity=".1" stroke="#6557ff" stroke-width=".6"/></g></g></svg>
      </div>
    </nav>
  </footer>
</template>

<style scoped>
.edit-icon{
  margin-right: 10px;
}

.edit-icon path {
  transition: stroke 0.25s;
}
.arrow{
  fill: var(--vp-c-text-1);
  stroke: var(--vp-c-text-1);
}

.arrow path{
  fill: var(--vp-c-text-1);
  stroke: var(--vp-c-text-1);
}

.arrow circle{
  fill: transparent;
  stroke: #434347;  
  stroke-width: 1px;
}

.pager:hover{
  .arrow path{
    fill: var(--vp-c-brand);
    stroke: var(--vp-c-brand);  
    transition: fill 0.25s, stroke 0.25s;
  }

  .arrow circle{
    fill: var(--vp-c-brand);
    stroke: var(--vp-c-brand);
    transition: fill 0.25s, stroke 0.25s;
  }
}
.VPDocFooter {
  margin-top: 64px;
}

.edit-info {
  padding-bottom: 18px;
}

@media (min-width: 640px) {
  .edit-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 14px;
  }
}

.edit-link-button {
  display: flex;
  align-items: center;
  border: 0;
  line-height: 32px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-brand);
  transition: color 0.25s;
}

.edit-link-button:hover {
  color: var(--vp-c-brand-dark);

  .edit-icon path {
    stroke: var(--vp-c-brand);
  }
}

.edit-link-icon {
  margin-right: 8px;
  width: 14px;
  height: 14px;
  fill: currentColor;
}

.prev-next {
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 24px;
  display: grid;
  grid-row-gap: 8px;
}

@media (min-width: 640px) {
  .prev-next {
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 16px;
  }
}
.pager{
  display: flex;
  position: relative;
}

.pager-link {
  display: block;
  border-radius: 8px;
  padding-left: 12px;
  padding-right: 12px;
  padding-top: 4px;
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