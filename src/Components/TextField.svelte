<script>
  export let name, label, value, autocapitalize = false, disabled = false
</script>

<label>
  {label}<br/>
  <input bind:value={value} {name} {disabled} {autocapitalize}/>
</label>
