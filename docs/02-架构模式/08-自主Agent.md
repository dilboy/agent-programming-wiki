---
title: 自主Agent
description: Autonomous Agent 模式——完全自主决策的高级 Agent 架构
tags: [架构模式, 自主Agent, Agent]
category: 02-架构模式
difficulty: 高级
created: 2026-04-27
updated: 2026-04-27
---

# 自主 Agent（Autonomous Agent）

## 定义

**自主 Agent（Autonomous Agent）** 是最高级别的 Agent 模式：给定高层目标后，Agent 自主设定子目标、制定计划、执行行动、评估结果、学习经验，全程无需人类干预。

```mermaid
graph TD
    A[高层目标] --> B[目标分解]
    B --> C[子目标1]
    B --> D[子目标2]
    B --> E[子目标3]
    C --> F[自主执行循环]
    D --> F
    E --> F
    F --> G[环境交互]
    G --> H[结果评估]
    H --> I{目标达成?}
    I -->|否| J[调整策略]
    J --> F
    I -->|是| K[经验学习]
    K --> L[任务完成]
```

## 核心特征

1. **目标自主性**：能从高层目标自主推导出子目标
2. **策略学习**：从成功/失败中学习，调整未来行为
3. **长期记忆**：保留跨会话的经验和知识
4. **环境适应**：根据环境变化动态调整行为

## 典型示例：AutoGPT

AutoGPT 是自主 Agent 的代表实现：

```mermaid
graph TD
    A[目标: 创建一家电商网站] --> B[思考]
    B --> C[行动: 搜索技术栈]
    C --> D[观察: React + Node.js 流行]
    D --> E[思考: 需要更详细信息]
    E --> F[行动: 搜索教程]
    F --> G[观察: 找到Next.js教程]
    G --> H[思考: 开始编码]
    H --> I[行动: 写代码]
    I --> J[观察: 代码有bug]
    J --> K[思考: 需要调试]
    K --> L[行动: 搜索错误信息]
    ...
```

## 代码示例

### 简化版自主 Agent

```python
class AutonomousAgent:
    def __init__(self, llm, tools, memory):
        self.llm = llm
        self.tools = tools
        self.memory = memory
        self.max_iterations = 50
    
    def run(self, goal: str) -> str:
        """自主执行直到目标完成或达到限制"""
        context = {
            "goal": goal,
            "subgoals": [],
            "completed": [],
            "current_task": None,
        }
        
        for iteration in range(self.max_iterations):
            # 1. 反思当前状态
            reflection = self._reflect(context)
            
            # 2. 决定下一步
            action = self._decide_next_action(context, reflection)
            
            if action["type"] == "complete":
                return action["result"]
            
            if action["type"] == "subgoal":
                context["subgoals"].append(action["content"])
                continue
            
            # 3. 执行行动
            result = self._execute(action)
            
            # 4. 更新记忆和状态
            self.memory.store(action, result)
            context["completed"].append({
                "action": action,
                "result": result,
            })
        
        return "达到最大迭代次数"
    
    def _reflect(self, context: dict) -> str:
        """反思当前进展"""
        prompt = f"""评估当前任务进展：
目标：{context['goal']}
已完成：{context['completed']}
待办：{context['subgoals']}

分析：
1. 取得了什么进展？
2. 遇到了什么障碍？
3. 下一步应该做什么？"""
        
        return self.llm.invoke(prompt)
    
    def _decide_next_action(self, context: dict, reflection: str) -> dict:
        """决定下一步行动"""
        prompt = f"""基于以下信息，决定下一步行动：

反思：{reflection}

可选行动类型：
- subgoal: 设定新子目标
- tool: 调用工具
- complete: 完成任务

请返回 JSON 格式的行动决策。"""
        
        return parse_json(self.llm.invoke(prompt))
    
    def _execute(self, action: dict) -> str:
        """执行具体行动"""
        if action["type"] == "tool":
            tool = self.tools[action["tool_name"]]
            return tool.run(action["params"])
        return "未知行动类型"
```

## 记忆设计

自主 Agent 的核心是**长期记忆系统**：

```mermaid
graph LR
    A[短期记忆<br/>当前会话] --> B[工作记忆<br/>活跃上下文]
    B --> C[长期记忆<br/>经验知识]
    C --> D[向量数据库]
    C --> E[结构化存储]
```

