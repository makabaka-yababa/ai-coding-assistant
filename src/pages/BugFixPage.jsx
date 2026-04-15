import FeatureToolPage from './FeatureToolPage.jsx'

export default function BugFixPage() {
  return (
    <FeatureToolPage
      title="Bug 修复"
      subtitle="输入报错信息和上下文，AI 帮你定位根因并提供修复方案。"
      placeholder="例如：TypeError: Cannot read properties of undefined，发生在用户首次登录后刷新页面。"
      buttonText="分析并修复"
      introMessage="这里是 Bug 修复模式。请附上报错、复现步骤和关键代码，我会快速定位问题。"
    />
  )
}
