import styled from 'styled-components'
import { Appearance } from '../../config/UserConfig'

export interface HeaderProps {
  onMenuClick: () => void
  title: string
  appearance: Appearance
}

const HeaderContainer = styled.div<{ $appearance: Appearance }>`
  background-color: #4a6fa5;
  color: white;
  padding: 1rem;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`

const MenuButton = styled.button`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  padding: 0.5rem;
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.5rem;
  font-weight: bold;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  line-height: 1;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
`

const Title = styled.h1`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
`

export function Header({ onMenuClick, title, appearance }: HeaderProps) {
  return (
    <HeaderContainer $appearance={appearance}>
      <MenuButton onClick={onMenuClick}>
        ≡
      </MenuButton>
      <Title>{title}</Title>
    </HeaderContainer>
  )
}
