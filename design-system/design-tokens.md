# Agent 编程 Wiki — 视觉设计系统

## 设计原则

1. **清晰优先** — 信息层级明确，阅读无干扰
2. **技术专业** — 配色冷静克制，体现技术文档的可信度
3. **双模兼容** — 暗色/亮色模式视觉质量一致
4. **中文友好** — 针对中文排版优化字间距与行高
5. **Obsidian 一致** — 在 Obsidian 中打开时保持相近的视觉体验

---

## 配色方案

### 主色（Primary）— 靛蓝系

| Token | Light 模式 | Dark 模式 | 用途 |
|-------|-----------|-----------|------|
| `--vp-c-brand` | `#2563EB` | `#60A5FA` | 主链接、按钮、品牌标识 |
| `--vp-c-brand-light` | `#3B82F6` | `#93C5FD` | 悬停状态 |
| `--vp-c-brand-lighter` | `#60A5FA` | `#BFDBFE` | 焦点状态、轻强调 |
| `--vp-c-brand-dark` | `#1D4ED8` | `#3B82F6` | 按下状态 |
| `--vp-c-brand-darker` | `#1E40AF` | `#2563EB` | 深度强调 |

### 强调色（Accent）— 翠青系

| Token | Light 模式 | Dark 模式 | 用途 |
|-------|-----------|-----------|------|
| `--vp-c-accent` | `#059669` | `#34D399` | 成功提示、推荐标签 |
| `--vp-c-accent-bg` | `#D1FAE5` | `#064E3B` | 成功背景 |
| `--vp-c-warn` | `#D97706` | `#FBBF24` | 警告提示 |
| `--vp-c-warn-bg` | `#FEF3C7` | `#78350F` | 警告背景 |
| `--vp-c-danger` | `#DC2626` | `#F87171` | 错误提示 |
| `--vp-c-danger-bg` | `#FEE2E2` | `#7F1D1D` | 错误背景 |

### 中性色（Neutral）— 石板灰系

| Token | Light 模式 | Dark 模式 | 用途 |
|-------|-----------|-----------|------|
| `--vp-c-text-1` | `#0F172A` | `#F8FAFC` | 主标题、正文 |
| `--vp-c-text-2` | `#334155` | `#CBD5E1` | 次要文本 |
| `--vp-c-text-3` | `#64748B` | `#94A3B8` | 辅助文本、元信息 |
| `--vp-c-bg` | `#FFFFFF` | `#0F172A` | 页面背景 |
| `--vp-c-bg-alt` | `#F8FAFC` | `#1E293B` | 卡片、侧边栏背景 |
| `--vp-c-bg-elv` | `#FFFFFF` | `#1E293B` | 浮层背景 |
| `--vp-c-border` | `#E2E8F0` | `#334155` | 边框、分隔线 |
| `--vp-c-divider` | `#F1F5F9` | `#1E293B` | 轻分隔 |

### 代码块专用色

| Token | Light 模式 | Dark 模式 | 用途 |
|-------|-----------|-----------|------|
| `--vp-c-code-bg` | `#F1F5F9` | `#1E293B` | 代码背景 |
| `--vp-c-code-text` | `#334155` | `#E2E8F0` | 代码文本 |
| `--vp-c-code-border` | `#E2E8F0` | `#334155` | 代码块边框 |

---

## 排版规范

### 字体栈

```css
/* 西文 + 中文正文 */
--vp-font-family-base: "Inter", "Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif;

/* 代码字体 */
--vp-font-family-mono: "JetBrains Mono", "Fira Code", "SF Mono", "Noto Sans Mono CJK SC", monospace;
```

### 字号体系

| 层级 | 字号 | 字重 | 行高 | 字间距 | 用途 |
|------|------|------|------|--------|------|
| H1 | `2.25rem` (36px) | 700 | 1.2 | `-0.02em` | 页面标题 |
| H2 | `1.75rem` (28px) | 600 | 1.3 | `-0.01em` | 章节标题 |
| H3 | `1.375rem` (22px) | 600 | 1.4 | `0` | 小节标题 |
| H4 | `1.125rem` (18px) | 600 | 1.5 | `0` | 子节标题 |
| Body | `1rem` (16px) | 400 | 1.75 | `0.02em` | 正文 |
| Small | `0.875rem` (14px) | 400 | 1.6 | `0.01em` | 辅助文本 |
| Code | `0.875rem` (14px) | 400 | 1.6 | `0` | 代码 |

### 中文排版优化

- **行高**：正文使用 `1.75`，比西文更大的呼吸空间
- **字间距**：正文 `0.02em`，缓解中文字符的拥挤感
- **段间距**：段落间距 `1.5em`，清晰分段
- **标点挤压**：开启标点挤压（Obsidian 和 VitePress 均支持）
- **最大行宽**：正文容器最大宽度 `720px`，保证阅读舒适度

