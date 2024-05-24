export enum APP_TYPE {
  DY = 'dy',
  XHS = 'xhs',
}

interface Command {
  label: string
  value: string
}

interface Script {
  id: string
  hasExecuted?: boolean
}

export interface App {
  key: string
  name: string
  url: string
  command?: Command[]
  script?: Script
}

export const appConfig = [
  {
    key: 'dy',
    name: '抖音',
    url: 'https://www.douyin.com',
    command: [
      {
        label: '打开',
        value: 'open',
      },
      {
        label: '上一个',
        value: 'previous',
      },
      {
        label: '下一个',
        value: 'next',
      },
      {
        label: '点赞',
        value: 'like',
      },
      {
        label: '评论',
        value: 'comment',
      },
      {
        label: '收藏',
        value: 'collect',
      },
      {
        label: '播放/暂停',
        value: 'play',
      },
      {
        label: '连播',
        value: 'playAuto',
      },
      {
        label: '清屏',
        value: 'clearScreen',
      },
      {
        label: '网页全屏',
        value: 'webFullscreen',
      },
      {
        label: '全屏',
        value: 'fullscreen',
      },
    ],
    script: {
      id: 'Douyin',
      hasExecuted: true
    }
  },
  {
    key: 'zxzj',
    name: '在线之家',
    url: 'https://www.zxzj.pro',
    command: [
      { label: '打开', value: 'open' },
      { label: '播放', value: 'play' },
    ],
    script: {
      id: 'Zxzj',
      hasExecuted: true
    }
  },
  {
    key: 'wyy',
    name: '网易云音乐',
    url: 'https://music.163.com',
    command: [
      { label: '打开', value: 'open' },
      { label: '播放', value: 'play' },
    ],
  },
  {
    key: 'xhs',
    name: '小红书',
    url: 'https://www.xiaohongshu.com',
  },
  {
    key: 'wb',
    name: '微博',
    url: 'https://m.weibo.cn',
  },
  {
    key: 'yt',
    name: 'youtube',
    url: 'https://www.youtube.com',
    command: [
      { label: '打开', value: 'open' },
      { label: '播放', value: 'play' },
    ],
  }
]
