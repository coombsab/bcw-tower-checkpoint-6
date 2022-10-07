<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-3">
    <router-link class="navbar-brand d-flex" aria-label="Go to Home page" title="Go to Home page" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center">
        <!-- Tower -->
        <img src="../assets/img/Logo.png" alt="logo" class="logo">
      </div>
    </router-link>
    
    
    
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <!-- <ul class="navbar-nav me-auto">
        <li>
          <router-link :to="{ name: 'Event Details' }" class="btn text-success lighten-30 selectable text-uppercase">
            Event Details
          </router-link>
        </li>
      </ul> -->
      <!-- LOGIN COMPONENT HERE -->
      <!-- <Login /> -->
    </div>
  </nav>
</template>

<script>
import Login from './Login.vue'
export default {
  setup() {
    return {}
  },
  components: { Login }
}
</script>

<style scoped>
a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.logo {
  height: 3.0625rem;
  width: 14.375rem;
}
</style>
