import { Link } from 'react-router-dom'
import './docs.css'

const sections = [
  {
    title: '快速开始',
    items: ['连接 Dify Key', '选择能力页（生成/解释/修复）', '开始多轮对话并持续追问'],
  },
  {
    title: '核心能力',
    items: ['代码生成：从需求到可运行实现', '代码解释：拆解逻辑与数据流', 'Bug 修复：定位根因并给出补丁建议'],
  },
  {
    title: '工程特性',
    items: ['支持多轮上下文记忆', '代码块自动高亮（oneDark）', '统一深色科技风与玻璃态 UI'],
  },
]

const apiRows = [
  ['Endpoint', 'http://localhost:3001/api/chat'],
  ['Method', 'POST'],
  ['Response Mode', 'blocking'],
  ['Auth', 'Bearer API Key'],
]

export default function DocsPage() {
  return (
    <div className="docs-page">
      <div className="docs-page__bg" aria-hidden />
      <main className="docs-page__container">
        <header className="docs-page__hero">
          <Link className="docs-page__back" to="/">
            返回首页
          </Link>
          <h1 className="docs-page__title">CodePilot 文档中心</h1>
          <p className="docs-page__subtitle">
            面向团队与个人开发者的 AI 编程助手指南，覆盖上手流程、能力说明与接口规范。
          </p>
          <div className="docs-page__badge-row">
            <span className="docs-badge">Production Ready</span>
            <span className="docs-badge">Secure by Design</span>
            <span className="docs-badge">Modern Dev UX</span>
          </div>
        </header>

        <section className="docs-grid">
          {sections.map((section) => (
            <article key={section.title} className="docs-card">
              <h2 className="docs-card__title">{section.title}</h2>
              <ul className="docs-card__list">
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <section className="docs-table-card" aria-label="API 摘要">
          <h2 className="docs-table-card__title">API 摘要</h2>
          <div className="docs-table">
            {apiRows.map(([k, v]) => (
              <div className="docs-table__row" key={k}>
                <div className="docs-table__key">{k}</div>
                <div className="docs-table__value">{v}</div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
