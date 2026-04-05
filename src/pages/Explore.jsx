import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore"
import { toast } from "react-toastify"
import rentCategoryImage from "../assets/jpg/rentCategoryImage.jpg"
import sellCategoryImage from "../assets/jpg/sellCategoryImage.jpg"
import BootstrapIcon from "../components/BootstrapIcon"
import PageShell from "../components/PageShell"
import Slider from "../components/Slider"
import { db } from "../firebase.config"
import { formatDiscountAmount, formatListingPrice } from "../lib/listings"
import {
	panelAccentClassName,
	panelClassName,
	primaryButtonClassName,
	sectionEyebrowClassName,
	secondaryButtonClassName,
	statCardClassName,
} from "../lib/ui"

const previewConfigs = [
	{
		key: "rent",
		eyebrow: "Rent",
		title: "Fresh rentals",
		description: "New rental homes ready for shortlist review.",
		href: "/category/rent",
		icon: "buildings-fill",
		emptyState: "Rental inventory will show up here once new listings are published.",
		buildQuery: (listingsRef) =>
			query(listingsRef, where("type", "==", "rent"), orderBy("timestamp", "desc"), limit(3)),
	},
	{
		key: "sale",
		eyebrow: "Buy",
		title: "Fresh for sale",
		description: "Latest properties for buyers comparing the market.",
		href: "/category/sale",
		icon: "house-heart-fill",
		emptyState: "Sale listings will appear here as soon as the catalog grows.",
		buildQuery: (listingsRef) =>
			query(listingsRef, where("type", "==", "sale"), orderBy("timestamp", "desc"), limit(3)),
	},
	{
		key: "offers",
		eyebrow: "Deals",
		title: "Live offers",
		description: "Discounted homes grouped into one faster scan.",
		href: "/offers",
		icon: "ticket-perforated-fill",
		emptyState: "Discounted listings are not live right now.",
		buildQuery: (listingsRef) =>
			query(listingsRef, where("offer", "==", true), orderBy("timestamp", "desc"), limit(3)),
	},
]

const journeyCards = [
	{
		title: "Start with market type",
		description: "Split rent and sale first so the pricing context stays consistent.",
		icon: "signpost-split-fill",
	},
	{
		title: "Compare fewer clicks",
		description: "Price, beds, baths, parking, and offer status stay visible in the card layer.",
		icon: "ui-checks-grid",
	},
	{
		title: "Act when the fit is real",
		description: "Move from discovery into offers, contact, or listing creation without changing mental context.",
		icon: "send-check-fill",
	},
]

const laneCards = [
	{
		title: "Places for rent",
		eyebrow: "Rent",
		description: "Apartment, house, and short-list discovery with pricing built for monthly comparison.",
		href: "/category/rent",
		image: rentCategoryImage,
		chips: ["Monthly pricing", "Fast shortlist", "New inventory"],
	},
	{
		title: "Places for sale",
		eyebrow: "Buy",
		description: "Property search for buyers who need cleaner side-by-side comparison before scheduling visits.",
		href: "/category/sale",
		image: sellCategoryImage,
		chips: ["Buyer view", "Offer clarity", "Direct follow-up"],
	},
]

