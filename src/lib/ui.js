export const cx = (...classes) => classes.filter(Boolean).join(" ")

export const pageShellClassName =
  "mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 pb-32 pt-6 sm:px-6 lg:px-8"

export const panelClassName =
  "theme-panel rounded-[32px] border shadow-panel backdrop-blur-xl"

export const panelAccentClassName =
  "theme-panel-accent rounded-[32px] border shadow-soft backdrop-blur-xl"

export const labelClassName =
  "theme-label mb-2 block text-[11px] font-semibold uppercase tracking-[0.3em]"

export const inputClassName =
  "theme-input w-full rounded-[22px] border px-4 py-3.5 text-sm font-medium outline-none transition duration-200 placeholder:text-stone-400 focus:border-brand-300 focus:ring-4 focus:ring-brand-100"

export const textareaClassName = `${inputClassName} min-h-[150px] resize-y`

export const primaryButtonClassName =
  "inline-flex items-center justify-center rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-soft transition duration-200 hover:-translate-y-0.5 hover:bg-brand-700"

export const secondaryButtonClassName =
  "theme-secondary inline-flex items-center justify-center rounded-full border px-5 py-3 text-sm font-semibold transition duration-200 hover:-translate-y-0.5 hover:border-brand-200 hover:text-brand-700"

export const subtleButtonClassName =
  "theme-subtle inline-flex items-center justify-center rounded-full px-4 py-2.5 text-sm font-semibold transition duration-200 hover:-translate-y-0.5"

export const toggleButtonClassName = (active) =>
  cx(
    "theme-toggle-option flex-1 rounded-full border px-4 py-3 text-sm font-semibold transition duration-200",
    active
      ? "border-brand-600 bg-brand-600 text-white shadow-soft"
      : "hover:border-brand-200 hover:text-brand-700"
  )

export const sectionEyebrowClassName =
  "theme-eyebrow text-[11px] font-semibold uppercase tracking-[0.35em]"

export const statCardClassName =
  "theme-stat rounded-[28px] border p-5 shadow-soft backdrop-blur"

export const mutedCardClassName = "theme-muted rounded-[28px] p-5"
