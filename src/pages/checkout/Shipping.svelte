<script>
  import {navigate} from 'svelte-routing'
  import {user} from '@/api/auth'
  import {create as createCheckout} from '@/api/checkout'
  import Section from '@/components/Section'
  import CustomerEntry from '@/components/CustomerEntry'
  import AddressEntry from '@/components/AddressEntry'
  import AddressSelector from '@/components/AddressSelector'
  import ShippingRateSelector from '@/components/ShippingRateSelector'

  const checkout = createCheckout()
  let isSubmitting = false

  $: disabled = isSubmitting

  function handleSubmit() {
    isSubmitting = true

    console.log(checkout)

    setTimeout(() => {
      isSubmitting = false
      navigate("/checkout/payment")
    }, 3000)
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
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
    <ShippingRateSelector bind:value={checkout.shippingRateId} rates={checkout.shippingRates} {disabled}/>
  </Section>

  <button {disabled}>
    {isSubmitting ? "Submitting..." : "Continue"}
  </button>
</form>

  <pre>
    {JSON.stringify(checkout, null, 2)}
  </pre>
