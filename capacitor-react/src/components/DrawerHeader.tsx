import styled from 'styled-components'
import { Appearance } from '../config/UserConfig'
import { i18n } from '../i18n/i18n'

export interface DrawerHeaderProps {
  appearance: Appearance
}

const HeaderContainer = styled.div<{ $appearance: Appearance }>`
  padding: 1.5rem;
  border-bottom: 1px solid ${props => props.$appearance === 'light' ? '#e0e0e0' : '#333333'};
  font-size: 1.2rem;
  font-weight: 600;
  color: ${props => props.$appearance === 'light' ? '#333333' : '#e0e0e0'};
  min-height: 60px;
  display: flex;
  align-items: center;
`

export function DrawerHeader({ appearance }: DrawerHeaderProps) {
  return (
    <HeaderContainer $appearance={appearance}>
      {i18n.t('drawer.postCount')}
    </HeaderContainer>
  )
}