```python
class AgentMemory:
    def __init__(self):
        self.short_term = []  # 当前会话历史
        self.working = {}     # 当前关注的上下文
        self.long_term = VectorStore()  # 长期经验
    
    def store_experience(self, action, result, outcome):
        """存储经验到长期记忆"""
        experience = {
            "action": action,
            "result": result,
            "outcome": outcome,  # success / failure
            "timestamp": now(),
        }
        self.long_term.add(experience)
    
    def retrieve_relevant(self, current_task: str, k: int = 5):
        """检索相关历史经验"""
        return self.long_term.similarity_search(current_task, k=k)
```

## 优缺点

| 优点 | 缺点 |
|------|------|
| 最大程度减少人工干预 | 可靠性最低，可能偏离目标 |
| 可处理开放域复杂任务 | 延迟和成本难以预测 |
| 能从经验中学习改进 | 调试和追踪极其困难 |
| 最接近"通用 AI"愿景 | 需要复杂的安全防护机制 |

## 安全与约束

自主 Agent 必须具备**多层防护**：

```python
class SafetyGuardrails:
    def check_action(self, action: dict) -> tuple[bool, str]:
        """检查行动是否安全"""
        
        # 1. 权限检查
        if not self._has_permission(action):
            return False, "权限不足"
        
        # 2. 危害检查
        if self._is_harmful(action):
            return False, "检测到潜在危害"
        
        # 3. 资源限制检查
        if self._exceeds_limits(action):
            return False, "超出资源限制"
        
        # 4. 人类审批（敏感操作）
        if self._needs_approval(action):
            approved = self._request_human_approval(action)
            if not approved:
                return False, "未通过人工审批"
        
        return True, "通过"
```

## 反模式与修复

| 反模式 | 问题描述 | 影响 | 修复方案 |
|--------|----------|------|----------|
| 无目标收敛检测 | Agent 持续执行行动但不检查是否在向目标靠近，仅靠 `max_iterations` 兜底 | 达到迭代上限后返回无意义的中间状态；浪费大量 API 调用费用；用户等待数十分钟后得到失败结果 | 每 N 步执行一次目标相关性检查：用 LLM 评估当前进展与原始目标的距离，连续 3 步无进展时主动终止并报告原因 |
| 工具权限不设防 | Agent 可访问所有工具（文件写入、网络请求、代码执行等）且无任何限制 | Agent 被 prompt injection 诱导执行恶意操作（如删除文件、发送请求）；一次错误决策可能造成不可逆损害 | 实现最小权限原则：按任务类型动态授予工具集；敏感操作（写文件、发请求）必须经过人工确认或沙箱执行 |
| 记忆无限膨胀 | 将所有行动和结果无差别存入长期记忆，不做去重、摘要或淘汰 | 向量数据库检索时噪声过多，召回相关记忆的精度下降；token 成本随会话增长线性增加 | 实现记忆分层管理：短期记忆用滑动窗口，长期记忆存摘要而非原文；定期用 LLM 做记忆压缩，淘汰低价值条目 |
| 反思循环陷入死循环 | Agent 在反思阶段反复得出相同结论，执行相同行动，得到相同结果，却不调整策略 | 系统在同一个失败行动上无限重试直到 `max_iterations` 耗尽；每次重试都消耗完整的 LLM + 工具调用成本 | 在反思 prompt 中注入历史行动记录，明确要求"不要重复之前的行动"；检测连续 3 次相同行动时强制切换策略（如请求人类指导） |
| 缺乏人类干预点 | Agent 从目标设定到执行全程自主，没有任何人类检查或审批环节 | Agent 可能在错误方向上执行大量操作后才被发现；高风险决策（如删除数据、发送对外通信）无人把关 | 在关键决策点设置人类审批门控（human-in-the-loop）：策略变更、敏感工具调用、长时间任务等场景必须暂停等待人类确认，参考 [[01-安全防护栏]] |
| 子目标分解偏离原始意图 | Agent 自主设定的子目标与用户的原始高层目标存在偏差，且偏差在后续执行中不断放大 | Agent "做了很多事"但最终结果与用户期望完全不同；解释性差，用户无法理解 Agent 为什么做出某些决策 | 每次设定子目标时显式关联到原始目标，要求 Agent 说明"该子目标如何服务于原始目标"；定期将当前状态与原始目标做对照检查 |

