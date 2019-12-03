<script>
  import { Router, Route } from 'svelte-routing'
  import { Shipping } from '@/pages/checkout'
</script>

<Router>
  <main>
    <Route path="checkout" component={Shipping}/>
  </main>
</Router>
