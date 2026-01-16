import { Language, locales, Translations } from './locales'

class I18n {
  private static instance: I18n
  private currentLanguage: Language = 'zh'
  private listeners: Set<() => void> = new Set()

  private constructor() {}

  static getInstance(): I18n {
    if (!I18n.instance) {
      I18n.instance = new I18n()
    }
    return I18n.instance
  }

  getLanguage(): Language {
    return this.currentLanguage
  }

  setLanguage(language: Language): void {
    this.currentLanguage = language
    this.notifyListeners()
  }

  t(key: string): string {
    const keys = key.split('.')
    let value: any = locales[this.currentLanguage]
    
    for (const k of keys) {
      value = value?.[k]
    }
    
    return value || key
  }

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener)
    return () => {
      this.listeners.delete(listener)
    }
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener())
  }
}

export const i18n = I18n.getInstance()
