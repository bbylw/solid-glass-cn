import { Link } from "react-router"

import { cn } from "@/lib/utils"
import { DocsShell } from "@/components/site/docs-shell"
import { previews } from "@/demos/previews"
import { usePageMeta } from "@/lib/use-page-meta"
import { registry } from "@/data/registry"

const toc = [{ id: "grid", label: "全部组件" }]

export function ComponentsIndex() {
  usePageMeta("组件 — Solid Glass", "12 个为智能体工作而做的组件：状态、步骤、diff、提问与上下文。")

  return (
    <DocsShell toc={toc} wide>
      <div className="flex flex-col gap-2 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="sg-eyebrow">组件</p>
          <h1 className="mt-2.5 text-[30px] leading-tight font-semibold tracking-[-0.03em]">12 个组件，一份主题</h1>
        </div>
        <p className="max-w-[42ch] text-[13px] leading-[1.8] text-muted-foreground">
          每一个都只为一种界面状态而做：一轮对话在跑、一个决定在等、一处改动被读。全部可单独安装。
        </p>
      </div>

      <div id="grid" className="mt-6 grid scroll-mt-24 gap-2 sm:grid-cols-2 xl:grid-cols-3">
        {registry.map((item) => (
          <Link
            key={item.slug}
            to={`/components/${item.slug}`}
            className="group glass-panel flex flex-col overflow-hidden rounded-lg transition-colors hover:bg-[var(--card)]"
          >
            <div className="sg-stage pointer-events-none flex h-[172px] items-center justify-center overflow-hidden p-4" inert>
              <div className="flex max-h-full w-full items-center justify-center">{previews[item.slug]?.()}</div>
            </div>
            <div className="mt-auto border-t border-border/70 px-3.5 py-2.5">
              <div className="flex items-baseline gap-2">
                <p className="text-[12.5px] font-medium text-foreground">{item.title}</p>
                <span className="sg-mono text-[9px] text-muted-foreground/80">{item.group}</span>
                <span className="sg-mono ml-auto text-[9px] text-muted-foreground/70">{item.name}</span>
              </div>
              <p className="mt-1 line-clamp-2 text-[11px] leading-[1.6] text-muted-foreground">{item.summary}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5">
        <p className="text-[12px] text-muted-foreground">
          加上样式表，注册表一共 13 项。区块另算。
        </p>
        <Link
          to="/docs/installation#registry"
          className={cn("text-[12.5px] text-foreground/80 transition-colors hover:text-foreground")}
        >
          看注册表
        </Link>
      </div>
    </DocsShell>
  )
}
