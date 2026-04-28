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
