<script>
  import {navigate} from 'svelte-routing'

  let isSubmitting = false

  $: disabled = isSubmitting

  function handleSubmit() {
    isSubmitting = true

    setTimeout(() => {
      isSubmitting = false
      navigate("/checkout/confirm")
    }, 3000)
  }
</script>
<form on:submit|preventDefault={handleSubmit}>
  <h2>Confirmation</h2>

  <button {disabled}>
    {isSubmitting ? "Processing..." : "Complete Purchase"}
  </button>
</form>
