import { Link } from "react-router"

import { cn } from "@/lib/utils"
import { DocsShell } from "@/components/site/docs-shell"
import { buttonVariants } from "@/components/ui/button"
import { usePageMeta } from "@/lib/use-page-meta"
import { registry } from "@/data/registry"

const toc = [
  { id: "what", label: "这是什么" },
  { id: "how", label: "它如何生效" },
  { id: "rules", label: "四条规则" },
  { id: "registry", label: "注册表里有什么" },
  { id: "next", label: "接下来" },
]

const rules = [
  { index: "01", title: "处理落在边缘", body: "高光、hairline、阴影——材质只在边缘发生，面上不加渐变。" },
  { index: "02", title: "厚重而非轻飘", body: "中性灰；模糊只柔化背后，不放大背后的颜色。" },
  { index: "03", title: "层次即厚度", body: "panel（最薄）< card < popover（最厚）。越厚越不透明。" },
  { index: "04", title: "唯一状态", body: "悬停、选中、菜单打开，都是同一小块清玻璃。" },
]

export function DocsOverview() {
  usePageMeta("概览 — Solid Glass 文档", "Solid Glass 是什么，它如何生效，以及四条让材质保持一致的规则。")

  return (
    <DocsShell toc={toc}>
      <div className="sg-prose">
        <p className="sg-eyebrow">文档 · 概览</p>
        <h1 className="mt-3 text-[32px] leading-tight font-semibold tracking-[-0.03em] text-foreground">
          Solid Glass
        </h1>
        <p className="mt-4 max-w-[58ch] text-[15.5px] leading-[1.8] text-muted-foreground">
          一份为 shadcn/ui 写的主题。远看坚实沉稳，近看才显出微妙的材料感：细腻的高光、纤细的边框与柔和的阴影营造出层次，而克制的表面处理把重点放在清晰、稳定与「实」的感觉上。
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          <Link to="/docs/installation" className={cn(buttonVariants({ size: "default" }), "h-9 px-4 text-[13px]")}>
            安装
          </Link>
          <Link
            to="/docs/material"
            className={cn(buttonVariants({ variant: "secondary", size: "default" }), "h-9 px-4 text-[13px]")}
          >
            了解材质
          </Link>
          <Link
            to="/components"
            className={cn(buttonVariants({ variant: "ghost", size: "default" }), "h-9 px-4 text-[13px]")}
          >
            12 个组件
          </Link>
        </div>

        <div className="glass-panel mt-8 grid gap-0 rounded-lg sm:grid-cols-3">
          {[
            { label: "样式表", value: "1 份", note: "src/solid-glass.css" },
            { label: "组件", value: "12 个", note: "自有，非改写" },
            { label: "运行时依赖", value: "0", note: "只要 Tailwind" },
          ].map((item) => (
            <div key={item.label} className="border-b border-border/70 px-4 py-3.5 sm:border-r sm:border-b-0 sm:last:border-r-0">
              <p className="sg-mono text-[9px] tracking-[0.12em] text-muted-foreground uppercase">{item.label}</p>
              <p className="sg-mono mt-1.5 text-[18px] text-foreground">{item.value}</p>
              <p className="mt-0.5 text-[11px] text-muted-foreground">{item.note}</p>
            </div>
          ))}
        </div>

        <h2 id="what">这是什么</h2>
        <p>
          它站在扁平设计与液态玻璃之间。扁平是一块毫无质感可言的不透明方块；液态玻璃近乎透明，在文字很多的页面上，读者总在与背景争夺文字的清晰度。Solid Glass
          只让轮廓透出来：足以让人知道这是玻璃，又不至于妨碍阅读。
        </p>
        <p>
          AI 应用建立在不断变化的信息之上——回复不断涌入，智能体在执行任务，决策在等待人的输入。这套材质让界面保持安静、可读：中性的表面减少视觉干扰，层次建立秩序，而颜色与动效只留给有意义的反馈。
        </p>

        <h2 id="how">它如何生效</h2>
        <p>
          它只是一份样式表。通过 <code>data-slot</code> 和组件自身已有的类名，它找到 shadcn/ui 组件的每一部分，所以你已经装好的组件一行都不用改。
        </p>
        <p>
          变量名用的是 shadcn/ui 自己的：<code>--background</code>、<code>--card</code>、<code>--popover</code>、
          <code>--muted</code> …… 每个组件之所以穿上这层材质，只是因为它本来就在用这些颜色。
        </p>

        <h2 id="rules">四条规则</h2>
        <div className="not-prose mt-4 grid gap-2 sm:grid-cols-2">
          {rules.map((rule) => (
            <div key={rule.index} className="glass-panel rounded-lg p-4">
              <p className="sg-mono text-[9.5px] tracking-[0.12em] text-muted-foreground">{rule.index}</p>
              <h3 className="mt-3 text-[15px] font-medium text-foreground">{rule.title}</h3>
              <p className="mt-1.5 text-[12.5px] leading-[1.7] text-muted-foreground">{rule.body}</p>
            </div>
          ))}
        </div>

        <h2 id="registry">注册表里有什么</h2>
        <p>
          13 项：一份样式表，12 个 Solid Glass 自有的组件。它们都可以用 <code>shadcn add</code> 单独安装，也可以只装其中几个。
        </p>
        <div className="not-prose mt-4 overflow-hidden rounded-lg border border-border">
          {registry.map((item) => (
            <Link
              key={item.slug}
              to={`/components/${item.slug}`}
              className="flex items-center gap-3 border-b border-border/70 px-3.5 py-2.5 transition-colors last:border-b-0 hover:bg-[var(--hover-faint)]"
            >
              <span className="sg-mono w-[112px] shrink-0 text-[10.5px] text-foreground/80">{item.name}</span>
              <span className="text-[12.5px] text-foreground/85">{item.title}</span>
              <span className="ml-auto hidden text-[11.5px] text-muted-foreground sm:block">{item.group}</span>
            </Link>
          ))}
          <div className="flex items-center gap-3 bg-[var(--hover-faint)] px-3.5 py-2.5">
            <span className="sg-mono w-[112px] shrink-0 text-[10.5px] text-foreground/80">solid-glass</span>
            <span className="text-[12.5px] text-foreground/85">样式表本身</span>
            <span className="ml-auto hidden text-[11.5px] text-muted-foreground sm:block">主题</span>
          </div>
        </div>

        <h2 id="next">接下来</h2>
        <p>
          想先看到东西：<Link to="/components">组件</Link> 页有 12 个可以直接点开的例子。想改材质：
          <Link to="/create">创建页</Link> 把厚度、色调、圆角、边缘、模糊都摊开，随每次选择给出那几行 CSS。
        </p>
      </div>
    </DocsShell>
  )
}
