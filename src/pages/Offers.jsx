import { useEffect, useState } from "react"
import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "../firebase.config"
import { toast } from "react-toastify"
import Spinner from "../components/Spinner"
import ListingItem from "../components/ListingItem"
import PageShell from "../components/PageShell"
import { mapListingDocs, sortListingsByNewest } from "../lib/listings"
import {
	panelClassName,
	sectionEyebrowClassName,
	statCardClassName,
	subtleButtonClassName,
} from "../lib/ui"

const PAGE_SIZE = 10

function Offers() {
	const [listings, setListings] = useState([])
	const [loading, setLoading] = useState(true)
	const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

	useEffect(() => {
		const fetchListings = async () => {
			try {
				const listingsRef = collection(db, "listings")
				const q = query(listingsRef, where("offer", "==", true))
				const querySnap = await getDocs(q)
				setListings(sortListingsByNewest(mapListingDocs(querySnap)))
				setVisibleCount(PAGE_SIZE)
			} catch (error) {
				console.log(error)
				toast.error("Could not fetch offer listings")
				setListings([])
			} finally {
				setLoading(false)
			}
		}

		fetchListings()
	}, [])

	const visibleListings = listings.slice(0, visibleCount)

	return (
		<PageShell
			eyebrow="Offers"
			title="Current offers"
			subtitle="A focused view of listings with active discounts so pricing opportunities stand out immediately."
		>
			{loading ? (
				<Spinner />
			) : listings.length > 0 ? (
				<>
					<section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
						<div className={statCardClassName}>
							<p className={sectionEyebrowClassName}>Offer watch</p>
							<h2 className="mt-3 text-3xl font-bold text-ink-950">
								{listings.length} discounted listing{listings.length > 1 ? "s" : ""}
							</h2>
							<p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
								This view isolates listings with active offers so pricing opportunities
								stand out immediately instead of getting lost in the wider catalog.
							</p>
						</div>
						<div className={`${panelClassName} p-6`}>
							<p className={sectionEyebrowClassName}>How to use it</p>
							<p className="mt-3 text-lg font-semibold text-ink-950">
								Compare discounts first, then validate fit.
							</p>
							<p className="mt-2 text-sm leading-7 text-slate-600">
								Once the price looks promising, move into the detail page for the gallery,
								map, and direct contact path.
							</p>
						</div>
					</section>

					<ul className="grid gap-5">
						{visibleListings.map((listing) => (
							<ListingItem
								key={listing.id}
								listing={listing.data}
								id={listing.id}
							/>
						))}
					</ul>

					{visibleCount < listings.length && (
						<div className="mt-8 flex justify-center">
							<button
								className={subtleButtonClassName}
								onClick={() => setVisibleCount((currentCount) => currentCount + PAGE_SIZE)}
								type="button"
							>
								Load More
							</button>
						</div>
					)}
				</>
			) : (
				<div className={`${panelClassName} p-10 text-center`}>
					<p className="font-display text-3xl text-ink-950">No offers live right now</p>
					<p className="mt-3 text-sm leading-7 text-slate-600">
						New discounts will appear here as soon as sellers publish them.
					</p>
				</div>
			)}
		</PageShell>
	)
}

export default Offers
