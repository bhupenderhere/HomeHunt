import AuthShell from "../components/AuthShell"
import GoogleAuthPanel from "../components/GoogleAuthPanel"

function SignUp() {
	return (
		<AuthShell
			eyebrow="Create Account"
			title="Join Home Hunt"
			subtitle="Set up your profile, publish homes, and manage inquiries through a single Google-based sign-in flow."
		>
			<GoogleAuthPanel
				introTitle="Create your account with Google"
				introDescription="Your Google account becomes the single entry point for profile setup, listing creation, and landlord contact."
				footerPrompt="Already have access?"
				footerLinkText="Go to sign in"
				footerLinkTo="/sign-in"
			/>
		</AuthShell>
	)
}

export default SignUp
