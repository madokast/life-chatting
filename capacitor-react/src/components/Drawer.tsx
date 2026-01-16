import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { i18n } from '../i18n/i18n'
import { userConfig, Appearance } from '../config/UserConfig'
import type { Language } from '../i18n/locales'

export interface DrawerProps {
  isOpen: boolean
  onClose: () => void
  appearance: Appearance
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

const DrawerContainer = styled.div<{ $isOpen: boolean; $appearance: Appearance }>`
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
`

const DrawerHeader = styled.div<{ $appearance: Appearance }>`
  padding: 1.5rem;
  border-bottom: 1px solid ${props => props.$appearance === 'light' ? '#e0e0e0' : '#333333'};
  font-size: 1.2rem;
  font-weight: 600;
  color: ${props => props.$appearance === 'light' ? '#333333' : '#e0e0e0'};
`

const DrawerContent = styled.div`
  padding: 1rem 0;
`

const MenuItem = styled.div<{ $appearance: Appearance }>`
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  color: ${props => props.$appearance === 'light' ? '#333333' : '#e0e0e0'};
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: ${props => props.$appearance === 'light' ? '#f5f5f5' : '#2a2a2a'};
  }
`

const MenuItemLabel = styled.span`
  font-size: 1rem;
`

const MenuItemValue = styled.span<{ $appearance: Appearance }>`
  font-size: 0.9rem;
  color: ${props => props.$appearance === 'light' ? '#666666' : '#888888'};
`

export function Drawer({ isOpen, onClose, appearance }: DrawerProps) {
  const [currentAppearance, setCurrentAppearance] = useState<Appearance>(userConfig.getAppearance())
  const [currentLanguage, setCurrentLanguage] = useState<Language>(userConfig.getLanguage())

  useEffect(() => {
    const unsubscribe = userConfig.subscribe(() => {
      setCurrentAppearance(userConfig.getAppearance())
      setCurrentLanguage(userConfig.getLanguage())
    })
    return unsubscribe
  }, [])

  const handleAppearanceToggle = () => {
    const newAppearance: Appearance = currentAppearance === 'light' ? 'dark' : 'light'
    userConfig.setAppearance(newAppearance)
  }

  const handleLanguageToggle = () => {
    const newLanguage = currentLanguage === 'zh' ? 'en' : 'zh'
    userConfig.setLanguage(newLanguage)
    i18n.setLanguage(newLanguage)
  }

  const handleOverlayClick = () => {
    onClose()
  }

  return (
    <>
      <Overlay $isOpen={isOpen} onClick={handleOverlayClick} />
      <DrawerContainer $isOpen={isOpen} $appearance={appearance}>
        <DrawerHeader $appearance={appearance}>
          {i18n.t('app.title')}
        </DrawerHeader>
        <DrawerContent>
          <MenuItem $appearance={appearance} onClick={handleAppearanceToggle}>
            <MenuItemLabel>{i18n.t('drawer.appearance')}</MenuItemLabel>
            <MenuItemValue $appearance={appearance}>
              {currentAppearance === 'light' ? i18n.t('drawer.appearanceLight') : i18n.t('drawer.appearanceDark')}
            </MenuItemValue>
          </MenuItem>
          <MenuItem $appearance={appearance} onClick={handleLanguageToggle}>
            <MenuItemLabel>{i18n.t('drawer.language')}</MenuItemLabel>
            <MenuItemValue $appearance={appearance}>
              {currentLanguage === 'zh' ? i18n.t('drawer.languageZh') : i18n.t('drawer.languageEn')}
            </MenuItemValue>
          </MenuItem>
        </DrawerContent>
      </DrawerContainer>
    </>
  )
}
