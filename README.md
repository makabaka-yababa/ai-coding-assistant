CodePilot AI 编程助手
 
面向开发者的AI编程工具，支持代码生成、代码解释、Bug修复三大核心功能，基于React + Node.js + Dify构建，前后端分离架构，安全开源可直接用于面试展示。
 
✨ 核心功能
 
- 🚀 代码生成：自然语言描述需求，生成可运行、带注释的代码
- 📝 代码解释：粘贴代码，逐行拆解逻辑与数据流
- 🔧 Bug修复：粘贴报错与上下文，定位根因并给出修复方案
- 💬 多轮对话记忆：基于历史代码迭代修改，支持连续开发
- 🎨 深色科技风UI：玻璃态卡片、代码高亮，符合开发者审美
- 📚 产品文档中心：完整用户引导与API说明
 
🛠️ 技术栈
 
- 前端：React 18 + Vite + React Router + react-syntax-highlighter
- 后端：Node.js + Express（Dify API代理，隐藏密钥）
- AI服务：Dify 平台 + 大语言模型
- 安全：前后端分离，密钥仅存后端，.gitignore严格管控
- 部署：支持Vercel/Render一键部署，可在线演示
 
🚀 本地运行步骤
 
1. 启动后端（Dify API代理）
 
bash
  
# 进入后端目录
cd server

# 安装依赖
npm install

# 复制环境变量模板，填入你的真实Dify API Key
cp .env.example .env

# 启动后端服务
npm start
 
 
2. 启动前端
 
bash
  
# 另开终端，进入项目根目录
cd ai-coding-assistant

# 安装依赖
npm install

# 启动前端开发服务
npm run dev
 
 
🔒 安全设计说明
 
- 密钥隔离：所有Dify API密钥仅存储在后端，前端完全无密钥，彻底杜绝泄露风险
- 环境变量管控：通过 .gitignore 强制忽略真实 .env 文件，仅上传 .env.example 模板
- 前后端分离架构：前端仅调用自有后端接口，不直接访问第三方AI服务，符合企业级安全规范
- 开源安全：可安全上传GitHub，无密钥泄露风险，面试官可直接查看完整代码
 
📄 项目结构
 
plaintext
  
ai-coding-assistant/
├── src/                # 前端页面（首页/代码生成/代码解释/Bug修复/文档中心）
├── server/             # 后端代理（仅转发Dify API请求，隐藏密钥）
│   ├── server.js       # 后端代理服务
│   ├── package.json    # 后端依赖配置
│   └── .env.example    # 环境变量模板（可上传，无真实密钥）
├── .gitignore          # Git忽略配置，保护.env等敏感文件
├── package.json        # 前端依赖配置
└── README.md           # 项目说明文档
 
 
📦 部署指南（面试在线演示）
 
Vercel一键部署
 
1. 将项目推送到GitHub后，登录Vercel，导入项目仓库
2. 框架选择「Vite」，环境变量在Vercel后台配置（仅后端可用，前端不可见）
3. 点击「Deploy」，1-2分钟完成部署，生成在线访问地址
4. 将在线地址添加到简历，面试官可直接在线体验项目功能
 
🎯 面试亮点总结
 
本项目为独立开发的AI编程助手，核心亮点如下：
 
1. 安全架构升级：从前端直连Dify重构为前后端分离的Node.js代理架构，密钥仅存后端，彻底杜绝泄露风险
2. 完整功能闭环：实现代码生成、解释、Bug修复三大核心能力，支持多轮对话记忆，满足真实开发需求
3. 工程化规范：规范Git提交流程，配置标准.gitignore，项目结构清晰，符合企业级开发标准
4. 可演示性强：已部署在线版本，代码开源至GitHub，面试官可直接查看代码、体验功能
 
📌 补充说明
 
- 本项目仅用于学习与面试展示，请勿用于生产环境
- 若需商用，请自行申请Dify等AI服务的商用授权
- 如有问题，可通过GitHub Issues反馈