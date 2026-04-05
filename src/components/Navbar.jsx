import React, { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { ReactComponent as OfferIcon } from "../assets/svg/localOfferIcon.svg"
import { ReactComponent as ExploreIcon } from "../assets/svg/exploreIcon.svg"
import { ReactComponent as PersonOutlineIcon } from "../assets/svg/personOutlineIcon.svg"
import ThemeToggle from "./ThemeToggle"
import AuthRequiredModal from "./AuthRequiredModal"
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
			icon: ExploreIcon,
		},
		{
			label: "Offers",
			path: "/offers",
			icon: OfferIcon,
		},
		{
			label: "Profile",
			path: "/profile",
			icon: PersonOutlineIcon,
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
						<div className="theme-nav-brand hidden min-w-[150px] items-center gap-3 rounded-[26px] px-4 py-3 sm:flex">
							<div className="h-3 w-3 rounded-full bg-brand-300" />
							<div>
								<p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-brand-200">
									Home Hunt
								</p>
								<p className="mt-1 text-sm font-semibold">Property dashboard</p>
							</div>
						</div>

						<ul className="grid flex-1 grid-cols-3 gap-2">
							{items.map(({ label, path, icon: Icon }) => {
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
											<Icon
												fill={active ? "#ffffff" : "currentColor"}
												width="22px"
												height="22px"
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
