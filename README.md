# Agent 编程 Wiki

面向开发者的 AI Agent 编程知识库，基于 VitePress 构建。

## 快速开始

```bash
# 安装依赖
npm install

# 本地开发
npm run docs:dev

# 构建
npm run docs:build

# 预览构建结果
npm run docs:preview
```

## 内容架构

- 01-基础概念 — Agent 本质、术语、能力模型
- 02-架构模式 — 8 大核心设计模式
- 03-核心组件 — 工具、记忆、ACI、状态管理
- 04-框架与生态 — LangChain、LangGraph、AutoGen 等
- 05-多Agent协作 — 协作模式、通信协议
- 06-最佳实践 — 简单性、透明度、防护栏
- 07-安全与治理 — 安全、可观测性、对齐
- 08-案例研究 — 代码生成、研究、客服等场景
- 09-资源 — 阅读推荐、工具清单、社区

## 部署

构建输出到 `docs/.vitepress/dist`，支持 GitHub Pages 自动部署。

详见 `.github/workflows/deploy.yml`。
