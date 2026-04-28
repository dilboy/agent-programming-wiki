# Agent 编程 Wiki — 信息架构规划

## 目标受众
- 开发者（初级 → 高级）
- 系统架构师
- AI Agent 产品工程师

## 技术约束
1. **Obsidian 兼容**：标准 Markdown + YAML frontmatter + Wiki 链接 + Mermaid 图表
2. **网站展示**：通过 VitePress 构建静态站点并部署
3. **双语支持**：中文为主，关键术语附英文

## 内容架构

```
agent-programming-wiki/
├── index.md                    # 首页 / 导航
├── 01-基础概念/
│   ├── 什么是Agent.md
│   ├── Agent-vs-工作流.md
│   ├── 核心术语表.md
│   └── Agent-能力模型.md
├── 02-架构模式/
│   ├── 00-模式总览.md
│   ├── 01-提示链.md
│   ├── 02-路由.md
│   ├── 03-并行化.md
│   ├── 04-编排器-工作者.md
│   ├── 05-评估器-优化器.md
│   ├── 06-ReAct.md
│   ├── 07-Plan-and-Execute.md
│   └── 08-自主Agent.md
├── 03-核心组件/
│   ├── 00-组件总览.md
│   ├── 01-工具设计.md
│   ├── 02-函数调用.md
│   ├── 03-记忆管理.md
│   ├── 04-ACI设计.md
│   └── 05-状态管理.md
├── 04-框架与生态/
│   ├── 00-框架对比.md
│   ├── 01-LangChain.md
│   ├── 02-LangGraph.md
│   ├── 03-AutoGen.md
│   ├── 04-CrewAI.md
│   └── 05-MCP协议.md
├── 05-多Agent协作/
│   ├── 00-协作总览.md
│   ├── 01-协作模式.md
│   ├── 02-通信协议.md
│   └── 03-冲突解决.md
├── 06-最佳实践/
│   ├── 01-简单性原则.md
│   ├── 02-透明度设计.md
│   ├── 03-防护栏与沙箱.md
│   ├── 04-错误恢复.md
│   └── 05-性能评估.md
├── 07-安全与治理/
│   ├── 01-安全防护栏.md
│   ├── 02-可观测性.md
│   ├── 03-人类介入设计.md
│   └── 04-对齐与伦理.md
├── 08-案例研究/
│   ├── 01-代码生成Agent.md
│   ├── 02-研究Agent.md
│   ├── 03-客户服务Agent.md
│   └── 04-计算机使用Agent.md
└── 09-资源/
    ├── 推荐阅读.md
    ├── 工具清单.md
    └── 社区与会议.md
```

## 写作规范

### Frontmatter 模板
```yaml
---
title: 页面标题
description: 一句话描述
tags: [tag1, tag2]
category: 所属分类
difficulty: 初级|中级|高级
created: 2026-04-27
updated: 2026-04-27
---
```

### 链接规范
- 内部链接：`[[页面标题]]` 或 `[[页面标题|显示文本]]`
- 外部链接：标准 Markdown `[text](url)`
- 图片：相对路径 `![alt](./assets/image.png)`

### 图表规范
- 优先使用 Mermaid 语法（Obsidian 和 VitePress 均支持）
- 架构图用 `graph TD` 或 `graph LR`
- 时序图用 `sequenceDiagram`

## VitePress 站点配置要点

```
docs/
├── .vitepress/
│   ├── config.ts          # 站点配置
│   ├── theme/
│   │   └── index.ts       # 自定义主题
│   └── sidebar.ts         # 侧边栏导航
├── public/                # 静态资源
└── [wiki内容目录...]
```

### 关键插件
- `vitepress-plugin-mermaid` — Mermaid 图表支持
- `vitepress-plugin-search` — 全文搜索
- Obsidian 风格 Wiki 链接转换

## 部署策略
1. 本地构建：`npm run docs:build`
2. 输出目录：`docs/.vitepress/dist`
3. 部署目标：GitHub Pages / Vercel / Netlify
