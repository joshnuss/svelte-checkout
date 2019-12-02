<script>
  export let format = "", name = "", value = "", disabled = false

  function handleKeydown(e) {
    const value = e.target.value

    if (!e.key || e.key.length > 1) {
      return
    }

    if (value.length >= format.length) {
      e.preventDefault()
      return
    }

    const index = value.length
    const keyFormat = format[index]

    if (keyFormat == "#" && e.key.match(/[0-9]/)) {
      return
    }

    if (keyFormat == "A" && e.key.match(/[a-zA-Z]/)) {
      return
    }

    e.preventDefault()
  }
</script>

<input {name} {disabled} bind:value on:keydown={handleKeydown} style="text-transform:uppercase">