function Explore() {
	const [previewGroups, setPreviewGroups] = useState({
		rent: [],
		sale: [],
		offers: [],
	})
	const [loadingPreviews, setLoadingPreviews] = useState(true)

	useEffect(() => {
		const fetchPreviewGroups = async () => {
			try {
				const listingsRef = collection(db, "listings")
				const groups = await Promise.all(
					previewConfigs.map(async ({ key, buildQuery }) => {
						const querySnap = await getDocs(buildQuery(listingsRef))

						return [
							key,
							querySnap.docs.map((doc) => ({
								id: doc.id,
								data: doc.data(),
							})),
						]
					})
				)

				setPreviewGroups(Object.fromEntries(groups))
			} catch (error) {
				console.log(error)
				toast.error("Could not load explore previews")
				setPreviewGroups({
					rent: [],
					sale: [],
					offers: [],
				})
			} finally {
				setLoadingPreviews(false)
			}
		}

		fetchPreviewGroups()
	}, [])

	return (
		<PageShell
			eyebrow="Discover"
			title="Explore homes with more signal"
			subtitle="Use Home Hunt as a real discovery surface: jump into rent or buy, catch live discounts, and review the latest homes without digging through clutter."
			actions={
				<div className="flex flex-wrap gap-3">
					<Link to="/offers" className={secondaryButtonClassName}>
						View offers
					</Link>
					<Link to="/create-listing" className={primaryButtonClassName}>
						Add listing
					</Link>
				</div>
			}
		>
			<div className="grid gap-6 xl:grid-cols-[minmax(0,1.5fr)_380px]">
				<div>
					<Slider />
				</div>

				<aside className={`${panelAccentClassName} relative overflow-hidden p-6`}>
					<div className="hero-orb right-[-3rem] top-[-2rem] h-28 w-28 bg-brand-200/60" />
					<p className={sectionEyebrowClassName}>Browse with intent</p>
					<h2 className="mt-3 max-w-sm font-display text-3xl text-ink-950">
						Fewer dead ends, faster next moves.
					</h2>
					<p className="mt-4 text-sm leading-7 text-slate-600">
						Explore now behaves like a control room for discovery. Start in the right market,
						scan the newest listings, and route into offers or publishing without friction.
					</p>

					<div className="mt-6 grid gap-3">
						<QuickActionLink
							to="/category/rent"
							icon="buildings-fill"
							title="Browse rentals"
							description="See fresh homes priced for monthly comparison."
						/>
						<QuickActionLink
							to="/category/sale"
							icon="house-heart-fill"
							title="Browse sales"
							description="Review purchase listings with cleaner context."
						/>
						<QuickActionLink
							to="/offers"
							icon="ticket-perforated-fill"
							title="Track active offers"
							description="Surface discounted homes in one focused list."
						/>
						<QuickActionLink
							to="/create-listing"
							icon="cloud-arrow-up-fill"
							title="Publish a listing"
							description="Jump into seller flow when you are ready to post."
						/>
					</div>

					<div className="section-divider mt-6" />

					<div className="mt-6 grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
						<InsightCard
							label="Rental lane"
							value={getPreviewSummary(previewGroups.rent, "fresh home")}
							helper="Newest rent listings"
						/>
						<InsightCard
							label="Buyer lane"
							value={getPreviewSummary(previewGroups.sale, "fresh home")}
							helper="Newest sale listings"
						/>
						<InsightCard
							label="Offer watch"
							value={getPreviewSummary(previewGroups.offers, "active deal")}
							helper="Discounted listings live"
						/>
					</div>
				</aside>
			</div>

			<section className="grid gap-4 md:grid-cols-3">
				{journeyCards.map((card, index) => (
					<div key={card.title} className={statCardClassName}>
						<p className={sectionEyebrowClassName}>Step {index + 1}</p>
						<div className="mt-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
							<BootstrapIcon name={card.icon} className="text-lg" />
						</div>
						<h2 className="mt-4 text-2xl font-bold text-ink-950">{card.title}</h2>
						<p className="mt-2 text-sm leading-7 text-slate-600">{card.description}</p>
					</div>
				))}
			</section>

			<section>
				<div className="mb-4 flex items-end justify-between gap-4">
					<div>
						<p className={sectionEyebrowClassName}>Market pulse</p>
						<h2 className="mt-2 font-display text-3xl text-ink-950">
							Live starting points
						</h2>
					</div>
					<p className="hidden text-sm text-slate-500 md:block">
						Each column is a fast route into the current catalog.
					</p>
				</div>

				<div className="grid gap-5 xl:grid-cols-3">
					{previewConfigs.map((config) => (
						<PreviewColumn
							key={config.key}
							config={config}
							listings={previewGroups[config.key]}
							loading={loadingPreviews}
						/>
					))}
				</div>
			</section>

			<section>
				<div className="mb-4 flex items-end justify-between gap-4">
					<div>
						<p className={sectionEyebrowClassName}>Categories</p>
						<h2 className="mt-2 font-display text-3xl text-ink-950">
							Choose your lane first
						</h2>
					</div>
					<p className="hidden text-sm text-slate-500 md:block">
						Start with the market that matches your move, then narrow into specific homes.
					</p>
				</div>

				<div className="grid gap-5 md:grid-cols-2">
					{laneCards.map((card) => (
						<Link
							key={card.title}
							to={card.href}
							className={`${panelClassName} group relative overflow-hidden p-2`}
						>
							<img
								src={card.image}
								alt={card.eyebrow}
								className="h-80 w-full rounded-[26px] object-cover transition duration-300 group-hover:scale-105"
							/>
							<div className="absolute inset-2 rounded-[26px] bg-gradient-to-t from-ink-950/80 via-ink-950/20 to-transparent" />
							<div className="absolute inset-x-7 bottom-7">
								<p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-200">
									{card.eyebrow}
								</p>
								<p className="mt-2 text-3xl font-bold text-white">{card.title}</p>
								<p className="mt-2 max-w-sm text-sm leading-6 text-slate-100">
									{card.description}
								</p>
								<div className="mt-4 flex flex-wrap gap-2">
									{card.chips.map((chip) => (
										<span
											key={chip}
											className="rounded-full bg-white/14 px-3 py-2 text-xs font-semibold text-white backdrop-blur"
										>
											{chip}
										</span>
									))}
								</div>
							</div>
						</Link>
					))}
				</div>
			</section>
		</PageShell>
	)
}

function QuickActionLink({ to, icon, title, description }) {
	return (
		<Link
			to={to}
			className="rounded-[26px] border border-white/70 bg-white/72 p-4 transition duration-200 hover:-translate-y-1 hover:bg-white/88"
		>
			<div className="flex items-start gap-4">
				<div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
					<BootstrapIcon name={icon} className="text-base" />
				</div>
				<div className="min-w-0">
					<p className="text-sm font-semibold text-ink-950">{title}</p>
					<p className="mt-1 text-sm leading-6 text-slate-600">{description}</p>
				</div>
			</div>
		</Link>
	)
}

