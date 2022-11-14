<template>
  <m-pop-over class="flex items-center" placement="bottom-left">
    <template #reference>
      <div
        class="guide-my relative flex items-center p-0.5 rounded-sm cursor-pointer duration-200 outline-none hover:bg-zinc-100"
      >
        <!-- 頭像 -->
        <img 
          src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic_source%2F0c%2Fef%2Fa0%2F0cefa0f17b83255217eddc20b15395f9.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1651074011&t=ba5d64079381425813e4c269bcac1a1b"
          class="this w-3 h-3 rounded-sm">
        <!-- 下箭頭 -->
        <m-svg-icon
          name="down-arrow"
          class="w-1.5 h-1.5 ml-0.5"
          fillClass="fill-zinc-900"
        ></m-svg-icon>
        <!-- vip 標記 -->
        <m-svg-icon
          name="vip"
          class="w-1.5 h-1.5 absolute right-[16px] bottom-0"
        ></m-svg-icon>
      </div>
    </template>
    <div class="w-[140px] overflow-hidden">
      <div
        class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60"
        v-for="item in menuArr"
        :key="item.id"
      >
        <m-svg-icon
          :name="item.icon"
          class="w-1.5 h-1.5 mr-1"
          fillClass="fill-zinc-900"
        ></m-svg-icon>
        <span class="text-zinc-800 text-sm">{{item.title}}</span>
      </div>
    </div>
  </m-pop-over>
</template>
<script setup>
// 建構 menu 數據源
const menuArr = [
  {
    id: 0,
    title: '個人資料',
    icon: 'profile',
    path: '/profile'
  },
  {
    id: 1,
    title: '升級 VIP',
    icon: 'vip-profile',
    path: '/member'
  },
  {
    id: 2,
    title: '退出登入',
    icon: 'logout',
    path: ''
  }
]

</script>
