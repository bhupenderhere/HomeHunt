import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import {
	collection,
	getDocs,
	query,
	where,
	orderBy,
	limit,
	startAfter,
} from "firebase/firestore"
import { db } from "../firebase.config"
import { toast } from "react-toastify"
import Spinner from "../components/Spinner"
import ListingItem from "../components/ListingItem"
import PageShell from "../components/PageShell"
import {
	panelClassName,
	sectionEyebrowClassName,
	statCardClassName,
	subtleButtonClassName,
} from "../lib/ui"

function Category() {
	const [listings, setListings] = useState(null)
	const [loading, setLoading] = useState(true)
	const [lastFetchedListing, setLastFetchedListing] = useState(null)

	const params = useParams()

	useEffect(() => {
		const fetchListings = async () => {
			try {
				const listingsRef = collection(db, "listings")

				const q = query(
					listingsRef,
					where("type", "==", params.categoryName),
					orderBy("timestamp", "desc"),
					limit(10)
				)

				const querySnap = await getDocs(q)

				const lastVisible = querySnap.docs[querySnap.docs.length-1]
				setLastFetchedListing(lastVisible)

				const list = []

				querySnap.forEach((doc) => {
					return list.push({
						id: doc.id,
						data: doc.data(),
					})
				})

				setListings(list)
				setLoading(false)
			} catch (error) {
				toast.error("Could not fetch listings")
			}
		}

		fetchListings()
	}, [params.categoryName])


	// Pagination / Load More
	const onFetchMoreListings = async () => {
		try {
			const listingsRef = collection(db, "listings")

			const q = query(
				listingsRef,
				where("type", "==", params.categoryName),
				orderBy("timestamp", "desc"),
				startAfter(lastFetchedListing),
				limit(10)
			)

			const querySnap = await getDocs(q)

			const lastVisible = querySnap.docs[querySnap.docs.length - 1]
			setLastFetchedListing(lastVisible)

			const list = []

			querySnap.forEach((doc) => {
				return list.push({
					id: doc.id,
					data: doc.data(),
				})
			})

			setListings((prevState) => [...prevState, ...list])
			setLoading(false)
		} catch (error) {
			toast.error("Could not fetch listings")
		}
	}

	return (
		<PageShell
			eyebrow={params.categoryName === "rent" ? "Rent" : "Sale"}
			title={params.categoryName === "rent" ? "Places for rent" : "Places for sale"}
			subtitle="Browse live listings with clearer pricing, key features, and a cleaner visual hierarchy."
		>
			{loading ? (
				<Spinner />
			) : listings && listings.length > 0 ? (
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
						{listings.map((listing) => (
							<ListingItem
								key={listing.id}
								listing={listing.data}
								id={listing.id}
							/>
						))}
					</ul>

					{lastFetchedListing && (
						<div className="mt-8 flex justify-center">
							<button className={subtleButtonClassName} onClick={onFetchMoreListings} type="button">
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
