import styled from 'styled-components'
import { i18n } from '../../i18n/i18n'
import { useAppearance } from '../../context/ThemeContext'

export type View = 'diary' | 'chat'

export interface FooterProps {
  currentView: View
  onViewChange: (view: View) => void
}

const FooterContainer = styled.footer<{ $appearance: 'light' | 'dark' }>`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 56px;
  background-color: ${props => props.$appearance === 'light' ? '#ffffff' : '#1a1a1a'};
  border-top: 1px solid ${props => props.$appearance === 'light' ? '#e0e0e0' : '#333333'};
  display: flex;
  align-items: center;
  justify-content: space-around;
  z-index: 100;
`

const NavItem = styled.button<{ $active: boolean; $appearance: 'light' | 'dark' }>`
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  color: ${props => props.$active 
    ? (props.$appearance === 'light' ? '#4a6fa5' : '#6a9fd5')
    : (props.$appearance === 'light' ? '#666666' : '#999999')
  };
  transition: color 0.2s ease;
  padding: 0;

  &:hover {
    color: ${props => props.$appearance === 'light' ? '#4a6fa5' : '#6a9fd5'};
  }

  &:active {
    opacity: 0.7;
  }
`

export function Footer({ currentView, onViewChange }: FooterProps) {
  const { appearance } = useAppearance()

  return (
    <FooterContainer $appearance={appearance}>
      <NavItem
        $active={currentView === 'diary'}
        $appearance={appearance}
        onClick={() => onViewChange('diary')}
      >
        {i18n.t('nav.diary')}
      </NavItem>
      <NavItem
        $active={currentView === 'chat'}
        $appearance={appearance}
        onClick={() => onViewChange('chat')}
      >
        {i18n.t('nav.chat')}
      </NavItem>
    </FooterContainer>
  )
}
