import { DefaultTheme } from 'vitepress'

export const sidebar: DefaultTheme.Sidebar = {
  '/01-基础概念/': [
    {
      text: '基础概念',
      items: [
        { text: '什么是Agent', link: '/01-基础概念/什么是Agent' },
        { text: 'Agent vs 工作流', link: '/01-基础概念/Agent-vs-工作流' },
        { text: '核心术语表', link: '/01-基础概念/核心术语表' },
        { text: 'Agent 能力模型', link: '/01-基础概念/Agent-能力模型' },
      ]
    }
  ],
  '/02-架构模式/': [
    {
      text: '架构模式',
      items: [
        { text: '模式总览', link: '/02-架构模式/00-模式总览' },
        { text: '提示链', link: '/02-架构模式/01-提示链' },
        { text: '路由', link: '/02-架构模式/02-路由' },
        { text: '并行化', link: '/02-架构模式/03-并行化' },
        { text: '编排器-工作者', link: '/02-架构模式/04-编排器-工作者' },
        { text: '评估器-优化器', link: '/02-架构模式/05-评估器-优化器' },
        { text: 'ReAct', link: '/02-架构模式/06-ReAct' },
        { text: 'Plan and Execute', link: '/02-架构模式/07-Plan-and-Execute' },
        { text: '自主Agent', link: '/02-架构模式/08-自主Agent' },
      ]
    }
  ],
  '/03-核心组件/': [
    {
      text: '核心组件',
      items: [
        { text: '组件总览', link: '/03-核心组件/00-组件总览' },
        { text: '工具设计', link: '/03-核心组件/01-工具设计' },
        { text: '函数调用', link: '/03-核心组件/02-函数调用' },
        { text: '记忆管理', link: '/03-核心组件/03-记忆管理' },
        { text: 'ACI设计', link: '/03-核心组件/04-ACI设计' },
        { text: '状态管理', link: '/03-核心组件/05-状态管理' },
      ]
    }
  ],
  '/04-框架与生态/': [
    {
      text: '框架与生态',
      items: [
        { text: '框架对比', link: '/04-框架与生态/00-框架对比' },
        { text: 'LangChain', link: '/04-框架与生态/01-LangChain' },
        { text: 'LangGraph', link: '/04-框架与生态/02-LangGraph' },
        { text: 'AutoGen', link: '/04-框架与生态/03-AutoGen' },
        { text: 'CrewAI', link: '/04-框架与生态/04-CrewAI' },
        { text: 'MCP协议', link: '/04-框架与生态/05-MCP协议' },
      ]
    }
  ],
  '/05-多Agent协作/': [
    {
      text: '多Agent协作',
      items: [
        { text: '协作总览', link: '/05-多Agent协作/00-协作总览' },
        { text: '协作模式', link: '/05-多Agent协作/01-协作模式' },
        { text: '通信协议', link: '/05-多Agent协作/02-通信协议' },
        { text: '冲突解决', link: '/05-多Agent协作/03-冲突解决' },
      ]
    }
  ],
  '/06-最佳实践/': [
    {
      text: '最佳实践',
      items: [
        { text: '简单性原则', link: '/06-最佳实践/01-简单性原则' },
        { text: '透明度设计', link: '/06-最佳实践/02-透明度设计' },
        { text: '防护栏与沙箱', link: '/06-最佳实践/03-防护栏与沙箱' },
        { text: '错误恢复', link: '/06-最佳实践/04-错误恢复' },
        { text: '性能评估', link: '/06-最佳实践/05-性能评估' },
      ]
    }
  ],
  '/07-安全与治理/': [
    {
      text: '安全与治理',
      items: [
        { text: '安全防护栏', link: '/07-安全与治理/01-安全防护栏' },
        { text: '可观测性', link: '/07-安全与治理/02-可观测性' },
        { text: '人类介入设计', link: '/07-安全与治理/03-人类介入设计' },
        { text: '对齐与伦理', link: '/07-安全与治理/04-对齐与伦理' },
      ]
    }
  ],
  '/08-案例研究/': [
    {
      text: '案例研究',
      items: [
        { text: '代码生成Agent', link: '/08-案例研究/01-代码生成Agent' },
        { text: '研究Agent', link: '/08-案例研究/02-研究Agent' },
        { text: '客户服务Agent', link: '/08-案例研究/03-客户服务Agent' },
        { text: '计算机使用Agent', link: '/08-案例研究/04-计算机使用Agent' },
      ]
    }
  ],
  '/09-资源/': [
    {
      text: '资源',
      items: [
        { text: '推荐阅读', link: '/09-资源/推荐阅读' },
        { text: '工具清单', link: '/09-资源/工具清单' },
        { text: '社区与会议', link: '/09-资源/社区与会议' },
      ]
    }
  ]
}
