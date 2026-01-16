import { useState } from 'react'
import { Post } from './components/Post'

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
  const [appearance, setAppearance] = useState<'light' | 'dark'>('light')

  const toggleAppearance = () => {
    setAppearance(prev => prev === 'light' ? 'dark' : 'light')
  }

  return (
    <div className="app-container" style={{ backgroundColor: appearance === 'light' ? '#f5f5f5' : '#0d0d0d' }}>
      <header className="header">
        <h1>Life Chatting</h1>
        <button 
          onClick={toggleAppearance}
          style={{
            position: 'absolute',
            right: '1rem',
            top: '50%',
            transform: 'translateY(-50%)',
            padding: '0.5rem 1rem',
            backgroundColor: 'rgba(255,255,255,0.2)',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '0.9rem'
          }}
        >
          {appearance === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </header>

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
          <span>日记</span>
        </div>
        <div className="nav-item">
          <span>聊天</span>
        </div>
        <div className="nav-item">
          <span>设置</span>
        </div>
      </footer>
    </div>
  )
}

export default App
