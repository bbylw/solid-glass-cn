import { FileCode2, Paperclip } from "lucide-react"
import * as React from "react"
import { Link } from "react-router"

import { cn } from "@/lib/utils"
import { usePageMeta } from "@/lib/use-page-meta"
import { Compare } from "@/components/site/compare"
import { CodeBlock } from "@/components/site/code-block"
import { Reveal } from "@/components/site/preview"
import { AgentWorkspace } from "@/blocks/agent-workspace"
import { AskCard } from "@/components/ui/ask-card"
import { buttonVariants } from "@/components/ui/button"
import { Composer } from "@/components/ui/composer"
import { ContextRing } from "@/components/ui/context-ring"
import { DiffView } from "@/components/ui/diff-view"
import { StepList, type Step } from "@/components/ui/tool-steps"
import { Tag } from "@/components/ui/tag"
import { TaskNotice } from "@/components/ui/task-notice"
import { TurnStatus } from "@/components/ui/turn-status"

const patch = `@@ -12,4 +12,5 @@
 .glass-panel {
   background-color: var(--panel);
-  border-width: 1px;
+  box-shadow: inset 0 1px 0 var(--glass-rim);
+  box-shadow: 0 0 0 1px var(--glass-edge);
   border-radius: 14px;
 }`

function HeroPane() {
  const [since] = React.useState(() => Date.now() - 5000)
  const [value, setValue] = React.useState("让面板再厚一点")
  const steps: Step[] = [
    { id: "1", label: "读取 solid-glass.css", status: "done" },
    { id: "2", label: "搜索 --glass-rim", status: "done" },
    { id: "3", label: "修改 panel 的边缘", status: "running" },
  ]

  return (
    <div className="sg-hero-light relative flex items-center py-5 lg:pl-6">
      <div className="bg-card w-full overflow-hidden rounded-xl">
        <header className="flex h-9 items-center gap-2 border-b border-border/70 pr-2.5 pl-3">
          <span className="text-[12px] font-medium">智能体 · 会话</span>
          <div className="ml-auto flex items-center gap-2">
            <span className="sg-mono text-[9.5px] tracking-[0.06em] text-muted-foreground">68%</span>
            <ContextRing used={86000} window={128000} />
          </div>
        </header>

        <div className="flex flex-col gap-2 p-3">
          <TurnStatus activity="searching" label="正在读取 solid-glass.css" since={since} tokens={1280} />
          <StepList steps={steps} />
          <DiffView patch={patch} className="max-h-[82px]" />
          <TaskNotice notices={[{ id: "1", title: "后台任务完成 · 3 个文件已更新", status: "completed" }]} />
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
              <button
                type="button"
                aria-label="附加文件"
                className="flex size-6 items-center justify-center rounded-sm text-muted-foreground hover:bg-accent hover:text-foreground"
              >
                <Paperclip className="size-3.5" />
              </button>
            }
          />
        </div>
      </div>
    </div>
  )
}

