import * as React from "react"

import { cn } from "@/lib/utils"
import { CodeBlock } from "@/components/site/code-block"
import { DocsShell } from "@/components/site/docs-shell"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider, Switch } from "@/components/ui/switch"
import { Tag } from "@/components/ui/tag"
import { useThemeMode } from "@/lib/use-theme"

type Tone = "neutral" | "cool" | "warm"
type Chart = "grey" | "brand" | "contrast"

const toneOptions: { id: Tone; label: string }[] = [
  { id: "neutral", label: "中性" },
  { id: "cool", label: "偏冷" },
  { id: "warm", label: "偏暖" },
]

const chartOptions: { id: Chart; label: string }[] = [
  { id: "grey", label: "灰阶" },
  { id: "brand", label: "品牌" },
  { id: "contrast", label: "对比" },
]

const bases = {
  dark: {
    background: [0.16, 0, 0] as const,
    panel: [1, 0, 0, 4.5] as const,
    card: [0.31, 0, 0, 46] as const,
    popover: [0.22, 0, 0, 96] as const,
    rim: 16,
    edge: 6,
    inner: 4,
    shade: 60,
  },
  light: {
    background: [0.925, 0.007, 265] as const,
    panel: [0.975, 0.004, 265, 44] as const,
    card: [0.98, 0.004, 265, 60] as const,
    popover: [0.985, 0.003, 265, 96] as const,
    rim: 90,
    edge: 10,
    inner: 35,
    shade: 28,
  },
}

const toneHue: Record<Tone, { background: number; chroma: number; pane: number }> = {
  neutral: { background: 0, chroma: 0, pane: 0 },
  cool: { background: 265, chroma: 0.009, pane: 0.02 },
  warm: { background: 70, chroma: 0.008, pane: 0.014 },
}

const charts: Record<Chart, string[]> = {
  grey: ["oklch(0.94 0 0)", "oklch(0.83 0 0)", "oklch(0.69 0 0)", "oklch(0.56 0 0)", "oklch(0.44 0 0)"],
  brand: [
    "oklch(0.82 0.1 166)",
    "oklch(0.74 0.12 166)",
    "oklch(0.66 0.12 166)",
    "oklch(0.56 0.1 166)",
    "oklch(0.46 0.08 166)",
  ],
  contrast: ["oklch(0.97 0.03 166)", "oklch(0.8 0.14 166)", "oklch(0.62 0.16 166)", "oklch(0.46 0.13 166)", "oklch(0.32 0.08 166)"],
}

function round(value: number, digits = 1) {
  const factor = 10 ** digits
  return Math.round(value * factor) / factor
}

function Control({
  label,
  value,
  hint,
  children,
}: {
  label: string
  value: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div className="border-b border-border/70 py-3.5 last:border-b-0">
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-[12.5px] font-medium">{label}</span>
        <span className="sg-mono text-[10.5px] text-muted-foreground">{value}</span>
      </div>
      <div className="mt-2.5">{children}</div>
      {hint && <p className="mt-1.5 text-[10.5px] leading-relaxed text-muted-foreground/80">{hint}</p>}
    </div>
  )
}

