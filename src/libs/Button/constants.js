export const EMITS_CLICK = 'click'
// type 可選項：表示按鈕風格
export const typeEnum = {
  primary: 'text-white bg-zinc-800 hover:bg-zinc-900 active:bg-zinc-800 ',
  // 主色
  main: 'text-white bg-main hover:bg-hover-main active:bg-main ',
  info: 'text-zinc-800 bg-zinc-200 hover:bg-zinc-300 active:bg-zinc-200 '
}

// size 可選項：表示按鈕大小。區分文字按鈕和icon按鈕
export const sizeEnum = {
  // 文字按鈕默認
  default: {
    button: 'w-8 h-4 text-base',
    icon: ''
  },
  // icon按鈕默認
  ['icon-default']: {
    button: 'w-8 h-4',
    icon: 'w-1.5 h-1.5'
  },
  small: {
    button: 'w-7 h-3 text-base',
    icon: ''
  },
  ['icon-small']: {
    button: 'w-7 h-3',
    icon: 'w-1.5 h-1.5'
  }
}
