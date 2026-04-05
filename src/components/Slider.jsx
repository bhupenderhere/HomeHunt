import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../firebase.config";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Spinner from "./Spinner";
import { formatListingPrice } from "../lib/listings";
import { panelClassName, sectionEyebrowClassName } from "../lib/ui";

function Slider() {
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchListings = async () => {
      const listingsRef = collection(db, "listings");
      const q = query(listingsRef, orderBy("timestamp", "desc"), limit(5));
      const querySnap = await getDocs(q);

      const list = [];

      querySnap.forEach((doc) => {
        return list.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      setListings(list);
      setLoading(false);
    };

    fetchListings();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (listings.length === 0) {
    return <></>;
  }

  return (
    listings && (
      <>
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <p className={sectionEyebrowClassName}>Recommended</p>
            <h2 className="mt-2 font-display text-3xl text-ink-950">Fresh picks this week</h2>
          </div>
          <p className="hidden text-sm text-slate-500 sm:block">
            A quick scan of the latest homes added to the market.
          </p>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          slidesPerView={1}
          // navigation
          pagination={{ clickable: true }}
        >
          {listings.map(({ data, id }) => (
            <SwiperSlide
              key={id}
              className="cursor-pointer"
              onClick={() => {
                navigate(`/category/${data.type}/${id}`);
              }}
            >
              <div className={`${panelClassName} relative flex h-full overflow-hidden p-2`}>
                <img
                  src={data.imageUrls[0]}
                  alt="house"
                  className="h-[28rem] w-full rounded-[28px] object-cover sm:h-[34rem]"
                />
                <div className="absolute inset-2 rounded-[28px] bg-gradient-to-t from-ink-950/85 via-ink-950/20 to-transparent" />
                <div className="absolute inset-x-7 top-7 flex flex-wrap gap-2">
                  <span className="rounded-full bg-white/92 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-700">
                    {data.location}
                  </span>
                  {data.offer && (
                    <span className="rounded-full bg-brand-500/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white">
                      Offer live
                    </span>
                  )}
                </div>
                <div className="absolute inset-x-7 bottom-7 flex flex-col gap-4">
                  <div className="max-w-xl">
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-200">
                      {data.type === "rent" ? "Rental" : "For Sale"}
                    </p>
                    <p className="mt-2 text-3xl font-bold text-white sm:text-4xl">
                      {data.name}
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div className="flex flex-wrap gap-2 text-sm font-medium text-white/90">
                      <span className="rounded-full bg-white/12 px-3 py-2 backdrop-blur">
                        {data.bedrooms} bed
                      </span>
                      <span className="rounded-full bg-white/12 px-3 py-2 backdrop-blur">
                        {data.bathrooms} bath
                      </span>
                      {data.furnished && (
                        <span className="rounded-full bg-white/12 px-3 py-2 backdrop-blur">
                          Furnished
                        </span>
                      )}
                    </div>

                    <p className="inline-flex w-fit rounded-full bg-white/92 px-4 py-2 text-sm font-bold text-slate-900">
                      {formatListingPrice(data)}
                      {data.type === "rent" &&
                        formatListingPrice(data) !== "Price on request" &&
                        " / month"}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    )
  );
}

export default Slider;
