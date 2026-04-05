import { useEffect, useState } from "react"
import { getAuth, updateProfile } from "firebase/auth"
import {
	updateDoc,
	doc,
	collection,
	getDocs,
	query,
	where,
	deleteDoc,
} from "firebase/firestore"
import { db } from "../firebase.config"
import { useNavigate, Link } from "react-router-dom"
import { toast } from "react-toastify"
import BootstrapIcon from "../components/BootstrapIcon"
import PageShell from "../components/PageShell"
import Spinner from "../components/Spinner"
import ListingItem from "../components/ListingItem"
import {
	inputClassName,
	labelClassName,
	panelClassName,
	primaryButtonClassName,
	sectionEyebrowClassName,
	statCardClassName,
	secondaryButtonClassName,
} from "../lib/ui"

function Profile() {
	const auth = getAuth()
	const [listings, setListings] = useState(null)
	const [loading, setLoading] = useState(true)
	const [changeDetails, setChangeDetails] = useState(false)
	const [formData, setFormData] = useState({
		name: auth.currentUser.displayName,
		email: auth.currentUser.email,
	})

	const { name, email } = formData

	const navigate = useNavigate()

	useEffect(() => {
		const fetchUserListings = async () => {
			try {
				const listingsRef = collection(db, "listings")
				const q = query(
					listingsRef,
					where("userRef", "==", auth.currentUser.uid)
				)

				const querySnap = await getDocs(q)

				const userListings = []

				querySnap.forEach((doc) => {
					userListings.push({
						id: doc.id,
						data: doc.data(),
					})
				})

				userListings.sort((firstListing, secondListing) => {
					const firstTimestamp = firstListing.data.timestamp?.toMillis?.() ?? 0
					const secondTimestamp = secondListing.data.timestamp?.toMillis?.() ?? 0

					return secondTimestamp - firstTimestamp
				})

				setListings(userListings)
			} catch (error) {
				toast.error("Could not fetch your listings")
			} finally {
				setLoading(false)
			}
		}

		fetchUserListings()
	}, [auth.currentUser.uid])

	const onLogout = () => {
		auth.signOut()
		navigate("/")
	}

	const onSubmit = () => {
		try {
			if (auth.currentUser.displayName !== name) {
				// Update display name in firebase
				updateProfile(auth.currentUser, {
					displayName: name,
				})

				// Update in firestore
				const userRef = doc(db, "users", auth.currentUser.uid)
				updateDoc(userRef, {
					name,
				}).then(() => {
					toast.success("Profile updated successfully")
				})
			}
		} catch (error) {
			toast.error("Could not update profile details")
		}
	}

	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.id]: e.target.value,
		}))
	}

	const onDelete = async (listingId) => {
		if (window.confirm("Are you sure you want to delete?")) {
			await deleteDoc(doc(db, "listings", listingId))
			const updatedListing = listings.filter(
				(listing) => listing.id !== listingId
			)
			setListings(updatedListing)
			toast.success('Successfully deleted listing')
		}
	}

	const onEdit = (listingId) => {
		navigate(`/edit-listing/${listingId}`)
	}

	if (loading) {
		return <Spinner />
	}

	return (
		<PageShell
			eyebrow="Account"
			title="My Profile"
			subtitle="Update your personal details, manage listings, and publish new properties from one place."
			actions={
				<button className={secondaryButtonClassName} type="button" onClick={onLogout}>
					Logout
				</button>
			}
		>
			<section className="grid gap-4 md:grid-cols-3">
				<div className={statCardClassName}>
					<p className={sectionEyebrowClassName}>Account name</p>
					<p className="mt-3 text-2xl font-bold text-ink-950">{name}</p>
				</div>
				<div className={statCardClassName}>
					<p className={sectionEyebrowClassName}>Email</p>
					<p className="mt-3 break-all text-lg font-semibold text-ink-950">{email}</p>
				</div>
				<div className={statCardClassName}>
					<p className={sectionEyebrowClassName}>Listings</p>
					<p className="mt-3 text-2xl font-bold text-ink-950">
						{listings?.length ?? 0} live
					</p>
				</div>
			</section>

			<div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
				<div className={`${panelClassName} p-6 sm:p-8`}>
					<div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
						<div>
							<p className={sectionEyebrowClassName}>
								Personal Details
							</p>
							<h2 className="mt-2 font-display text-3xl text-ink-950">
								Account information
							</h2>
						</div>

						<button
							className={changeDetails ? primaryButtonClassName : secondaryButtonClassName}
							type="button"
							onClick={() => {
								changeDetails && onSubmit()
								setChangeDetails((prevState) => !prevState)
							}}
						>
							{changeDetails ? "Save Changes" : "Edit Details"}
						</button>
					</div>

					<form className="mt-8 grid gap-5">
						<div>
							<label className={labelClassName} htmlFor="name">
								Name
							</label>
							<input
								type="text"
								id="name"
								className={`${inputClassName} ${
									!changeDetails ? "bg-sand-50 text-slate-500" : ""
								}`}
								disabled={!changeDetails}
								value={name}
								onChange={onChange}
							/>
						</div>

						<div>
							<label className={labelClassName} htmlFor="email">
								Email
							</label>
							<input
								type="text"
								id="email"
								className={`${inputClassName} bg-sand-50 text-slate-500`}
								disabled
								value={email}
							/>
						</div>
					</form>
				</div>

				<Link
					to="/create-listing"
					className={`${panelClassName} group flex h-full flex-col justify-between p-6 transition duration-200 hover:-translate-y-1`}
				>
					<div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50">
						<BootstrapIcon name="house-door-fill" className="text-[1.75rem] text-brand-700" />
					</div>
					<div className="mt-16">
						<p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-700">
							Create Listing
						</p>
						<h2 className="mt-2 font-display text-3xl text-ink-950">
							Sell or rent your home
						</h2>
						<p className="mt-3 text-sm leading-7 text-slate-600">
							Publish a new listing with richer visuals, better pricing details, and a cleaner form flow.
						</p>
					</div>
					<div className="mt-6 flex items-center gap-3 text-sm font-semibold text-brand-700">
						<span>Open listing editor</span>
						<BootstrapIcon name="arrow-right" className="text-base" />
					</div>
				</Link>
			</div>

			<section className="mt-10">
				<div className="mb-4 flex items-center justify-between gap-4">
					<div>
						<p className={sectionEyebrowClassName}>
							My Listings
						</p>
						<h2 className="mt-2 font-display text-3xl text-ink-950">
							Published homes
						</h2>
					</div>
					{listings?.length ? (
						<p className="text-sm text-slate-500">
							{listings.length} live listing{listings.length > 1 ? "s" : ""}
						</p>
					) : null}
				</div>

				{listings?.length > 0 ? (
					<ul className="grid gap-5">
						{listings.map((listing) => (
							<ListingItem
								key={listing.id}
								listing={listing.data}
								id={listing.id}
								onDelete={() => onDelete(listing.id)}
								onEdit={() => onEdit(listing.id)}
							/>
						))}
					</ul>
				) : (
					<div className={`${panelClassName} p-10 text-center`}>
						<p className="font-display text-3xl text-ink-950">No listings yet</p>
						<p className="mt-3 text-sm leading-7 text-slate-600">
							When you publish a property, it will appear here for quick edits and removal.
						</p>
					</div>
				)}
			</section>
		</PageShell>
	)
}

export default Profile
