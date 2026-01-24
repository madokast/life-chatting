import { useState } from 'react'
import styled from 'styled-components'
import { AIMessageBubble } from './AIMessageBubble'
import { UserMessageBubble } from './UserMessageBubble'
import { ChatInput } from './ChatInput'
import { useAppearance } from '../../context/ThemeContext'

export type MessageRole = 'user' | 'ai'

export interface Message {
  id: number
  role: MessageRole
  content: string
}

const sampleMessages: Message[] = [
  {
    id: 1,
    role: 'ai',
    content: '你好！我是你的 AI 助手，很高兴能和你聊天。有什么我可以帮助你的吗？'
  },
  {
    id: 2,
    role: 'user',
    content: '你好！我想了解一下今天的天气。'
  },
  {
    id: 3,
    role: 'ai',
    content: '很抱歉，我目前无法获取实时天气信息。不过我可以帮你记录日记、聊天交流，或者提供其他帮助。你需要我做什么吗？'
  },
  {
    id: 4,
    role: 'user',
    content: '那你能帮我记录今天的日记吗？'
  },
  {
    id: 5,
    role: 'ai',
    content: '当然可以！你可以切换到日记页面，然后写下今天发生的事情。我会帮你保存和管理你的日记。'
  }
]

const ChatContainer = styled.div<{ $appearance: 'light' | 'dark' }>`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: ${props => props.$appearance === 'light' ? '#f5f5f5' : '#0d0d0d'};
`

const MessagesContainer = styled.div<{ $appearance: 'light' | 'dark' }>`
  flex: 1;
  overflow-y: auto;
  padding: 1rem 0;
  background-color: ${props => props.$appearance === 'light' ? '#f5f5f5' : '#0d0d0d'};
`

export function Chat() {
  const { appearance } = useAppearance()
  const [messages, setMessages] = useState<Message[]>(sampleMessages)

  const handleSend = (content: string) => {
    const newMessage: Message = {
      id: messages.length + 1,
      role: 'user',
      content
    }
    setMessages([...messages, newMessage])
  }

  return (
    <ChatContainer $appearance={appearance}>
      <MessagesContainer $appearance={appearance}>
        {messages.map(message => (
          message.role === 'user' ? (
            <UserMessageBubble
              key={message.id}
              content={message.content}
            />
          ) : (
            <AIMessageBubble
              key={message.id}
              content={message.content}
            />
          )
        ))}
      </MessagesContainer>
      <ChatInput onSend={handleSend} />
    </ChatContainer>
  )
}
