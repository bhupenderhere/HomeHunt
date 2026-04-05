import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { getDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firebase.config";
import PageShell from "../components/PageShell";
import Spinner from "../components/Spinner";
import shareIcon from "../assets/svg/shareIcon.svg";
import { formatDiscountAmount, formatListingPrice } from "../lib/listings";
import {
  panelClassName,
  primaryButtonClassName,
  sectionEyebrowClassName,
  statCardClassName,
} from "../lib/ui";

function Listing() {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareLinkCopied, setShareLinkCopied] = useState(null);

  const navigate = useNavigate();
  const params = useParams();
  const auth = getAuth();

  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, "listings", params.listingId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setListing(docSnap.data());
        setLoading(false);
      } else {
        navigate("/");
      }
    };

    fetchListing();
  }, [navigate, params.listingId]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <PageShell className="pt-4">
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.25fr)_380px]">
        <div className="space-y-6">
          <div className={`${panelClassName} relative overflow-hidden p-2`}>
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              slidesPerView={1}
              pagination={{ clickable: true }}
            >
              {listing.imageUrls.map((url, index) => (
                <SwiperSlide key={index}>
                  <img
                    key={index}
                    src={url}
                    alt="house"
                    className="h-[30rem] w-full rounded-[28px] object-cover sm:h-[38rem]"
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="absolute inset-x-6 bottom-6 z-10 flex flex-wrap gap-2">
              <span className="rounded-full bg-white/92 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-700">
                {listing.type === "rent" ? "Rental" : "For sale"}
              </span>
              <span className="rounded-full bg-white/92 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-700">
                {listing.location}
              </span>
            </div>

            <button
              type="button"
              className="absolute right-6 top-6 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setShareLinkCopied(true);
                setTimeout(() => {
                  setShareLinkCopied(false);
                }, 2000);
              }}
            >
              <img src={shareIcon} alt="share" className="h-5 w-5" />
            </button>

            {shareLinkCopied && (
              <p className="absolute right-6 top-20 z-10 rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-white">
                Link Copied
              </p>
            )}
          </div>

          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className={statCardClassName}>
              <p className={sectionEyebrowClassName}>Bedrooms</p>
              <p className="mt-3 text-2xl font-bold text-ink-950">{listing.bedrooms}</p>
            </div>
            <div className={statCardClassName}>
              <p className={sectionEyebrowClassName}>Bathrooms</p>
              <p className="mt-3 text-2xl font-bold text-ink-950">{listing.bathrooms}</p>
            </div>
            <div className={statCardClassName}>
              <p className={sectionEyebrowClassName}>Parking</p>
              <p className="mt-3 text-2xl font-bold text-ink-950">
                {listing.parking ? "Included" : "None"}
              </p>
            </div>
            <div className={statCardClassName}>
              <p className={sectionEyebrowClassName}>Furnishing</p>
              <p className="mt-3 text-2xl font-bold text-ink-950">
                {listing.furnished ? "Furnished" : "Unfurnished"}
              </p>
            </div>
          </section>

          <div className={`${panelClassName} overflow-hidden p-2`}>
            <div className="rounded-[26px] overflow-hidden">
              <MapContainer
                style={{ height: "360px", width: "100%" }}
                center={[listing.geolocation.lat, listing.geolocation.lng]}
                zoom={13}
                scrollWheelZoom={false}
              >
                <TileLayer
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png"
                />

                <Marker position={[listing.geolocation.lat, listing.geolocation.lng]}>
                  <Popup>{listing.location}</Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className={`${panelClassName} p-6 sm:p-8 xl:sticky xl:top-6`}>
            <p className={sectionEyebrowClassName}>
              {listing.location}
            </p>
            <h1 className="mt-3 font-display text-4xl leading-tight text-ink-950">
              {listing.name}
            </h1>
            <p className="mt-4 text-3xl font-bold text-brand-700">
              {formatListingPrice(listing)}
              {listing.type === "rent" && (
                <span className="text-base font-medium text-slate-500">
                  {formatListingPrice(listing) === "Price on request" ? "" : " / month"}
                </span>
              )}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <span className="rounded-full bg-brand-600 px-3 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white">
                For {listing.type === "rent" ? "Rent" : "Sale"}
              </span>
              {formatDiscountAmount(listing) && (
                <span className="rounded-full bg-slate-900 px-3 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white">
                  {formatDiscountAmount(listing)}
                </span>
              )}
            </div>

            <div className="mt-8 rounded-[28px] bg-sand-100/90 p-5">
              <p className={sectionEyebrowClassName}>Overview</p>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                This listing keeps the critical details above the fold: pricing, layout,
                location, and the direct inquiry path.
              </p>
              <div className="mt-5 flex flex-wrap gap-2 text-sm font-medium text-slate-600">
                <span className="rounded-full bg-white px-3 py-2">
                  {listing.bedrooms > 1 ? `${listing.bedrooms} Bedrooms` : "1 Bedroom"}
                </span>
                <span className="rounded-full bg-white px-3 py-2">
                  {listing.bathrooms > 1 ? `${listing.bathrooms} Bathrooms` : "1 Bathroom"}
                </span>
                {listing.parking && (
                  <span className="rounded-full bg-white px-3 py-2">Parking spot</span>
                )}
                {listing.furnished && (
                  <span className="rounded-full bg-white px-3 py-2">Furnished</span>
                )}
              </div>
            </div>

            {auth.currentUser?.uid !== listing.userRef && (
              <Link
                to={`/contact/${listing.userRef}?listingName=${listing.name}`}
                className={`${primaryButtonClassName} mt-8 w-full`}
              >
                Contact Landlord
              </Link>
            )}
          </div>

          <div className={`${panelClassName} p-6`}>
            <p className={sectionEyebrowClassName}>
              Location
            </p>
            <h2 className="mt-2 font-display text-3xl text-ink-950">Where it sits</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              {listing.location}
            </p>
          </div>
        </aside>
      </div>
    </PageShell>
  );
}

export default Listing;
