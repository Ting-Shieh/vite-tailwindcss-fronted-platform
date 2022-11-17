module.exports = {
  // tailwind 應用範圍
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      // 手動切換黑夜模式
      darkMode: 'class',
      height: {
        // h-header h-main
        header: '72px',
        main: 'calc(100vh - 72px)'
      },
      // 修正 tailwind的基準值，對 tailwind 而言它具備默認的 font-size 大小，
      // 且該大小也是以 rem 作為標準指定的，
      // 但因我們通過的修改了基準 rem 所以該 tailwind 的 fontsize 基準值我们也需要進行改變
      fontSize: {
        // font-size, line-height
        xs: ['0.25rem', '0.35rem'],
        sm: ['0.35rem', '0.45rem'],
        base: ['0.42rem', '0.52rem'],
        lg: ['0.55rem', '0.65rem'],
        xl: ['0.65rem', '0.75rem']
      },
      // 期望漢堡按鈕存在一個横向的陰影效果，在 tailwind 中没有對應的樣式，所以我们需要新增該樣式
      boxShadow: {
        'l-white': '-10px 0 10px white',
        'l-zinc': '-10px 0 10px #18181b' // 設置 dark:shadow-l-zinc 色值
      },
      colors: {
        main: '#f44c58',
        'hover-main': '#f32836'
      }
    },
  },
  plugins: [],
}
