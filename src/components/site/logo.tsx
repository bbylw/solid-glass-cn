import { cn } from "@/lib/utils"

/**
 * The mark: a pane seen straight on — a hairline, a line of light along its
 * top edge, and three rules of text inside. It is drawn in the theme's own
 * colours so it changes with the material.
 */
function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={cn("size-[18px]", className)}>
      <rect x="1.4" y="1.4" width="17.2" height="17.2" rx="4.6" fill="var(--panel)" />
      <rect x="1.4" y="1.4" width="17.2" height="17.2" rx="4.6" stroke="var(--glass-edge)" />
      <path d="M1.4 6.2h17.2" stroke="var(--glass-rim)" strokeWidth="1" />
      <path
        d="M5.6 7.6h8.8M5.6 10.4h8.8M5.6 13.2h5.2"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  )
}

function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2 text-[14px] font-medium tracking-[-0.01em]", className)}>
      <Logo />
      Solid Glass
    </span>
  )
}

export { Logo, Wordmark }
