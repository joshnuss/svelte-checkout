<script>
  export let addresses = [], addressId, newLabel
</script>

{#each addresses as address}
  <label>
    <input type=radio value={address.id} bind:group={addressId}/> {address.street}<br/> {address.municipality}, {address.region}<br/> {address.country}, {address.postalCode}
  </label>
{/each}
<label>
  <input type=radio value={null} bind:group={addressId}/> {newLabel}
</label>