function InsightCard({ label, value, helper }) {
	return (
		<div className="rounded-[24px] bg-white/80 p-4">
			<p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">{label}</p>
			<p className="mt-2 text-xl font-bold text-ink-950">{value}</p>
			<p className="mt-1 text-sm text-slate-600">{helper}</p>
		</div>
	)
}

function PreviewColumn({ config, listings, loading }) {
	return (
		<div className={`${panelClassName} flex h-full flex-col p-5`}>
			<div className="flex items-start justify-between gap-4">
				<div>
					<p className={sectionEyebrowClassName}>{config.eyebrow}</p>
					<h3 className="mt-3 text-2xl font-bold text-ink-950">{config.title}</h3>
				</div>
				<div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
					<BootstrapIcon name={config.icon} className="text-base" />
				</div>
			</div>

			<p className="mt-3 text-sm leading-7 text-slate-600">{config.description}</p>

			<div className="mt-5 flex-1 space-y-3">
				{loading ? (
					<>
						<LoadingCard />
						<LoadingCard />
					</>
				) : listings.length > 0 ? (
					listings.map((listing) => (
						<ListingPreviewCard key={listing.id} id={listing.id} listing={listing.data} />
					))
				) : (
					<div className="rounded-[24px] border border-dashed border-white/80 bg-white/72 p-5 text-sm leading-7 text-slate-600">
						{config.emptyState}
					</div>
				)}
			</div>

			<Link
				to={config.href}
				className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-700"
			>
				<span>Open {config.eyebrow.toLowerCase()}</span>
				<BootstrapIcon name="arrow-right" className="text-sm" />
			</Link>
		</div>
	)
}

function ListingPreviewCard({ listing, id }) {
	const discountAmount = formatDiscountAmount(listing)
	const priceLabel = formatListingPrice(listing)

	return (
		<Link
			to={`/category/${listing.type}/${id}`}
			className="group block rounded-[24px] border border-white/70 bg-white/72 p-3 transition duration-200 hover:-translate-y-1 hover:bg-white/88"
		>
			<div className="grid gap-4 sm:grid-cols-[118px_minmax(0,1fr)]">
				<div className="relative overflow-hidden rounded-[18px]">
					<img
						src={listing.imageUrls[0]}
						alt={listing.name}
						className="h-28 w-full object-cover transition duration-300 group-hover:scale-105 sm:h-full"
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-ink-950/55 via-transparent to-transparent" />
					<div className="absolute left-3 top-3 rounded-full bg-white/92 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-700">
						{listing.type === "rent" ? "Rent" : "Sale"}
					</div>
				</div>

				<div className="min-w-0">
					<div className="flex items-start justify-between gap-3">
						<div className="min-w-0">
							<h4 className="truncate text-lg font-bold text-ink-950">{listing.name}</h4>
							<p className="mt-1 truncate text-sm text-slate-600">{listing.location}</p>
						</div>
						{discountAmount && (
							<span className="rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-semibold text-brand-700">
								{discountAmount}
							</span>
						)}
					</div>

					<div className="mt-3 flex flex-wrap gap-2 text-xs font-medium text-slate-600">
						<span className="rounded-full bg-sand-100 px-3 py-1.5">
							{listing.bedrooms} bed
						</span>
						<span className="rounded-full bg-sand-100 px-3 py-1.5">
							{listing.bathrooms} bath
						</span>
						{listing.parking && (
							<span className="rounded-full bg-sand-100 px-3 py-1.5">Parking</span>
						)}
					</div>

					<div className="mt-4 flex items-end justify-between gap-3">
						<p className="text-base font-bold text-brand-700">
							{priceLabel}
							{listing.type === "rent" && priceLabel !== "Price on request" && (
								<span className="text-xs font-medium text-slate-500"> / month</span>
							)}
						</p>
						<span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
							View
							<BootstrapIcon name="arrow-right" className="text-sm" />
						</span>
					</div>
				</div>
			</div>
		</Link>
	)
}

function LoadingCard() {
	return (
		<div className="rounded-[24px] border border-white/70 bg-white/72 p-3">
			<div className="grid gap-4 sm:grid-cols-[118px_minmax(0,1fr)]">
				<div className="h-28 animate-pulse rounded-[18px] bg-sand-100" />
				<div className="space-y-3 py-1">
					<div className="h-4 w-3/4 animate-pulse rounded-full bg-sand-100" />
					<div className="h-3 w-1/2 animate-pulse rounded-full bg-sand-100" />
					<div className="flex gap-2">
						<div className="h-8 w-20 animate-pulse rounded-full bg-sand-100" />
						<div className="h-8 w-20 animate-pulse rounded-full bg-sand-100" />
					</div>
					<div className="h-4 w-1/3 animate-pulse rounded-full bg-sand-100" />
				</div>
			</div>
		</div>
	)
}

function getPreviewSummary(listings, label) {
	if (listings.length === 0) {
		return `No ${label}s yet`
	}

	return `${listings.length} ${label}${listings.length > 1 ? "s" : ""}`
}

export default Explore
