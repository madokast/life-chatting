import styled from 'styled-components'
import { useAppearance } from '../../context/ThemeContext'
import { i18n } from '../../i18n/i18n'

const FooterContainer = styled.div<{ $appearance: 'light' | 'dark' }>`
  padding: 1.5rem;
  border-top: 1px solid ${props => props.$appearance === 'light' ? '#e0e0e0' : '#333333'};
  font-size: 0.9rem;
  color: ${props => props.$appearance === 'light' ? '#666666' : '#888888'};
  text-align: center;
`

export function DrawerFooter() {
  const { appearance } = useAppearance()

  return (
    <FooterContainer $appearance={appearance}>
      {i18n.t('drawer.appName')}
    </FooterContainer>
  )
}
