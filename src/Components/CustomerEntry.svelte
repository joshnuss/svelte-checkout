<script>
  import {EmailField, CheckboxField} from '@/Components/Fields'

  export let user, disabled = false
</script>

<EmailField name="email" label="Email" bind:value={user.email} {disabled}/>
<CheckboxField name="newsletter" label="Send me marketing emails" bind:checked={user.newsletter} {disabled}/>
