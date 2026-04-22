import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import './feature-tool.css'

const DIFY_PROXY_URL = '/api/chat'

function cleanMarkdownText(text) {
  return text
    .replace(/\r/g, '')
    .replace(/^#{1,6}\s*/gm, '')
    .replace(/^\s*[-*+]\s+/gm, '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .trim()
}

function splitReply(content) {
  const result = []
  const codeRegex = /```(\w+)?\n([\s\S]*?)```/g
  let last = 0
  let match = codeRegex.exec(content)

  while (match) {
    if (match.index > last) {
      const textPart = cleanMarkdownText(content.slice(last, match.index))
      if (textPart) result.push({ type: 'text', value: textPart })
    }

    result.push({
      type: 'code',
      language: match[1] || 'text',
      value: match[2].trimEnd(),
    })
    last = codeRegex.lastIndex
    match = codeRegex.exec(content)
  }

  if (last < content.length) {
    const tail = cleanMarkdownText(content.slice(last))
    if (tail) result.push({ type: 'text', value: tail })
  }

  return result
}

export default function FeatureToolPage({ title, subtitle, placeholder, buttonText, introMessage }) {
  const storageKey = `codepilot_conversation_${title}`
  const [conversationId, setConversationId] = useState(() => {
    if (typeof window === 'undefined') return ''
    return localStorage.getItem(storageKey) || ''
  })
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: introMessage,
    },
  ])

  const canSubmit = input.trim().length > 0 && !loading

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (conversationId) {
      localStorage.setItem(storageKey, conversationId)
    } else {
      localStorage.removeItem(storageKey)
    }
  }, [conversationId, storageKey])

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!canSubmit) return

    const query = input.trim()
    setInput('')
    setError('')
    setLoading(true)
    setMessages((prev) => [...prev, { role: 'user', content: query }])

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
      const answer = typeof data.answer === 'string' && data.answer.trim() ? data.answer : '未获取到有效回复。'
      if (typeof data.conversation_id === 'string' && data.conversation_id) {
        setConversationId(data.conversation_id)
      }
      setMessages((prev) => [...prev, { role: 'assistant', content: answer }])
    } catch (err) {
      const msg = err instanceof Error ? err.message : '请求失败，请稍后重试。'
      setError(msg)
      setMessages((prev) => [...prev, { role: 'assistant', content: `请求失败：${msg}` }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="tool-page">
      <div className="tool-page__bg" aria-hidden />
      <main className="tool-page__container">
        <header className="tool-page__header">
          <Link className="tool-page__back" to="/">
            返回首页
          </Link>
          <h1 className="tool-page__title">{title}</h1>
          <p className="tool-page__subtitle">{subtitle}</p>
        </header>

        <section className="tool-page__chat-card">
          <div className="tool-page__messages">
            {messages.map((message, index) => {
              const blocks = splitReply(message.content)
              return (
                <article
                  key={`${message.role}-${index}`}
                  className={`tool-msg ${message.role === 'user' ? 'tool-msg--user' : 'tool-msg--ai'}`}
                >
                  <div className="tool-msg__meta">{message.role === 'user' ? '你' : 'AI 助手'}</div>
                  <div className="tool-msg__body">
                    {blocks.map((block, blockIndex) => {
                      if (block.type === 'code') {
                        return (
                          <div key={`code-${blockIndex}`} className="tool-code">
                            <div className="tool-code__lang">{block.language}</div>
                            <SyntaxHighlighter
                              language={block.language}
                              style={oneDark}
                              customStyle={{
                                margin: 0,
                                borderRadius: '12px',
                                border: '1px solid rgba(148, 163, 184, 0.22)',
                                background: 'rgba(3, 8, 20, 0.88)',
                                fontSize: '0.85rem',
                                lineHeight: 1.6,
                              }}
                              codeTagProps={{ style: { fontFamily: 'var(--font-mono)' } }}
                            >
                              {block.value}
                            </SyntaxHighlighter>
                          </div>
                        )
                      }

                      return (
                        <p key={`text-${blockIndex}`} className="tool-msg__text">
                          {block.value}
                        </p>
                      )
                    })}
                  </div>
                </article>
              )
            })}
            {loading && (
              <div className="tool-page__loading" role="status" aria-live="polite">
                <span className="tool-dot" />
                <span className="tool-dot" />
                <span className="tool-dot" />
                AI 正在处理中...
              </div>
            )}
          </div>

          <form className="tool-page__form" onSubmit={handleSubmit}>
            <textarea
              className="tool-page__textarea"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder={placeholder}
              rows={5}
              disabled={loading}
            />
            <div className="tool-page__actions">
              <span className="tool-page__error">{error}</span>
              <button className="tool-page__submit" type="submit" disabled={!canSubmit}>
                {loading ? '处理中...' : buttonText}
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  )
}
