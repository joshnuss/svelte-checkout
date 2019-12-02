<script>
  export let name, label, checked, disabled = false
</script>

<label>
  <input type="checkbox" bind:checked={checked} {name} {disabled}/>
  {label}
</label>