---

## 间距系统

| Token | 值 | 用途 |
|-------|-----|------|
| `--space-1` | `0.25rem` (4px) | 微间距 |
| `--space-2` | `0.5rem` (8px) | 内联元素间距 |
| `--space-3` | `0.75rem` (12px) | 紧凑间距 |
| `--space-4` | `1rem` (16px) | 标准间距 |
| `--space-5` | `1.5rem` (24px) | 组件间距 |
| `--space-6` | `2rem` (32px) | 区块间距 |
| `--space-8` | `3rem` (48px) | 大区块间距 |
| `--space-10` | `4rem` (64px) | 页面级间距 |

---

## 组件规范

### 链接

- 默认：`--vp-c-brand`，下划线透明
- 悬停：`--vp-c-brand-light`，下划线显示
- 已访问：与默认一致（技术文档不强调访问状态）

### 代码块

- 圆角：`8px`
- 内边距：`1.25rem`
- 字体：`--vp-font-family-mono`
- 行号：可选，使用 `--vp-c-text-3` 颜色
- 语法高亮：见下方配色

### 提示框（Callout）

| 类型 | 边框 | 背景 | 图标 |
|------|------|------|------|
| Info | `--vp-c-brand` | `rgba(37, 99, 235, 0.08)` | ℹ️ |
| Tip | `--vp-c-accent` | `rgba(5, 150, 105, 0.08)` | 💡 |
| Warning | `--vp-c-warn` | `rgba(217, 119, 6, 0.08)` | ⚠️ |
| Danger | `--vp-c-danger` | `rgba(220, 38, 38, 0.08)` | 🚫 |

---

## 代码语法高亮配色

基于 **GitHub Light / GitHub Dark** 变体，调整为设计系统色调。

### Light 模式

| Token 类型 | 颜色 |
|-----------|------|
| Comment | `#6E7781` |
| Keyword | `#CF222E` |
| String | `#0A3069` |
| Number | `#0550AE` |
| Function | `#8250DF` |
| Class/Type | `#953800` |
| Variable | `#24292F` |
| Operator | `#CF222E` |

### Dark 模式

| Token 类型 | 颜色 |
|-----------|------|
| Comment | `#8B949E` |
| Keyword | `#FF7B72` |
| String | `#A5D6FF` |
| Number | `#79C0FF` |
| Function | `#D2A8FF` |
| Class/Type | `#FFA657` |
| Variable | `#C9D1D9` |
| Operator | `#FF7B72` |

---

## Obsidian 兼容性说明

设计系统与 Obsidian 默认主题的关键对应：

| 本系统 Token | Obsidian 变量 | 备注 |
|-------------|--------------|------|
| `--vp-c-bg` | `--background-primary` | 页面背景 |
| `--vp-c-bg-alt` | `--background-secondary` | 侧边栏 |
| `--vp-c-text-1` | `--text-normal` | 正文 |
| `--vp-c-text-2` | `--text-muted` | 次要文本 |
| `--vp-c-brand` | `--interactive-accent` | 强调色 |
| `--vp-c-border` | `--background-modifier-border` | 边框 |

**注意**：Obsidian 主题使用 CSS 变量覆盖即可实现视觉一致。建议在 Obsidian 中创建一个自定义 CSS snippet 来同步配色。

---

## Logo 设计

### 文字 Logo

```
◆ AgentWiki
```

- **符号**：`◆` 菱形，代表 Agent 的决策节点/知识结晶
- **文字**：`AgentWiki`，`Agent` 部分使用 `--vp-c-brand` 色，`Wiki` 使用 `--vp-c-text-1`
- **字体**：Inter, weight 700
- **尺寸比例**：符号高度与文字大写高度一致

### 完整版（网站头部）

```
◆ Agent 编程 Wiki
```

- 第一行：`◆ AgentWiki`（大号，加粗）
- 第二行：`Agent 编程知识库`（小号，muted 色）

### 图标版（Favicon）

- 单独的 `◆` 菱形
- Light 模式：靛蓝 `#2563EB` 菱形，白色背景
- Dark 模式：白色菱形，靛蓝 `#2563EB` 背景

---

## 文件清单

| 文件 | 说明 |
|------|------|
| `design-tokens.md` | 本文件，设计规范总览 |
| `vitepress-theme.css` | VitePress 主题 CSS 变量配置 |
| `logo.svg` | 文字 Logo SVG |
| `obsidian-theme.css` | Obsidian 自定义主题 CSS（可选） |
