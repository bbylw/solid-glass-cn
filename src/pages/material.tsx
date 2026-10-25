import type { ReactNode } from "react"
import { Link } from "react-router"

import { cn } from "@/lib/utils"
import { DocsShell } from "@/components/site/docs-shell"
import { buttonVariants } from "@/components/ui/button"
import { usePageMeta } from "@/lib/use-page-meta"

const toc = [
  { id: "anatomy", label: "一块面板的剖面" },
  { id: "rules", label: "四条规则" },
  { id: "thickness", label: "三种厚度" },
  { id: "state", label: "唯一状态" },
  { id: "tokens", label: "变量" },
]

const layers = [
  {
    name: "rim",
    token: "--glass-rim",
    value: "oklch(1 0 0 / 16%)",
    role: "顶边那道亮线。光从上方来，只落在朝上的边缘。",
    sample: "bg-[var(--glass-rim)]",
    kind: "top" as const,
  },
  {
    name: "inner",
    token: "--glass-inner",
    value: "oklch(1 0 0 / 4%)",
    role: "亮线内侧的第二道线。它让边缘看起来有厚度，而不是一圈描边。",
    sample: "bg-[var(--glass-inner)]",
    kind: "inner" as const,
  },
  {
    name: "edge",
    token: "--glass-edge",
    value: "oklch(1 0 0 / 6%)",
    role: "绕一整圈的 hairline。面板与页面之间，靠它分开。",
    sample: "bg-[var(--glass-edge)]",
    kind: "ring" as const,
  },
  {
    name: "shade",
    token: "--glass-shade",
    value: "oklch(0 0 0 / 60%)",
    role: "落在下面的影子。它不在面板上，是面板站在页面上的证据。",
    sample: "bg-[var(--glass-shade)]",
    kind: "bottom" as const,
  },
]

function MaterialSection({
  index,
  title,
  claim,
  children,
  demo,
}: {
  index: string
  title: string
  claim: string
  children: ReactNode
  demo: ReactNode
}) {
  return (
    <div className="grid gap-5 border-t border-border py-6 md:grid-cols-[minmax(0,1fr)_260px] md:items-center md:gap-8">
      <div>
        <div className="flex items-baseline gap-3">
          <span className="sg-mono text-[10px] tracking-[0.12em] text-muted-foreground">{index}</span>
          <h3 className="text-[16px] font-medium text-foreground">{title}</h3>
        </div>
        <p className="mt-2 max-w-[54ch] text-[13px] leading-[1.8] text-muted-foreground">{children}</p>
        <p className="sg-mono mt-2 text-[10.5px] text-muted-foreground/80">{claim}</p>
      </div>
      <div className="sg-stage flex h-[104px] items-center justify-center rounded-lg">{demo}</div>
    </div>
  )
}

