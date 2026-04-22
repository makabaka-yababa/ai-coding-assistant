import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import './chat.css'

const DIFY_PROXY_URL = '/api/chat'
const CHAT_CONVERSATION_KEY = 'codepilot_chat_conversation_id'

// 🔥 自动清洗 #、-、*、多余空行
function cleanText(text) {
  return text
    .replace(/^#{1,5}\s+/gm, '')
    .replace(/^[-*]\s+/gm, '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

function parseMessage(text) {
  text = cleanText(text)
  const segments = []
  const regex = /```(\w+)?\n([\s\S]*?)```/g
  let lastIndex = 0
  let match = regex.exec(text)

  while (match) {
    if (match.index > lastIndex) {
      segments.push({ type: 'text', content: text.slice(lastIndex, match.index) })
    }

    segments.push({
      type: 'code',
      language: match[1] || 'text',
      content: match[2].trimEnd(),
    })

    lastIndex = regex.lastIndex
    match = regex.exec(text)
  }

  if (lastIndex < text.length) {
    segments.push({ type: 'text', content: text.slice(lastIndex) })
  }

  return segments
}

function MessageBubble({ role, content }) {
  const parts = useMemo(() => parseMessage(content), [content])
  const isUser = role === 'user'

  return (
    <div className={`chat-message ${isUser ? 'chat-message--user' : 'chat-message--ai'}`}>
      <div className="chat-message__meta">{isUser ? '你' : 'CodePilot AI'}</div>
      <div className="chat-message__body">
        {parts.map((part, index) => {
          if (part.type === 'code') {
            return (
              <div className="chat-code-wrap" key={`${role}-code-${index}`}>
                <div className="chat-code-lang">{part.language}</div>
                <SyntaxHighlighter
                  language={part.language}
                  style={oneDark}
                  customStyle={{
                    margin: 0,
                    background: 'rgba(5, 8, 20, 0.9)',
                    borderRadius: '10px',
                    border: '1px solid rgba(148, 163, 184, 0.2)',
                    fontSize: '0.84rem',
                  }}
                  codeTagProps={{ style: { fontFamily: 'var(--font-mono)' } }}
                >
                  {part.content}
                </SyntaxHighlighter>
              </div>
            )
          }

          return (
            <p key={`${role}-text-${index}`} className="chat-message__text">
              {part.content}
            </p >
          )
        })}
      </div>
    </div>
  )
}

export default function ChatPage() {
  const [conversationId, setConversationId] = useState(() => {
    if (typeof window === 'undefined') return ''
    return localStorage.getItem(CHAT_CONVERSATION_KEY) || ''
  })
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        '你好，我是 CodePilot AI。你可以把需求、报错日志或代码片段发给我，我会给出可执行建议。',
    },
  ])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (conversationId) {
      localStorage.setItem(CHAT_CONVERSATION_KEY, conversationId)
    } else {
      localStorage.removeItem(CHAT_CONVERSATION_KEY)
    }
  }, [conversationId])

  const handleSubmit = async (event) => {
    event.preventDefault()
    const query = input.trim()
    if (!query || loading) return

    const userMessage = { role: 'user', content: query }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setError('')
    setLoading(true)

    try {
      const response = await fetch(DIFY_PROXY_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: {},
          query,
          response_mode: 'blocking',
          user: 'test-user',
          ...(conversationId ? { conversation_id: conversationId } : {}),
        }),
      })

      if (!response.ok) {
        throw new Error(`请求失败：${response.status}`)
      }

      const data = await response.json()
      const answer = data.answer || '接口返回成功，但未获取到可展示的回复内容。'
      if (typeof data.conversation_id === 'string' && data.conversation_id) {
        setConversationId(data.conversation_id)
      }
      setMessages((prev) => [...prev, { role: 'assistant', content: answer }])
    } catch (err) {
      const message = err instanceof Error ? err.message : '请求失败，请稍后重试。'
      setError(message)
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: `抱歉，本次请求失败：${message}` },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="chat-page">
      <div className="chat-page__bg" aria-hidden />
      <header className="chat-topbar">
        <div className="chat-topbar__inner">
          <div className="chat-brand">CodePilot Chat</div>
          <Link className="chat-back" to="/">
            返回首页
          </Link>
        </div>
      </header>

      <main className="chat-layout">
        <section className="chat-panel">
          <div className="chat-panel__title-wrap">
            <h1 className="chat-panel__title">AI 编程聊天</h1>
            <p className="chat-panel__subtitle">已接入 Dify Workflow，可直接进行编程对话。</p >
          </div>

          <div className="chat-thread">
            {messages.map((msg, idx) => (
              <MessageBubble key={`${msg.role}-${idx}`} role={msg.role} content={msg.content} />
            ))}
            {loading && (
              <div className="chat-loading" role="status" aria-live="polite">
                AI 正在思考中...
              </div>
            )}
          </div>

          <form className="chat-form" onSubmit={handleSubmit}>
            <textarea
              className="chat-input"
              placeholder="输入你的问题，例如：请帮我优化这段 React 组件渲染性能..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={4}
              disabled={loading}
            />
            <div className="chat-form__actions">
              <span className="chat-error">{error}</span>
              <button className="chat-send" type="submit" disabled={loading || !input.trim()}>
                {loading ? '发送中...' : '发送消息'}
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  )
}