module.exports = {
  // tailwind 應用範圍
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      // 修正 tailwind的基準值，對 tailwind 而言它具備默認的 font-size 大小，
      // 且該大小也是以 rem 作為標準指定的，
      // 但因我們通過的修改了基準 rem 所以該 tailwind 的 fontsize 基準值我们也需要進行改變
      fontSize: {
        xs: ['0.25rem', '0.35rem'],
        sm: ['0.35rem', '0.45rem'],
        base: ['0.45rem', '0.55rem'],
        lg: ['0.55rem', '0.65rem'],
        xl: ['0.65rem', '0.75rem']
      }
    },
  },
  plugins: [],
}
