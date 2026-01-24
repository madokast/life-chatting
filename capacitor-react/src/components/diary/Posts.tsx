import { useState } from 'react'
import styled from 'styled-components'
import { Post } from './Post'
import { PostInput } from './PostInput'
import { useAppearance } from '../../context/ThemeContext'

export interface PostData {
  idx: number
  created_at: number
  content: string
}

const samplePosts: PostData[] = [
  {
    idx: 1,
    created_at: 1735713316,
    content: '今天天气真好，阳光明媚。决定出去走走，感受大自然的美好。'
  },
  {
    idx: 2,
    created_at: 1735783845,
    content: '开始学习 React 和 TypeScript，感觉收获很大。今天完成了一个小项目，很有成就感。'
  },
  {
    idx: 3,
    created_at: 1735908322,
    content: '和朋友一起去看电影，是一部非常感人的剧情片。看完后我们聊了很久，关于人生、关于梦想。'
  },
  {
    idx: 4,
    created_at: 1736011210,
    content: '今天整理了房间，发现了很多旧照片。回忆涌上心头，那些美好的时光仿佛就在昨天。'
  },
  {
    idx: 5,
    created_at: 1736088033,
    content: '尝试做了一道新菜，味道还不错！准备下次再改进一下配方，希望能做得更好。'
  }
]

const PostsContainer = styled.div<{ $appearance: 'light' | 'dark' }>`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: ${props => props.$appearance === 'light' ? '#f5f5f5' : '#0d0d0d'};
`

const PostsList = styled.div`
  flex: 1;
  overflow-y: auto;
`

export function Posts() {
  const { appearance } = useAppearance()
  const [posts, setPosts] = useState<PostData[]>(samplePosts)

  const handleAddPost = (content: string) => {
    const newPost: PostData = {
      idx: posts.length > 0 ? Math.max(...posts.map(p => p.idx)) + 1 : 1,
      created_at: Math.floor(Date.now() / 1000),
      content
    }
    setPosts([newPost, ...posts])
  }

  return (
    <PostsContainer $appearance={appearance}>
      <PostsList>
        {posts.map(post => (
          <Post
            key={post.idx}
            idx={post.idx}
            created_at={post.created_at}
            content={post.content}
          />
        ))}
      </PostsList>
      <PostInput onAddPost={handleAddPost} />
    </PostsContainer>
  )
}
