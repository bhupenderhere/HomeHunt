import { useTheme } from "../context/ThemeContext"
import { cx } from "../lib/ui"
import BootstrapIcon from "./BootstrapIcon"

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === "dark"

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      className={cx(
        "theme-toggle inline-flex items-center justify-center gap-2 rounded-full border text-[11px] p-2 font-semibold uppercase tracking-[0.24em] transition duration-200",
        isDark ? "bg-brand-600 text-white shadow-soft" : ""
      )}
    >
      <span
        className={cx(
          "flex h-7 w-7 items-center justify-center rounded-full text-sm transition duration-200",
          isDark ? "bg-white/20 text-white" : "bg-slate-900 text-white"
        )}
      >
        {isDark ? (
          <BootstrapIcon name="sun-fill" />
        ) : (
          <BootstrapIcon name="moon-stars-fill" />
        )}
      </span>
    </button>
  )
}

export default ThemeToggle
