import { cn } from '@/utils/cn'

interface WordmarkProps {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'full' | 'mark'
  className?: string
}

export function Wordmark({ size = 'md', variant = 'full', className }: WordmarkProps) {
  const dim = size === 'lg' ? 'h-9 w-9' : size === 'md' ? 'h-8 w-8' : 'h-7 w-7'
  const text = size === 'lg' ? 'text-xl' : size === 'md' ? 'text-[17px]' : 'text-sm'
  const sub = size === 'lg' ? 'text-[11px]' : 'text-[10px]'

  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      {/* Mark — flame/F glyph */}
      <div
        className={cn(
          'relative grid shrink-0 place-items-center overflow-hidden rounded-lg bg-sovereign text-canvas',
          dim,
        )}
      >
        <span
          aria-hidden
          className="absolute -bottom-1 right-0 h-3 w-3 rounded-full bg-emerald opacity-90 blur-[1.5px]"
        />
        <svg viewBox="0 0 24 24" className="relative h-4 w-4" fill="none" aria-hidden>
          <path
            d="M7 4h10v3.2H10.4v3.4h5.4v3.1h-5.4V20H7V4Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {variant === 'full' && (
        <div className="leading-tight">
          <p className={cn('font-semibold tracking-tight-bank text-ink', text)}>
            Fuel<span className="text-emerald">.</span>
          </p>
          <p className={cn('text-ink-subtle', sub)}>Profitability Intelligence</p>
        </div>
      )}
    </div>
  )
}
