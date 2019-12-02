<script>
  import Field from './Field'

  export let name, label, value, autocapitalize = false, disabled = false
</script>

<Field {label}>
  <input bind:value={value} {name} {disabled} {autocapitalize}/>
</Field>
