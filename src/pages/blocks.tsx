import { Link } from "react-router"

import { cn } from "@/lib/utils"
import { CodeBlock, InstallLine } from "@/components/site/code-block"
import { DocsShell } from "@/components/site/docs-shell"
import { Reveal } from "@/components/site/preview"
import { AgentWorkspace } from "@/blocks/agent-workspace"
import { buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { usePageMeta } from "@/lib/use-page-meta"

const toc = [
  { id: "what", label: "这是什么" },
  { id: "preview", label: "预览" },
  { id: "install", label: "安装" },
  { id: "inside", label: "里面有什么" },
]

export function Blocks() {
  usePageMeta("agent-workspace — Solid Glass 区块", "一个智能体工作的地方：会话、对话流、文件与后台任务，用同一块玻璃拼成一屏。")

  return (
    <DocsShell toc={toc}>
      <div className="flex flex-wrap items-center gap-2 text-[11.5px] text-muted-foreground">
        <Link to="/components" className="transition-colors hover:text-foreground">
          组件
        </Link>
        <span className="text-border">/</span>
        <span>区块</span>
        <span className="text-border">/</span>
        <span className="sg-mono text-[10.5px] text-foreground/70">agent-workspace</span>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <h1 className="text-[30px] leading-tight font-semibold tracking-[-0.03em]">agent-workspace</h1>
        <span className="sg-mono text-[11px] text-muted-foreground">Block</span>
        <Badge variant="secondary" className="ml-auto">
          整屏
        </Badge>
      </div>

      <p className="mt-3 max-w-[58ch] text-[14.5px] leading-[1.8] text-muted-foreground">
        一个智能体工作的地方：左边是会话，中间是对话，右边是文件与后台任务。它不是一张截图，是上面那些组件拼起来的一屏。
      </p>

      <h2 id="what" className="mt-8 scroll-mt-24 text-[16px] font-medium">
        这是什么
      </h2>
      <div className="sg-prose mt-2">
        <p>
          单个组件回答「这一行怎么显示」，区块回答「一整屏怎么排」。三栏都在用同一块玻璃：左栏与右栏是薄的面板，中间的对话流没有额外的底，写消息的地方是清玻璃。
        </p>
        <p>
          它被收在注册表里，所以可以整块安装，也可以只读一眼，看看这些组件在真实密度下是什么样子。
        </p>
      </div>

      <h2 id="preview" className="mt-8 scroll-mt-24 text-[16px] font-medium">
        预览
      </h2>
      <p className="mt-1.5 mb-3 text-[12.5px] text-muted-foreground">
        可以点：展开步骤、在输入框里打字；宽屏下还能切换会话。
      </p>
      <Reveal>
        <AgentWorkspace />
      </Reveal>

      <h2 id="install" className="mt-8 scroll-mt-24 text-[16px] font-medium">
        安装
      </h2>
      <p className="mt-1.5 mb-3 text-[12.5px] text-muted-foreground">
        它依赖注册表里的 12 个组件，命令会一并取来。
      </p>
      <InstallLine name="agent-workspace" />

      <h2 id="inside" className="mt-8 scroll-mt-24 text-[16px] font-medium">
        里面有什么
      </h2>
      <div className="mt-3 overflow-hidden rounded-lg border border-border">
        {[
          { part: "左栏 · 会话", uses: "panel, panel-row", note: "薄面板；当前会话是唯一状态的那块清玻璃。" },
          { part: "中栏 · 对话", uses: "tool-steps, diff-view, composer", note: "没有额外的底；步骤与改动各自成块。" },
          { part: "右栏 · 任务", uses: "task-notice, context-ring, turn-status", note: "后台在做什么，以及上下文还剩多少。" },
        ].map((row) => (
          <div key={row.part} className="grid gap-1 border-b border-border/70 px-3.5 py-3 last:border-b-0 sm:grid-cols-[160px_1fr]">
            <span className="text-[12px] font-medium">{row.part}</span>
            <div>
              <p className="sg-mono text-[10px] text-muted-foreground">{row.uses}</p>
              <p className="mt-1 text-[11.5px] leading-relaxed text-muted-foreground">{row.note}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5">
        <CodeBlock
          language="tsx"
          filename="用法"
          code={`import { AgentWorkspace } from "@/components/blocks/agent-workspace"

<AgentWorkspace />`}
        />
      </div>

      <div className="mt-8 flex flex-wrap gap-2 border-t border-border pt-6">
        <Link to="/create" className={cn(buttonVariants({ size: "default" }), "h-9 px-4 text-[13px]")}>
          调一下材质
        </Link>
        <Link
          to="/components"
          className={cn(buttonVariants({ variant: "secondary", size: "default" }), "h-9 px-4 text-[13px]")}
        >
          回到组件
        </Link>
      </div>
    </DocsShell>
  )
}
