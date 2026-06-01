import { cva, type VariantProps } from 'class-variance-authority'
import type { HTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium tracking-tight transition-colors',
  {
    variants: {
      variant: {
        secondary: 'bg-canvas-subtle text-ink-muted',
        info: 'bg-signal-info-soft text-signal-info',
        positive: 'bg-signal-positive-soft text-emerald-deep',
        warning: 'bg-signal-warning-soft text-signal-warning',
        risk: 'bg-signal-risk-soft text-signal-risk',
        neutral: 'bg-signal-neutral-soft text-signal-neutral',
        sovereign: 'bg-sovereign text-canvas',
        outline: 'border border-hairline-strong text-ink-muted',
      },
    },
    defaultVariants: { variant: 'secondary' },
  },
)

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}
