import React from "react";
import { Link } from "react-router-dom";
import BootstrapIcon from "./BootstrapIcon";
import { formatListingPrice } from "../lib/listings";
import { panelClassName } from "../lib/ui";

function ListingItem({ listing, id, onEdit, onDelete }) {
  return (
    <li
      className={`${panelClassName} group relative overflow-hidden p-3 transition duration-200 hover:-translate-y-1`}
    >
      <Link
        to={`/category/${listing.type}/${id}`}
        className="grid gap-5 lg:grid-cols-[260px_minmax(0,1fr)]"
      >
        <div className="relative overflow-hidden rounded-[24px]">
          <img
            src={listing.imageUrls[0]}
            alt={listing.name}
            className="h-64 w-full object-cover transition duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/50 via-transparent to-transparent" />
          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
            <span className="rounded-full bg-white/92 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-700">
              {listing.location}
            </span>
            {listing.offer && (
              <span className="rounded-full bg-brand-500 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white">
                Offer live
              </span>
            )}
          </div>
          <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-3 rounded-full bg-white/90 px-3 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-700 backdrop-blur">
            <span>{listing.type === "rent" ? "For Rent" : "For Sale"}</span>
            <span>{listing.parking ? "Parking" : "No parking"}</span>
          </div>
        </div>

        <div className="flex min-w-0 flex-col justify-between gap-5 py-1 lg:pr-24">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-sand-100 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-600">
                {listing.type === "rent" ? "Rental" : "Sale"}
              </span>
              {listing.furnished && (
                <span className="rounded-full bg-brand-50 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-700">
                  Furnished
                </span>
              )}
            </div>
            <h3 className="mt-4 text-2xl font-bold text-ink-950 sm:text-[2rem]">{listing.name}</h3>
            <p className="mt-4 text-xl font-bold text-brand-700">
              {formatListingPrice(listing)}
              {listing.type === "rent" && (
                <span className="text-sm font-medium text-slate-500">
                  {formatListingPrice(listing) === "Price on request" ? "" : " / month"}
                </span>
              )}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 text-sm font-medium text-slate-600">
            <div className="flex items-center gap-2 rounded-full bg-sand-100 px-3 py-2">
              <BootstrapIcon name="door-open-fill" className="text-sm" />
              <span>
                {listing.bedrooms > 1 ? `${listing.bedrooms} Bedrooms` : "1 Bedroom"}
              </span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-sand-100 px-3 py-2">
              <BootstrapIcon name="droplet-fill" className="text-sm" />
              <span>
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} Bathrooms`
                  : "1 Bathroom"}
              </span>
            </div>
          </div>

          <p className="max-w-2xl text-sm leading-7 text-slate-600">
            Review the gallery, compare key home details, and move directly into inquiry when the
            fit looks right.
          </p>
        </div>
      </Link>

      {(onDelete || onEdit) && (
        <div className="absolute right-4 top-4 flex gap-2">
          {onEdit && (
            <button
              type="button"
              onClick={() => onEdit(id)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-md transition hover:bg-slate-900 hover:text-white"
              aria-label="Edit listing"
            >
              <BootstrapIcon name="pencil-fill" className="text-sm" />
            </button>
          )}

          {onDelete && (
            <button
              type="button"
              onClick={() => onDelete(listing.id, listing.name)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-red-500 shadow-md transition hover:bg-red-500 hover:text-white"
              aria-label="Delete listing"
            >
              <BootstrapIcon name="trash-fill" className="text-sm" />
            </button>
          )}
        </div>
      )}
    </li>
  );
}

export default ListingItem;
