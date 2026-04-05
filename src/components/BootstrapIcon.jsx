import { cx } from "../lib/ui"

export default function BootstrapIcon({ name, className = "", ...props }) {
	return <i className={cx(`bi bi-${name}`, className)} aria-hidden="true" {...props} />
}