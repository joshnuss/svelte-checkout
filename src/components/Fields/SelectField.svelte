<script>
  import Field from './Field'

  export let name, label, value, options=[], disabled = false
</script>

<Field {label}>
  <select bind:value={value} {name} {disabled}>
    {#each options as option}
      <option value={option.length ? option[0] : option}>{option.length ? option[1] : option}</option>
    {/each}
  </select>
</Field>
