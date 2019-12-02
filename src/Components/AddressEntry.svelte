<script>
  import {countries, findCountry} from '@/Api/Geo'
  import {TextField, SelectField, MaskedField} from './Fields'

  export let address, disabled;

  $: country = findCountry(address.country)
  $: regionOptions = [["", "--Choose--"]].concat(country.regions.map(region => ([region.code, region.name])))
  $: countryOptions = countries.map(country => ([country.code, country.name]))
</script>

<TextField name="firstName" label="First" bind:value={address.firstName} autocapitalize {disabled}/>
<TextField name="lastName" label="Last" bind:value={address.lastName} autocapitalize {disabled}/>
<TextField name="street" label="Address" bind:value={address.street} {disabled}/>
<TextField name="city" label={country.municipality} bind:value={address.municipality} {disabled}/>
<SelectField name="region" label={country.region} bind:value={address.region} options={regionOptions} {disabled}/>
<SelectField name="country" label="Country" bind:value={address.country} options={countryOptions} {disabled}/>
<MaskedField bind:value={address.postalCode} name="zip" label={country.postalCode.label} format={country.postalCode.format} {disabled}/>
