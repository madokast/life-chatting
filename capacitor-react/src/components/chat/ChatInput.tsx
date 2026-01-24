import { useState } from 'react'
import styled from 'styled-components'
import { i18n } from '../../i18n/i18n'
import { useAppearance } from '../../context/ThemeContext'

export interface ChatInputProps {
  onSend: (message: string) => void
}

const InputContainer = styled.div<{ $appearance: 'light' | 'dark' }>`
  padding: 1rem;
  background-color: ${props => props.$appearance === 'light' ? '#ffffff' : '#1a1a1a'};
  border-top: 1px solid ${props => props.$appearance === 'light' ? '#e0e0e0' : '#333333'};
`

const InputWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: flex-end;
`

const TextArea = styled.textarea<{ $appearance: 'light' | 'dark' }>`
  flex: 1;
  min-height: 44px;
  max-height: 120px;
  padding: 0.75rem;
  border: 1px solid ${props => props.$appearance === 'light' ? '#e0e0e0' : '#333333'};
  border-radius: 8px;
  background-color: ${props => props.$appearance === 'light' ? '#ffffff' : '#1a1a1a'};
  color: ${props => props.$appearance === 'light' ? '#333333' : '#e0e0e0'};
  font-size: 1rem;
  font-family: inherit;
  resize: none;
  outline: none;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: #4a6fa5;
  }

  &::placeholder {
    color: ${props => props.$appearance === 'light' ? '#999999' : '#666666'};
  }
`

const SendButton = styled.button<{ $appearance: 'light' | 'dark' }>`
  min-width: 80px;
  height: 44px;
  padding: 0 1.5rem;
  background-color: #4a6fa5;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #3a5f8a;
  }

  &:active {
    background-color: #2a4f6f;
  }

  &:disabled {
    background-color: ${props => props.$appearance === 'light' ? '#cccccc' : '#555555'};
    cursor: not-allowed;
  }
`

export function ChatInput({ onSend }: ChatInputProps) {
  const { appearance } = useAppearance()
  const [message, setMessage] = useState('')

  const handleSend = () => {
    if (message.trim()) {
      onSend(message.trim())
      setMessage('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <InputContainer $appearance={appearance}>
      <InputWrapper>
        <TextArea
          $appearance={appearance}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={i18n.t('chat.placeholder')}
        />
        <SendButton
          $appearance={appearance}
          onClick={handleSend}
          disabled={!message.trim()}
        >
          {i18n.t('chat.send')}
        </SendButton>
      </InputWrapper>
    </InputContainer>
  )
}
