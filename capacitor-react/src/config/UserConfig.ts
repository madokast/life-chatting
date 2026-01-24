import { Language } from '../i18n/locales.ts'

export type Appearance = 'light' | 'dark' | 'system'

interface UserConfigData {
  appearance: Appearance
  language: Language
}

class UserConfig {
  private static instance: UserConfig
  private config: UserConfigData = {
    appearance: 'system',
    language: 'zh'
  }

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
  }

  getLanguage(): Language {
    return this.config.language
  }

  setLanguage(language: Language): void {
    this.config.language = language
    this.saveToStorage()
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
}

export const userConfig = UserConfig.getInstance()
