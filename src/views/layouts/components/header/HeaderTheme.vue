<template>
  <m-pop-over class="">
    <template #reference>
      <m-svg-icon
        :name="svgIconName"
        fillClass="fill-zinc-900 dark:fill-zinc-300"
        class="guide-theme w-4 h-4 p-1 cursor-pointer rounded-sm duration-200 outline-none hover:bg-zinc-100/60 dark:hover:bg-zinc-900"
      ></m-svg-icon>
    </template>
    <div class="w-[140px] overflow-hidden">
      <div
        class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-800"
        v-for="item in themeArr"
        :key="item.id"
        @click="onItemClick(item)"
      >
        <m-svg-icon
          :name="item.icon"
          class="w-1.5 h-1.5 mr-1"
          fillClass="fill-zinc-900 dark:fill-zinc-300"
        ></m-svg-icon>
        <span class="text-zinc-800 text-sm dark:text-zinc-300">{{ item.name }}</span>
      </div>
    </div>
  </m-pop-over>
</template>
<script setup>
import { THEME_SYSTEM, THEME_LIGHT, THEME_DARK } from '@/constants/index.js'
import { computed } from 'vue'
import { useStore } from 'vuex';
// 建構渲染數據源
const themeArr = [
  {
    id: '0',
    type: THEME_LIGHT,
    icon: 'theme-light',
    name: '極簡白'
  },
  {
    id: '1',
    type: THEME_DARK,
    icon: 'theme-dark',
    name: '極簡黑'
  },
  {
    id: '2',
    type: THEME_SYSTEM,
    icon: 'theme-system',
    name: '跟隨系統'
  }
]
const store = useStore()
// computed
const svgIconName = computed(() => {
  // 依據當前的 themeType，返回當前選中的 icon
  const findTheme = themeArr.find(theme => theme.type === store.getters.themeType)
  return findTheme.icon
})
// methods
/** 主題切換 */
const onItemClick = (theme) => {
  store.commit('theme/changeThemeType', theme.type)
}
</script>
<style lang="scss" scoped>
</style>