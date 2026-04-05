import { useEffect } from "react"
import BootstrapIcon from "./BootstrapIcon"
import OAuth from "./OAuth"
import {
	panelClassName,
	sectionEyebrowClassName,
} from "../lib/ui"

function AuthRequiredModal({ open, onClose, redirectPath = "/profile" }) {
	useEffect(() => {
		if (!open) {
			return undefined
		}

		const onKeyDown = (event) => {
			if (event.key === "Escape") {
				onClose()
			}
		}

		window.addEventListener("keydown", onKeyDown)

		return () => {
			window.removeEventListener("keydown", onKeyDown)
		}
	}, [onClose, open])

	if (!open) {
		return null
	}

	return (
		<div
			className="fixed inset-0 z-[70] flex items-end bg-ink-950/45 px-4 pb-28 pt-6 sm:items-center sm:justify-center sm:pb-6"
			onClick={onClose}
		>
			<div
				className={`${panelClassName} w-full max-w-md overflow-hidden px-6 py-6 shadow-2xl sm:px-7`}
				onClick={(event) => event.stopPropagation()}
			>
				<div className="flex justify-end mb-4">
					<button
						type="button"
						className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-xl font-semibold text-slate-500 transition duration-200 hover:bg-white hover:text-slate-900"
						onClick={onClose}
						aria-label="Close sign in popup"
					>
						<BootstrapIcon name="x-lg" className="text-lg" />
					</button>
				</div>

				<div className="rounded-[24px] bg-brand-50/80 p-5">
					<p className={sectionEyebrowClassName}>Profile Access</p>
					<h2 className="mt-3 font-display text-3xl text-ink-950">
						Continue with Google
					</h2>
					<p className="mt-3 text-sm leading-7 text-slate-600">
						Use the popup sign-in to manage listings, update your account,
						and return to the page you were trying to open.
					</p>
				</div>

				<OAuth redirectPath={redirectPath} showDivider={false} />
			</div>
		</div>
	)
}

export default AuthRequiredModal
