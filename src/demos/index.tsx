import { FileCode2, Paperclip } from "lucide-react"
import * as React from "react"

import { AskCard } from "@/components/ui/ask-card"
import { Composer } from "@/components/ui/composer"
import { ContextRing } from "@/components/ui/context-ring"
import { DiffStats, DiffView, patchStats } from "@/components/ui/diff-view"
import { DotLoader } from "@/components/ui/dot-loader"
import { Panel, PanelRow } from "@/components/ui/panel"
import { Reasoning } from "@/components/ui/reasoning"
import { StatusGlyph } from "@/components/ui/status-glyph"
import { Tag } from "@/components/ui/tag"
import { TaskNotice } from "@/components/ui/task-notice"
import { StepGroup, StepList, type Step } from "@/components/ui/tool-steps"
import { TurnStatus } from "@/components/ui/turn-status"
import { Button } from "@/components/ui/button"

export type Demo = {
  id: string
  title: string
  note?: string
  stage?: "center" | "start" | "stretch"
  code: string
  render: () => React.ReactNode
}

const patch = `@@ -12,4 +12,5 @@
 .glass-panel {
   background-color: var(--panel);
-  border-width: 1px;
+  box-shadow: inset 0 1px 0 var(--glass-rim);
+  box-shadow: 0 0 0 1px var(--glass-edge);
   border-radius: 14px;
 }`

const steps: Step[] = [
  { id: "1", label: "读取 solid-glass.css", status: "done", detail: "src/styles/solid-glass.css", output: "1358 行 · 55.8 KB" },
  { id: "2", label: "搜索 --glass-rim", status: "done", output: "在 6 处找到 --glass-rim 的用法" },
  {
    id: "3",
    label: "修改 panel 的边缘",
    status: "running",
    patch,
  },
  { id: "4", label: "运行类型检查", status: "error", detail: "bun run typecheck", error: "panel.tsx:24 — 属性 rim 不存在" },
]

function PanelDemo() {
  return (
    <Panel title="会话" actions={<span className="sg-mono text-[9.5px] text-muted-foreground">4</span>} className="w-full max-w-[300px]">
      <div className="flex flex-col gap-0.5 p-1.5">
        <PanelRow chosen>玻璃的边缘</PanelRow>
        <PanelRow>给面板加厚</PanelRow>
        <PanelRow>浅色模式的边框</PanelRow>
        <PanelRow>注册表结构</PanelRow>
      </div>
    </Panel>
  )
}

function PanelBarDemo() {
  return (
    <Panel
      title="文件"
      className="w-full max-w-[320px]"
      bar={
        <div className="flex items-center gap-0.5">
          <span className="glass-chosen rounded-sm px-2 py-0.5 text-[11.5px]">改动</span>
          <span className="px-2 py-0.5 text-[11.5px] text-muted-foreground">历史</span>
        </div>
      }
    >
      <div className="px-3 py-2 text-[12px] text-muted-foreground">3 个文件被改动</div>
    </Panel>
  )
}

function TagDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Tag icon={<FileCode2 />} onRemove={() => {}}>
        solid-glass.css
      </Tag>
      <Tag icon={<Paperclip />} progress={0.42}>
        panel.tsx
      </Tag>
      <Tag icon={<FileCode2 />} armed onRemove={() => {}}>
        tag.tsx
      </Tag>
      <Tag icon={<FileCode2 />} error="文件超过 2 MB">
        dump.json
      </Tag>
    </div>
  )
}

function DotLoaderDemo() {
  return (
    <div className="flex items-center gap-2 text-[12.5px] text-muted-foreground">
      <DotLoader />
      正在压缩上下文
    </div>
  )
}

function StatusGlyphDemo() {
  const activities = ["thinking", "searching", "running", "writing", "compacting"] as const
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-5">
      {activities.map((activity) => (
        <div key={activity} className="flex flex-col items-center gap-2">
          <StatusGlyph activity={activity} />
          <span className="sg-mono text-[9.5px] tracking-[0.08em] text-muted-foreground uppercase">{activity}</span>
        </div>
      ))}
    </div>
  )
}

function TurnStatusDemo() {
  const [since] = React.useState(() => Date.now() - 7000)
  return (
    <div className="w-full max-w-[420px]">
      <TurnStatus activity="searching" label="正在搜索 3 个文件" since={since} tokens={1280} />
    </div>
  )
}

