<script>
  import {countries} from './Api/Geo'
  import Section from './Components/Section'
  import MaskedInput from './Components/MaskedInput'

  const user = {
    addresses: [
      {
        id: 123444,
        street: "1234 Main St",
        municipality: "Brooklyn",
        region: "NY",
        country: "US",
        postalCode: "11111"
      }
    ]
  }

  const shippingRates = [
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

  let isSubmitting = false
  let fields = {
    email: "",
    newsletter: false,
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

  $: shippingCountry = countries.find(country => country.code === fields.shippingAddress.country)

  function handleSubmit() {
    isSubmitting = true

    console.log(fields)

    setTimeout(() => isSubmitting = false, 3000)
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <h1>Checkout</h1>

  {#if !user}
  <Section title="Contact Information">
    <label>
      Email<br/>
      <input bind:value={fields.email} name="email" type="email" disabled={isSubmitting}/>
    </label>

    <label>
      <input bind:checked={fields.newsletter} name="newsletter" type="checkbox" disabled={isSubmitting}/>
      Send me emails about new deals
    </label>
  </Section>
  {/if}

  <Section title="Shipping Address">
    {#if user.addresses.length > 0}
      {#each user.addresses as address}
        <label>
          <input type=radio value={address.id} bind:group={fields.shippingAddressId}/> {address.street}<br/> {address.municipality}, {address.region}<br/> {address.country}, {address.postalCode}
        </label>
      {/each}
      <label>
        <input type=radio value={null} bind:group={fields.shippingAddressId}/> Different shipping address
      </label>
    {/if}

    {#if !fields.shippingAddressId}
    <label for="firstName">First</label>
    <input bind:value={fields.shippingAddress.firstName} name="firstName" autocapitalize disabled={isSubmitting}/>

    <label for="lastName">Last</label>
    <input bind:value={fields.shippingAddress.lastName} name="lastName" autocapitalize disabled={isSubmitting}/>

    <label for="street">Address</label>
    <input bind:value={fields.shippingAddress.street} name="street" disabled={isSubmitting}/>

    <label for="city">{shippingCountry.municipality}</label>
    <input bind:value={fields.shippingAddress.municipality} name="city" disabled={isSubmitting}/>

    <label for="region">{shippingCountry.region}</label>
    <select bind:value={fields.shippingAddress.region} name="region" disabled={isSubmitting}>
      <option>--- Choose ---</option>
      {#each shippingCountry.regions as region}
        <option value={region.code}>{region.name}</option>
      {/each}
    </select>

    <label for="country">Country</label>
    <select bind:value={fields.shippingAddress.country} name="country" disabled={isSubmitting}>
      {#each countries as country}
        <option value={country.code}>{country.name}</option>
      {/each}
    </select>

    <label for="zip">{shippingCountry.postalCode.label}</label>
    <MaskedInput bind:value={fields.shippingAddress.postalCode} name="zip" format={shippingCountry.postalCode.format} disabled={isSubmitting}/>

    {/if}
  </Section>

  <Section title="Shipping rate">
    {#each shippingRates as rate}
    <div>
      <h3>
        <label>
          <input type=radio name="shippingRate" value={rate.id} bind:group={fields.shippingRateId}/>
          {rate.carrier} {rate.method} ${rate.amount}
        </label>
      </h3>
      <small>Arrives in {rate.timeframe}</small>
    </div>
    {/each}
  </Section>

  <button disabled={isSubmitting}>
    {isSubmitting ? "Submitting..." : "Continue"}
  </button>
</form>

<pre>
  {JSON.stringify(fields, null, 2)}
</pre>
