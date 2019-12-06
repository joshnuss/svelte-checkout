<script>
  import { Router, Route } from 'svelte-routing'
  import { Confirmation, Shipping, Payment } from '@/pages/checkout'
</script>

<Router>
  <main>
    <h1>Checkout</h1>

    <Route path="checkout/payment" component={Payment}/>
    <Route path="checkout/confirm" component={Confirmation}/>
    <Route path="checkout" component={Shipping}/>
  </main>
</Router>
