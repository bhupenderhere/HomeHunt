const asNumber = (value) => {
  const numericValue = Number(value)

  return Number.isFinite(numericValue) ? numericValue : null
}

const asTimestampMillis = (value) => {
  if (!value) {
    return 0
  }

  if (typeof value.toMillis === "function") {
    return value.toMillis()
  }

  if (typeof value.seconds === "number") {
    const nanoseconds = typeof value.nanoseconds === "number" ? value.nanoseconds : 0

    return value.seconds * 1000 + Math.floor(nanoseconds / 1e6)
  }

  if (value instanceof Date) {
    return value.getTime()
  }

  if (typeof value === "number") {
    return Number.isFinite(value) ? value : 0
  }

  if (typeof value === "string") {
    const parsedValue = Date.parse(value)

    return Number.isFinite(parsedValue) ? parsedValue : 0
  }

  return 0
}

export const mapListingDocs = (querySnap) =>
  querySnap.docs.map((doc) => ({
    id: doc.id,
    data: doc.data(),
  }))

export const getListingTimestampMillis = (listing) =>
  asTimestampMillis(listing?.data?.timestamp ?? listing?.timestamp)

export const sortListingsByNewest = (listings) =>
  [...listings].sort((left, right) => getListingTimestampMillis(right) - getListingTimestampMillis(left))

export const getDisplayPrice = (listing) => {
  const discountedPrice = asNumber(listing?.discountedPrice)
  const regularPrice = asNumber(listing?.regularPrice)

  if (listing?.offer && discountedPrice !== null) {
    return discountedPrice
  }

  return regularPrice
}

export const formatListingPrice = (listing) => {
  const displayPrice = getDisplayPrice(listing)

  if (displayPrice === null) {
    return "Price on request"
  }

  return `₹ ${displayPrice.toLocaleString("en-IN")}`
}

export const formatDiscountAmount = (listing) => {
  const discountedPrice = asNumber(listing?.discountedPrice)
  const regularPrice = asNumber(listing?.regularPrice)

  if (discountedPrice === null || regularPrice === null || discountedPrice >= regularPrice) {
    return null
  }

  return `₹ ${(regularPrice - discountedPrice).toLocaleString("en-IN")} off`
}