function ContextRingDemo() {
  return (
    <div className="flex items-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <ContextRing
          used={86000}
          window={128000}
          parts={[
            { key: "files", label: "文件", tokens: 52000, tint: "bg-chart-1" },
            { key: "chat", label: "对话", tokens: 24000, tint: "bg-chart-2" },
            { key: "tools", label: "工具输出", tokens: 10000, tint: "bg-chart-3" },
          ]}
        />
        <span className="sg-mono text-[9.5px] text-muted-foreground">67%</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <ContextRing used={120000} window={128000} />
        <span className="sg-mono text-[9.5px] text-muted-foreground">94%</span>
      </div>
    </div>
  )
}

function TaskNoticeDemo() {
  return (
    <div className="w-full max-w-[340px]">
      <TaskNotice
        notices={[
          { id: "1", title: "后台任务完成", status: "completed", note: "12s" },
          { id: "2", title: "构建失败", status: "failed", note: "退出码 1" },
          { id: "3", title: "定时任务被停止", status: "stopped" },
        ]}
      />
    </div>
  )
}

function ComposerDemo() {
  const [value, setValue] = React.useState("把 card 的边缘再厚一点")
  return (
    <div className="w-full max-w-[440px]">
      <Composer
        value={value}
        onValueChange={setValue}
        onSubmit={() => setValue("")}
        placeholder="输入消息…"
        sendLabel="发送"
        stopLabel="停止"
        tags={
          <Tag icon={<FileCode2 />} onRemove={() => {}}>
            solid-glass.css
          </Tag>
        }
        leading={
          <Button variant="ghost" size="icon-xs" aria-label="附加文件" className="text-muted-foreground">
            <Paperclip className="size-3.5" />
          </Button>
        }
      />
    </div>
  )
}

function ToolStepsDemo() {
  return (
    <div className="flex w-full max-w-[460px] flex-col gap-3">
      <StepList steps={steps.slice(0, 3)} />
      <StepGroup steps={steps} />
    </div>
  )
}

function DiffViewDemo() {
  const stats = patchStats(patch)
  return (
    <div className="flex w-full max-w-[480px] flex-col gap-2">
      <div className="flex items-center justify-between text-[12px] text-muted-foreground">
        <span className="sg-mono text-[11px]">src/styles/solid-glass.css</span>
        <DiffStats {...stats} />
      </div>
      <DiffView patch={patch} />
    </div>
  )
}

function AskCardDemo() {
  const [answer, setAnswer] = React.useState<string | null>(null)
  return (
    <div className="w-full max-w-[360px]">
      <AskCard
        question="要保留卡片的高光吗？去掉的话，浅色模式下 card 会更平。"
        options={["保留", "去掉"]}
        onAnswer={setAnswer}
        eyebrow={answer ? `已选择：${answer}` : "需要你决定"}
      />
    </div>
  )
}

function ReasoningDemo() {
  return (
    <div className="w-full max-w-[420px]">
      <Reasoning defaultOpen label="思考过程" thinkingLabel="思考中…">
        先看 --glass-rim 与 --glass-inner 的关系：两道亮线都要留在边缘，面上不加渐变。card 缺的不是颜色，是外圈那道 hairline。
      </Reasoning>
    </div>
  )
}