export function Create() {
  const theme = useThemeMode()
  const base = bases[theme]

  const [thickness, setThickness] = React.useState(1)
  const [radius, setRadius] = React.useState(14)
  const [edge, setEdge] = React.useState(1)
  const [blur, setBlur] = React.useState(26)
  const [tone, setTone] = React.useState<Tone>("neutral")
  const [chart, setChart] = React.useState<Chart>("grey")
  const [dense, setDense] = React.useState(true)

  const hue = toneHue[tone]
  const bg = `oklch(${base.background[0]} ${round(base.background[1] + hue.chroma, 3)} ${hue.background === 0 ? base.background[2] : hue.background})`
  const pane = (values: readonly [number, number, number, number], extraChroma = 0) =>
    `oklch(${values[0]} ${round(values[1] + extraChroma, 3)} ${hue.pane ? (hue.background % 360) : values[2]} / ${round(values[3] * thickness, 1)}%)`

  const values: Record<string, string> = {
    "--background": bg,
    "--panel": pane(base.panel, hue.pane),
    "--card": pane(base.card, hue.pane),
    "--popover": pane(base.popover, hue.pane),
    "--radius": `${radius}px`,
    "--glass-blur": `blur(${blur}px)`,
    "--glass-rim": `oklch(1 0 0 / ${round(base.rim * edge, 1)}%)`,
    "--glass-inner": `oklch(1 0 0 / ${round(base.inner * edge, 1)}%)`,
    "--glass-edge": `oklch(1 0 0 / ${round(base.edge * edge, 1)}%)`,
    "--glass-shade": `oklch(0 0 0 / ${round(base.shade * (0.6 + thickness * 0.4), 1)}%)`,
    "--chart-1": charts[chart][0],
    "--chart-2": charts[chart][1],
    "--chart-3": charts[chart][2],
    "--chart-4": charts[chart][3],
    "--chart-5": charts[chart][4],
  }
  const vars = values as React.CSSProperties

  const css = `:root${theme === "dark" ? ".dark" : ""} {
  /* 背景与三种厚度 */
  --background: ${bg};
  --panel: ${values["--panel"]};
  --card: ${values["--card"]};
  --popover: ${values["--popover"]};

  /* 圆角与模糊 */
  --radius: ${radius}px;
  --glass-blur: blur(${blur}px);

  /* 边缘：rim / inner / edge / shade 同乘一个系数 */
  --glass-rim: ${values["--glass-rim"]};
  --glass-inner: ${values["--glass-inner"]};
  --glass-edge: ${values["--glass-edge"]};
  --glass-shade: ${values["--glass-shade"]};

  /* 图表 */
  --chart-1: ${charts[chart][0]};
  --chart-2: ${charts[chart][1]};
  --chart-3: ${charts[chart][2]};
  --chart-4: ${charts[chart][3]};
  --chart-5: ${charts[chart][4]};
}`

  return (
    <DocsShell
      wide
      toc={[
        { id: "controls", label: "参数" },
        { id: "preview", label: "预览" },
        { id: "css", label: "生成的 CSS" },
      ]}
    >
      <div className="flex flex-col gap-2 border-b border-border pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="sg-eyebrow">工具</p>
          <h1 className="mt-2.5 text-[30px] leading-tight font-semibold tracking-[-0.03em]">创建</h1>
        </div>
        <p className="max-w-[40ch] text-[13px] leading-[1.8] text-muted-foreground">
          把材质的参数摊开。每拨一次，预览立刻变，下面那几行 CSS 也跟着变——复制走，贴进你的样式表。
        </p>
      </div>

      <div className="mt-6 grid gap-2 lg:grid-cols-[300px_minmax(0,1fr)]">
        <div id="controls" className="scroll-mt-24">
          <div className="glass-panel rounded-lg px-4 py-1.5">
            <Control label="厚度" value={`×${thickness.toFixed(2)}`} hint="panel、card、popover 的不透明度同乘这个系数。">
              <Slider value={thickness} onValueChange={setThickness} min={0.5} max={1.6} step={0.05} />
            </Control>
            <Control label="圆角" value={`${radius}px`}>
              <Slider value={radius} onValueChange={setRadius} min={6} max={22} step={1} />
            </Control>
            <Control label="边缘" value={`×${edge.toFixed(2)}`} hint="rim、inner、edge 的强度。太弱会散，太强会像描边。">
              <Slider value={edge} onValueChange={setEdge} min={0.4} max={1.8} step={0.05} />
            </Control>
            <Control label="模糊" value={`${blur}px`} hint="只柔化背后，不放大颜色。">
              <Slider value={blur} onValueChange={setBlur} min={0} max={48} step={1} />
            </Control>

            <Control label="色调" value={toneOptions.find((item) => item.id === tone)!.label}>
              <div className="glass-control inline-flex w-full gap-0.5 rounded-lg p-[3px]">
                {toneOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    aria-pressed={tone === option.id}
                    onClick={() => setTone(option.id)}
                    className={cn(
                      "h-7 flex-1 rounded-md text-[11.5px] transition-colors",
                      tone === option.id
                        ? "glass-control text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </Control>

            <Control label="图表色" value={chartOptions.find((item) => item.id === chart)!.label}>
              <div className="glass-control inline-flex w-full gap-0.5 rounded-lg p-[3px]">
                {chartOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    aria-pressed={chart === option.id}
                    onClick={() => setChart(option.id)}
                    className={cn(
                      "h-7 flex-1 rounded-md text-[11.5px] transition-colors",
                      chart === option.id
                        ? "glass-control text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </Control>

            <Control label="密度" value={dense ? "紧凑" : "宽松"}>
              <div className="flex items-center gap-2">
                <Switch checked={dense} onCheckedChange={setDense} aria-label="紧凑密度" />
                <span className="text-[11.5px] text-muted-foreground">控件高度收紧 4px</span>
              </div>
            </Control>
          </div>

          <div className="glass-panel mt-2 flex items-center gap-2 rounded-lg px-3 py-2.5">
            <Badge variant="outline" className="sg-mono text-[9.5px]">
              {theme === "dark" ? "DARK" : "LIGHT"}
            </Badge>
            <span className="text-[11px] text-muted-foreground">预览与代码都跟随当前主题</span>
          </div>
        </div>

        <div id="preview" className="scroll-mt-24">
          <div
            className="sg-compare-stage grid min-h-[360px] place-items-center p-5 sm:p-8" data-quiet="true"
            style={vars}
            data-density={dense ? "dense" : "roomy"}
          >
            <div className="w-full max-w-[430px]">
              <div className="bg-card rounded-xl p-4" style={{ borderRadius: `calc(${radius}px * 1.05)` }}>
                <div className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-[var(--brand)]" />
                  <span className="text-[12.5px] font-medium">面板</span>
                  <span className="sg-mono ml-auto text-[9px] tracking-[0.08em] text-muted-foreground uppercase">
                    card
                  </span>
                </div>

                <p className="mt-2 text-[11.5px] leading-relaxed text-muted-foreground">
                  高光在边缘，重量在阴影，面上不加渐变。厚度 ×{thickness.toFixed(2)}，模糊 {blur}px。
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-1.5">
                  <Tag>panel</Tag>
                  <Tag>card</Tag>
                  <Tag>popover</Tag>
                </div>

                <div className={cn("mt-3.5 flex flex-wrap gap-1.5", dense && "[&_[data-slot=button]]:h-8 [&_[data-slot=input]]:h-8")}>
                  <Button size="default" className="h-9 px-3.5 text-[12.5px]">
                    主按钮
                  </Button>
                  <Button variant="secondary" size="default" className="h-9 px-3.5 text-[12.5px]">
                    次按钮
                  </Button>
                  <Button variant="ghost" size="default" className="h-9 px-3 text-[12.5px]">
                    幽灵
                  </Button>
                </div>

                <div className="mt-3 grid gap-2 sm:grid-cols-[1fr_auto]">
                  <Input placeholder="输入一点什么…" className={cn(dense && "h-8")} />
                  <div className="flex items-center gap-2">
                    <Switch defaultChecked aria-label="示例开关" />
                    <span className="text-[11px] text-muted-foreground">启用</span>
                  </div>
                </div>

                <div className="mt-4 flex h-16 items-end gap-1.5">
                  {[0.42, 0.72, 0.55, 0.9, 0.64, 0.34, 0.78, 0.48].map((height, index) => (
                    <span
                      key={index}
                      className="flex-1 rounded-[3px]"
                      style={{
                        height: `${height * 100}%`,
                        backgroundColor: charts[chart][index % 5],
                        boxShadow: "inset 0 1px 0 rgb(255 255 255 / 24%), 0 0 0 1px rgb(0 0 0 / 12%)",
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="glass-panel mt-2 rounded-lg px-3.5 py-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11.5px] font-medium">panel</span>
                  <span className="sg-mono text-[9px] text-muted-foreground">最薄</span>
                </div>
                <p className="mt-1 text-[11px] text-muted-foreground">页面就是用它排布的。它比卡片暗一档。</p>
              </div>
            </div>
          </div>
          <p className="sg-mono mt-2 text-[9.5px] tracking-[0.08em] text-muted-foreground/70 uppercase">
            预览 · 参数即时生效 · {theme === "dark" ? "深色" : "浅色"}
          </p>
        </div>
      </div>

      <div id="css" className="mt-8 scroll-mt-24">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-[16px] font-medium">生成的 CSS</h2>
          <span className="sg-mono text-[9.5px] tracking-[0.08em] text-muted-foreground uppercase">
            {theme === "dark" ? ".dark" : ":root"}
          </span>
        </div>
        <p className="mt-1.5 text-[12.5px] text-muted-foreground">
          贴在这份样式表之后，覆盖同名变量即可。切到浅色，这里会给出另一套。
        </p>
        <div className="mt-3">
          <CodeBlock language="css" filename="solid-glass.custom.css" code={css} />
        </div>
      </div>
    </DocsShell>
  )
}
