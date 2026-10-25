import { FileCode2 } from "lucide-react"
import * as React from "react"

import { AskCard } from "@/components/ui/ask-card"
import { Composer } from "@/components/ui/composer"
import { ContextRing } from "@/components/ui/context-ring"
import { DiffView } from "@/components/ui/diff-view"
import { DotLoader } from "@/components/ui/dot-loader"
import { Panel, PanelRow } from "@/components/ui/panel"
import { Reasoning } from "@/components/ui/reasoning"
import { StatusGlyph } from "@/components/ui/status-glyph"
import { Tag } from "@/components/ui/tag"
import { TaskNotice } from "@/components/ui/task-notice"
import { StepList } from "@/components/ui/tool-steps"
import { TurnStatus } from "@/components/ui/turn-status"

const patch = `@@ -12,4 +12,5 @@
 .glass-panel {
-  border-width: 1px;
+  box-shadow: inset 0 1px 0 var(--glass-rim);
 }`

function ComposerPreview() {
  const [value, setValue] = React.useState("让面板再厚一点")
  return (
    <Composer
      value={value}
      onValueChange={setValue}
      onSubmit={() => setValue("")}
      placeholder="输入消息…"
      sendLabel="发送"
      className="w-full max-w-[280px]"
    />
  )
}

function AskPreview() {
  return (
    <AskCard
      question="要保留卡片的高光吗？"
      options={["保留", "去掉"]}
      onAnswer={() => {}}
      eyebrow="需要你决定"
      className="w-full max-w-[260px]"
    />
  )
}

function TurnPreview() {
  const [since] = React.useState(() => Date.now() - 3000)
  return (
    <div className="w-full max-w-[260px]">
      <TurnStatus activity="searching" label="正在搜索 3 个文件" since={since} />
      <p className="mt-1.5 text-[10.5px] leading-relaxed text-muted-foreground">在 src/components/ui 中找到 3 处匹配</p>
    </div>
  )
}

export const previews: Record<string, () => React.ReactNode> = {
  panel: () => (
    <Panel title="会话" className="w-full max-w-[220px]">
      <div className="flex flex-col gap-0.5 p-1.5">
        <PanelRow chosen>玻璃的边缘</PanelRow>
        <PanelRow>给面板加厚</PanelRow>
        <PanelRow>浅色模式的边框</PanelRow>
      </div>
    </Panel>
  ),
  tag: () => (
    <div className="flex max-w-[240px] flex-wrap items-center justify-center gap-1.5">
      <Tag icon={<FileCode2 />}>solid-glass.css</Tag>
      <Tag progress={0.42}>panel.tsx</Tag>
      <Tag armed>tag.tsx</Tag>
    </div>
  ),
  "dot-loader": () => (
    <div className="flex flex-col items-center gap-3">
      <DotLoader dotClassName="size-1.5" className="gap-1" />
      <div className="text-center">
        <p className="text-[12px] text-foreground/85">正在压缩上下文</p>
        <p className="sg-mono mt-1 text-[9.5px] tracking-[0.08em] text-muted-foreground">1.2s · 36K → 12K</p>
      </div>
    </div>
  ),
  "status-glyph": () => (
    <div className="flex items-end gap-6">
      {(["thinking", "searching", "writing"] as const).map((activity) => (
        <div key={activity} className="flex flex-col items-center gap-2">
          <StatusGlyph activity={activity} className="size-6" />
          <span className="sg-mono text-[8px] tracking-[0.08em] text-muted-foreground uppercase">{activity}</span>
        </div>
      ))}
    </div>
  ),
  "turn-status": () => <TurnPreview />,
  "context-ring": () => (
    <div className="flex items-center gap-3">
      <ContextRing used={86000} window={128000} />
      <div>
        <p className="text-[11px] text-muted-foreground">上下文</p>
        <p className="sg-mono text-[12px]">86K / 128K</p>
      </div>
    </div>
  ),
  "task-notice": () => (
    <div className="w-full max-w-[240px]">
      <TaskNotice
        notices={[
          { id: "1", title: "后台任务完成", status: "completed", note: "12s" },
          { id: "2", title: "构建失败", status: "failed" },
        ]}
      />
    </div>
  ),
  composer: () => <ComposerPreview />,
  "tool-steps": () => (
    <div className="w-full max-w-[250px]">
      <StepList
        steps={[
          { id: "1", label: "读取 solid-glass.css", status: "done" },
          { id: "2", label: "修改 panel 的边缘", status: "running" },
        ]}
      />
    </div>
  ),
  "diff-view": () => <DiffView patch={patch} className="w-full max-w-[270px]" />,
  "ask-card": () => <AskPreview />,
  reasoning: () => (
    <div className="w-full max-w-[250px]">
      <Reasoning defaultOpen label="思考过程" thinkingLabel="思考中…">先看 --glass-rim 与 --glass-inner 的关系：两道亮线都要留在边缘。</Reasoning>
    </div>
  ),
}
