import AuthShell from "../components/AuthShell"
import GoogleAuthPanel from "../components/GoogleAuthPanel"

function SignIn() {
	return (
		<AuthShell
			eyebrow="Sign In"
			title="Welcome back"
			subtitle="Access your profile, manage listings, and continue browsing homes through Google sign-in."
		>
			<GoogleAuthPanel
				introTitle="Continue with Google"
				introDescription="Use your Google account to sign in and return directly to your profile, listings, and saved browsing flow."
				footerPrompt="Need a first-time setup?"
				footerLinkText="Use the same Google flow here too"
				footerLinkTo="/sign-up"
			/>
		</AuthShell>
	)
}

export default SignIn
