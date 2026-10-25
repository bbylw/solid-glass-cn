import { Popover as PopoverPrimitive } from "@base-ui/react/popover"
import * as React from "react"

import { cn } from "@/lib/utils"

const Popover = PopoverPrimitive.Root
const PopoverTrigger = PopoverPrimitive.Trigger

function PopoverContent({
  className,
  align = "center",
  side = "bottom",
  sideOffset = 6,
  children,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Popup> & {
  align?: "start" | "center" | "end"
  side?: "top" | "right" | "bottom" | "left"
  sideOffset?: number
}) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Positioner align={align} side={side} sideOffset={sideOffset} className="z-50">
        <PopoverPrimitive.Popup
          data-slot="popover-content"
          className={cn(
            "bg-popover text-popover-foreground flex w-72 origin-[var(--transform-origin)] flex-col rounded-lg border p-3 text-[12.5px] outline-none transition-[transform,opacity] duration-150 data-[closed]:scale-95 data-[closed]:opacity-0 data-[open]:scale-100 data-[open]:opacity-100",
            className
          )}
          {...props}
        >
          {children}
        </PopoverPrimitive.Popup>
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
  )
}

export { Popover, PopoverContent, PopoverTrigger }
