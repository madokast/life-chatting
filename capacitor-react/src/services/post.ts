export interface PostData {
  idx: number
  created_at: number
  content: string
}

export interface PublishingPostData {
  content: string
}

export interface PostStats {
  total: number
  maxIdx: number
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

export const postService = {
  async getStats(): Promise<PostStats> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const total = samplePosts.length
        const maxIdx = samplePosts.length > 0 ? Math.max(...samplePosts.map(p => p.idx)) : 0
        resolve({ total, maxIdx })
      }, 100)
    })
  },

  async getPosts(from_idx: number, size: number): Promise<PostData[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filtered = samplePosts.filter(p => p.idx <= from_idx)
        const sorted = filtered.sort((a, b) => b.idx - a.idx)
        const paginated = sorted.slice(0, size)
        resolve(paginated)
      }, 100)
    })
  },

  async publish(data: PublishingPostData): Promise<PostData> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const maxIdx = samplePosts.length > 0 ? Math.max(...samplePosts.map(p => p.idx)) : 0
        const newPost: PostData = {
          idx: maxIdx + 1,
          created_at: Math.floor(Date.now() / 1000),
          content: data.content
        }
        samplePosts.unshift(newPost)
        resolve(newPost)
      }, 100)
    })
  }
}
