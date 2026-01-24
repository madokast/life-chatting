import { useState, useEffect } from 'react'
import { Posts } from './components/diary/Posts'
import { Chat } from './components/chat/Chat'
import { Header } from './components/navigation/Header'
import { Footer } from './components/navigation/Footer'
import { Drawer } from './components/navigation/Drawer'
import { i18n } from './i18n/i18n'
import { userConfig, Appearance } from './config/UserConfig'

type View = 'diary' | 'chat'

function App() {
  const [appearance, setAppearance] = useState<Appearance>(userConfig.getAppearance())
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [currentView, setCurrentView] = useState<View>('diary')
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
        {currentView === 'diary' ? (
          <Posts appearance={appearance} />
        ) : (
          <Chat appearance={appearance} />
        )}
      </main>

      <Footer
        currentView={currentView}
        onViewChange={setCurrentView}
        appearance={appearance}
      />

      <Drawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)}
        appearance={appearance}
      />
    </div>
  )
}

export default App
