<script>
  import {countries, findCountry} from '@/Api/Geo'
  import Section from '@/Components/Section'
  import MaskedInput from '@/Components/MaskedInput'
  import TextField from '@/Components/TextField'

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
  let checkout = {
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

  $: shippingCountry = findCountry(checkout.shippingAddress.country)

  function handleSubmit() {
    isSubmitting = true

    console.log(checkout)

    setTimeout(() => isSubmitting = false, 3000)
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <h1>Checkout</h1>

  {#if !user}
  <Section title="Contact Information">
    <label>
      Email<br/>
      <input bind:value={checkout.email} name="email" type="email" disabled={isSubmitting}/>
    </label>

    <label>
      <input bind:checked={checkout.newsletter} name="newsletter" type="checkbox" disabled={isSubmitting}/>
      Send me emails about new deals
    </label>
  </Section>
  {/if}

  <Section title="Shipping Address">
    {#if user && user.addresses.length > 0}
      {#each user.addresses as address}
        <label>
          <input type=radio value={address.id} bind:group={checkout.shippingAddressId}/> {address.street}<br/> {address.municipality}, {address.region}<br/> {address.country}, {address.postalCode}
        </label>
      {/each}
      <label>
        <input type=radio value={null} bind:group={checkout.shippingAddressId}/> Different shipping address
      </label>
    {/if}

    {#if !checkout.shippingAddressId}

    <TextField name="firstName" label="First" bind:value={checkout.shippingAddress.firstName} autocapitalize disabled={isSubmitting}/>
    <TextField name="lastName" label="Last" bind:value={checkout.shippingAddress.lastName} autocapitalize disabled={isSubmitting}/>
    <TextField name="street" label="Address" bind:value={checkout.shippingAddress.street} disabled={isSubmitting}/>
    <TextField name="city" label={shippingCountry.municipality} bind:value={checkout.shippingAddress.municipality} disabled={isSubmitting}/>

    <label for="region">{shippingCountry.region}</label>
    <select bind:value={checkout.shippingAddress.region} name="region" disabled={isSubmitting}>
      <option>--- Choose ---</option>
      {#each shippingCountry.regions as region}
        <option value={region.code}>{region.name}</option>
      {/each}
    </select>

    <label for="country">Country</label>
    <select bind:value={checkout.shippingAddress.country} name="country" disabled={isSubmitting}>
      {#each countries as country}
        <option value={country.code}>{country.name}</option>
      {/each}
    </select>

    <label for="zip">{shippingCountry.postalCode.label}</label>
    <MaskedInput bind:value={checkout.shippingAddress.postalCode} name="zip" format={shippingCountry.postalCode.format} disabled={isSubmitting}/>

    {/if}
  </Section>

  <Section title="Shipping rate">
    {#each shippingRates as rate}
    <div>
      <h3>
        <label>
          <input type=radio name="shippingRate" value={rate.id} bind:group={checkout.shippingRateId}/>
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
  {JSON.stringify(checkout, null, 2)}
</pre>
