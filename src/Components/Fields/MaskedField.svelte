<script>
  import Field from './Field'
  import MaskedInput from '@/Components/MaskedInput'

  export let name, label, value, format, disabled = false
</script>

<Field {label}>
  <MaskedInput bind:value={value} {name} {format} {disabled}/>
</Field>
