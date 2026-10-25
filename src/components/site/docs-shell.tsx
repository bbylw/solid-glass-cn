import * as React from "react"
import { NavLink } from "react-router"

import { cn } from "@/lib/utils"
import { componentGroups, registry } from "@/data/registry"

export type TocItem = { id: string; label: string }

const linkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    "block rounded-md px-2 py-[5px] text-[12.5px] transition-colors",
    isActive
      ? "bg-accent text-foreground shadow-[inset_0_1px_0_var(--glass-control-rim)]"
      : "text-muted-foreground hover:text-foreground"
  )

function Sidebar() {
  return (
    <nav aria-label="文档导航" className="flex flex-col gap-5">
      <div>
        <p className="sg-eyebrow mb-1.5 px-2">开始</p>
        <div className="flex flex-col gap-px">
          <NavLink to="/docs" end className={linkClass}>
            概览
          </NavLink>
          <NavLink to="/docs/installation" className={linkClass}>
            安装
          </NavLink>
          <NavLink to="/docs/material" className={linkClass}>
            材质
          </NavLink>
        </div>
      </div>

      <div>
        <p className="sg-eyebrow mb-1.5 px-2">组件</p>
        <div className="flex flex-col gap-px">
          <NavLink to="/components" end className={linkClass}>
            全部组件
          </NavLink>
          {componentGroups.map((group) => (
            <div key={group} className="mt-2">
              <p className="sg-mono px-2 pb-1 text-[9.5px] tracking-[0.12em] text-muted-foreground/70 uppercase">
                {group}
              </p>
              {registry
                .filter((item) => item.group === group)
                .map((item) => (
                  <NavLink key={item.slug} to={`/components/${item.slug}`} className={linkClass}>
                    {item.title}
                  </NavLink>
                ))}
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="sg-eyebrow mb-1.5 px-2">区块</p>
        <div className="flex flex-col gap-px">
          <NavLink to="/blocks" className={linkClass}>
            agent-workspace
          </NavLink>
        </div>
      </div>

      <div>
        <p className="sg-eyebrow mb-1.5 px-2">工具</p>
        <div className="flex flex-col gap-px">
          <NavLink to="/create" className={linkClass}>
            创建页
          </NavLink>
        </div>
      </div>
    </nav>
  )
}

/**
 * The frame the docs are read in: a column of names on the left, the page in
 * the middle, its headings on the right. Below `lg` the two side columns go
 * and the page keeps the whole width; the headings stay one tap away.
 */
function DocsShell({
  children,
  toc = [],
  wide = false,
}: {
  children: React.ReactNode
  toc?: TocItem[]
  wide?: boolean
}) {
  return (
    <div className="mx-auto w-full max-w-[1360px] px-5">
      <div
        className={cn(
          "grid gap-x-10",
          wide ? "lg:grid-cols-[196px_minmax(0,1fr)]" : "lg:grid-cols-[196px_minmax(0,1fr)] xl:grid-cols-[196px_minmax(0,1fr)_168px]"
        )}
      >
        <aside className="scrollbar-thin sticky top-14 hidden h-[calc(100dvh-3.5rem)] overflow-y-auto py-8 lg:block">
          <Sidebar />
        </aside>

        <main className="min-w-0 py-8">
          {toc.length > 0 && (
            <details className="glass-panel mb-6 rounded-md px-3 py-2 xl:hidden">
              <summary className="cursor-pointer text-[12px] text-muted-foreground select-none">本页目录</summary>
              <div className="mt-2 flex flex-col gap-1">
                {toc.map((item) => (
                  <a key={item.id} href={`#${item.id}`} className="text-[12.5px] text-foreground/75 hover:text-foreground">
                    {item.label}
                  </a>
                ))}
              </div>
            </details>
          )}
          {children}
        </main>

        <aside className="sticky top-14 hidden h-[calc(100dvh-3.5rem)] overflow-y-auto py-8 xl:block">
          {toc.length > 0 && (
            <nav aria-label="本页目录">
              <p className="sg-eyebrow mb-2">本页</p>
              <div className="flex flex-col gap-1.5 border-l border-border pl-3">
                {toc.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="text-[12px] leading-snug text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </nav>
          )}
        </aside>
      </div>
    </div>
  )
}

export { DocsShell, Sidebar }
