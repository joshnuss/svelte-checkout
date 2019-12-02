<script>
  import {countries, findCountry} from '@/Api/Geo'
  import Section from '@/Components/Section'
  import TextField from '@/Components/TextField'
  import EmailField from '@/Components/EmailField'
  import CheckboxField from '@/Components/CheckboxField'
  import MaskedField from '@/Components/MaskedField'
  import SelectField from '@/Components/SelectField'

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
  $: regionOptions = [["", "--Choose--"]].concat(shippingCountry.regions.map(region => ([region.code, region.name])))
  $: countryOptions = countries.map(country => ([country.code, country.name]))

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
    <EmailField name="email" label="Email" bind:value={checkout.email} disabled={isSubmitting}/>

    <CheckboxField name="newsletter" label="Send me marketing emails" bind:checked={checkout.newsletter} disabled={isSubmitting}/>
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
      <SelectField name="region" label={shippingCountry.region} bind:value={checkout.shippingAddress.region} options={regionOptions} disabled={isSubmitting}/>
      <SelectField name="country" label="Country" bind:value={checkout.shippingAddress.country} options={countryOptions} disabled={isSubmitting}/>
      <MaskedField bind:value={checkout.shippingAddress.postalCode} name="zip" label={shippingCountry.postalCode.label} format={shippingCountry.postalCode.format} disabled={isSubmitting} />
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
