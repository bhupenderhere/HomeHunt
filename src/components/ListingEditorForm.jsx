import {
  inputClassName,
  labelClassName,
  panelClassName,
  primaryButtonClassName,
  sectionEyebrowClassName,
  statCardClassName,
  textareaClassName,
  toggleButtonClassName,
} from "../lib/ui"

function ListingEditorForm({
  formData,
  geolocationEnabled,
  imageRequired,
  imageLabel,
  imageDescription,
  galleryCount = 0,
  submitLabel,
  sidebarEyebrow,
  sidebarTitle,
  sidebarDescription,
  sidebarPoints,
  onMutate,
  onSubmit,
}) {
  const {
    type,
    name,
    bedrooms,
    bathrooms,
    parking,
    furnished,
    address,
    offer,
    regularPrice,
    discountedPrice,
    images,
    latitude,
    longitude,
  } = formData

  const imageCount = images?.length ?? 0

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
      <form className={`${panelClassName} space-y-8 p-6 sm:p-8`} onSubmit={onSubmit}>
        <section className="grid gap-4 md:grid-cols-3">
          <div className={statCardClassName}>
            <p className={sectionEyebrowClassName}>Listing type</p>
            <p className="mt-3 text-2xl font-bold text-ink-950">
              {type === "rent" ? "Rental" : "Sale"}
            </p>
          </div>
          <div className={statCardClassName}>
            <p className={sectionEyebrowClassName}>Media</p>
            <p className="mt-3 text-2xl font-bold text-ink-950">
              {imageCount > 0
                ? `${imageCount} selected`
                : galleryCount > 0
                  ? `${galleryCount} live`
                  : "No files yet"}
            </p>
          </div>
          <div className={statCardClassName}>
            <p className={sectionEyebrowClassName}>Pricing mode</p>
            <p className="mt-3 text-2xl font-bold text-ink-950">
              {offer ? "Offer live" : "Standard"}
            </p>
          </div>
        </section>

        <section className="space-y-5">
          <div>
            <p className={sectionEyebrowClassName}>Property basics</p>
            <h2 className="mt-2 font-display text-3xl text-ink-950">Set the core identity</h2>
          </div>

          <div>
            <label className={labelClassName}>Sell / Rent</label>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <button
                type="button"
                className={toggleButtonClassName(type === "sale")}
                id="type"
                value="sale"
                onClick={onMutate}
              >
                Sell
              </button>
              <button
                type="button"
                className={toggleButtonClassName(type === "rent")}
                id="type"
                value="rent"
                onClick={onMutate}
              >
                Rent
              </button>
            </div>
          </div>

          <div>
            <label className={labelClassName} htmlFor="name">
              Listing Name
            </label>
            <input
              type="text"
              className={inputClassName}
              id="name"
              value={name}
              onChange={onMutate}
              maxLength="32"
              minLength="10"
              required
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className={labelClassName} htmlFor="bedrooms">
                Bedrooms
              </label>
              <input
                type="number"
                className={`${inputClassName} text-center`}
                id="bedrooms"
                value={bedrooms}
                onChange={onMutate}
                min="1"
                max="50"
                required
              />
            </div>
            <div>
              <label className={labelClassName} htmlFor="bathrooms">
                Bathrooms
              </label>
              <input
                type="number"
                className={`${inputClassName} text-center`}
                id="bathrooms"
                value={bathrooms}
                onChange={onMutate}
                min="1"
                max="50"
                required
              />
            </div>
          </div>
        </section>

        <div className="section-divider" />

        <section className="space-y-5">
          <div>
            <p className={sectionEyebrowClassName}>Amenities and location</p>
            <h2 className="mt-2 font-display text-3xl text-ink-950">Shape the visitability</h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className={labelClassName}>Parking Spot</label>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <button
                  className={toggleButtonClassName(parking)}
                  type="button"
                  id="parking"
                  value={true}
                  onClick={onMutate}
                >
                  Yes
                </button>
                <button
                  className={toggleButtonClassName(!parking && parking !== null)}
                  type="button"
                  id="parking"
                  value={false}
                  onClick={onMutate}
                >
                  No
                </button>
              </div>
            </div>

            <div>
              <label className={labelClassName}>Furnished</label>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <button
                  className={toggleButtonClassName(furnished)}
                  type="button"
                  id="furnished"
                  value={true}
                  onClick={onMutate}
                >
                  Yes
                </button>
                <button
                  className={toggleButtonClassName(!furnished)}
                  type="button"
                  id="furnished"
                  value={false}
                  onClick={onMutate}
                >
                  No
                </button>
              </div>
            </div>
          </div>

          <div>
            <label className={labelClassName} htmlFor="address">
              Address
            </label>
            <textarea
              className={textareaClassName}
              type="text"
              id="address"
              value={address}
              onChange={onMutate}
              required
            />
          </div>

          {!geolocationEnabled && (
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className={labelClassName} htmlFor="latitude">
                  Latitude
                </label>
                <input
                  className={`${inputClassName} text-center`}
                  type="number"
                  id="latitude"
                  value={latitude}
                  onChange={onMutate}
                  required
                />
              </div>
              <div>
                <label className={labelClassName} htmlFor="longitude">
                  Longitude
                </label>
                <input
                  className={`${inputClassName} text-center`}
                  type="number"
                  id="longitude"
                  value={longitude}
                  onChange={onMutate}
                  required
                />
              </div>
            </div>
          )}
        </section>

        <div className="section-divider" />

        <section className="space-y-5">
          <div>
            <p className={sectionEyebrowClassName}>Pricing and gallery</p>
            <h2 className="mt-2 font-display text-3xl text-ink-950">Control the first impression</h2>
          </div>

          <div>
            <label className={labelClassName}>Offer</label>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <button
                className={toggleButtonClassName(offer)}
                type="button"
                id="offer"
                value={true}
                onClick={onMutate}
              >
                Yes
              </button>
              <button
                className={toggleButtonClassName(!offer)}
                type="button"
                id="offer"
                value={false}
                onClick={onMutate}
              >
                No
              </button>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className={labelClassName} htmlFor="regularPrice">
                Regular Price
              </label>
              <div className="relative">
                <input
                  type="number"
                  className={`${inputClassName} pr-24`}
                  id="regularPrice"
                  value={regularPrice}
                  onChange={onMutate}
                  min="50"
                  max="750000000"
                  required
                />
                {type === "rent" && (
                  <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-sm font-semibold text-slate-500">
                    / month
                  </span>
                )}
              </div>
            </div>

            {offer && (
              <div>
                <label className={labelClassName} htmlFor="discountedPrice">
                  Discounted Price
                </label>
                <input
                  type="number"
                  className={inputClassName}
                  id="discountedPrice"
                  value={discountedPrice}
                  onChange={onMutate}
                  min="50"
                  max="750000000"
                  required={offer}
                />
              </div>
            )}
          </div>

          <div className="rounded-[28px] bg-sand-100/85 p-5">
            <label className={labelClassName} htmlFor="images">
              {imageLabel}
            </label>
            <p className="mb-4 text-sm leading-7 text-slate-600">{imageDescription}</p>
            <input
              type="file"
              className={`${inputClassName} cursor-pointer p-0 file:mr-4 file:rounded-full file:border-0 file:bg-brand-600 file:px-4 file:py-3 file:text-sm file:font-semibold file:text-white hover:file:bg-brand-700`}
              id="images"
              onChange={onMutate}
              max="6"
              accept=".jpg,.png,.jpeg"
              multiple
              required={imageRequired}
            />
          </div>
        </section>

        <button
          type="submit"
          className={`${primaryButtonClassName} w-full justify-center py-4 text-base`}
        >
          {submitLabel}
        </button>
      </form>

      <aside className="space-y-4 xl:sticky xl:top-6 xl:h-fit">
        <div className={`${panelClassName} p-6`}>
          <p className={sectionEyebrowClassName}>{sidebarEyebrow}</p>
          <h2 className="mt-2 font-display text-3xl text-ink-950">{sidebarTitle}</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">{sidebarDescription}</p>
        </div>

        <div className={`${panelClassName} p-6`}>
          <p className={sectionEyebrowClassName}>Notes</p>
          <div className="mt-5 space-y-4">
            {sidebarPoints.map((point) => (
              <div key={point} className="rounded-[24px] bg-sand-100/80 p-4">
                <p className="text-sm leading-7 text-slate-600">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  )
}

export default ListingEditorForm
