import styled from 'styled-components'

export interface PostProps {
  idx: number
  created_at: string
  content: string
  appearance: 'light' | 'dark'
}

const PostContainer = styled.div<{ $appearance: 'light' | 'dark' }>`
  padding: 1rem;
  background-color: ${props => props.$appearance === 'light' ? '#ffffff' : '#1a1a1a'};
  border-bottom: 1px solid ${props => props.$appearance === 'light' ? '#e0e0e0' : '#333333'};
`

const MetaInfo = styled.div<{ $appearance: 'light' | 'dark' }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  font-size: 0.85rem;
  color: ${props => props.$appearance === 'light' ? '#999999' : '#888888'};
`

const DateTime = styled.span`
  font-weight: 400;
`

const Index = styled.span<{ $appearance: 'light' | 'dark' }>`
  font-weight: 500;
  color: ${props => props.$appearance === 'light' ? '#666666' : '#aaaaaa'};
`

const Content = styled.div<{ $appearance: 'light' | 'dark' }>`
  font-size: 1rem;
  line-height: 1.6;
  color: ${props => props.$appearance === 'light' ? '#333333' : '#e0e0e0'};
  white-space: pre-wrap;
  word-wrap: break-word;
`

export function Post({ idx, created_at, content, appearance }: PostProps) {
  return (
    <PostContainer $appearance={appearance}>
      <MetaInfo $appearance={appearance}>
        <DateTime>{created_at}</DateTime>
        <Index $appearance={appearance}>#{idx}</Index>
      </MetaInfo>
      <Content $appearance={appearance}>{content}</Content>
    </PostContainer>
  )
}
