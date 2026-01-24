import { useState, useEffect, useRef, useCallback } from 'react'
import styled from 'styled-components'
import { Post } from './Post'
import { PostInput } from './PostInput'
import { useAppearance } from '../../context/ThemeContext'
import { postService, PostData } from '../../services/post'
import { List, RowComponentProps, useDynamicRowHeight } from 'react-window'

const PostsContainer = styled.div<{ $appearance: 'light' | 'dark' }>`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: ${props => props.$appearance === 'light' ? '#f5f5f5' : '#0d0d0d'};
`

const PostsListWrapper = styled.div`
  flex: 1;
  overflow: hidden;
`

const ITEM_ESTIMATED_HEIGHT = 150
const LOAD_MORE_THRESHOLD = 5

export function Posts() {
  const { appearance } = useAppearance()
  const [posts, setPosts] = useState<PostData[]>([])
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const currentFromIdxRef = useRef<number>(0)

  const dynamicRowHeight = useDynamicRowHeight({
    defaultRowHeight: ITEM_ESTIMATED_HEIGHT,
    key: 'posts-list'
  })

  const loadMorePosts = useCallback(async () => {
    if (loading || !hasMore) return

    setLoading(true)
    try {
      const newPosts = await postService.getPosts(currentFromIdxRef.current, 5)
      if (newPosts.length === 0) {
        setHasMore(false)
      } else {
        setPosts(prev => [...prev, ...newPosts])
        currentFromIdxRef.current = newPosts[newPosts.length - 1].idx - 1
      }
    } finally {
      setLoading(false)
    }
  }, [loading, hasMore])

  const handleAddPost = async (content: string) => {
    const newPost = await postService.publish({ content })
    setPosts(prev => [newPost, ...prev])
    currentFromIdxRef.current = newPost.idx
  }

  const Row = useCallback((props: RowComponentProps<{ posts: PostData[] }>) => {
    const { index, style, posts } = props

    if (index === posts.length) {
      return (
        <div style={style}>
          <div style={{ padding: '20px', textAlign: 'center', color: appearance === 'light' ? '#666' : '#999' }}>
            加载中...
          </div>
        </div>
      )
    }

    const post = posts[index]

    return (
      <div style={style}>
        <Post
          idx={post.idx}
          created_at={post.created_at}
          content={post.content}
          onMeasure={(height) => dynamicRowHeight.setRowHeight(index, height)}
        />
      </div>
    )
  }, [dynamicRowHeight, appearance])

  useEffect(() => {
    const initPosts = async () => {
      const stats = await postService.getStats()
      currentFromIdxRef.current = stats.maxIdx
      await loadMorePosts()
    }
    initPosts()
  }, [])

  return (
    <PostsContainer $appearance={appearance}>
      <PostsListWrapper>
        <List
          rowCount={hasMore ? posts.length + 1 : posts.length}
          rowHeight={dynamicRowHeight}
          rowComponent={Row}
          rowProps={{
            posts
          }}
          onRowsRendered={(visibleRows) => {
            const { stopIndex } = visibleRows
            if (stopIndex >= posts.length - 1 - LOAD_MORE_THRESHOLD && hasMore && !loading) {
              loadMorePosts()
            }
          }}
        />
      </PostsListWrapper>
      <PostInput onAddPost={handleAddPost} />
    </PostsContainer>
  )
}
