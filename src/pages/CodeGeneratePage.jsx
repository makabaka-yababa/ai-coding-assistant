import FeatureToolPage from './FeatureToolPage.jsx'

export default function CodeGeneratePage() {
  return (
    <FeatureToolPage
      title="代码生成"
      subtitle="描述你的需求，AI 将给出可运行实现与结构化说明。"
      placeholder="例如：帮我写一个 React 自定义 Hook，用于防抖搜索并带 TypeScript 类型。"
      buttonText="生成代码"
      introMessage="这里是代码生成模式。请告诉我目标语言、框架与功能目标，我会输出可直接使用的代码。"
    />
  )
}
