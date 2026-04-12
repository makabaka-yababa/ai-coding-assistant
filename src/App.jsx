import { useState } from 'react'

function IconLogo() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M8 9h5v2H8V9zm0 4h8v2H8v-2z"
        fill="currentColor"
        className="opacity-90"
      />
      <path
        d="M16 8l4 4-4 4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconSparkles() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
      <path d="M20 3v4M22 5h-4M4 17v2M5 18H3" />
    </svg>
  )
}

function IconBook() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      <path d="M8 7h6M8 11h4" strokeLinecap="round" />
    </svg>
  )
}

function IconBug() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M8 2v4M16 2v4" strokeLinecap="round" />
      <rect x="7" y="6" width="10" height="12" rx="2" />
      <path d="M3 10h3M18 10h3M3 14h3M18 14h3" strokeLinecap="round" />
      <path d="M12 18v4M9 22h6" strokeLinecap="round" />
    </svg>
  )
}

function IconMenu({ open }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      {open ? (
        <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
      ) : (
        <>
          <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
        </>
      )}
    </svg>
  )
}

const features = [
  {
    id: 'generate',
    title: '代码生成',
    desc: '用自然语言描述需求，即时获得可运行、带注释的实现方案，支持多种语言与框架。',
    icon: IconSparkles,
    iconMod: 'feature-card__icon--cyan',
  },
  {
    id: 'explain',
    title: '代码解释',
    desc: '逐行拆解复杂逻辑，梳理调用关系与数据流，让接手与评审都更轻松。',
    icon: IconBook,
    iconMod: 'feature-card__icon--violet',
  },
  {
    id: 'fix',
    title: 'Bug 修复',
    desc: '粘贴报错与上下文，定位根因并给出补丁与回归建议，减少来回试错时间。',
    icon: IconBug,
    iconMod: 'feature-card__icon--rose',
  },
]

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="app">
      <div className="app__bg" aria-hidden />
      <div className="app__grid" aria-hidden />

      <header className="nav">
        <div className="nav__inner">
          <a href="#" className="nav__brand" onClick={closeMenu}>
            <span className="nav__logo">
              <IconLogo />
            </span>
            CodePilot
          </a>

          <nav className="nav__links" aria-label="主导航">
            <a className="nav__link" href="#features">
              功能
            </a>
            <a className="nav__link" href="#hero">
              产品
            </a>
            <a className="nav__link" href="#footer">
              关于
            </a>
          </nav>

          <div className="nav__actions">
            <button
              type="button"
              className="nav__menu-btn"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? '关闭菜单' : '打开菜单'}
              onClick={() => setMenuOpen((o) => !o)}
            >
              <IconMenu open={menuOpen} />
            </button>
            <a className="nav__cta" href="#hero">
              免费开始
            </a>
          </div>
        </div>

        <div
          id="mobile-nav"
          className={`nav__drawer${menuOpen ? ' nav__drawer--open' : ''}`}
          hidden={!menuOpen}
        >
          <a className="nav__drawer-link" href="#features" onClick={closeMenu}>
            功能
          </a>
          <a className="nav__drawer-link" href="#hero" onClick={closeMenu}>
            产品
          </a>
          <a className="nav__drawer-link" href="#footer" onClick={closeMenu}>
            关于
          </a>
          <button type="button" className="nav__drawer-cta" onClick={closeMenu}>
            免费开始
          </button>
        </div>
      </header>

      <main className="main">
        <section id="hero" className="hero">
          <div className="hero__badge">
            <span className="hero__badge-dot" />
            基于大模型的智能编程工作台
          </div>
          <h1 className="hero__title">
            <span className="hero__gradient">写得更少，交付更多</span>
          </h1>
          <p className="hero__desc">
            CodePilot 将生成、解释与排错串联在同一工作流里，让你专注架构与业务，把重复劳动交给 AI。
          </p>
          <div className="hero__cta-row">
            <a className="hero__btn hero__btn--primary" href="#features">
              探索功能
            </a>
            <a className="hero__btn hero__btn--ghost" href="#footer">
              查看文档
            </a>
          </div>
          <div className="hero__stats">
            <div className="hero__stat">
              <div className="hero__stat-value">40+</div>
              <div className="hero__stat-label">语言与栈</div>
            </div>
            <div className="hero__stat">
              <div className="hero__stat-value">{'<2s'}</div>
              <div className="hero__stat-label">平均首 token</div>
            </div>
            <div className="hero__stat">
              <div className="hero__stat-value">SOC2</div>
              <div className="hero__stat-label">企业合规路线</div>
            </div>
          </div>
        </section>

        <section id="features" className="features" aria-labelledby="features-title">
          <div className="features__head">
            <p className="features__label">核心能力</p>
            <h2 id="features-title" className="features__title">
              一条流水线，覆盖日常开发场景
            </h2>
          </div>
          <div className="features__grid">
            {features.map((f) => {
              const Icon = f.icon
              return (
                <article key={f.id} className="feature-card">
                  <div className={`feature-card__icon ${f.iconMod}`}>
                    <Icon />
                  </div>
                  <h3 className="feature-card__title">{f.title}</h3>
                  <p className="feature-card__text">{f.desc}</p>
                  <span className="feature-card__link">
                    了解更多
                    <span className="feature-card__arrow" aria-hidden>
                      →
                    </span>
                  </span>
                </article>
              )
            })}
          </div>
        </section>
      </main>

      <footer id="footer" className="footer">
        <div className="footer__inner">
          <div className="footer__brand">
            <div className="footer__logo-row">
              <span className="nav__logo">
                <IconLogo />
              </span>
              CodePilot
            </div>
            <p className="footer__tagline">为团队打造的 AI 编程助手，安全、可观测、可定制。</p>
          </div>
          <div className="footer__cols">
            <div>
              <h3 className="footer__col-title">产品</h3>
              <a className="footer__link" href="#features">
                功能总览
              </a>
              <a className="footer__link" href="#hero">
                定价
              </a>
              <a className="footer__link" href="#footer">
                更新日志
              </a>
            </div>
            <div>
              <h3 className="footer__col-title">开发者</h3>
              <a className="footer__link" href="#footer">
                API 文档
              </a>
              <a className="footer__link" href="#footer">
                SDK
              </a>
              <a className="footer__link" href="#footer">
                状态页
              </a>
            </div>
            <div>
              <h3 className="footer__col-title">公司</h3>
              <a className="footer__link" href="#footer">
                关于我们
              </a>
              <a className="footer__link" href="#footer">
                招聘
              </a>
              <a className="footer__link" href="#footer">
                联系
              </a>
            </div>
          </div>
        </div>
        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} CodePilot. 保留所有权利。</span>
          <div className="footer__legal">
            <a href="#footer">隐私政策</a>
            <a href="#footer">服务条款</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
