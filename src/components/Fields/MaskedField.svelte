<script>
  import Field from './Field'
  import MaskedInput from '@/components/MaskedInput'

  export let name, label, value, format, disabled = false
</script>

<Field {label}>
  <MaskedInput bind:value={value} {name} {format} {disabled}/>
</Field>
