function Spinner() {
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-ink-950/25 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4 rounded-[28px] border border-white/70 bg-white/90 px-8 py-7 shadow-panel">
        <div className="h-14 w-14 animate-spin rounded-full border-4 border-brand-200 border-t-brand-600" />
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
          Loading
        </p>
      </div>
    </div>
  )
}

export default Spinner