export const demos: Record<string, Demo[]> = {
  panel: [
    {
      id: "basic",
      title: "基本",
      note: "标题、动作与一行行内容。",
      stage: "center",
      code: `<Panel title="会话" actions={<span>4</span>}>
  <div className="flex flex-col gap-0.5 p-1.5">
    <PanelRow chosen>玻璃的边缘</PanelRow>
    <PanelRow>给面板加厚</PanelRow>
  </div>
</Panel>`,
      render: () => <PanelDemo />,
    },
    {
      id: "bar",
      title: "用控件代替标题",
      note: "面板自己的控件已经说明它是什么时，交给 bar。",
      stage: "center",
      code: `<Panel title="文件" bar={<Tabs />}>
  <div className="px-3 py-2">3 个文件被改动</div>
</Panel>`,
      render: () => <PanelBarDemo />,
    },
  ],
  tag: [
    {
      id: "states",
      title: "四种状态",
      note: "附上、上传中、等待删除、出错。",
      stage: "center",
      code: `<Tag icon={<FileCode2 />} onRemove={remove}>solid-glass.css</Tag>
<Tag icon={<Paperclip />} progress={0.42}>panel.tsx</Tag>
<Tag armed onRemove={remove}>tag.tsx</Tag>
<Tag error="文件超过 2 MB">dump.json</Tag>`,
      render: () => <TagDemo />,
    },
  ],
  "dot-loader": [
    {
      id: "basic",
      title: "基本",
      note: "三颗点，各延迟 160ms。",
      stage: "center",
      code: `<div className="flex items-center gap-2">
  <DotLoader />
  正在压缩上下文
</div>`,
      render: () => <DotLoaderDemo />,
    },
  ],
  "status-glyph": [
    {
      id: "activities",
      title: "五种活动",
      note: "思考、搜索、运行、写入、压缩。",
      stage: "center",
      code: `<StatusGlyph activity="thinking" />
<StatusGlyph activity="searching" />
<StatusGlyph activity="running" />
<StatusGlyph activity="writing" />
<StatusGlyph activity="compacting" />`,
      render: () => <StatusGlyphDemo />,
    },
  ],
  "turn-status": [
    {
      id: "basic",
      title: "一轮正在跑",
      note: "秒数与 token 数都在动；不给 since 就不显示时间。",
      stage: "center",
      code: `<TurnStatus
  activity="searching"
  label="正在搜索 3 个文件"
  since={startedAt}
  tokens={1280}
/>`,
      render: () => <TurnStatusDemo />,
    },
  ],
  "context-ring": [
    {
      id: "basic",
      title: "常规与将满",
      note: "70% 转琥珀，90% 转失败色；点开看明细。",
      stage: "center",
      code: `<ContextRing used={86000} window={128000} parts={parts} />
<ContextRing used={120000} window={128000} />`,
      render: () => <ContextRingDemo />,
    },
  ],
  "task-notice": [
    {
      id: "statuses",
      title: "三种结果",
      note: "完成、失败、被停止。",
      stage: "center",
      code: `<TaskNotice notices={[
  { id: "1", title: "后台任务完成", status: "completed", note: "12s" },
  { id: "2", title: "构建失败", status: "failed" },
]} />`,
      render: () => <TaskNoticeDemo />,
    },
  ],
  composer: [
    {
      id: "basic",
      title: "带标签的输入",
      note: "Enter 发送，Shift+Enter 换行；输入框随内容长高。",
      stage: "center",
      code: `<Composer
  value={value}
  onValueChange={setValue}
  onSubmit={send}
  placeholder="输入消息…"
  tags={<Tag icon={<FileCode2 />}>solid-glass.css</Tag>}
/>`,
      render: () => <ComposerDemo />,
    },
  ],
  "tool-steps": [
    {
      id: "basic",
      title: "展开与折叠",
      note: "一行打开是那次调用；有 patch 就是一份 diff。",
      stage: "center",
      code: `<StepList steps={steps.slice(0, 3)} />
<StepGroup steps={steps} />`,
      render: () => <ToolStepsDemo />,
    },
  ],
  "diff-view": [
    {
      id: "basic",
      title: "带统计的补丁",
      note: "文件头被去掉，hunk 头留着。",
      stage: "center",
      code: `<DiffView patch={patch} />
<DiffStats added={2} removed={1} />`,
      render: () => <DiffViewDemo />,
    },
  ],
  "ask-card": [
    {
      id: "basic",
      title: "等待决定的选项",
      note: "选了之后把 onAnswer 拿掉，卡片就变成记录。",
      stage: "center",
      code: `<AskCard
  question="要保留卡片的高光吗？"
  options={["保留", "去掉"]}
  onAnswer={setAnswer}
/>`,
      render: () => <AskCardDemo />,
    },
  ],
  reasoning: [
    {
      id: "basic",
      title: "展开的思考",
      note: "默认折起来；thinking 时标题带一道微光。",
      stage: "center",
      code: `<Reasoning defaultOpen label="思考过程" thinkingLabel="思考中…">
  先看 --glass-rim 与 --glass-inner 的关系……
</Reasoning>`,
      render: () => <ReasoningDemo />,
    },
  ],
}

