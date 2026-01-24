import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { userConfig, Appearance } from '../config/UserConfig'

interface AppearanceContextType {
  appearance: Appearance
  setAppearance: (appearance: Appearance) => void
}

const AppearanceContext = createContext<AppearanceContextType | undefined>(undefined)

interface AppearanceProviderProps {
  children: ReactNode
}

export function AppearanceProvider({ children }: AppearanceProviderProps) {
  const [appearance, setAppearance] = useState<Appearance>(userConfig.getAppearance())

  useEffect(() => {
    setAppearance(userConfig.getAppearance())
  }, [])

  const handleSetAppearance = (newAppearance: Appearance) => {
    setAppearance(newAppearance)
    userConfig.setAppearance(newAppearance)
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
