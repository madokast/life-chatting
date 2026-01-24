import { useState } from 'react'
import styled from 'styled-components'
import { i18n } from '../../i18n/i18n'
import { userConfig, Appearance } from '../../config/UserConfig'
import type { Language } from '../../i18n/locales'
import { DrawerHeader } from './DrawerHeader'
import { DrawerBody } from './DrawerBody'
import { DrawerFooter } from './DrawerFooter'
import { ToggleItem } from './ToggleItem'
import { useAppearance } from '../../context/ThemeContext'

export interface DrawerProps {
  isOpen: boolean
  onClose: () => void
}

const Overlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  opacity: ${props => props.$isOpen ? 1 : 0};
  visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
  transition: opacity 0.3s ease, visibility 0.3s ease;
`

const DrawerContainer = styled.div<{ $isOpen: boolean; $appearance: 'light' | 'dark' }>`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 280px;
  background-color: ${props => props.$appearance === 'light' ? '#ffffff' : '#1a1a1a'};
  z-index: 1000;
  transform: translateX(${props => props.$isOpen ? '0' : '-100%'});
  transition: transform 0.3s ease;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`

export function Drawer({ isOpen, onClose }: DrawerProps) {
  const { appearance, setAppearance } = useAppearance()
  const [currentLanguage, setCurrentLanguage] = useState<Language>(userConfig.getLanguage())
  const [currentAppearance, setCurrentAppearance] = useState<Appearance>(userConfig.getAppearance())

  const handleAppearanceToggle = () => {
    const appearanceOrder: Appearance[] = ['light', 'dark', 'system']
    const currentIndex = appearanceOrder.indexOf(currentAppearance)
    const nextIndex = (currentIndex + 1) % appearanceOrder.length
    const newAppearance = appearanceOrder[nextIndex]
    
    setCurrentAppearance(newAppearance)
    setAppearance(newAppearance)
  }

  const handleLanguageToggle = () => {
    const newLanguage = currentLanguage === 'zh' ? 'en' : 'zh'
    setCurrentLanguage(newLanguage)
    userConfig.setLanguage(newLanguage)
    i18n.setLanguage(newLanguage)
  }

  const getAppearanceText = (): string => {
    if (currentAppearance === 'light') {
      return i18n.t('drawer.appearanceLight')
    } else if (currentAppearance === 'dark') {
      return i18n.t('drawer.appearanceDark')
    } else {
      return i18n.t('drawer.appearanceSystem')
    }
  }

  const handleOverlayClick = () => {
    onClose()
  }

  return (
    <>
      <Overlay $isOpen={isOpen} onClick={handleOverlayClick} />
      <DrawerContainer $isOpen={isOpen} $appearance={appearance}>
        <DrawerHeader />
        <DrawerBody>
          <ToggleItem
            label={i18n.t('drawer.appearance')}
            value={getAppearanceText()}
            onClick={handleAppearanceToggle}
          />
          <ToggleItem
            label={i18n.t('drawer.language')}
            value={currentLanguage === 'zh' ? i18n.t('drawer.languageZh') : i18n.t('drawer.languageEn')}
            onClick={handleLanguageToggle}
          />
        </DrawerBody>
        <DrawerFooter />
      </DrawerContainer>
    </>
  )
}
