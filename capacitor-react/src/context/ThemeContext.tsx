import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { userConfig, Appearance } from '../config/UserConfig'
import { App } from '@capacitor/app'

interface AppearanceContextType {
  appearance: 'light' | 'dark'
  setAppearance: (appearance: Appearance) => void
}

const AppearanceContext = createContext<AppearanceContextType | undefined>(undefined)

interface AppearanceProviderProps {
  children: ReactNode
}

function getSystemTheme(): 'light' | 'dark' {
  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  return isDark ? 'dark' : 'light'
}

function getSystemThemeFromConfig(configAppearance: Appearance): 'light' | 'dark' {
  if (configAppearance === 'system') {
    return getSystemTheme()
  }
  return configAppearance
}

function addSystemThemeListener(handler: () => void): void {
  const mq = window.matchMedia('(prefers-color-scheme: dark)')
  mq.addEventListener('change', handler)
}

function removeSystemThemeListener(handler: () => void): void {
  const mq = window.matchMedia('(prefers-color-scheme: dark)')
  mq.removeEventListener('change', handler)
}

export function AppearanceProvider({ children }: AppearanceProviderProps) {
  const [appearance, setAppearance] = useState<'light' | 'dark'>(() => {
    return getSystemThemeFromConfig(userConfig.getAppearance())
  })

  function refreshTheme(): void {
    const currentConfigAppearance = userConfig.getAppearance()
    const resolvedAppearance = getSystemThemeFromConfig(currentConfigAppearance)
    setAppearance(resolvedAppearance)
  }

  useEffect(() => {
    refreshTheme()

    const systemThemeHandler = () => {
      if (userConfig.getAppearance() === 'system') {
        refreshTheme()
      }
    }

    if (userConfig.getAppearance() === 'system') {
      addSystemThemeListener(systemThemeHandler)
    }

    const appListener = App.addListener('resume', () => {
      if (userConfig.getAppearance() === 'system') {
        refreshTheme()
      }
    })

    return () => {
      removeSystemThemeListener(systemThemeHandler)
      appListener.then(listener => listener.remove())
    }
  }, [])

  const handleSetAppearance = (newAppearance: Appearance) => {
    userConfig.setAppearance(newAppearance)
    refreshTheme()
  }

  return (
    <AppearanceContext.Provider value={{ appearance, setAppearance: handleSetAppearance }}>
      {children}
    </AppearanceContext.Provider>
  )
}

export function useAppearance() {
  const context = useContext(AppearanceContext)
  if (context === undefined) {
    throw new Error('useAppearance must be used within an AppearanceProvider')
  }
  return context
}
