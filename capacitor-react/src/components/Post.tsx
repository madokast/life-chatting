import styled from 'styled-components'

export interface PostProps {
  idx: number
  created_at: number
  content: string
  appearance: 'light' | 'dark'
}

const formatTimestamp = (timestamp: number): string => {
  const date = new Date(timestamp * 1000)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
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
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
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
  user-select: text;
  -webkit-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;
`

export function Post({ idx, created_at, content, appearance }: PostProps) {
  const formattedDate = formatTimestamp(created_at)
  
  return (
    <PostContainer $appearance={appearance}>
      <MetaInfo $appearance={appearance}>
        <DateTime>{formattedDate}</DateTime>
        <Index $appearance={appearance}>#{idx}</Index>
      </MetaInfo>
      <Content $appearance={appearance}>{content}</Content>
    </PostContainer>
  )
}
