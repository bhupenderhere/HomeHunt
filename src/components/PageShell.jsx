import {
  cx,
  pageShellClassName,
  panelClassName,
  sectionEyebrowClassName,
} from "../lib/ui"

function PageShell({ eyebrow, title, subtitle, actions, children, className = "" }) {
  return (
    <section className={cx(pageShellClassName, className)}>
      {(title || subtitle || actions) && (
        <header
          className={cx(
            panelClassName,
            "relative overflow-hidden px-6 py-8 sm:px-8 sm:py-10",
            "before:absolute before:inset-y-8 before:right-8 before:w-24 before:rounded-full before:bg-brand-100/60 before:blur-2xl before:content-['']"
          )}
        >
          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-3xl">
              {eyebrow && <p className={sectionEyebrowClassName}>{eyebrow}</p>}
              {title && (
                <h1 className="mt-4 font-display text-4xl leading-tight text-ink-950 sm:text-5xl">
                  {title}
                </h1>
              )}
              {subtitle && (
                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                  {subtitle}
                </p>
              )}
            </div>

            {actions && <div className="shrink-0">{actions}</div>}
          </div>

          <div className="section-divider mt-8" />

          <div className="mt-4 flex flex-wrap gap-3 text-xs font-medium text-slate-500">
            <span className="rounded-full bg-white/80 px-3 py-2">Premium property browsing</span>
            <span className="rounded-full bg-white/80 px-3 py-2">Cleaner listing actions</span>
            <span className="rounded-full bg-white/80 px-3 py-2">Responsive layout</span>
          </div>
        </header>
      )}

      <div className="space-y-8">{children}</div>
    </section>
  )
}

export default PageShell
