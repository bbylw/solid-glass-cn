import * as React from "react"
import { BrowserRouter, Route, Routes, useLocation } from "react-router"

import { Footer } from "@/components/site/footer"
import { Header } from "@/components/site/header"
import { DotLoader } from "@/components/ui/dot-loader"
import { Home } from "@/pages/home"

/* Every page but the landing one is fetched when it is first asked for: the
 * first paint carries the hero and nothing else. */
const DocsOverview = React.lazy(() => import("@/pages/docs-overview").then((m) => ({ default: m.DocsOverview })))
const Installation = React.lazy(() => import("@/pages/installation").then((m) => ({ default: m.Installation })))
const Material = React.lazy(() => import("@/pages/material").then((m) => ({ default: m.Material })))
const ComponentsIndex = React.lazy(() =>
  import("@/pages/components-index").then((m) => ({ default: m.ComponentsIndex }))
)
const ComponentDetail = React.lazy(() =>
  import("@/pages/component-detail").then((m) => ({ default: m.ComponentDetail }))
)
const Blocks = React.lazy(() => import("@/pages/blocks").then((m) => ({ default: m.Blocks })))
const Create = React.lazy(() => import("@/pages/create").then((m) => ({ default: m.Create })))
const NotFound = React.lazy(() => import("@/pages/not-found").then((m) => ({ default: m.NotFound })))

function RouteFallback() {
  return (
    <div className="flex min-h-[55dvh] items-center justify-center" role="status" aria-label="页面加载中">
      <DotLoader dotClassName="size-1.5" className="gap-1" />
    </div>
  )
}

function ScrollToTop() {
  const { pathname, hash } = useLocation()

  React.useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0 })
      return
    }

    // A lazy page is not in the document yet when the route changes: keep
    // asking for the anchor across the next few frames before giving up.
    const id = hash.slice(1)
    let frame = 0
    let tries = 0
    const find = () => {
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" })
        return
      }
      if (tries++ < 30) frame = requestAnimationFrame(find)
    }
    find()
    return () => cancelAnimationFrame(frame)
  }, [pathname, hash])

  return null
}

export function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex min-h-dvh flex-col">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-background focus:px-3 focus:py-2 focus:text-[13px] focus:shadow-[0_0_0_1px_var(--glass-edge),0_8px_20px_-10px_var(--glass-shade)]"
        >
          跳到内容
        </a>
        <Header />
        <div className="flex-1" id="content">
          <React.Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/docs" element={<DocsOverview />} />
              <Route path="/docs/installation" element={<Installation />} />
              <Route path="/docs/material" element={<Material />} />
              <Route path="/components" element={<ComponentsIndex />} />
              <Route path="/components/:slug" element={<ComponentDetail />} />
              <Route path="/blocks" element={<Blocks />} />
              <Route path="/create" element={<Create />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </React.Suspense>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
