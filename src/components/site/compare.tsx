import * as React from "react"

import { cn } from "@/lib/utils"

const modes = [
  { id: "flat", label: "扁平" },
  { id: "solid", label: "Solid Glass" },
  { id: "liquid", label: "液态玻璃" },
] as const

type Mode = (typeof modes)[number]["id"]

const notes: Record<Mode, React.ReactNode> = {
  flat: (
    <>
      <b className="font-medium text-foreground">一块不透明方块。</b>
      没有任何材料感，但文字最清楚——代价是它与页面之间没有层次，只能靠位置区分。
    </>
  ),
  solid: (
    <>
      <b className="font-medium text-foreground">只让轮廓透出来。</b>
      背后的光被柔化成一层灰，面板保持中性，文字与背景之间始终有足够的分离。
    </>
  ),
  liquid: (
    <>
      <b className="font-medium text-foreground">近乎透明的折射。</b>
      玻璃感最强，但背后的色块会爬上文字；在长文页面上，读者一直在与背景争夺清晰度。
    </>
  ),
}

const metrics: Record<Mode, { contrast: string; through: string; thickness: string }> = {
  flat: { contrast: "14.1 : 1", through: "无", thickness: "—" },
  solid: { contrast: "12.4 : 1", through: "轮廓", thickness: "card" },
  liquid: { contrast: "4.8 : 1", through: "色块", thickness: "—" },
}

/**
 * One pane, three materials. The backdrop is the point: a flat block hides it,
 * liquid glass lets its colour climb onto the words, Solid Glass keeps only
 * the outline.
 */
function Compare({ className }: { className?: string }) {
  const [mode, setMode] = React.useState<Mode>("solid")
  const data = metrics[mode]

  return (
    <div className={cn("grid gap-2 lg:grid-cols-[0.82fr_1.18fr]", className)}>
      <div className="flex flex-col lg:pr-6">
        <div className="glass-control inline-flex w-fit gap-0.5 rounded-lg p-[3px]" role="group" aria-label="面板形态">
          {modes.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={mode === item.id}
              onClick={() => setMode(item.id)}
              className={cn(
                "h-7 rounded-md px-3 text-[12px] transition-colors outline-none",
                mode === item.id
                  ? "glass-control text-foreground shadow-[inset_0_1px_0_var(--glass-control-rim),0_0_0_1px_var(--glass-edge)]"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        <p className="mt-5 min-h-[84px] max-w-[46ch] text-[13px] leading-[1.85] text-muted-foreground">
          {notes[mode]}
        </p>

        <dl className="mt-auto flex gap-6 border-t border-border pt-3.5">
          {[
            { term: "文字对比度", value: data.contrast },
            { term: "背后透出", value: data.through },
            { term: "厚度", value: data.thickness },
          ].map((item) => (
            <div key={item.term}>
              <dt className="sg-mono text-[9.5px] tracking-[0.1em] text-muted-foreground uppercase">{item.term}</dt>
              <dd className="sg-mono mt-1 text-[15px] text-foreground">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="sg-compare-stage grid min-h-[300px] place-items-center p-6 sm:p-8">
        <div
          className="sg-probe w-full max-w-[330px] rounded-lg px-4 py-3.5"
          data-mode={mode}
          aria-live="polite"
        >
          <p className="sg-mono text-[9.5px] tracking-[0.1em] uppercase opacity-60">agent / turn</p>
          <p className="mt-1.5 text-[14.5px] font-medium tracking-[-0.01em]">已为三处面板加厚</p>
          <p className="mt-1 text-[12px] leading-relaxed opacity-75">
            card 与 popover 的边框对比度提高，边缘在浅色页面上不再消失。
          </p>
          <div className="mt-3 flex items-center gap-1.5">
            <span className="rounded-[4px] bg-current/10 px-1.5 py-0.5 text-[10px]">src/solid-glass.css</span>
            <span className="rounded-[4px] bg-current/10 px-1.5 py-0.5 text-[10px]">+3 −1</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export { Compare }
