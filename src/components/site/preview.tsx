import * as React from "react"

import { cn } from "@/lib/utils"
import { CodeBlock, type CodeLanguage } from "@/components/site/code-block"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

/** Fades a block in the first time it comes into view — once, and only a little. */
function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [shown, setShown] = React.useState(false)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === "undefined") {
      setShown(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          observer.disconnect()
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.04 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={cn("sg-reveal", className)}
      data-shown={shown ? "true" : "false"}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  )
}

/**
 * A specimen plate: the component on a pane, with its code one tab away.
 * Nothing is centred that should not be — `align` says how the demo sits.
 */
function Example({
  children,
  code,
  language = "tsx",
  filename = "demo.tsx",
  align = "center",
  className,
  stageClassName,
  label = "预览",
}: {
  children: React.ReactNode
  code?: string
  language?: CodeLanguage
  filename?: string
  align?: "center" | "start" | "stretch"
  className?: string
  stageClassName?: string
  label?: string
}) {
  const stage = (
    <div
      className={cn(
        "sg-stage relative flex min-h-[188px] w-full p-6 sm:p-8",
        align === "center" && "items-center justify-center",
        align === "start" && "items-start justify-start",
        align === "stretch" && "items-stretch",
        stageClassName
      )}
    >
      {children}
    </div>
  )

  const header = (
    <div className="flex h-8 items-center justify-between gap-2 border-b border-border/70 px-2.5">
      <span className="sg-mono text-[9.5px] tracking-[0.12em] text-muted-foreground uppercase">{label}</span>
      {code && (
        <TabsList className="h-6 bg-transparent p-0" variant="line">
          <TabsTrigger value="preview" className="h-6 px-1.5 text-[10.5px]">
            预览
          </TabsTrigger>
          <TabsTrigger value="code" className="h-6 px-1.5 text-[10.5px]">
            代码
          </TabsTrigger>
        </TabsList>
      )}
    </div>
  )

  if (!code) {
    return (
      <div data-slot="example" className={cn("glass-panel overflow-hidden rounded-lg", className)}>
        {header}
        {stage}
      </div>
    )
  }

  return (
    <Tabs defaultValue="preview" data-slot="example" className={cn("glass-panel gap-0 overflow-hidden rounded-lg", className)}>
      {header}
      <TabsContent value="preview">{stage}</TabsContent>
      <TabsContent value="code">
        <CodeBlock
          code={code}
          language={language}
          filename={filename}
          className="rounded-none border-0 bg-transparent shadow-none"
        />
      </TabsContent>
    </Tabs>
  )
}

export { Example, Reveal }
