import styled from 'styled-components'
import { Appearance } from '../config/UserConfig'
import { i18n } from '../i18n/i18n'

export interface DrawerFooterProps {
  appearance: Appearance
}

const FooterContainer = styled.div<{ $appearance: Appearance }>`
  padding: 1.5rem;
  border-top: 1px solid ${props => props.$appearance === 'light' ? '#e0e0e0' : '#333333'};
  font-size: 0.9rem;
  color: ${props => props.$appearance === 'light' ? '#666666' : '#888888'};
  text-align: center;
`

export function DrawerFooter({ appearance }: DrawerFooterProps) {
  return (
    <FooterContainer $appearance={appearance}>
      {i18n.t('drawer.appName')}
    </FooterContainer>
  )
}