**无目标收敛检测**是自主 Agent 最核心的失效模式。与 [[05-评估器-优化器]] 不同，自主 Agent 的循环没有明确的"质量标准"来判断何时停止，它依赖 LLM 自行判断"任务是否完成"。但 LLM 在复杂场景下常常误判——它可能认为"搜索更多信息"总是有帮助的，从而陷入永无止境的信息收集循环。解决方法是引入外部收敛信号：除了 LLM 自我判断，还要用硬性指标（如"已执行 20 步且最近 5 步的目标相关性评分无提升"）来强制终止。

**工具权限不设防**是自主 Agent 最严重的安全风险。当 Agent 拥有文件系统写入、网络请求、代码执行等能力时，一个被恶意 prompt 诱导的决策就可能造成不可逆的损害。生产环境中的自主 Agent 必须实现多层防护：工具白名单（只允许任务必需的工具）、沙箱执行（在隔离环境中运行代码）、敏感操作审批（高风险操作暂停等待人类确认），参见 [[01-安全防护栏]] 中的详细安全设计。

## 权衡分析

自主 Agent 的核心设计选择是**自主程度 vs 可控性、开放域能力 vs 可靠性**。

### 自主性分级 vs 风险

| 自主性级别 | 人类干预 | 适用场景 | 风险等级 |
|-----------|----------|----------|----------|
| L0 无自主 | 每步审批 | 高风险操作（金融交易） | 极低 |
| L1 工具自主 | 工具选择审批 | 企业内部工具集成 | 低 |
| L2 步序自主 | 任务开始审批 | 研究分析、内容生成 | 中 |
| L3 目标自主 | 目标设定审批 | 开放域探索 | 高 |
| L4 演进自主 | 无人类干预 | 理论研究、受限实验 | 极高 |

### 成本与收益的极端不确定性

- **成本不可预测**：自主 Agent 的 LLM 调用次数取决于任务复杂度和中间发现，无法事先估算
- **收益也不可预测**：可能 5 分钟完成任务，也可能运行数小时后偏离目标
- **与提示链的对比**：提示链成本 = 步骤数 × 单次调用成本，可精确预算；自主 Agent 成本 = 迭代次数 × 单次调用成本，迭代次数未知

### 记忆系统的代价

- **短期记忆**：成本低，但会话结束后丢失所有经验
- **长期记忆**：可跨会话学习，但引入向量数据库的运维成本和检索延迟
- **记忆污染风险**：错误经验被存入长期记忆后，会持续误导后续决策——清理记忆的成本可能高于重新开始

### 安全 vs 能力的张力

- **更严格的安全防护**：减少风险，但也限制了 Agent 解决问题的能力
- **更宽松的权限**：Agent 能力更强，但潜在危害也更大
- **渐进式放权**是当前最佳实践：从最严格的限制开始，根据实际表现逐步放开权限

### 何时选择自主 Agent

- 任务**开放性极强**，无法预定义处理流程
- 需要**长时间运行**（数小时甚至数天）
- 任务需要**持续学习和适应**
- 有**完善的安全防护和监控机制**

### 何时避免自主 Agent

- 任务**可预定义流程**——提示链、路由或编排器-工作者更可靠
- 对**成本有硬性预算**——自主 Agent 的成本不可预测
- **缺乏安全基础设施**——没有沙箱、权限控制和监控系统时不应运行自主 Agent
- 需要**可审计的决策过程**——自主 Agent 的决策路径难以完整追溯

## 最佳实践

1. **渐进式放权**：从人类审核每个决策开始，逐步增加自主性
2. **明确边界**：清晰定义 Agent 不能做什么
3. **可中断设计**：随时可以被人类暂停或接管
4. **完整日志**：记录每一个决策和推理过程
5. **沙箱环境**：在隔离环境中运行，限制潜在危害

## 与其他模式的关系

- **vs [[06-ReAct|ReAct]]**：ReAct 是结构化循环，自主 Agent 更自由、更复杂
- **vs [[07-Plan-and-Execute|Plan-and-Execute]]**：Plan-and-Execute 是一次性规划，自主 Agent 持续规划调整
- **vs [[04-编排器-工作者|编排器-工作者]]**：编排器由中央控制，自主 Agent 是自组织

## 延伸阅读

- [[00-模式总览]] — 所有架构模式对比
- [[03-记忆管理]] — Agent 记忆系统设计
- [[01-安全防护栏]] — Agent 安全防护机制
- [[07-Plan-and-Execute]] — 更受控的规划执行模式
