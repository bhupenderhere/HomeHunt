import { useLocation, useNavigate } from "react-router-dom"
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore"
import { db } from "../firebase.config"
import { toast } from "react-toastify"
import { primaryButtonClassName } from "../lib/ui"
import { getAuthRedirectPath } from "../lib/auth"
import BootstrapIcon from "./BootstrapIcon"

function OAuth({ redirectPath = "/profile", showDivider = true }) {
	const navigate = useNavigate()
	const location = useLocation()

	const onGoogleClick = async () => {
		try {
			const auth = getAuth()
			const provider = new GoogleAuthProvider()
			const result = await signInWithPopup(auth, provider)
			const user = result.user

			// Check for user
			const docRef = doc(db, "users", user.uid)
			const docSnap = await getDoc(docRef)

			// If user doesn't exists, create user
			if (!docSnap.exists()) {
				await setDoc(doc(db, "users", user.uid), {
					uid: user.uid,
					name: user.displayName,
					email: user.email,
					timestamp: serverTimestamp(),
				})
			} else if (!docSnap.data()?.uid) {
				await setDoc(
					doc(db, "users", user.uid),
					{
						uid: user.uid,
					},
					{ merge: true }
				)
			}

			toast.success("Signed in with Google")
			navigate(getAuthRedirectPath(location.state, redirectPath), {
				replace: true,
			})
		} catch (error) {
			toast.error("Something went wrong")
		}
	}

	return (
		<div className={showDivider ? "mt-8 border-t border-white/70 pt-6" : "mt-6"}>
			{showDivider && (
				<p className="text-center text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
					Continue with Google
				</p>
			)}
			<button
				type="button"
				className={`${primaryButtonClassName} mt-4 w-full gap-3 bg-white !text-slate-900 shadow-none ring-1 ring-white/80 hover:bg-sand-50`}
				onClick={onGoogleClick}
			>
				<BootstrapIcon name="google" className="text-base !text-slate-900" />
				<span className="!text-slate-900">Continue with Google</span>
			</button>
		</div>
	)
}

export default OAuth
