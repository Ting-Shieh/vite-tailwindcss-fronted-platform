<template>
  <div class="group relative p-0.5 rounded-xl border-white duration-500 hover:bg-red-100/40">
    <div class="">
      <!-- 搜尋圖標 -->
      <m-svg-icon class="w-1.5 h-1.5 absolute translate-y-[-50%] top-[50%] left-2" name="search" color="#707070"></m-svg-icon>
      <!-- 輸入框 -->
      <input
        placeholder="搜索"
        type="text"
        class="block bg-zinc-100 caret-zinc-400 rounded-xl w-full h-[44px] pl-4 text-sm outline-0 tracking-wide font-semibold border border-zinc-100 duration-500 group-hover:bg-white group-hover:border-zinc-200 focus:border-red-300"
      />
      <!-- 刪除按鈕 -->
      <m-svg-icon
        name="input-delete"
        class="w-1.5 h-1.5 this absolute translate-y-[-50%] top-[50%] right-9 duration-500 cursor-pointer"
      ></m-svg-icon>
      <!-- 分割線 -->
      <div
        class="opacity h-1.5 w-[1px] absolute translate-y-[-50%] top-[50%] right-[62px] duration-500 bg-zinc-200 group-hover:opacity-100"
      ></div>
      <!-- TODO: 搜尋按鈕（通用組建） -->
      <m-button class="absolute translate-y-[-50%] top-[50%] right-1" icon="search" iconColor="#fff"></m-button>
    </div>
    <!-- 下拉區 -->
    <transition name="slider">
      <div
        class="max-h-[368px] w-full text-base overflow-auto bg-white absolute left-0 top-[56px] p-2 rounded z-20 border border-zinc-200 duration-200 hover:shadow-3xl"
      > 
        <slot name="dropdown" />
      </div>
    </transition>
  </div>
</template>
<script setup></script>
<style lang="scss" scoped>
.slider-enter-active,
.slider-leave-active {
  transition: all 0.5s;
}
.slider-enter-from,
.slider-leave-to {
  transform: translateY(40px);
  opacity: 0;
}
</style>