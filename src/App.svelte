<script>
  import {countries, findCountry} from '@/Api/Geo'
  import Section from '@/Components/Section'
  import {EmailField, CheckboxField} from '@/Components/Fields'
  import ShippingRateSelector from '@/Components/ShippingRateSelector'
  import AddressEntry from '@/Components/AddressEntry'
  import AddressSelector from '@/Components/AddressSelector'

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

  $: disabled = isSubmitting

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
      <AddressSelector addresses={user.addresses} bind:addressId={checkout.shippingAddressId} newLabel="Different shipping address"/>
    {/if}

    {#if !checkout.shippingAddressId}
      <AddressEntry bind:address={checkout.shippingAddress} {disabled}/>
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
