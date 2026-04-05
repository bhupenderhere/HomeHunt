export const getAuthRedirectPath = (state, fallbackPath = "/profile") => {
	const from = state?.from

	if (typeof from === "string" && from) {
		return from
	}

	if (from?.pathname) {
		return `${from.pathname}${from.search ?? ""}${from.hash ?? ""}`
	}

	return fallbackPath
}
