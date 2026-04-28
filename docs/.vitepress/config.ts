import { defineConfig } from 'vitepress'
import { sidebar } from './sidebar'

export default defineConfig({
  title: 'Agent 编程 Wiki',
  description: '面向开发者的 AI Agent 编程知识库',
  lang: 'zh-CN',

  srcDir: '.',
  outDir: './.vitepress/dist',
  assetsDir: 'assets',
  base: '/',
  ignoreDeadLinks: true,

  head: [
    ['link', { rel: 'icon', href: '/logo.svg', type: 'image/svg+xml' }],
    ['meta', { name: 'theme-color', content: '#2563EB' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'Agent 编程 Wiki' }],
    ['meta', { property: 'og:description', content: '面向开发者的 AI Agent 编程知识库' }],
    // Google Fonts: Inter + Noto Sans SC
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Noto+Sans+SC:wght@400;500;600;700&display=swap' }]
  ],

  themeConfig: {
    logo: '/logo.svg',
    nav: [
      { text: '首页', link: '/' },
      { text: '基础概念', link: '/01-基础概念/什么是Agent' },
      { text: '架构模式', link: '/02-架构模式/00-模式总览' },
      { text: '核心组件', link: '/03-核心组件/00-组件总览' },
      { text: '框架与生态', link: '/04-框架与生态/00-框架对比' },
    ],

    sidebar,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/your-org/agent-programming-wiki' }
    ],

    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭'
                }
              }
            }
          }
        }
      }
    },

    editLink: {
      pattern: 'https://github.com/your-org/agent-programming-wiki/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页'
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    },

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    outline: {
      label: '页面导航'
    },

    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    langMenuLabel: '多语言'
  },

  markdown: {
    lineNumbers: true,
    config: (md) => {
      // Wiki 链接转换: [[页面标题]] 或 [[页面标题|显示文本]]
      md.inline.ruler.before('link', 'wiki_link', (state, silent) => {
        const max = state.posMax
        if (state.src.charCodeAt(state.pos) !== 0x5B /* [ */) return false
        if (state.src.charCodeAt(state.pos + 1) !== 0x5B /* [ */) return false

        let end = state.pos + 2
        while (end < max) {
          if (state.src.charCodeAt(end) === 0x5D /* ] */ &&
              state.src.charCodeAt(end + 1) === 0x5D /* ] */) {
            break
          }
          end++
        }

        if (end >= max) return false
        if (!silent) {
          const content = state.src.slice(state.pos + 2, end)
          const parts = content.split('|')
          const pageTitle = parts[0].trim()
          const displayText = parts[1] ? parts[1].trim() : pageTitle

          // 根据 sidebar 映射查找链接
          let link = findLink(pageTitle)
          if (!link) {
            link = '/' + pageTitle.replace(/\s+/g, '-')
          }

          const tokenOpen = state.push('link_open', 'a', 1)
          tokenOpen.attrSet('href', link)
          tokenOpen.attrSet('class', 'wiki-link')

          const tokenText = state.push('text', '', 0)
          tokenText.content = displayText

          state.push('link_close', 'a', -1)
        }

        state.pos = end + 2
        return true
      })
    }
  }
})

// 辅助函数：根据页面标题查找对应的链接
function findLink(title: string): string | null {
  const titleMap: Record<string, string> = {}

  // 从 sidebar 数据中提取映射
  for (const [prefix, sections] of Object.entries(sidebar)) {
    for (const section of sections) {
      for (const item of section.items) {
        if (typeof item === 'object' && 'text' in item) {
          titleMap[item.text] = item.link
          // 也添加不带路径前缀的键
          const basename = item.link.split('/').pop() || ''
          titleMap[basename] = item.link
        }
      }
    }
  }

  return titleMap[title] || null
}
