import * as React from "react"

/**
 * The title bar and the tab strip are the only things a single-page app does
 * not update by itself. Every page says which page it is, so history, tabs and
 * shared links read correctly.
 */
export function usePageMeta(title: string, description?: string) {
  React.useEffect(() => {
    document.title = title

    if (!description) return
    let meta = document.head.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (!meta) {
      meta = document.createElement("meta")
      meta.name = "description"
      document.head.appendChild(meta)
    }
    meta.content = description
  }, [title, description])
}
