<script>
  import {countries} from '@/api/geography'
  import {user} from '@/api/auth'
  import {getShippingRates} from '@/api/checkout'
  import Section from '@/components/Section'
  import CustomerEntry from '@/components/CustomerEntry'
  import AddressEntry from '@/components/AddressEntry'
  import AddressSelector from '@/components/AddressSelector'
  import ShippingRateSelector from '@/components/ShippingRateSelector'

  const shippingRates = getShippingRates()

  let isSubmitting = false
  let checkout = {
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
      <CustomerEntry bind:user={checkout.user} {disabled}/>
    </Section>
  {/if}

  <Section title="Shipping Address">
    {#if user && user.addresses.length > 0}
      <AddressSelector addresses={user.addresses} bind:addressId={checkout.shippingAddressId} newLabel="New shipping address" {disabled}/>
    {/if}

    {#if !checkout.shippingAddressId}
      <AddressEntry bind:address={checkout.shippingAddress} {disabled}/>
    {/if}
  </Section>

  <Section title="Shipping rate">
    <ShippingRateSelector bind:value={checkout.shippingRateId} rates={shippingRates} {disabled}/>
  </Section>

  <button {disabled}>
    {isSubmitting ? "Submitting..." : "Continue"}
  </button>
</form>

  <pre>
    {JSON.stringify(checkout, null, 2)}
  </pre>
