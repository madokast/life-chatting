import { useState, useEffect } from 'react'
import { Posts } from './components/diary/Posts'
import { Header } from './components/navigation/Header'
import { Drawer } from './components/navigation/Drawer'
import { i18n } from './i18n/i18n'
import { userConfig, Appearance } from './config/UserConfig'

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
        <Posts appearance={appearance} />
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
