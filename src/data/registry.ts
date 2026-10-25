export type PropRow = {
  name: string
  type: string
  default?: string
  description: string
}

export type RegistryItem = {
  slug: string
  /** The name it has in the registry, and in `shadcn add`. */
  name: string
  title: string
  english: string
  group: "基础" | "状态" | "工作"
  summary: string
  paragraphs: string[]
  usage: string
  props: PropRow[]
  /** The file it lands in. */
  target: string
}

export const registry: RegistryItem[] = [
  {
    slug: "panel",
    name: "panel",
    title: "面板",
    english: "Panel",
    group: "基础",
    summary: "最薄的一层玻璃，带一条标题栏：页面就是用它排布的。",
    paragraphs: [
      "panel 比卡片暗一档，所以一列面板并排时不会盖过正在被读的内容。标题栏高 32 像素，右侧留出动作与关闭的位置；如果面板自己的控件已经说明了它是什么——比如一排标签页——就把那些控件作为 bar 传进来，它们会占掉标题的位置。",
      "面板里的一行用 PanelRow：指针经过时亮起，被选中时是一块清玻璃。它始终是一个 button，所以键盘与读屏软件拿到的就是它们期待的东西。",
    ],
    usage: `import { Panel, PanelRow } from "@/components/ui/panel"

<Panel title="会话" onClose={() => {}}>
  <div className="flex flex-col gap-0.5 p-1.5">
    <PanelRow chosen>玻璃的边缘</PanelRow>
    <PanelRow>给面板加厚</PanelRow>
  </div>
</Panel>`,
    props: [
      { name: "title", type: "string", description: "面板的名字，同时作为 region 的 aria-label。" },
      { name: "bar", type: "ReactNode", description: "代替标题的控件，例如一排标签页。" },
      { name: "actions", type: "ReactNode", description: "标题右侧的动作，排在关闭按钮之前。" },
      { name: "onClose", type: "() => void", description: "给了才有关闭按钮。" },
    ],
    target: "components/ui/panel.tsx",
  },
  {
    slug: "tag",
    name: "tag",
    title: "标签",
    english: "Tag",
    group: "基础",
    summary: "附在正在写的内容上的东西：一个工具、一个文件、一个目录。",
    paragraphs: [
      "标签是一小块清玻璃，宽度跟着文字走，不设最小宽度——否则短名字会在关闭按钮前留下一段空白，每个标签的 × 距离都不一样。",
      "当 progress 在 0 到 1 之间时，标签自己就是进度条，从左往右填满，行里不会多出新东西。armed 是同一块玻璃亮一档，用于「下一次退格会删掉它」的那个标签。",
    ],
    usage: `import { Tag } from "@/components/ui/tag"

<Tag icon={<FileIcon />} onRemove={() => {}}>solid-glass.css</Tag>
<Tag icon={<LoaderIcon />} progress={0.42}>panel.tsx</Tag>`,
    props: [
      { name: "icon", type: "ReactNode", description: "标签前的图标；上传中会被换成转圈。" },
      { name: "progress", type: "number", description: "0–1，给定时标签本身成为进度条。" },
      { name: "error", type: "string", description: "出错的原因，悬停时显示，标签转成失败的颜色。" },
      { name: "armed", type: "boolean", description: "下一次退格会删除它时，亮一档。" },
      { name: "onRemove", type: "() => void", description: "给了才有 ×。" },
    ],
    target: "components/ui/tag.tsx",
  },
  {
    slug: "dot-loader",
    name: "dot-loader",
    title: "圆点加载",
    english: "Dot Loader",
    group: "基础",
    summary: "三个圆点依次闪烁：某件事还在跑的最小信号。",
    paragraphs: [
      "界面里唯一表示「仍在运行」的东西。状态色留给已经停下的事情——完成或中断——所以这里用的是中性的运行色，而不是任何有含义的色相。",
      "三颗点各延迟 160 毫秒，在 prefers-reduced-motion 下停止动画并保持可见。",
    ],
    usage: `import { DotLoader } from "@/components/ui/dot-loader"

<DotLoader />`,
    props: [
      { name: "className", type: "string", description: "给外层 span 的类名。" },
      { name: "dotClassName", type: "string", description: "给每一颗点的类名。" },
    ],
    target: "components/ui/dot-loader.tsx",
  },
  {
    slug: "status-glyph",
    name: "status-glyph",
    title: "状态微光",
    english: "Status Glyph",
    group: "状态",
    summary: "三点微光，表明一轮对话正在进行，以及它在做什么。",
    paragraphs: [
      "三个点在一个 16×16 的盒子里运动，每种活动是一套自己的图形：思考时慢慢转，搜索时前后扫，写入时上下落。远看只是三点光，近看能读出它在做什么。",
      "点的远近由大小与亮度表示——没有阴影，也没有模糊。三个点绕着环走时，仅凭这一点就足以让人读成在三维里转，而不是在页面上滑动。",
    ],
    usage: `import { StatusGlyph } from "@/components/ui/status-glyph"

<StatusGlyph activity="searching" />`,
    props: [
      { name: "activity", type: '"thinking" | "searching" | "running" | "writing" | "compacting"', default: '"thinking"', description: "这一轮在做什么，决定用哪套图形。" },
      { name: "figure", type: "Figure", description: "单独指定一个图形，代替活动自带的那个。" },
      { name: "className", type: "string", description: "给 SVG 外层的类名。" },
    ],
    target: "components/ui/status-glyph.tsx",
  },
  {
    slug: "turn-status",
    name: "turn-status",
    title: "回合状态",
    english: "Turn Status",
    group: "状态",
    summary: "一轮对话还在进行时，它停在最后一行：在做什么、做了多久、写了多少。",
    paragraphs: [
      "从第一秒到最后一秒都在那里，不管上面来了什么又走了什么。文字上有一道很慢的微光扫过，表示它还在动；秒数不到一秒就不显示，因为「0s」是一个关于什么的数字都不是。",
      "给了 children，这一行就变成按钮，打开后是你想展开的东西——正在进行的步骤的调用记录。带上 trailing 可以在行尾另外说一句，比如有几个后台任务在跑。",
    ],
    usage: `import { TurnStatus } from "@/components/ui/turn-status"

<TurnStatus
  activity="thinking"
  label="正在读取 solid-glass.css"
  since={Date.now() - 4000}
  tokens={1280}
/>`,
    props: [
      { name: "activity", type: "Activity", default: '"thinking"', description: "传给状态微光的活动。" },
      { name: "label", type: "string", description: "正在做什么，几个字。不给就只显示图形与数字。" },
      { name: "since", type: "number", description: "开始的时间戳（毫秒），用来数秒。" },
      { name: "tokens", type: "number", description: "已经写出的 token 数，数字会滚动到新值。" },
      { name: "trailing", type: "ReactNode", description: "行尾、与这一行分开的一句话。" },
      { name: "children", type: "ReactNode", description: "给了就把这一行变成按钮，打开显示它们。" },
    ],
    target: "components/ui/turn-status.tsx",
  },
  {
    slug: "context-ring",
    name: "context-ring",
    title: "上下文环",
    english: "Context Ring",
    group: "状态",
    summary: "上下文窗口有多满，看一个环：点开是数字，以及它被什么占满。",
    paragraphs: [
      "一直有空间时是蓝色——几乎总是如此；到 70% 转成琥珀色，90% 转成失败的颜色：快满了值得再看一眼。",
      "环是一个 24 像素的按钮，点开是一个 popover：总数、一条分段进度条，以及每一部分占多少。它可以展开成明细，让「上下文里都是什么」有地方回答。",
    ],
    usage: `import { ContextRing } from "@/components/ui/context-ring"

<ContextRing
  used={86000}
  window={128000}
  parts={[
    { key: "files", label: "文件", tokens: 52000, tint: "bg-chart-1" },
    { key: "chat", label: "对话", tokens: 24000, tint: "bg-chart-2" },
  ]}
/>`,
    props: [
      { name: "used", type: "number", description: "已经用掉的 token。" },
      { name: "window", type: "number", description: "窗口的总大小。" },
      { name: "parts", type: "ContextPart[]", default: "[]", description: "上下文由什么组成，每一部分一个色块。" },
      { name: "title", type: "string", default: '"Context window"', description: "popover 里的标题。" },
      { name: "note", type: "string", description: "标题下的一句说明。" },
    ],
    target: "components/ui/context-ring.tsx",
  },
  {
    slug: "task-notice",
    name: "task-notice",
    title: "任务提醒",
    english: "Task Notice",
    group: "状态",
    summary: "对话背后有件事结束了：一个点表示结果，一行字说明是什么。",
    paragraphs: [
      "它说的是「智能体接下来要开口的原因」，所以用的是叙述行的灰，不是用户说的话，也不是横贯整个会话的公告。",
      "色相只表示结束或停住：完成是绿，失败是失败色，被停掉是灰。这里没有任何东西在动。",
    ],
    usage: `import { TaskNotice } from "@/components/ui/task-notice"

<TaskNotice
  notices={[
    { id: "1", title: "后台任务完成", status: "completed", note: "12s" },
    { id: "2", title: "构建失败", status: "failed" },
  ]}
/>`,
    props: [
      { name: "notices", type: "Notice[]", description: "每条一行：id、标题、状态、可选的注。" },
    ],
    target: "components/ui/task-notice.tsx",
  },
  {
    slug: "composer",
    name: "composer",
    title: "输入框",
    english: "Composer",
    group: "工作",
    summary: "写消息的地方：一块玻璃托着标签、文字，和把它发出去的记号。",
    paragraphs: [
      "发送的记号背后没有色块：按钮就是这个记号，记号的亮度说明它会做什么。有内容可发时和正在输入的文字一样亮，没内容时是暗的，一轮正在跑时它是一个安静的方块，用来停下。",
      "Enter 发送，Shift+Enter 换行。在文字最开头按退格会交给 onBackspaceAtStart，用来够到前面的那个标签。输入框会随内容长高。",
    ],
    usage: `import * as React from "react"
import { Composer } from "@/components/ui/composer"

function Message() {
  const [value, setValue] = React.useState("")
  return (
    <Composer
      value={value}
      onValueChange={setValue}
      onSubmit={(text) => console.log(text)}
      placeholder="输入消息…"
    />
  )
}`,
    props: [
      { name: "value", type: "string", description: "输入的文字，受控。" },
      { name: "onValueChange", type: "(value: string) => void", description: "文字变化。" },
      { name: "onSubmit", type: "(value: string) => void", description: "按下发送。" },
      { name: "running", type: "boolean", default: "false", description: "一轮正在跑；没有新文字时，发送记号变成停止。" },
      { name: "tags", type: "ReactNode", description: "文字前附上的标签。" },
      { name: "leading", type: "ReactNode", description: "最前面的东西，例如一个附件按钮。" },
      { name: "above", type: "ReactNode", description: "立在文字上方：随消息一起发出的图片。" },
    ],
    target: "components/ui/composer.tsx",
  },
  {
    slug: "tool-steps",
    name: "tool-steps",
    title: "工具步骤",
    english: "Tool Steps",
    group: "工作",
    summary: "一串工具调用折成一行，打开是每一次调用做了什么。",
    paragraphs: [
      "一次调用说成它做了什么——「读取 search.py」「搜索 …」——而不是工具名加参数。打开一行，看到的是那次调用本身；如果它改了文件，看到的就是一份 diff。",
      "连着好几次调用说起来并不比一次多多少，所以它们折成一行，可以展开：一长串调用不会一直把页面底部往下推。",
    ],
    usage: `import { StepGroup, StepList } from "@/components/ui/tool-steps"

const steps = [
  { id: "1", label: "读取 solid-glass.css", status: "done" as const },
  { id: "2", label: "搜索 --glass-rim", status: "done" as const },
  { id: "3", label: "修改 panel 的边缘", status: "running" as const },
]

<StepList steps={steps} />
<StepGroup steps={steps} />`,
    props: [
      { name: "steps", type: "Step[]", description: "每次调用：id、标签、状态、可选的 detail / output / error / patch。" },
      { name: "labels", type: "Partial<StepLabels>", description: "改写 Input / Output / Error 三个词的显示文字。" },
    ],
    target: "components/ui/tool-steps.tsx",
  },
  {
    slug: "diff-view",
    name: "diff-view",
    title: "差异视图",
    english: "Diff View",
    group: "工作",
    summary: "把补丁显示成 diff：增删的行着色，文件头去掉。",
    paragraphs: [
      "接受的是标准的 unified diff。文件头（--- / +++）会被丢掉，因为它们和改动内容的前缀可能一样，甚至都是「+++ 」。hunk 头留着，读起来像分节。",
      "配套的 patchStats 数出增加了多少行、删掉了多少行，DiffStats 把这两个数字排成 +3 −1。",
    ],
    usage: `import { DiffView, DiffStats, patchStats } from "@/components/ui/diff-view"

const patch = \`@@ -1,2 +1,2 @@
---panel: oklch(1 0 0 / 4%);
+--panel: oklch(1 0 0 / 4.5%);
\`

<DiffView patch={patch} />
<DiffStats {...patchStats(patch)} />`,
    props: [
      { name: "patch", type: "string", description: "unified diff 文本。" },
      { name: "className", type: "string", description: "给外层的类名。" },
    ],
    target: "components/ui/diff-view.tsx",
  },
  {
    slug: "ask-card",
    name: "ask-card",
    title: "提问卡",
    english: "Ask Card",
    group: "工作",
    summary: "智能体把决定交给用户：问题，以及作为按钮的选项。",
    paragraphs: [
      "问题之上有一行小字说明这是需要你决定的事，颜色用的是「被打断」的琥珀色——因为对话确实停下来了。",
      "对话已经往下走了之后，不要再传 onAnswer：选项不再提供，这张卡留着，作为「当时问过什么」的记录。",
    ],
    usage: `import { AskCard } from "@/components/ui/ask-card"

<AskCard
  question="要保留卡片的高光吗？"
  options={["保留", "去掉"]}
  onAnswer={(choice) => console.log(choice)}
/>`,
    props: [
      { name: "question", type: "string", description: "要用户决定的事。" },
      { name: "options", type: "string[]", default: "[]", description: "可选的答案；每个是一条按钮。" },
      { name: "onAnswer", type: "(option: string) => void", description: "不给就是已经回答过的记录。" },
      { name: "eyebrow", type: "string", default: '"Needs your decision"', description: "问题上方那行小字。" },
    ],
    target: "components/ui/ask-card.tsx",
  },
  {
    slug: "reasoning",
    name: "reasoning",
    title: "思考过程",
    english: "Reasoning",
    group: "工作",
    summary: "模型的思考，默认折起来。",
    paragraphs: [
      "它解释一个回答，但它不是回答，所以默认收在 details 里：想看的人点开，不想看的人读到的就是结论。",
      "这一轮还在想、还没有回答时，标题写的是「思考中…」，并带一道很慢的微光——等待就不会看起来像什么都没发生。",
    ],
    usage: `import { Reasoning } from "@/components/ui/reasoning"

<Reasoning thinking label="思考过程" thinkingLabel="思考中…">
  先看 --glass-rim 与 --glass-inner 的关系：两道亮线都要留在边缘。
</Reasoning>`,
    props: [
      { name: "children", type: "string", description: "思考的正文。" },
      { name: "thinking", type: "boolean", default: "false", description: "还在想：标题换成 thinkingLabel，并带微光。" },
      { name: "defaultOpen", type: "boolean", default: "false", description: "是否一开始就展开。" },
      { name: "label", type: "string", default: '"Thought process"', description: "折起来时的标题。" },
    ],
    target: "components/ui/reasoning.tsx",
  },
]

export const componentGroups = ["基础", "状态", "工作"] as const

export function findComponent(slug: string | undefined) {
  return registry.find((item) => item.slug === slug)
}

/** 12 components, one stylesheet: the registry's own count. */
export const registryCount = registry.length + 1
