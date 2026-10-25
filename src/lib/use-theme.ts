import * as React from "react"

/** Which theme the page is wearing right now, kept in sync with the header toggle. */
export function useThemeMode() {
  const [dark, setDark] = React.useState(() =>
    typeof document === "undefined" ? true : document.documentElement.classList.contains("dark")
  )

  React.useEffect(() => {
    const root = document.documentElement
    const observer = new MutationObserver(() => setDark(root.classList.contains("dark")))
    observer.observe(root, { attributes: true, attributeFilter: ["class"] })
    return () => observer.disconnect()
  }, [])

  return dark ? "dark" : "light"
}
