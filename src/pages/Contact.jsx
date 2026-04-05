import { useState, useEffect } from "react"
import { useParams, useSearchParams } from "react-router-dom"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../firebase.config"
import { toast } from "react-toastify"
import PageShell from "../components/PageShell"
import {
	panelClassName,
	primaryButtonClassName,
	labelClassName,
	sectionEyebrowClassName,
	statCardClassName,
	textareaClassName,
} from "../lib/ui"

function Contact() {
	const [message, setMessage] = useState("")
	const [landlord, setLandlord] = useState(null)
	// eslint-disable-next-line
	const [searchParams, setSearchParams] = useSearchParams()

	const params = useParams()

	useEffect(() => {
		const getLandlord = async () => {
			const docRef = doc(db, "users", params.landlordId)
			const docSnap = await getDoc(docRef)

			if (docSnap.exists()) {
				setLandlord(docSnap.data())
			} else {
				toast.error("Could not get landlord data")
			}
		}

		getLandlord()
	}, [params.landlordId])

	const onChange = (e) => setMessage(e.target.value)

	return (
		<PageShell
			eyebrow="Contact"
			title="Reach the landlord"
			subtitle="Send a direct note with the property context already filled in so the inquiry is easier to act on."
		>
			{landlord !== null && (
				<div className="grid gap-6 lg:grid-cols-[340px_minmax(0,1fr)]">
					<div className="space-y-4">
						<div className={`${panelClassName} p-6`}>
							<p className={sectionEyebrowClassName}>
								Recipient
							</p>
							<h2 className="mt-2 font-display text-3xl text-ink-950">
								Contact {landlord?.name}
							</h2>
							<p className="mt-3 text-sm leading-7 text-slate-600">
								Listing: <span className="font-semibold text-slate-900">{searchParams.get("listingName")}</span>
							</p>
							<p className="mt-2 text-sm leading-7 text-slate-600">
								Your message will open in the default email client.
							</p>
						</div>

						<div className={statCardClassName}>
							<p className={sectionEyebrowClassName}>Message goal</p>
							<p className="mt-3 text-xl font-semibold text-ink-950">
								Keep it specific and easy to reply to.
							</p>
							<p className="mt-2 text-sm leading-7 text-slate-600">
								Mention availability, preferred viewing times, and any must-have details
								you need clarified.
							</p>
						</div>
					</div>

					<div className={`${panelClassName} p-6 sm:p-8`}>
						<p className={sectionEyebrowClassName}>Draft</p>
						<h2 className="mt-2 font-display text-3xl text-ink-950">Compose inquiry</h2>
						<p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
							Write a short, direct message that references the property and your next step.
						</p>
						<form className="space-y-6">
							<div>
								<label htmlFor="message" className={labelClassName}>
									Message
								</label>
								<textarea
									name="message"
									id="message"
									className={textareaClassName}
									value={message}
									onChange={onChange}
									placeholder="Hi, I’m interested in this property and would like to know more about availability, viewing times, and next steps."
								></textarea>
							</div>

							<a
								href={`mailto:${landlord.email}?Subject=${searchParams.get(
									"listingName"
								)}&body=${message}`}
								className={`${primaryButtonClassName} w-full py-4 text-base`}
							>
								Send Message
							</a>
						</form>
					</div>
				</div>
			)}
		</PageShell>
	)
}

export default Contact
