const asNumber = (value) => {
  const numericValue = Number(value)

  return Number.isFinite(numericValue) ? numericValue : null
}

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
