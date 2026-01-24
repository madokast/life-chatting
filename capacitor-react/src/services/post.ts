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
  },
  {
    idx: 6,
    created_at: 1736152000,
    content: '今天读了一本好书，书中的观点让我深受启发。决定以后每天都要抽出时间阅读。'
  },
  {
    idx: 7,
    created_at: 1736225000,
    content: '工作中遇到了一些困难，但通过团队合作，最终解决了问题。团队的力量真的很强大。'
  },
  {
    idx: 8,
    created_at: 1736298000,
    content: '今天去健身房锻炼了两个小时，虽然很累，但感觉整个人都精神了很多。坚持运动很重要。'
  },
  {
    idx: 9,
    created_at: 1736371000,
    content: '和家人视频通话，聊了很多家常。虽然相隔千里，但心依然紧紧相连。'
  },
  {
    idx: 10,
    created_at: 1736444000,
    content: '今天学习了新的编程技巧，感觉自己的技术又提升了一个台阶。继续加油！'
  },
  {
    idx: 11,
    created_at: 1736517000,
    content: '去公园散步，看到很多小朋友在玩耍，他们的笑声让我想起了童年的快乐时光。'
  },
  {
    idx: 12,
    created_at: 1736590000,
    content: '今天尝试了冥想，感觉内心平静了很多。以后要养成每天冥想的习惯。'
  },
  {
    idx: 13,
    created_at: 1736663000,
    content: '收到朋友的礼物，非常惊喜。友谊是人生中最珍贵的财富之一。'
  },
  {
    idx: 14,
    created_at: 1736736000,
    content: '今天完成了一个重要的项目，得到了领导的表扬。努力总会有回报。'
  },
  {
    idx: 15,
    created_at: 1736809000,
    content: '去参观了博物馆，看到了很多珍贵的历史文物。历史真的很有趣，让人深思。'
  },
  {
    idx: 16,
    created_at: 1736882000,
    content: '今天帮邻居解决了电脑问题，看到他们开心的样子，我也感到很满足。助人为乐真好。'
  },
  {
    idx: 17,
    created_at: 1736955000,
    content: '学习了新的烹饪技巧，做了一顿丰盛的晚餐。家人都说很好吃，心里美滋滋的。'
  },
  {
    idx: 18,
    created_at: 1737028000,
    content: '今天天气很好，去爬山了。山顶的风景真的很美，感觉所有的烦恼都消失了。'
  },
  {
    idx: 19,
    created_at: 1737101000,
    content: '参加了一个技术分享会，认识了很多志同道合的朋友。交流学习真的很重要。'
  },
  {
    idx: 20,
    created_at: 1737174000,
    content: '今天整理了自己的书桌，把不用的东西都清理掉了。整洁的环境让人心情愉悦。'
  },
  {
    idx: 21,
    created_at: 1737247000,
    content: '听了一首很感人的歌曲，歌词写得很好。音乐真的能够触动人心。'
  },
  {
    idx: 22,
    created_at: 1737320000,
    content: '今天学习了时间管理的方法，感觉效率提升了很多。合理规划时间真的很重要。'
  },
  {
    idx: 23,
    created_at: 1737393000,
    content: '去海边看日落，夕阳西下的景色真的很美。大自然的鬼斧神工让人叹为观止。'
  },
  {
    idx: 24,
    created_at: 1737466000,
    content: '今天帮同事解决了一个技术难题，他非常感激。帮助别人也是提升自己的过程。'
  },
  {
    idx: 25,
    created_at: 1737539000,
    content: '读了一篇关于心理学的文章，对人类的思维有了更深的理解。知识真的很神奇。'
  },
  {
    idx: 26,
    created_at: 1737612000,
    content: '今天尝试了新的咖啡店，咖啡的味道很特别。生活需要不断尝试新鲜事物。'
  },
  {
    idx: 27,
    created_at: 1737685000,
    content: '学习了摄影技巧，拍了一些照片。虽然技术还不够好，但会继续努力。'
  },
  {
    idx: 28,
    created_at: 1737758000,
    content: '今天反思了自己的过去，发现有很多需要改进的地方。成长是一个不断自我完善的过程。'
  },
  {
    idx: 29,
    created_at: 1737831000,
    content: '和朋友一起去野餐，天气很好，食物也很美味。简单的快乐往往最珍贵。'
  },
  {
    idx: 30,
    created_at: 1737904000,
    content: '今天回顾了自己的成长历程，感慨万千。未来还有很多目标要实现，继续加油！'
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
