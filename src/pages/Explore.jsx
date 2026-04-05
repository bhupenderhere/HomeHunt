import { Link } from "react-router-dom"
import rentCategoryImage from "../assets/jpg/rentCategoryImage.jpg"
import sellCategoryImage from "../assets/jpg/sellCategoryImage.jpg"
import Slider from '../components/Slider'
import PageShell from "../components/PageShell"
import {
  panelAccentClassName,
  panelClassName,
  sectionEyebrowClassName,
  statCardClassName,
} from "../lib/ui"

function Explore() {
	return (
		<PageShell
			eyebrow="Discover"
			title="Explore homes with more clarity"
			subtitle="Browse curated properties, compare prices quickly, and jump into the categories that match how you want to move."
		>
			<div className="grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_360px]">
				<div>
					<Slider />
				</div>

				<aside className={`${panelAccentClassName} relative overflow-hidden p-6`}>
					<div className="hero-orb right-[-3rem] top-[-2rem] h-28 w-28 bg-brand-200/60" />
					<p className={sectionEyebrowClassName}>
						Why Home Hunt
					</p>
					<h2 className="mt-3 max-w-xs font-display text-3xl text-ink-950">
						Market browsing without the clutter.
					</h2>
					<p className="mt-4 text-sm leading-7 text-slate-600">
						The interface emphasizes location, price clarity, and the actions that matter
						most when you are comparing homes quickly.
					</p>
					<div className="mt-6 grid gap-4">
						<div className="rounded-3xl bg-white/80 p-4">
							<p className="text-sm font-semibold text-ink-950">Rental focus</p>
							<p className="mt-1 text-sm leading-6 text-slate-600">
								See current rent options with clearer pricing and feature badges.
							</p>
						</div>
						<div className="rounded-3xl bg-white/80 p-4">
							<p className="text-sm font-semibold text-ink-950">Seller tools</p>
							<p className="mt-1 text-sm leading-6 text-slate-600">
								Manage your listings and profile from a calmer dashboard.
							</p>
						</div>
						<div className="rounded-3xl bg-slate-900 p-4 text-white">
							<p className="text-sm font-semibold text-sand-50">Direct contact</p>
							<p className="mt-1 text-sm leading-6 text-slate-300">
								Reach landlords fast once you find a place worth visiting.
							</p>
						</div>
					</div>
				</aside>
			</div>

			<section className="grid gap-4 md:grid-cols-3">
				<div className={statCardClassName}>
					<p className={sectionEyebrowClassName}>Step 1</p>
					<h2 className="mt-3 text-2xl font-bold text-ink-950">Start with intent</h2>
					<p className="mt-2 text-sm leading-7 text-slate-600">
						Choose rent or buy first, then compare properties inside a tighter context.
					</p>
				</div>
				<div className={statCardClassName}>
					<p className={sectionEyebrowClassName}>Step 2</p>
					<h2 className="mt-3 text-2xl font-bold text-ink-950">Scan fast</h2>
					<p className="mt-2 text-sm leading-7 text-slate-600">
						Price, location, bedrooms, bathrooms, and offer status stay visible without digging.
					</p>
				</div>
				<div className={statCardClassName}>
					<p className={sectionEyebrowClassName}>Step 3</p>
					<h2 className="mt-3 text-2xl font-bold text-ink-950">Act directly</h2>
					<p className="mt-2 text-sm leading-7 text-slate-600">
						Jump from listing detail into contact, profile management, or listing creation.
					</p>
				</div>
			</section>

			<section>
				<div className="mb-4 flex items-end justify-between gap-4">
					<div>
						<p className={sectionEyebrowClassName}>Categories</p>
						<h2 className="mt-2 font-display text-3xl text-ink-950">
							Start with your intent
						</h2>
					</div>
					<p className="hidden text-sm text-slate-500 md:block">
						Pick a lane first, then narrow into specific homes.
					</p>
				</div>

				<div className="grid gap-5 md:grid-cols-2">
					<Link
						to="/category/rent"
						className={`${panelClassName} group relative overflow-hidden p-2`}
					>
						<img
							src={rentCategoryImage}
							alt="rent"
							className="h-72 w-full rounded-[26px] object-cover transition duration-300 group-hover:scale-105"
						/>
						<div className="absolute inset-0 rounded-[30px] bg-gradient-to-t from-ink-950/70 to-transparent" />
						<div className="absolute inset-x-8 bottom-8">
							<p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-200">
								Rent
							</p>
							<p className="mt-2 text-3xl font-bold text-white">Places for rent</p>
							<p className="mt-2 max-w-xs text-sm leading-6 text-slate-100">
								Apartment, house, and short-listing discovery with cleaner price cues.
							</p>
						</div>
					</Link>

					<Link
						to="/category/sale"
						className={`${panelClassName} group relative overflow-hidden p-2`}
					>
						<img
							src={sellCategoryImage}
							alt="sell"
							className="h-72 w-full rounded-[26px] object-cover transition duration-300 group-hover:scale-105"
						/>
						<div className="absolute inset-0 rounded-[30px] bg-gradient-to-t from-ink-950/70 to-transparent" />
						<div className="absolute inset-x-8 bottom-8">
							<p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-200">
								Buy
							</p>
							<p className="mt-2 text-3xl font-bold text-white">Places for sale</p>
							<p className="mt-2 max-w-xs text-sm leading-6 text-slate-100">
								Properties organized for buyers who need a clearer comparison surface.
							</p>
						</div>
					</Link>
				</div>
			</section>
		</PageShell>
	)
}

export default Explore
