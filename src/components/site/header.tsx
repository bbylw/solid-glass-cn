import { Menu, X } from "lucide-react"
import * as React from "react"
import { Link, NavLink, useLocation } from "react-router"

import { cn } from "@/lib/utils"
import { Wordmark } from "@/components/site/logo"
import { ThemeToggle } from "@/components/site/theme-toggle"
import { Button, buttonVariants } from "@/components/ui/button"
import { registry } from "@/data/registry"

const primary = [
  { to: "/", label: "概览", end: true },
  { to: "/docs", label: "文档", end: false },
  { to: "/components", label: "组件", end: false },
  { to: "/blocks", label: "区块", end: false },
  { to: "/create", label: "创建", end: false },
]

function Header() {
  const [open, setOpen] = React.useState(false)
  const location = useLocation()

  React.useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  return (
    <header className="bg-background/72 sticky top-0 z-40 border-b border-border/70 backdrop-blur-xl">
      <div className="mx-auto flex h-14 w-full max-w-[1360px] items-center gap-7 px-5">
        <Link to="/" className="shrink-0 outline-none" aria-label="Solid Glass 首页">
          <Wordmark />
        </Link>

        <nav className="hidden items-center gap-5 md:flex" aria-label="主导航">
          {primary.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  "text-[13px] transition-colors",
                  isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <span className="sg-mono mr-2 hidden text-[10px] tracking-[0.12em] text-muted-foreground uppercase lg:block">
            13 项注册表
          </span>
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon-sm"
            className="md:hidden"
            aria-label={open ? "关闭菜单" : "打开菜单"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </Button>
          <Link to="/docs/installation" className={cn(buttonVariants({ size: "sm" }), "ml-1 h-8 px-3 text-[12.5px]")}>
            开始安装
          </Link>
        </div>
      </div>

      {open && (
        <div className="border-t border-border/70 bg-background/95 backdrop-blur-xl md:hidden">
          <div className="mx-auto max-h-[70dvh] w-full max-w-[1360px] overflow-y-auto px-5 py-4">
            <div className="flex flex-col gap-1">
              {primary.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="rounded-md px-2 py-2 text-[14px] text-foreground/85 hover:bg-accent"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <p className="sg-eyebrow mt-5 mb-2 px-2">组件</p>
            <div className="grid grid-cols-2 gap-1">
              {registry.map((item) => (
                <Link
                  key={item.slug}
                  to={`/components/${item.slug}`}
                  className="rounded-md px-2 py-1.5 text-[13px] text-muted-foreground hover:bg-accent hover:text-foreground"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export { Header }
