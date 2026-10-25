import { Link, useParams } from "react-router"

import { cn } from "@/lib/utils"
import { CodeBlock, InstallLine } from "@/components/site/code-block"
import { DocsShell } from "@/components/site/docs-shell"
import { Example } from "@/components/site/preview"
import { Badge } from "@/components/ui/badge"
import { demos } from "@/demos"
import { findComponent, registry } from "@/data/registry"
import { usePageMeta } from "@/lib/use-page-meta"
import { NotFound } from "@/pages/not-found"

export function ComponentDetail() {
  const { slug } = useParams()
  const item = findComponent(slug)
  usePageMeta(
    item ? `${item.title}（${item.name}）— Solid Glass` : "404 — Solid Glass",
    item?.summary
  )

  if (!item) return <NotFound />

  const list = demos[item.slug] ?? []
  const position = registry.findIndex((entry) => entry.slug === item.slug)
  const prev = position > 0 ? registry[position - 1] : null
  const next = position < registry.length - 1 ? registry[position + 1] : null

  const toc = [
    ...list.map((demo) => ({ id: demo.id, label: demo.title })),
    { id: "install", label: "安装" },
    { id: "usage", label: "用法" },
    { id: "api", label: "API" },
  ]

  return (
    <DocsShell toc={toc}>
      <div className="flex flex-wrap items-center gap-2 text-[11.5px] text-muted-foreground">
        <Link to="/components" className="transition-colors hover:text-foreground">
          组件
        </Link>
        <span className="text-border">/</span>
        <span>{item.group}</span>
        <span className="text-border">/</span>
        <span className="sg-mono text-[10.5px] text-foreground/70">{item.name}</span>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <h1 className="text-[30px] leading-tight font-semibold tracking-[-0.03em]">{item.title}</h1>
        <span className="sg-mono text-[11px] text-muted-foreground">{item.english}</span>
        <Badge variant="secondary" className="ml-auto">
          {item.group}
        </Badge>
      </div>

      <p className="mt-3 max-w-[58ch] text-[14.5px] leading-[1.8] text-muted-foreground">{item.summary}</p>

      <div className="mt-6 flex flex-col gap-2">
        {list.map((demo, index) => (
          <div key={demo.id} id={demo.id} className="scroll-mt-24">
            {index > 0 && (
              <div className="mt-4 mb-2.5">
                <h2 className="text-[16px] font-medium">{demo.title}</h2>
                {demo.note && <p className="mt-1 text-[12.5px] text-muted-foreground">{demo.note}</p>}
              </div>
            )}
            <Example
              code={demo.code}
              align={demo.stage ?? "center"}
              filename={`${item.name}.tsx`}
              label={index === 0 ? "预览" : demo.title}
              stageClassName={demo.stage === "stretch" ? "min-h-[220px]" : undefined}
            >
              {demo.render()}
            </Example>
          </div>
        ))}
      </div>

      <section id="install" className="mt-9 scroll-mt-24">
        <h2 className="text-[16px] font-medium">安装</h2>
        <p className="mt-1.5 mb-3 max-w-[58ch] text-[13px] leading-[1.75] text-muted-foreground">
          从注册表取这一件。它会落在 <code className="sg-mono text-[11.5px] text-foreground/80">{item.target}</code>
          ，连同它依赖的基础件。
        </p>
        <InstallLine name={item.name} />
      </section>

      <section id="usage" className="mt-9 scroll-mt-24">
        <h2 className="text-[16px] font-medium">用法</h2>
        <div className="mt-3">
          <CodeBlock code={item.usage} language="tsx" filename={`${item.name}-demo.tsx`} />
        </div>
        <div className="sg-prose mt-4 max-w-[58ch] text-[13px]">
          {item.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 12)}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section id="api" className="mt-9 scroll-mt-24">
        <h2 className="text-[16px] font-medium">API</h2>
        <div className="mt-3 overflow-hidden rounded-lg border border-border">
          <div className="grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)] gap-3 border-b border-border/70 bg-[var(--hover-faint)] px-3.5 py-2 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.1fr)_minmax(0,1.6fr)]">
            <span className="sg-mono text-[9px] tracking-[0.12em] text-muted-foreground uppercase">属性</span>
            <span className="sg-mono text-[9px] tracking-[0.12em] text-muted-foreground uppercase">类型</span>
            <span className="sg-mono hidden text-[9px] tracking-[0.12em] text-muted-foreground uppercase sm:block">
              说明
            </span>
          </div>
          {item.props.map((prop) => (
            <div
              key={prop.name}
              className="grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)] gap-3 border-b border-border/70 px-3.5 py-2.5 last:border-b-0 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.1fr)_minmax(0,1.6fr)]"
            >
              <span className="sg-mono text-[11px] break-words text-foreground/90">{prop.name}</span>
              <span className="sg-mono text-[10.5px] break-words text-muted-foreground">
                {prop.type}
                {prop.default ? <span className="text-muted-foreground/60"> = {prop.default}</span> : null}
              </span>
              <span className="col-span-2 text-[12px] leading-relaxed text-muted-foreground sm:col-span-1">
                {prop.description}
              </span>
            </div>
          ))}
        </div>
      </section>

      <nav className="mt-10 flex flex-wrap items-stretch justify-between gap-2 border-t border-border pt-5" aria-label="相邻组件">
        {prev ? (
          <Link
            to={`/components/${prev.slug}`}
            className="glass-panel flex min-w-[140px] flex-col rounded-lg px-3.5 py-2.5 transition-colors hover:bg-[var(--card)]"
          >
            <span className="sg-mono text-[9px] tracking-[0.12em] text-muted-foreground uppercase">上一个</span>
            <span className="mt-0.5 text-[12.5px]">{prev.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            to={`/components/${next.slug}`}
            className={cn(
              "glass-panel flex min-w-[140px] flex-col rounded-lg px-3.5 py-2.5 text-right transition-colors hover:bg-[var(--card)]"
            )}
          >
            <span className="sg-mono text-[9px] tracking-[0.12em] text-muted-foreground uppercase">下一个</span>
            <span className="mt-0.5 text-[12.5px]">{next.title}</span>
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </DocsShell>
  )
}
