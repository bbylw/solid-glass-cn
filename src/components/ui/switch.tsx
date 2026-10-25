import { Slider as SliderPrimitive } from "@base-ui/react/slider"
import { Switch as SwitchPrimitive } from "@base-ui/react/switch"
import * as React from "react"

import { cn } from "@/lib/utils"

function Switch({ className, ...props }: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "group/switch peer inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent transition-all outline-none disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "bg-[var(--knob)] pointer-events-none block size-4 translate-x-0 rounded-full ring-0 transition-transform data-[checked]:translate-x-[calc(100%-2px)]",
        )}
      />
    </SwitchPrimitive.Root>
  )
}

function Slider({
  className,
  value,
  onValueChange,
  ...props
}: Omit<React.ComponentProps<typeof SliderPrimitive.Root>, "value" | "onValueChange"> & {
  value?: number
  onValueChange?: (value: number) => void
}) {
  return (
    <SliderPrimitive.Root
      data-slot="slider"
      value={value}
      onValueChange={(next) => onValueChange?.(Array.isArray(next) ? next[0] : next)}
      className={cn("relative flex w-full touch-none items-center select-none", className)}
      {...props}
    >
      <SliderPrimitive.Control className="flex w-full items-center">
        <SliderPrimitive.Track
          data-slot="slider-track"
          className="bg-muted relative h-1.5 w-full grow rounded-full"
        >
          <SliderPrimitive.Indicator data-slot="slider-range" className="bg-primary absolute h-full rounded-full" />
          <SliderPrimitive.Thumb
            data-slot="slider-thumb"
            className="border-primary bg-[var(--knob)] block size-4 shrink-0 rounded-full border"
          />
        </SliderPrimitive.Track>
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  )
}

export { Slider, Switch }
