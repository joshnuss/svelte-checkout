<script>
  import {countries, findCountry} from '@/Api/Geo'
  import Section from '@/Components/Section'
  import TextField from '@/Components/TextField'
  import EmailField from '@/Components/EmailField'
  import CheckboxField from '@/Components/CheckboxField'
  import MaskedField from '@/Components/MaskedField'
  import SelectField from '@/Components/SelectField'
  import ShippingRateSelector from '@/Components/ShippingRateSelector'

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
  $: disabled = isSubmitting
  $: shippingAddress = checkout.shippingAddress

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
    <EmailField name="email" label="Email" bind:value={checkout.email} {disabled}/>
    <CheckboxField name="newsletter" label="Send me marketing emails" bind:checked={checkout.newsletter} {disabled}/>
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
      <TextField name="firstName" label="First" bind:value={shippingAddress.firstName} autocapitalize {disabled}/>
      <TextField name="lastName" label="Last" bind:value={shippingAddress.lastName} autocapitalize {disabled}/>
      <TextField name="street" label="Address" bind:value={shippingAddress.street} {disabled}/>
      <TextField name="city" label={shippingCountry.municipality} bind:value={shippingAddress.municipality} {disabled}/>
      <SelectField name="region" label={shippingCountry.region} bind:value={shippingAddress.region} options={regionOptions} {disabled}/>
      <SelectField name="country" label="Country" bind:value={shippingAddress.country} options={countryOptions} {disabled}/>
      <MaskedField bind:value={shippingAddress.postalCode} name="zip" label={shippingCountry.postalCode.label} format={shippingCountry.postalCode.format} {disabled}/>
    {/if}
  </Section>

  <Section title="Shipping rate">
    <ShippingRateSelector bind:value={checkout.shippingRateId} rates={shippingRates}/>
  </Section>

  <button {disabled}>
    {isSubmitting ? "Submitting..." : "Continue"}
  </button>
</form>

<pre>
  {JSON.stringify(checkout, null, 2)}
</pre>
