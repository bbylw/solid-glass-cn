import { Check, Copy } from "lucide-react"
import hljs from "highlight.js/lib/core"
import bash from "highlight.js/lib/languages/bash"
import css from "highlight.js/lib/languages/css"
import json from "highlight.js/lib/languages/json"
import typescript from "highlight.js/lib/languages/typescript"
import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

hljs.registerLanguage("bash", bash)
hljs.registerLanguage("css", css)
hljs.registerLanguage("json", json)
hljs.registerLanguage("typescript", typescript)
hljs.registerLanguage("tsx", typescript)

export type CodeLanguage = "bash" | "css" | "tsx" | "json"

/**
 * A slab of code in the theme's own hand. highlight.js does the tokenising —
 * its class names are the ones solid-glass.css already colours — so the same
 * few hues run through the docs, the playground and the components.
 */
function CodeBlock({
  code,
  language = "tsx",
  filename,
  className,
  copyable = true,
  wrap = false,
}: {
  code: string
  language?: CodeLanguage
  filename?: string
  className?: string
  copyable?: boolean
  /** Commands are short and worth reading whole: let them run onto a second line. */
  wrap?: boolean
}) {
  const [copied, setCopied] = React.useState(false)
  const trimmed = code.replace(/\n+$/, "")
  const html = React.useMemo(() => {
    try {
      return hljs.highlight(trimmed, { language }).value
    } catch {
      return trimmed.replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" })[c] ?? c)
    }
  }, [trimmed, language])

  React.useEffect(() => {
    if (!copied) return
    const timer = window.setTimeout(() => setCopied(false), 1600)
    return () => window.clearTimeout(timer)
  }, [copied])

  async function copy() {
    try {
      await navigator.clipboard.writeText(trimmed)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div
      data-slot="code-block"
      className={cn("glass-panel overflow-hidden rounded-md", className)}
    >
      <div className="flex h-8 items-center gap-2 border-b border-border/70 pr-1 pl-3">
        <span className="sg-mono text-[10px] tracking-[0.1em] text-muted-foreground uppercase">
          {filename ?? language}
        </span>
        {copyable && (
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            onClick={copy}
            aria-label={copied ? "已复制" : "复制代码"}
            className="ml-auto text-muted-foreground hover:text-foreground"
          >
            {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
          </Button>
        )}
      </div>
      <div className={cn("md-code sg-code", wrap && "sg-code-wrap")}>
        <code dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  )
}

/** The one-line command that installs something from the registry. */
function InstallLine({ name, className }: { name: string; className?: string }) {
  return (
    <CodeBlock
      className={className}
      language="bash"
      filename="终端"
      wrap
      code={`bunx shadcn@latest add deeplethe/solid-glass/${name}`}
    />
  )
}

export { CodeBlock, InstallLine }
