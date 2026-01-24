export type Language = 'zh' | 'en'

export interface Translations {
  app: {
    title: string
  }
  nav: {
    diary: string
    chat: string
    settings: string
  }
  drawer: {
    postCount: string
    appName: string
    appearance: string
    appearanceLight: string
    appearanceDark: string
    language: string
    languageZh: string
    languageEn: string
  }
  chat: {
    placeholder: string
    send: string
  }
}

export const locales: Record<Language, Translations> = {
  zh: {
    app: {
      title: 'Life Chatting'
    },
    nav: {
      diary: '日记',
      chat: '聊天',
      settings: '设置'
    },
    drawer: {
      postCount: '日记 15 条',
      appName: 'Life Chatting',
      appearance: '显示样式',
      appearanceLight: '浅色',
      appearanceDark: '深色',
      language: '语言',
      languageZh: '中文',
      languageEn: 'En'
    },
    chat: {
      placeholder: '输入消息...',
      send: '发送'
    }
  },
  en: {
    app: {
      title: 'Life Chatting'
    },
    nav: {
      diary: 'Diary',
      chat: 'Chat',
      settings: 'Settings'
    },
    drawer: {
      postCount: 'Diary 15 posts',
      appName: 'Life Chatting',
      appearance: 'Appearance',
      appearanceLight: 'Light',
      appearanceDark: 'Dark',
      language: 'Language',
      languageZh: '中文',
      languageEn: 'En'
    },
    chat: {
      placeholder: 'Type a message...',
      send: 'Send'
    }
  }
}
