import styled from 'styled-components'
import { useAppearance } from '../../context/ThemeContext'

export interface ToggleItemProps {
  label: string
  value: string
  onClick: () => void
}

const ItemContainer = styled.div<{ $appearance: 'light' | 'dark' }>`
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

const ItemLabel = styled.span`
  font-size: 1rem;
`

const ItemValue = styled.span<{ $appearance: 'light' | 'dark' }>`
  font-size: 0.9rem;
  color: ${props => props.$appearance === 'light' ? '#666666' : '#888888'};
`

export function ToggleItem({ label, value, onClick }: ToggleItemProps) {
  const { appearance } = useAppearance()

  return (
    <ItemContainer $appearance={appearance} onClick={onClick}>
      <ItemLabel>{label}</ItemLabel>
      <ItemValue $appearance={appearance}>{value}</ItemValue>
    </ItemContainer>
  )
}
