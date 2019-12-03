import {user} from './auth'
import {countries} from './geography'

export function create() {
  const shippingRates = getShippingRates()
  const checkout = {
    shippingRates,
    shippingRateId: shippingRates[0].id,
    shippingAddressId: user ? user.addresses[0].id : null,
    shippingAddress: {
      firstName: "",
      lastName: "",
      street: "",
      municipality: "",
      region: "",
      country: countries[0].code,
      postalCode: ""
    }
  }

  if (!user) {
    checkout.user = {
      email: "",
      newsletter: false,
    }
  }

  return checkout
}

export function getShippingRates() {
  return [
    {
      id: 1212,
      carrier: "FedEx",
      method: "Overnight",
      amount: 59,
      timeframe: "1-2 days"
    },
    {
      id: 13939,
      carrier: "USPS",
      method: "SuperSaver",
      amount: 5.99,
      timeframe: "2-3 weeks"
    }
  ]
}
