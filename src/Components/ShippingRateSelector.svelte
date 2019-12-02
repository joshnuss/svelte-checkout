<script>
  export let rates, value
</script>

{#each rates as rate}
  <div>
    <h3>
      <label>
        <input type=radio name="shippingRate" value={rate.id} bind:group={value}/>
        {rate.carrier} {rate.method} ${rate.amount}
      </label>
    </h3>
    <small>Arrives in {rate.timeframe}</small>
  </div>
{/each}
