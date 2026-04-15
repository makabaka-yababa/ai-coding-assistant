import FeatureToolPage from './FeatureToolPage.jsx'

export default function CodeExplainPage() {
  return (
    <FeatureToolPage
      title="代码解释"
      subtitle="贴入代码片段，AI 将分层解释逻辑、数据流与关键细节。"
      placeholder="例如：请解释这段递归代码的执行流程，并指出可能的性能瓶颈。"
      buttonText="解释代码"
      introMessage="这里是代码解释模式。你可以粘贴任意代码，我会用清晰方式讲解每一步行为。"
    />
  )
}
