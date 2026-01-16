import { Language } from '../i18n/locales.ts'

export type Appearance = 'light' | 'dark'

interface UserConfigData {
  appearance: Appearance
  language: Language
}

class UserConfig {
  private static instance: UserConfig
  private config: UserConfigData = {
    appearance: 'light',
    language: 'zh'
  }
  private listeners: Set<() => void> = new Set()

  private constructor() {
    this.loadFromStorage()
  }

  static getInstance(): UserConfig {
    if (!UserConfig.instance) {
      UserConfig.instance = new UserConfig()
    }
    return UserConfig.instance
  }

  getAppearance(): Appearance {
    return this.config.appearance
  }

  setAppearance(appearance: Appearance): void {
    this.config.appearance = appearance
    this.saveToStorage()
    this.notifyListeners()
  }

  getLanguage(): Language {
    return this.config.language
  }

  setLanguage(language: Language): void {
    this.config.language = language
    this.saveToStorage()
    this.notifyListeners()
  }

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener)
    return () => {
      this.listeners.delete(listener)
    }
  }

  private saveToStorage(): void {
    try {
      localStorage.setItem('userConfig', JSON.stringify(this.config))
    } catch (error) {
      console.error('Failed to save user config:', error)
    }
  }

  private loadFromStorage(): void {
    try {
      const saved = localStorage.getItem('userConfig')
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<UserConfigData>
        if (parsed.appearance) {
          this.config.appearance = parsed.appearance
        }
        if (parsed.language) {
          this.config.language = parsed.language
        }
      }
    } catch (error) {
      console.error('Failed to load user config:', error)
    }
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener())
  }
}

export const userConfig = UserConfig.getInstance()
