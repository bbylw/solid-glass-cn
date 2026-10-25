import { Link } from "react-router"

import { Wordmark } from "@/components/site/logo"

const columns = [
  {
    title: "文档",
    links: [
      { to: "/docs", label: "概览" },
      { to: "/docs/installation", label: "安装" },
      { to: "/docs/material", label: "材质" },
      { to: "/components", label: "组件" },
    ],
  },
  {
    title: "工具",
    links: [
      { to: "/create", label: "创建页" },
      { to: "/blocks", label: "区块" },
      { to: "/docs/installation#registry", label: "注册表" },
    ],
  },
  {
    title: "项目",
    links: [
      { to: "https://github.com/deeplethe/solid-glass", label: "GitHub" },
      { to: "https://github.com/deeplethe/solid-glass/blob/main/CONTRIBUTING.zh-CN.md", label: "贡献" },
      { to: "https://github.com/deeplethe/solid-glass/blob/main/LICENSE", label: "许可证" },
    ],
  },
]

function Footer() {
  return (
    <footer className="border-t border-border/70">
      <div className="mx-auto w-full max-w-[1360px] px-5 py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_repeat(3,132px)] lg:gap-10">
          <div>
            <Wordmark />
            <p className="mt-3 max-w-[34ch] text-[12px] leading-relaxed text-muted-foreground">
              为 AI 应用而生，由 DeepLethe 打造。站在扁平设计与液态玻璃之间的一种材质。
            </p>
          </div>
          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="sg-eyebrow mb-2.5">{column.title}</h3>
              <div className="flex flex-col gap-1">
                {column.links.map((link) =>
                  link.to.startsWith("http") ? (
                    <a
                      key={link.label}
                      href={link.to}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[12.5px] text-foreground/75 transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      key={link.label}
                      to={link.to}
                      className="text-[12.5px] text-foreground/75 transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  )
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-1.5 border-t border-border/70 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <span className="sg-mono text-[10px] tracking-[0.08em] text-muted-foreground">
            MIT · 2026 · SOLID GLASS
          </span>
          <span className="sg-mono text-[10px] tracking-[0.08em] text-muted-foreground">
            BUN · VITE · REACT 19 · TAILWIND CSS 4
          </span>
        </div>
      </div>
    </footer>
  )
}

export { Footer }