export function Material() {
  usePageMeta("材质 — Solid Glass 文档", "一块面板由四道边构成：边缘高光、内线、hairline 与落影。这是材质的全部。")

  return (
    <DocsShell toc={toc}>
      <div className="sg-prose">
        <p className="sg-eyebrow">文档 · 材质</p>
        <h1 className="mt-3 text-[30px] leading-tight font-semibold tracking-[-0.03em] text-foreground">材质</h1>
        <p className="mt-3 max-w-[58ch] text-[15px] leading-[1.8] text-muted-foreground">
          一块面板由四道边构成。它之所以看起来是玻璃，全部原因都在这里——面上什么都没有。
        </p>

        <h2 id="anatomy">一块面板的剖面</h2>
        <p>
          远看它是一块实心的板；近看，边缘有一道朝上的光、一圈细线、一层落影。光只落在朝上的边上，影子只落在与页面接触的地方。
        </p>

        <div className="not-prose mt-5 grid gap-2 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="sg-compare-stage grid min-h-[300px] place-items-center p-6">
            <div className="bg-card w-full max-w-[300px] rounded-xl p-4">
              <div className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-[var(--brand)]" />
                <span className="text-[12.5px] font-medium">会话</span>
                <span className="sg-mono ml-auto text-[9px] tracking-[0.08em] text-muted-foreground uppercase">
                  card
                </span>
              </div>
              <p className="mt-2 text-[11.5px] leading-relaxed text-muted-foreground">
                高光在边缘，重量在阴影，面上不加渐变。
              </p>
              <div className="mt-3 flex gap-1.5">
                <span className="glass-chosen rounded-sm px-2 py-0.5 text-[10.5px]">panel</span>
                <span className="glass-chosen rounded-sm px-2 py-0.5 text-[10.5px]">popover</span>
              </div>
            </div>
          </div>

          <div className="glass-panel flex flex-col justify-center rounded-lg px-4 py-2">
            {layers.map((layer) => (
              <div key={layer.name} className="flex items-start gap-3 border-b border-border/60 py-3 last:border-b-0">
                <span className="relative mt-0.5 h-7 w-14 shrink-0 overflow-hidden rounded-[4px] bg-[oklch(0.42_0_0)] shadow-[inset_0_0_0_1px_oklch(1_0_0/14%)]">
                  {layer.kind === "ring" ? (
                    <span className="absolute inset-0 rounded-[4px] shadow-[inset_0_0_0_1px_var(--glass-edge)]" />
                  ) : layer.kind === "bottom" ? (
                    <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-t from-[var(--glass-shade)] to-transparent" />
                  ) : (
                    <span
                      className={cn(
                        "absolute inset-x-0 h-[2px]",
                        layer.kind === "inner" ? "top-[4px]" : "top-0",
                        layer.sample
                      )}
                    />
                  )}
                </span>
                <div className="min-w-0">
                  <div className="flex items-baseline gap-2">
                    <span className="sg-mono text-[11px] text-foreground/90">{layer.name}</span>
                    <span className="sg-mono text-[9.5px] text-muted-foreground">{layer.token}</span>
                  </div>
                  <p className="mt-0.5 text-[11px] leading-[1.6] text-muted-foreground">{layer.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="sg-mono mt-2 text-[9.5px] tracking-[0.08em] text-muted-foreground/70 uppercase">
          四道边按顺序叠在同一个 box-shadow 里
        </p>

        <h2 id="rules">四条规则</h2>

        <div className="not-prose mt-4">
          <MaterialSection
            index="01"
            title="处理落在边缘"
            claim="rim + hairline + shadow，面上永远是一块平色"
            demo={
              <div className="flex flex-col items-center gap-1.5">
                <span className="block h-9 w-24 rounded-md bg-card shadow-[inset_0_1px_0_var(--glass-rim),0_0_0_1px_var(--glass-edge),0_8px_16px_-8px_var(--glass-shade)]" />
                <span className="sg-mono text-[8.5px] tracking-[0.1em] text-muted-foreground uppercase">edge only</span>
              </div>
            }
          >
            高光、hairline、阴影，三样东西都在边缘发生。面上是一块平的中性色，从左上到右下铺一道渐变，会让它立刻变回一张贴图。
          </MaterialSection>

          <MaterialSection
            index="02"
            title="厚重而非轻飘"
            claim="neutral grey · blur softens, never boosts"
            demo={
              <div className="flex items-end gap-2">
                <span className="block h-10 w-10 rounded-md bg-[var(--brand)]/70" />
                <span className="block h-10 w-10 rounded-md bg-card backdrop-blur-[18px]" />
                <span className="block h-10 w-10 rounded-md bg-[oklch(1_0_0/9%)] backdrop-blur-[18px] backdrop-saturate-200" />
              </div>
            }
          >
            面板是中性的灰，不从背后取色。模糊只把背后的东西柔化，不放大它的颜色——最后那个方块加了饱和度，代价是它旁边的一切都开始显得脏。
          </MaterialSection>

          <MaterialSection
            index="03"
            title="层次即厚度"
            claim="panel < card < popover"
            demo={
              <div className="relative h-16 w-[132px]">
                <span className="absolute inset-x-0 top-0 h-9 rounded-md bg-[var(--panel)] shadow-[inset_0_1px_0_var(--glass-rim),0_0_0_1px_var(--glass-edge)]" />
                <span className="absolute inset-x-3 top-4 h-9 rounded-md bg-card shadow-[inset_0_1px_0_var(--glass-rim),0_0_0_1px_var(--glass-edge),0_6px_12px_-6px_var(--glass-shade)]" />
                <span className="absolute inset-x-6 top-8 h-9 rounded-md bg-popover shadow-[inset_0_1px_0_var(--glass-rim),0_0_0_1px_var(--popover-edge),0_10px_20px_-8px_var(--glass-shade)]" />
              </div>
            }
          >
            三种厚度，越厚越不透明。面板最薄，是页面用来分栏的；卡片厚一档；popover 最厚，因为它浮在别的东西上面，必须自己站得住。
          </MaterialSection>

          <MaterialSection
            index="04"
            title="唯一状态"
            claim="hovered = chosen = held open"
            demo={
              <div className="flex items-center gap-2">
                {["悬停", "选中", "展开"].map((label) => (
                  <span key={label} className="glass-chosen rounded-sm px-2.5 py-1 text-[10.5px] text-foreground/85">
                    {label}
                  </span>
                ))}
              </div>
            }
          >
            悬停、被选中、菜单还开着——三种情况穿的是同一小块清玻璃。界面里只有一种「在这里」的样子，学一次就够。
          </MaterialSection>
        </div>

        <h2 id="thickness">三种厚度</h2>
        <p>厚度是变量，不是类。三个 token 定义了三种不透明度，组件用哪个颜色，就自动是哪种厚度。</p>
        <div className="not-prose mt-4 overflow-hidden rounded-lg border border-border">
          {[
            { token: "--panel", use: "页面分栏用的面板", value: "1 0 0 / 4.5%", className: "bg-[var(--panel)]" },
            { token: "--card", use: "卡片、内容块", value: "0.31 0 0 / 46%", className: "bg-[var(--card)]" },
            { token: "--popover", use: "浮在最上面的东西", value: "0.22 0 0 / 96%", className: "bg-[var(--popover)]" },
          ].map((row) => (
            <div key={row.token} className="grid grid-cols-[24px_1fr_auto] items-center gap-3 border-b border-border/70 px-3.5 py-2.5 last:border-b-0">
              <span className={cn("size-4 rounded-[4px] shadow-[inset_0_1px_0_var(--glass-rim),0_0_0_1px_var(--glass-edge)]", row.className)} />
              <span className="sg-mono text-[10.5px] text-foreground/85">{row.token}</span>
              <span className="text-[11.5px] text-muted-foreground">{row.use}</span>
            </div>
          ))}
        </div>

        <h2 id="state">一个状态</h2>
        <p>
          这套材质里不存在「悬停色」「选中色」「打开色」三套颜色。只有一块清玻璃，出现在不同位置。少一套颜色，就少一次解释。
        </p>

        <h2 id="tokens">变量</h2>
        <p>
          全部变量集中在 <code>src/solid-glass.css</code>，深浅色各一套。<Link to="/create">创建页</Link>{" "}
          可以把它们摊开，随每次选择给出那几行 CSS。
        </p>

        <div className="mt-8 flex flex-wrap gap-2 border-t border-border pt-6">
          <Link to="/create" className={cn(buttonVariants({ size: "default" }), "h-9 px-4 text-[13px]")}>
            动手调材质
          </Link>
          <Link
            to="/docs/installation"
            className={cn(buttonVariants({ variant: "secondary", size: "default" }), "h-9 px-4 text-[13px]")}
          >
            回到安装
          </Link>
        </div>
      </div>
    </DocsShell>
  )
}
