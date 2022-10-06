<template>
  <section class="container-fluid">
    <section class="row">
      <div class="col-11">
        <section class="row">
          <div class="col-12 p-0 bg-dark">
            <Navbar />
          </div>
          <div class="col-12 bg-dark">
            <router-view />
          </div>
        </section>
      </div>
      <div class="col-1 pt-5 login-bar bg-dark">
        <Login />
      </div>
    </section>
  </section>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'
import Login from "./components/Login.vue"

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar, Login }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
.login-bar {
  background: linear-gradient(180deg, #474C61 0%, rgba(71, 76, 97, 0) 100%);
  min-height: 100vh;
}
</style>
