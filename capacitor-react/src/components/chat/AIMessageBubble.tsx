import styled from 'styled-components'

export interface AIMessageBubbleProps {
  content: string
  appearance: 'light' | 'dark'
}

const MessageContainer = styled.div<{ $appearance: 'light' | 'dark' }>`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 1rem;
  padding: 0 1rem;
`

const Bubble = styled.div<{ $appearance: 'light' | 'dark' }>`
  width: 100%;
  font-size: 1rem;
  line-height: 1.5;
  color: ${props => props.$appearance === 'light' ? '#333333' : '#e0e0e0'};
  white-space: pre-wrap;
  word-wrap: break-word;
`

export function AIMessageBubble({ content, appearance }: AIMessageBubbleProps) {
  return (
    <MessageContainer $appearance={appearance}>
      <Bubble $appearance={appearance}>{content}</Bubble>
    </MessageContainer>
  )
}
