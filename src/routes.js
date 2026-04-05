import { BrowserRouter, Routes as Switch, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Navbar from "./components/Navbar"
import { ThemeProvider } from "./context/ThemeContext"
import PrivateRoute from "./components/PrivateRoute"
import {
  Explore,
  ForgotPassword,
  Offers,
  Profile,
  SignIn,
  SignUp,
  Category,
  CreateListing,
  Listing,
  Contact,
  EditListing,
} from "./pages";

export default function Routes() {
	return (
		<ThemeProvider>
			<BrowserRouter>
				<div className="app-shell">
					<Switch>
						<Route path="/" element={<Explore />} />
						<Route path="/offers" element={<Offers />} />
						<Route path="/category/:categoryName" element={<Category />} />
						<Route path="/profile" element={<PrivateRoute />}>
							<Route path="/profile" element={<Profile />} />
						</Route>
						<Route path="/sign-in" element={<SignIn />} />
						<Route path="/sign-up" element={<SignUp />} />
						<Route path="/forgot-password" element={<ForgotPassword />} />
						<Route path="/create-listing" element={<CreateListing />} />
						<Route path="/category/:categoryName/:listingId" element={<Listing />} />
						<Route path="/contact/:landlordId" element={<Contact />} />
						<Route path="/edit-listing/:listingId" element={<EditListing />} />
					</Switch>
					<Navbar />
				</div>
			</BrowserRouter>

			<ToastContainer
				position="top-center"
				autoClose={2500}
				pauseOnHover={false}
				toastClassName="theme-toast rounded-2xl border text-sm font-semibold shadow-panel backdrop-blur"
				bodyClassName="px-1 py-0"
				progressClassName="bg-brand-500"
			/>
		</ThemeProvider>
	)
}
