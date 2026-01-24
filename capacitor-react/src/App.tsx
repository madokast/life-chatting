import { useState } from 'react'
import { Posts } from './components/diary/Posts'
import { Chat } from './components/chat/Chat'
import { Header } from './components/navigation/Header'
import { Footer } from './components/navigation/Footer'
import { Drawer } from './components/navigation/Drawer'
import { i18n } from './i18n/i18n'
import { userConfig } from './config/UserConfig'
import { AppearanceProvider } from './context/ThemeContext'

type View = 'diary' | 'chat'

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [currentView, setCurrentView] = useState<View>('diary')
  const [, forceUpdate] = useState({})

  useState(() => {
    i18n.setLanguage(userConfig.getLanguage())
    
    const unsubscribeI18n = i18n.subscribe(() => {
      forceUpdate({})
    })
    
    return () => {
      unsubscribeI18n()
    }
  })

  const toggleDrawer = () => {
    setIsDrawerOpen(prev => !prev)
  }

  return (
    <AppearanceProvider>
      <div className="app-container">
        <Header 
          onMenuClick={toggleDrawer}
          title={i18n.t('app.title')}
        />

        <main className="main-content">
          <div style={{ display: currentView === 'diary' ? 'block' : 'none' }}>
            <Posts />
          </div>
          <div style={{ display: currentView === 'chat' ? 'block' : 'none' }}>
            <Chat />
          </div>
        </main>

        <Footer
          currentView={currentView}
          onViewChange={setCurrentView}
        />

        <Drawer 
          isOpen={isDrawerOpen} 
          onClose={() => setIsDrawerOpen(false)}
        />
      </div>
    </AppearanceProvider>
  )
}

export default App
