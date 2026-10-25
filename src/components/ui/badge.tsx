import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1 rounded-md border border-transparent px-2 py-0.5 text-[11px] font-medium whitespace-nowrap transition-colors [&>svg]:size-3 [&>svg]:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        destructive: "bg-destructive/15 text-destructive",
        outline: "text-foreground",
      },
    },
    defaultVariants: { variant: "secondary" },
  }
)

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return (
    <span
      data-slot="badge"
      data-variant={variant ?? "secondary"}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

function Separator({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="separator"
      role="separator"
      aria-orientation="horizontal"
      className={cn("bg-border h-px w-full shrink-0", className)}
      {...props}
    />
  )
}

function Kbd({ className, ...props }: React.ComponentProps<"kbd">) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(
        "glass-control inline-flex h-5 min-w-5 items-center justify-center rounded-[4px] px-1 font-mono text-[10px] text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

export { Badge, Kbd, Separator }
