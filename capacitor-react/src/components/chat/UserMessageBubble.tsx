import styled from 'styled-components'

export interface UserMessageBubbleProps {
  content: string
  appearance: 'light' | 'dark'
}

const MessageContainer = styled.div<{ $appearance: 'light' | 'dark' }>`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
  padding: 0 1rem;
`

const Bubble = styled.div<{ $appearance: 'light' | 'dark' }>`
  max-width: 80%;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  background-color: ${props => props.$appearance === 'light' ? '#e3f2fd' : '#1565c0'};
  color: ${props => props.$appearance === 'light' ? '#1565c0' : '#e3f2fd'};
  font-size: 1rem;
  line-height: 1.5;
  word-wrap: break-word;
`

export function UserMessageBubble({ content, appearance }: UserMessageBubbleProps) {
  return (
    <MessageContainer $appearance={appearance}>
      <Bubble $appearance={appearance}>{content}</Bubble>
    </MessageContainer>
  )
}
