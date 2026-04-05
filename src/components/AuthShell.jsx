import { panelClassName, pageShellClassName } from "../lib/ui"

function AuthShell({ eyebrow, title, subtitle, children }) {
  return (
    <section className={`${pageShellClassName} flex min-h-[calc(100vh-7rem)] items-center`}>
      <div className="grid w-full gap-6 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="relative hidden overflow-hidden rounded-[36px] bg-ink-950 p-8 text-white shadow-panel lg:flex lg:flex-col lg:justify-between">
          <div className="hero-orb left-[-5rem] top-[-4rem] h-44 w-44 bg-brand-400/25" />
          <div className="hero-orb bottom-[-5rem] right-[-2rem] h-56 w-56 bg-sand-300/20" />

          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-brand-300">
              Home Hunt
            </p>
            <h2 className="mt-6 max-w-lg font-display text-5xl leading-tight text-sand-50">
              Browse, publish, and manage homes in a calmer interface.
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-slate-300">
              Browse listings, compare offers, and manage your property profile in a
              cleaner interface built around the key actions buyers and renters care about.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="rounded-[28px] border border-white/10 bg-white/5 p-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-brand-200">
                  Focus
                </p>
                <p className="mt-3 text-xl font-semibold text-white">Less clutter, clearer price signals</p>
              </div>
              <div className="rounded-[28px] border border-white/10 bg-white/5 p-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-brand-200">
                  Flow
                </p>
                <p className="mt-3 text-xl font-semibold text-white">Faster path from browse to inquiry</p>
              </div>
            </div>
          </div>

          <div className="relative grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <p className="text-2xl font-bold text-sand-50">Browse</p>
              <p className="mt-1 text-sm text-slate-300">Property discovery with stronger hierarchy.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <p className="text-2xl font-bold text-sand-50">Manage</p>
              <p className="mt-1 text-sm text-slate-300">Direct actions for listings, edits, and contact.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <p className="text-2xl font-bold text-sand-50">Act</p>
              <p className="mt-1 text-sm text-slate-300">Readable controls that keep momentum high.</p>
            </div>
          </div>
        </div>

        <div className={`${panelClassName} inset-glow relative overflow-hidden p-6 sm:p-8 lg:p-10`}>
          <div className="hero-orb right-[-4rem] top-[-4rem] h-32 w-32 bg-brand-200/60" />
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-700">
            {eyebrow}
          </p>
          <h1 className="mt-4 max-w-xl font-display text-4xl text-ink-950 sm:text-5xl">{title}</h1>
          <p className="mt-3 max-w-xl text-sm leading-7 text-slate-600">{subtitle}</p>

          <div className="section-divider mt-8" />

          <div className="relative mt-8">{children}</div>
        </div>
      </div>
    </section>
  )
}

export default AuthShell
