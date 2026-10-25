import { Link } from "react-router"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { usePageMeta } from "@/lib/use-page-meta"

export function NotFound() {
  usePageMeta("404 — Solid Glass")

  return (
    <main className="mx-auto flex w-full max-w-[1360px] flex-col items-start px-5 py-20">
      <p className="sg-eyebrow">404</p>
      <h1 className="mt-3 text-[32px] leading-tight font-semibold tracking-[-0.03em]">这里没有玻璃</h1>
      <p className="mt-3 max-w-[46ch] text-[14px] leading-[1.8] text-muted-foreground">
        这一页不存在，或者已经被移走了。回到看得见的地方去。
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        <Link to="/" className={cn(buttonVariants({ size: "default" }), "h-9 px-4 text-[13px]")}>
          回到首页
        </Link>
        <Link
          to="/components"
          className={cn(buttonVariants({ variant: "secondary", size: "default" }), "h-9 px-4 text-[13px]")}
        >
          浏览组件
        </Link>
      </div>
    </main>
  )
}
