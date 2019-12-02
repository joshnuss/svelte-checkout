<script>
  import Field from './Field'

  export let name, label, value, disabled = false
</script>

<Field {label}>
  <input type="email" bind:value={value} {name} {disabled}/>
</Field>
