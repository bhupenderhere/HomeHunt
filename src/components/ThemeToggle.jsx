import { useTheme } from "../context/ThemeContext"
import { cx } from "../lib/ui"

function SunIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 2.75V5.25M12 18.75V21.25M21.25 12H18.75M5.25 12H2.75M18.54 5.46L16.77 7.23M7.23 16.77L5.46 18.54M18.54 18.54L16.77 16.77M7.23 7.23L5.46 5.46"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  )
}

function MoonIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M19.5 14.25A7.5 7.5 0 0 1 9.75 4.5a8.25 8.25 0 1 0 9.75 9.75Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === "dark"

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      className={cx(
        "theme-toggle inline-flex w-[7.5rem] items-center justify-center gap-2 rounded-full border px-3 py-3 text-[11px] font-semibold uppercase tracking-[0.24em] transition duration-200",
        isDark ? "bg-brand-600 text-white shadow-soft" : ""
      )}
    >
      <span
        className={cx(
          "flex h-7 w-7 items-center justify-center rounded-full text-sm transition duration-200",
          isDark ? "bg-white/20 text-white" : "bg-slate-900 text-white"
        )}
      >
        {isDark ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
      </span>
      <span>{isDark ? "Light" : "Dark"}</span>
    </button>
  )
}

export default ThemeToggle
