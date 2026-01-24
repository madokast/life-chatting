import styled from 'styled-components'

export interface DrawerBodyProps {
  children: React.ReactNode
}

const BodyContainer = styled.div`
  padding: 1rem 0;
  flex: 1;
  overflow-y: auto;
`

export function DrawerBody({ children }: DrawerBodyProps) {
  return (
    <BodyContainer>
      {children}
    </BodyContainer>
  )
}
