import { Moon, Sun } from "lucide-react"
import * as React from "react"

import { Button } from "@/components/ui/button"

/** Dark is the material as designed; light is the same panes in daylight. */
function ThemeToggle() {
  const [dark, setDark] = React.useState(() =>
    typeof document === "undefined" ? true : document.documentElement.classList.contains("dark")
  )

  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", dark)
    document.documentElement.style.colorScheme = dark ? "dark" : "light"
    try {
      localStorage.setItem("sg-theme", dark ? "dark" : "light")
    } catch {
      /* storage can be unavailable; the page still works */
    }
  }, [dark])

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      aria-label={dark ? "切换到浅色主题" : "切换到深色主题"}
      aria-pressed={dark}
      onClick={() => setDark((value) => !value)}
      className="text-muted-foreground hover:text-foreground"
    >
      {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </Button>
  )
}

export { ThemeToggle }
