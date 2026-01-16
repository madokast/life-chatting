import { useState, useEffect } from 'react'
import { Post } from './components/Post'
import { Header } from './components/Header'
import { Drawer } from './components/Drawer'
import { i18n } from './i18n/i18n'
import { userConfig, Appearance } from './config/UserConfig'

interface PostData {
  idx: number
  created_at: number
  content: string
}

const samplePosts: PostData[] = [
  {
    idx: 1,
    created_at: 1735713316,
    content: '今天天气真好，阳光明媚。决定出去走走，感受大自然的美好。'
  },
  {
    idx: 2,
    created_at: 1735783845,
    content: '开始学习 React 和 TypeScript，感觉收获很大。今天完成了一个小项目，很有成就感。'
  },
  {
    idx: 3,
    created_at: 1735908322,
    content: '和朋友一起去看电影，是一部非常感人的剧情片。看完后我们聊了很久，关于人生、关于梦想。'
  },
  {
    idx: 4,
    created_at: 1736011210,
    content: '今天整理了房间，发现了很多旧照片。回忆涌上心头，那些美好的时光仿佛就在昨天。'
  },
  {
    idx: 5,
    created_at: 1736088033,
    content: '尝试做了一道新菜，味道还不错！准备下次再改进一下配方，希望能做得更好。'
  }
]

function App() {
  const [appearance, setAppearance] = useState<Appearance>(userConfig.getAppearance())
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [, forceUpdate] = useState({})

  useEffect(() => {
    i18n.setLanguage(userConfig.getLanguage())
    
    const unsubscribeConfig = userConfig.subscribe(() => {
      setAppearance(userConfig.getAppearance())
      forceUpdate({})
    })
    
    const unsubscribeI18n = i18n.subscribe(() => {
      forceUpdate({})
    })
    
    return () => {
      unsubscribeConfig()
      unsubscribeI18n()
    }
  }, [])

  const toggleDrawer = () => {
    setIsDrawerOpen(prev => !prev)
  }

  return (
    <div className="app-container" style={{ backgroundColor: appearance === 'light' ? '#f5f5f5' : '#0d0d0d' }}>
      <Header 
        onMenuClick={toggleDrawer}
        title={i18n.t('app.title')}
        appearance={appearance}
      />

      <main className="main-content">
        <div className="posts-container">
          {samplePosts.map(post => (
            <Post
              key={post.idx}
              idx={post.idx}
              created_at={post.created_at}
              content={post.content}
              appearance={appearance}
            />
          ))}
        </div>
      </main>

      <footer className="footer" style={{ backgroundColor: appearance === 'light' ? '#fff' : '#1a1a1a', borderTopColor: appearance === 'light' ? '#e0e0e0' : '#333333' }}>
        <div className="nav-item">
          <span>{i18n.t('nav.diary')}</span>
        </div>
        <div className="nav-item">
          <span>{i18n.t('nav.chat')}</span>
        </div>
        <div className="nav-item">
          <span>{i18n.t('nav.settings')}</span>
        </div>
      </footer>

      <Drawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)}
        appearance={appearance}
      />
    </div>
  )
}

export default App
