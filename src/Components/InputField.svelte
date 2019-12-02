<script>
  export let name, label, value, type="text", autocapitalize = false, disabled = false
</script>

<label>
  {label}<br/>
  {#if type == "email"}
    <input bind:value={value} {name} type="email" {disabled} {autocapitalize}/>
  {:else}
    <input bind:value={value} {name} {disabled} {autocapitalize}/>
  {/if}
</label>