function Hero() {
  return (
    <section className="pt-7 sm:pt-9">
      <div className="mx-auto grid w-full max-w-[1360px] items-stretch gap-2 px-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.94fr)]">
        <div className="flex flex-col lg:pr-8">
          <div className="flex items-center gap-2.5">
            <span className="size-1 rounded-full bg-muted-foreground/60" />
            <span className="sg-eyebrow">shadcn/ui 主题 · Tailwind CSS 4 · 13 项注册表</span>
          </div>

          <h1 className="mt-5 text-[clamp(2.5rem,5.2vw,4.15rem)] leading-[1.06] font-semibold tracking-[-0.03em]">
            远看坚实，
            <br />
            近看是<span className="text-[var(--brand)]">玻璃</span>
          </h1>

          <p className="mt-5 max-w-[34em] text-[15px] leading-[1.75] text-muted-foreground">
            一种为 <span className="font-medium text-foreground">AI 应用</span>
            而生的界面材质。它站在扁平设计与液态玻璃之间：只让轮廓透出来——足以让人知道这是玻璃，又不至于妨碍阅读。
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <Link to="/docs/installation" className={cn(buttonVariants({ size: "default" }), "h-9 px-4 text-[13px]")}>
              安装这个主题
            </Link>
            <Link
              to="/components"
              className={cn(buttonVariants({ variant: "secondary", size: "default" }), "h-9 px-4 text-[13px]")}
            >
              看 12 个组件
            </Link>
            <Link
              to="/create"
              className="px-1 text-[12.5px] text-muted-foreground transition-colors hover:text-foreground"
            >
              亲手调材质
            </Link>
          </div>

          <dl className="mt-8 flex flex-wrap gap-x-5 gap-y-1 border-t border-border pt-3 pb-1 lg:mt-auto">
            {[
              { term: "厚度", value: "3" },
              { term: "状态", value: "1" },
              { term: "许可证", value: "MIT" },
              { term: "依赖", value: "无" },
            ].map((item) => (
              <div key={item.term} className="flex items-baseline gap-1.5">
                <dt className="sg-mono text-[9.5px] tracking-[0.1em] text-muted-foreground uppercase">{item.term}</dt>
                <dd className="sg-mono text-[11px] text-foreground">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <HeroPane />
      </div>
    </section>
  )
}

function SectionHead({
  index,
  kicker,
  title,
  children,
}: {
  index: string
  kicker: string
  title: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <div className="sg-eyebrow flex items-center gap-2">
          <span>{index}</span>
          <span className="h-px w-4 bg-border" aria-hidden="true" />
          <span>{kicker}</span>
        </div>
        <h2 className="mt-2.5 text-[clamp(24px,2.4vw,32px)] leading-tight font-medium tracking-[-0.025em]">
          {title}
        </h2>
      </div>
      <p className="max-w-[46ch] text-[13px] leading-[1.8] text-muted-foreground">{children}</p>
    </div>
  )
}

function MaterialSection() {
  const rows = [
    {
      index: "01",
      title: "触感",
      body: "让人感觉可触的界面。每一次交互都带着微妙的触感与回应。",
      token: "--hover · 8%",
      demo: (
        <span className="glass-control flex h-7 w-[78px] items-center justify-center rounded-md text-[10.5px] text-muted-foreground transition-transform duration-150 group-hover:translate-y-px group-hover:shadow-[inset_0_2px_4px_var(--glass-contact),0_0_0_1px_var(--glass-edge)]">
          按一下
        </span>
      ),
    },
    {
      index: "02",
      title: "精确",
      body: "干净的几何、考究的细节与克制的光照，营造出精确、技术化的美感。",
      token: "--radius · 14px",
      demo: (
        <span className="relative block size-[42px] bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[length:10.5px_10.5px]">
          <span className="absolute inset-y-0 left-1/2 w-px bg-[color-mix(in_oklch,var(--brand)_60%,transparent)]" />
        </span>
      ),
    },
    {
      index: "03",
      title: "体量",
      body: "层次来自厚度、阴影与空间秩序，让每个元素都有物理上的存在感。",
      token: "panel < card < popover",
      demo: (
        <span className="relative block h-11 w-[88px]">
          <span className="absolute inset-0 rounded-[6px] bg-card shadow-[inset_0_1px_0_var(--glass-rim),0_0_0_1px_var(--glass-edge),0_3px_8px_-4px_var(--glass-shade)]" />
          <span className="absolute inset-[7px] rounded-[5px] bg-popover shadow-[inset_0_1px_0_var(--glass-rim),0_0_0_1px_color-mix(in_oklch,var(--foreground)_16%,transparent)]" />
          <span className="absolute inset-[14px] rounded-[4px] bg-background shadow-[inset_0_1px_0_var(--glass-inner),0_0_0_1px_color-mix(in_oklch,var(--foreground)_10%,transparent)]" />
        </span>
      ),
    },
    {
      index: "04",
      title: "材质",
      body: "细微的边缘高光、纤细的边框与柔和的阴影，勾勒出每一处表面的性格。",
      token: "rim · inner · edge · shade",
      demo: (
        <span className="block w-[104px]">
          <span className="block h-0.5 bg-[linear-gradient(90deg,transparent,color-mix(in_oklch,var(--foreground)_34%,transparent)_30%,color-mix(in_oklch,var(--foreground)_34%,transparent)_70%,transparent)]" />
          <span className="mt-1 block h-px bg-[color-mix(in_oklch,var(--foreground)_15%,transparent)]" />
          <span className="mt-1 block h-px bg-[color-mix(in_oklch,var(--foreground)_8%,transparent)]" />
          <span className="sg-mono mt-1.5 flex justify-between text-[8px] tracking-[0.1em] text-muted-foreground uppercase">
            <span>1px</span>
            <span>8×</span>
          </span>
        </span>
      ),
    },
  ]

  return (
    <section className="mt-10 border-t border-border">
      <div className="mx-auto w-full max-w-[1360px] px-5">
        <div className="pt-8">
          <SectionHead index="01" kicker="材质" title="四种手感，同一种材料">
            高光在边缘，重量在阴影，颜色只留给有意义的反馈。整套材质只用轻量 CSS 写成，在浅色与深色下都与现有组件协同工作。
          </SectionHead>
        </div>

        <div className="mt-6">
          {rows.map((row) => (
            <div
              key={row.index}
              className="group grid grid-cols-[28px_minmax(0,1fr)] items-center gap-x-3 gap-y-1.5 border-t border-border py-4 transition-colors hover:bg-[var(--hover-faint)] sm:grid-cols-[40px_104px_minmax(0,1fr)_150px_104px] sm:gap-x-5 sm:py-3.5"
            >
              <span className="sg-mono self-start pt-1 text-[10px] tracking-[0.12em] text-muted-foreground sm:self-auto sm:pt-0">
                {row.index}
              </span>
              <h3 className="text-[19px] font-medium tracking-[-0.01em] sm:text-[20px]">{row.title}</h3>
              <p className="col-start-2 text-[13px] leading-[1.7] text-muted-foreground sm:col-start-auto">
                {row.body}
              </p>
              <span className="sg-mono hidden justify-self-end text-right text-[10.5px] whitespace-nowrap text-muted-foreground sm:block">
                {row.token}
              </span>
              <span className="col-start-2 flex h-11 items-center sm:col-start-auto sm:justify-end">{row.demo}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CompareSection() {
  return (
    <section className="mt-10 border-t border-border">
      <div className="mx-auto w-full max-w-[1360px] px-5">
        <div className="pt-8">
          <SectionHead index="02" kicker="对照" title="同一块面板，三种形态">
            扁平是一块毫无质感的不透明方块；液态玻璃近乎透明，读者总在与背景争夺文字的清晰度。
          </SectionHead>
        </div>
        <Reveal className="mt-6">
          <Compare />
        </Reveal>
      </div>
    </section>
  )
}

function ComponentsSection() {
  const [asked, setAsked] = React.useState<string | null>(null)
  const [value, setValue] = React.useState("重写这个面板")
  const [since] = React.useState(() => Date.now() - 800)

  const tile = "glass-panel flex min-h-[168px] flex-col overflow-hidden rounded-lg"
  const cap = "flex items-center justify-between gap-2 border-t border-border/70 px-3 py-2"
  const capName = "sg-mono text-[10px] text-foreground/80"
  const capTag = "text-[9.5px] tracking-[0.1em] text-muted-foreground uppercase"

  return (
    <section className="mt-10 border-t border-border">
      <div className="mx-auto w-full max-w-[1360px] px-5">
        <div className="pt-8">
          <SectionHead index="03" kicker="组件" title="为智能体工作而做">
            状态、步骤、diff、提问、上下文充盈度——那些在一轮对话里真正出现的东西。
          </SectionHead>
        </div>

        <div className="mt-6 grid auto-rows-[minmax(168px,auto)] grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-12">
          <div className={cn(tile, "lg:col-span-5")}>
            <div className="flex flex-1 flex-col justify-center gap-2.5 p-4">
              <TurnStatus activity="searching" label="正在搜索 3 个文件" since={since} />
              <p className="text-[11.5px] leading-relaxed text-muted-foreground">
                在 <span className="sg-mono text-[10.5px]">src/components/ui</span> 中找到 3 处匹配
              </p>
              <div className="flex flex-wrap gap-1.5">
                <Tag>tool-steps</Tag>
                <Tag>context-ring</Tag>
              </div>
            </div>
            <div className={cap}>
              <span className={capName}>turn-status</span>
              <span className={capTag}>状态栏</span>
            </div>
          </div>

          <div className={cn(tile, "lg:col-span-4")}>
            <div className="flex flex-1 flex-col justify-center p-3">
              <StepList
                steps={[
                  { id: "1", label: "bun install", status: "done" },
                  { id: "2", label: "shadcn add panel", status: "done" },
                  { id: "3", label: "写入 token", status: "running" },
                ]}
              />
            </div>
            <div className={cap}>
              <span className={capName}>tool-steps</span>
              <span className={capTag}>步骤</span>
            </div>
          </div>

          <div className={cn(tile, "lg:col-span-3")}>
            <div className="flex flex-1 items-center justify-between gap-3 p-4">
              <div>
                <p className="text-[11.5px] text-muted-foreground">上下文已用</p>
                <p className="mt-1 flex items-baseline gap-1">
                  <span className="text-[26px] leading-none tracking-[-0.03em]">68</span>
                  <span className="text-[11px] text-muted-foreground">%</span>
                </p>
                <p className="sg-mono mt-1.5 text-[9.5px] text-muted-foreground">86K / 128K</p>
              </div>
              <ContextRing used={86000} window={128000} />
            </div>
            <div className={cap}>
              <span className={capName}>context-ring</span>
              <span className={capTag}>上下文</span>
            </div>
          </div>

          <div className={cn(tile, "lg:col-span-6")}>
            <div className="flex flex-1 items-center p-3">
              <DiffView patch={patch} className="max-h-[120px] w-full" />
            </div>
            <div className={cap}>
              <span className={capName}>diff-view</span>
              <span className={capTag}>改动</span>
            </div>
          </div>

          <div className={cn(tile, "lg:col-span-3")}>
            <div className="flex flex-1 items-center p-4">
              <AskCard
                question="要保留卡片的高光吗？"
                options={["保留", "去掉"]}
                onAnswer={setAsked}
                eyebrow={asked ? `已选择：${asked}` : "需要你决定"}
                className="w-full"
              />
            </div>
            <div className={cap}>
              <span className={capName}>ask-card</span>
              <span className={capTag}>提问</span>
            </div>
          </div>

          <div className={cn(tile, "lg:col-span-3")}>
            <div className="flex flex-1 items-center p-4">
              <Composer
                value={value}
                onValueChange={setValue}
                onSubmit={() => setValue("")}
                placeholder="输入消息…"
                sendLabel="发送"
                className="w-full"
              />
            </div>
            <div className={cap}>
              <span className={capName}>composer</span>
              <span className={capTag}>输入</span>
            </div>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-border py-5">
          <span className="sg-mono text-[9.5px] tracking-[0.1em] text-muted-foreground uppercase">
            panel · tag · dot-loader · status-glyph · reasoning · task-notice
          </span>
          <Link to="/components" className={cn(buttonVariants({ variant: "secondary", size: "sm" }), "h-8 text-[12px]")}>
            全部组件
          </Link>
        </div>
      </div>
    </section>
  )
}

function BlocksSection() {
  return (
    <section className="mt-10 border-t border-border">
      <div className="mx-auto w-full max-w-[1360px] px-5">
        <div className="pt-8">
          <SectionHead index="04" kicker="区块" title="一整屏，而不只是一个组件">
            用这些组件拼出的整屏界面，供你查看、阅读并直接复制。
          </SectionHead>
        </div>
        <Reveal className="mt-6">
          <AgentWorkspace compact />
        </Reveal>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-border py-5">
          <div className="flex flex-wrap items-center gap-2 text-[12px] text-muted-foreground">
            <span className="sg-mono text-[10.5px] text-foreground/80">agent-workspace</span>
            <span>注册表里的整屏区块 · 可直接复制</span>
          </div>
          <Link to="/blocks" className={cn(buttonVariants({ variant: "secondary", size: "sm" }), "h-8 text-[12px]")}>
            打开区块
          </Link>
        </div>
      </div>
    </section>
  )
}

function InstallSection() {
  return (
    <section className="mt-10 border-t border-border">
      <div className="mx-auto w-full max-w-[1360px] px-5 pb-8">
        <div className="pt-8">
          <SectionHead index="05" kicker="安装" title="一份样式表，别的都不用改">
            它通过 <span className="sg-mono text-[11.5px] text-foreground">data-slot</span>{" "}
            和组件已有的类名找到 shadcn/ui 的每一部分，因此你手上的组件无需改动。
          </SectionHead>
        </div>

        <div className="mt-6 grid gap-2 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="flex flex-col">
            {[
              {
                n: "01",
                title: "从一个 shadcn/ui 项目起步",
                body: "React 19、Tailwind CSS 4、Base UI 组件。已有项目可直接跳到下一步。",
              },
              { n: "02", title: "加入样式表", body: "它会落在 src/solid-glass.css。" },
              {
                n: "03",
                title: "调整引入顺序",
                body: "放在 Tailwind 与 shadcn 之后，并删掉 init 写下的 :root 颜色变量。",
              },
            ].map((step) => (
              <div key={step.n} className="flex gap-4 border-b border-border py-4 last:border-b-0">
                <span className="sg-mono pt-0.5 text-[10px] tracking-[0.06em] text-[var(--brand)]">{step.n}</span>
                <div>
                  <h3 className="text-[13.5px] font-medium">{step.title}</h3>
                  <p className="mt-1 text-[12.5px] leading-[1.7] text-muted-foreground">{step.body}</p>
                </div>
              </div>
            ))}
            <Link
              to="/docs/installation"
              className="mt-4 inline-flex w-fit items-center text-[12.5px] text-foreground/80 transition-colors hover:text-foreground"
            >
              完整安装说明
            </Link>
          </div>

          <CodeBlock
            language="bash"
            filename="终端"
            wrap
            code={`# 1 · 加入主题
bunx shadcn@latest add deeplethe/solid-glass/solid-glass

# 2 · 引入顺序（src/app.css）
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";
@import "./solid-glass.css";

# 3 · 加一个自有组件
bunx shadcn@latest add deeplethe/solid-glass/panel`}
          />
        </div>
      </div>
    </section>
  )
}

export function Home() {
  usePageMeta(
    "Solid Glass — 远看坚实，近看是玻璃",
    "Solid Glass 是一份为 AI 应用而生的 shadcn/ui 主题：站在扁平设计与液态玻璃之间，只让轮廓透出来。"
  )

  return (
    <main>
      <Hero />
      <MaterialSection />
      <CompareSection />
      <ComponentsSection />
      <BlocksSection />
      <InstallSection />
    </main>
  )
}
