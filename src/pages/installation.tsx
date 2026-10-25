import { Link } from "react-router"

import { cn } from "@/lib/utils"
import { CodeBlock } from "@/components/site/code-block"
import { DocsShell } from "@/components/site/docs-shell"
import { buttonVariants } from "@/components/ui/button"
import { registry } from "@/data/registry"
import { usePageMeta } from "@/lib/use-page-meta"

const toc = [
  { id: "requirements", label: "开始之前" },
  { id: "add", label: "加入样式表" },
  { id: "import", label: "引入顺序" },
  { id: "theme", label: "深色与浅色" },
  { id: "components", label: "安装组件" },
  { id: "registry", label: "注册表" },
  { id: "notes", label: "常见问题" },
]

export function Installation() {
  usePageMeta("安装 — Solid Glass 文档", "三步把 Solid Glass 加进一个 shadcn/ui 项目：初始化、加入样式表、调整引入顺序。")

  return (
    <DocsShell toc={toc}>
      <div className="sg-prose">
        <p className="sg-eyebrow">文档 · 安装</p>
        <h1 className="mt-3 text-[30px] leading-tight font-semibold tracking-[-0.03em] text-foreground">安装</h1>
        <p className="mt-3 max-w-[58ch] text-[15px] leading-[1.8] text-muted-foreground">
          一份样式表，加上你已有的组件。整个安装过程只有三步，其中两步是复制粘贴。
        </p>

        <h2 id="requirements">开始之前</h2>
        <p>你需要一个跑得起来的 shadcn/ui 项目：</p>
        <ul>
          <li>React 19</li>
          <li>Tailwind CSS 4</li>
          <li>shadcn/ui（Base UI 版本，用它的命令行初始化）</li>
        </ul>
        <p>没有的话，先建一个：</p>
        <CodeBlock language="bash" filename="终端" code="bunx shadcn@latest init" />

        <h2 id="add">加入样式表</h2>
        <p>直接从仓库把样式表拉进项目。它会落在 <code>src/solid-glass.css</code>。</p>
        <CodeBlock
          language="bash"
          filename="终端"
          code="bunx shadcn@latest add deeplethe/solid-glass/solid-glass"
        />

        <h2 id="import">引入顺序</h2>
        <p>
          在 Tailwind 与 shadcn 的样式表之后引入它，并删掉 <code>shadcn init</code> 写下的 <code>:root</code> 与{" "}
          <code>.dark</code> 颜色变量——Solid Glass 定义了同名的变量，否则两份会打架。
        </p>
        <CodeBlock
          language="css"
          filename="src/app.css"
          code={`@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";
@import "./solid-glass.css";`}
        />

        <h2 id="theme">深色与浅色</h2>
        <p>
          深色即设计本意的材质；浅色也同样可用。深色跟随 <code>&lt;html&gt;</code> 上的 <code>dark</code> 类。
        </p>
        <CodeBlock
          language="tsx"
          filename="主题切换"
          code={`document.documentElement.classList.toggle("dark", isDark)`}
        />
        <p>
          页面上的切换按钮把选择存在 <code>localStorage</code> 里，并在首屏渲染前就读出来，所以刷新不会闪一下白。
        </p>

        <h2 id="components">安装组件</h2>
        <p>Solid Glass 自有的组件用同样的方式安装。比如最薄的那层面板：</p>
        <CodeBlock
          language="bash"
          filename="终端"
          code="bunx shadcn@latest add deeplethe/solid-glass/panel"
        />
        <p>
          它们依赖 <code>@/lib/utils</code> 的 <code>cn()</code>，以及 shadcn/ui 的 <code>button</code>、
          <code>popover</code>、<code>dropdown-menu</code> 等基础件；registry 会一并处理。
        </p>

        <h2 id="registry">注册表</h2>
        <p>13 项，按需取用。每一项也可以只读源码再决定。</p>
        <div className="not-prose mt-4 overflow-hidden rounded-lg border border-border">
          <div className="grid grid-cols-[1fr_auto] gap-2 border-b border-border/70 bg-[var(--hover-faint)] px-3.5 py-2">
            <span className="sg-mono text-[9px] tracking-[0.12em] text-muted-foreground uppercase">名称</span>
            <span className="sg-mono text-[9px] tracking-[0.12em] text-muted-foreground uppercase">类型</span>
          </div>
          <div className="flex items-center gap-3 border-b border-border/70 px-3.5 py-2.5">
            <span className="sg-mono w-[120px] shrink-0 text-[10.5px] text-foreground/85">solid-glass</span>
            <span className="ml-auto text-[11px] text-muted-foreground">样式表</span>
          </div>
          {registry.map((item) => (
            <Link
              key={item.slug}
              to={`/components/${item.slug}`}
              className="flex items-center gap-3 border-b border-border/70 px-3.5 py-2.5 transition-colors last:border-b-0 hover:bg-[var(--hover-faint)]"
            >
              <span className="sg-mono w-[120px] shrink-0 text-[10.5px] text-foreground/85">{item.name}</span>
              <span className="text-[12px] text-foreground/80">{item.title}</span>
              <span className="ml-auto text-[11px] text-muted-foreground">UI</span>
            </Link>
          ))}
        </div>

        <h2 id="notes">常见问题</h2>
        <h3>玻璃没生效</h3>
        <p>
          先检查引入顺序：<code>solid-glass.css</code> 必须在 <code>shadcn/tailwind.css</code> 之后。再检查有没有残留的{" "}
          <code>:root</code> 颜色变量——它们会覆盖主题里的同名变量。
        </p>
        <h3>面板看起来是平的</h3>
        <p>
          玻璃靠 <code>backdrop-filter</code> 工作。如果面板背后是纯色，模糊没有东西可模糊，只剩下边缘的两道线——这通常是正常的，也是它在空页面上的样子。
        </p>
        <h3>滚动时有点卡</h3>
        <p>
          大面积 <code>backdrop-filter</code> 在长列表里代价不低。把玻璃留给固定不动的外壳，列表项用 <code>bg-muted</code> 或者干脆用底色。
        </p>

        <div className="mt-10 flex flex-wrap gap-2 border-t border-border pt-6">
          <Link to="/docs/material" className={cn(buttonVariants({ size: "default" }), "h-9 px-4 text-[13px]")}>
            了解材质
          </Link>
          <Link
            to="/components"
            className={cn(buttonVariants({ variant: "secondary", size: "default" }), "h-9 px-4 text-[13px]")}
          >
            浏览组件
          </Link>
        </div>
      </div>
    </DocsShell>
  )
}
