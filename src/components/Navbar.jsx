import React, { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import ThemeToggle from "./ThemeToggle"
import AuthRequiredModal from "./AuthRequiredModal"
import BootstrapIcon from "./BootstrapIcon"
import { useAuthStatus } from "../hooks/useAuthStatus"
import { cx } from "../lib/ui"

function Navbar() {
	const navigate = useNavigate()
	const location = useLocation()
	const { loggedIn, checkingStatus } = useAuthStatus()
	const [showAuthPrompt, setShowAuthPrompt] = useState(false)
	const items = [
		{
			label: "Explore",
			path: "/",
			icon: "compass-fill",
		},
		{
			label: "Offers",
			path: "/offers",
			icon: "tag-fill",
		},
		{
			label: "Profile",
			path: "/profile",
			icon: "person-circle",
		},
	]

	const pathMatchRoute = (route) => {
		if (route === "/") {
			return (
				location.pathname === "/" ||
				location.pathname.startsWith("/category/") ||
				location.pathname.startsWith("/contact/")
			)
		}

		if (route === "/profile") {
			return (
				location.pathname === "/profile" ||
				location.pathname.startsWith("/create-listing") ||
				location.pathname.startsWith("/edit-listing/")
			)
		}

		return route === location.pathname
	}

	useEffect(() => {
		if (loggedIn) {
			setShowAuthPrompt(false)
		}
	}, [loggedIn])

	const onNavigate = (path) => {
		if (path === "/profile" && !checkingStatus && !loggedIn) {
			setShowAuthPrompt(true)
			return
		}

		navigate(path)
	}

	return (
		<>
			<footer className="pointer-events-none fixed inset-x-0 bottom-4 z-50 px-4 sm:bottom-6">
				<nav className="theme-nav pointer-events-auto mx-auto max-w-3xl rounded-[34px] border p-2.5 shadow-panel backdrop-blur-xl">
					<div className="flex items-center gap-3">
						<ul className="grid flex-1 grid-cols-3 gap-2">
							{items.map(({ label, path, icon }) => {
								const active = pathMatchRoute(path)

								return (
									<li key={path}>
										<button
											type="button"
											onClick={() => onNavigate(path)}
											className={cx(
												"flex w-full items-center justify-center gap-2 rounded-[22px] px-3 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] transition duration-200",
												active
													? "bg-brand-600 text-white shadow-soft"
													: "text-slate-500 hover:bg-brand-50 hover:text-brand-700"
											)}
										>
											<BootstrapIcon
												name={icon}
												className={cx(
													"text-[1.1rem] leading-none",
													active ? "text-white" : "text-current"
												)}
											/>
											<span>{label}</span>
										</button>
									</li>
								)
							})}
						</ul>
						<ThemeToggle />
					</div>
				</nav>
			</footer>
			<AuthRequiredModal
				open={showAuthPrompt}
				onClose={() => setShowAuthPrompt(false)}
			/>
		</>
	)
}

export default Navbar
