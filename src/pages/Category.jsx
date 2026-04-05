import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
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

function Category() {
	const [listings, setListings] = useState([])
	const [loading, setLoading] = useState(true)
	const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

	const params = useParams()

	useEffect(() => {
		const fetchListings = async () => {
			setLoading(true)

			try {
				const listingsRef = collection(db, "listings")
				const q = query(listingsRef, where("type", "==", params.categoryName))
				const querySnap = await getDocs(q)
				setListings(sortListingsByNewest(mapListingDocs(querySnap)))
				setVisibleCount(PAGE_SIZE)
			} catch (error) {
				toast.error("Could not fetch listings")
				setListings([])
			} finally {
				setLoading(false)
			}
		}

		fetchListings()
	}, [params.categoryName])

	const visibleListings = listings.slice(0, visibleCount)

	return (
		<PageShell
			eyebrow={params.categoryName === "rent" ? "Rent" : "Sale"}
			title={params.categoryName === "rent" ? "Places for rent" : "Places for sale"}
			subtitle="Browse live listings with clearer pricing, key features, and a cleaner visual hierarchy."
		>
			{loading ? (
				<Spinner />
			) : listings.length > 0 ? (
				<>
					<section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
						<div className={statCardClassName}>
							<p className={sectionEyebrowClassName}>Live inventory</p>
							<h2 className="mt-3 text-3xl font-bold text-ink-950">
								{listings.length} home{listings.length > 1 ? "s" : ""} ready to review
							</h2>
							<p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
								Every card keeps pricing, type, and key property features in view so you
								can compare options without opening each listing.
							</p>
						</div>
						<div className={`${panelClassName} p-6`}>
							<p className={sectionEyebrowClassName}>Browsing mode</p>
							<p className="mt-3 text-lg font-semibold text-ink-950">
								{params.categoryName === "rent" ? "Rental market" : "Purchase market"}
							</p>
							<p className="mt-2 text-sm leading-7 text-slate-600">
								Use this collection as a tighter list, then jump into the details page for
								maps, contact, and full pricing context.
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
					<p className="font-display text-3xl text-ink-950">Nothing here yet</p>
					<p className="mt-3 text-sm leading-7 text-slate-600">
						There are no listings for {params.categoryName} right now. Check back later or switch categories.
					</p>
				</div>
			)}
		</PageShell>
	)
}

export default Category
