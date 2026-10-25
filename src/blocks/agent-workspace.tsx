import { FileCode2, Paperclip, Plus } from "lucide-react"
import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Composer } from "@/components/ui/composer"
import { ContextRing } from "@/components/ui/context-ring"
import { DiffView } from "@/components/ui/diff-view"
import { PanelRow } from "@/components/ui/panel"
import { Tag } from "@/components/ui/tag"
import { TaskNotice } from "@/components/ui/task-notice"
import { StepList, type Step } from "@/components/ui/tool-steps"
import { TurnStatus } from "@/components/ui/turn-status"

const patch = `@@ -12,4 +12,5 @@
 .glass-panel {
   background-color: var(--panel);
-  border-width: 1px;
+  box-shadow: inset 0 1px 0 var(--glass-rim);
+  box-shadow: 0 0 0 1px var(--glass-edge);
   border-radius: 14px;
 }`

const steps: Step[] = [
  {
    id: "1",
    label: "读取 solid-glass.css",
    status: "done",
    detail: "src/styles/solid-glass.css",
    output: "1358 行 · 55.8 KB",
  },
  {
    id: "2",
    label: "搜索 --glass-edge",
    status: "done",
    detail: "grep -n --glass-edge src/styles",
    output: "6 处匹配 · 3 个文件",
  },
  { id: "3", label: "修改 card 的边缘", status: "running", patch },
]

const sessions = ["玻璃的边缘", "给面板加厚", "浅色模式的边框", "注册表结构"]

/**
 * The block: a workspace where an agent works — sessions on the left, the
 * thread in the middle, what runs behind it on the right. Every part of it is
 * a component from the registry, laid out rather than redrawn.
 */
function AgentWorkspace({ className, compact = false }: { className?: string; compact?: boolean }) {
  const [value, setValue] = React.useState("再深一点呢？")
  const [since] = React.useState(() => Date.now() - 12000)
  const [active, setActive] = React.useState(0)

  return (
    <div
      data-slot="agent-workspace"
      className={cn(
        "bg-card grid overflow-hidden rounded-xl md:grid-cols-[190px_minmax(0,1fr)_186px]",
        compact ? "min-h-[330px]" : "min-h-[520px]",
        className
      )}
    >
      <div className="hidden flex-col gap-px border-r border-border/70 p-2 md:flex">
        <div className="flex h-7 items-center justify-between px-1.5">
          <span className="sg-eyebrow">会话</span>
          <Button variant="ghost" size="icon-xs" aria-label="新会话" className="text-muted-foreground">
            <Plus className="size-3.5" />
          </Button>
        </div>
        {sessions.map((session, index) => (
          <PanelRow
            key={session}
            chosen={index === active}
            onClick={() => setActive(index)}
            className="justify-between"
          >
            {session}
          </PanelRow>
        ))}
        <div className="mt-auto px-1.5 pt-3">
          <p className="sg-mono text-[9px] leading-relaxed tracking-[0.08em] text-muted-foreground/70 uppercase">
            12:04 · 本地
          </p>
        </div>
      </div>

      <div className="flex min-w-0 flex-col gap-2.5 p-3 sm:p-4">
        <div className="flex items-center gap-2">
          <span className="text-[12px] text-muted-foreground">{sessions[active]}</span>
          <span className="sg-mono text-[9px] tracking-[0.08em] text-muted-foreground/60">3 轮</span>
          <div className="ml-auto flex items-center gap-2">
            <span className="hidden text-[10.5px] text-muted-foreground sm:block">86K / 128K</span>
            <ContextRing used={86000} window={128000} />
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          <div className="glass-control ml-auto max-w-[85%] rounded-lg px-2.5 py-1.5 text-[12px] leading-relaxed">
            把 card 的边框调厚一点，浅色模式下几乎看不见了。
          </div>
          <p className="text-[12px] leading-relaxed text-foreground/80">
            明白。<span className="sg-mono text-[11px]">--popover-edge</span> 比{" "}
            <span className="sg-mono text-[11px]">--glass-edge</span> 深，card 缺的是同一层。
          </p>
        </div>

        <StepList steps={steps} />

        <div className="hidden sm:block">
          <DiffView patch={patch} className="max-h-32" />
        </div>

        <div className="mt-auto flex flex-col gap-2 pt-1">
          <TaskNotice notices={[{ id: "1", title: "构建通过", status: "completed", note: "8s" }]} />
          <Composer
            value={value}
            onValueChange={setValue}
            onSubmit={() => setValue("")}
            placeholder="让面板再厚一点…"
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
      </div>

      <div className="hidden flex-col gap-3 border-l border-border/70 p-2.5 md:flex">
        <div>
          <p className="sg-eyebrow mb-2 px-1">任务</p>
          <div className="flex flex-col gap-1.5">
            <TaskNotice
              notices={[
                { id: "1", title: "类型检查", status: "completed", note: "0.9s" },
                { id: "2", title: "构建站点", status: "failed", note: "退出码 1" },
              ]}
            />
          </div>
        </div>
        <div>
          <p className="sg-eyebrow mb-2 px-1">文件</p>
          <div className="flex flex-col gap-1.5">
            {["solid-glass.css", "panel.tsx", "app.css"].map((file) => (
              <div key={file} className="flex items-center gap-1.5 px-1 text-[11px] text-foreground/70">
                <span className="size-1 rounded-[1px] bg-muted-foreground/50" />
                <span className="truncate">{file}</span>
                <span className="sg-mono ml-auto text-[9px] text-muted-foreground/60">M</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-auto">
          <TurnStatus activity="writing" since={since} tokens={640} />
        </div>
      </div>
    </div>
  )
}

export { AgentWorkspace }
