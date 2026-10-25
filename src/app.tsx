import * as React from "react"
import { BrowserRouter, Route, Routes, useLocation } from "react-router"

import { Footer } from "@/components/site/footer"
import { Header } from "@/components/site/header"
import { Blocks } from "@/pages/blocks"
import { ComponentDetail } from "@/pages/component-detail"
import { ComponentsIndex } from "@/pages/components-index"
import { Create } from "@/pages/create"
import { DocsOverview } from "@/pages/docs-overview"
import { Home } from "@/pages/home"
import { Installation } from "@/pages/installation"
import { Material } from "@/pages/material"
import { NotFound } from "@/pages/not-found"

function ScrollToTop() {
  const { pathname, hash } = useLocation()

  React.useEffect(() => {
    if (hash) {
      const id = hash.slice(1)
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" })
        return
      }
    }
    window.scrollTo({ top: 0, left: 0 })
  }, [pathname, hash])

  return null
}

export function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex min-h-dvh flex-col">
        <Header />
        <div className="flex-1">
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
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
