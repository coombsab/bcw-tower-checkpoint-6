<template>
  <span class="d-flex flex-column align-items-center mb-3">
    <button class="btn selectable btn-success my-2 my-lg-0" @click="login" aria-label="Login" v-if="!user.isAuthenticated">
      Login
    </button>

    <div class="mb-3" v-if="account.picture || user.picture">
      <router-link :to="{ name: 'Account' }">
        <img :src="account.picture || user.picture" alt="account photo" class="rounded photo" aria-label="Go to account page" title="Go to account page" />
      </router-link>
    </div>
    <div v-else>
      <span class="text-light mb-3">{{ account.name || user.name }}</span>
    </div>

    <ul class="navbar-nav text-center">
      <li>
        <router-link :to="{ name: 'Home' }" class="btn text-info selectable" aria-label="Go to Home page">
          home
        </router-link>
      </li>
    </ul>
    <button class="btn btn-success mb-3" data-bs-toggle="modal" data-bs-target="#addEventModal" aria-label="Add new event">New Event</button>
    <button class="btn btn-dark bg-dark-lighten" @click="logout" v-if="user.isAuthenticated" aria-label="Logout">logout</button>
  </span>

  <!-- Modal -->
  <div class="modal fade" id="addEventModal" tabindex="-1" aria-labelledby="addEventModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content bg-dark-lighten">
        <div class="modal-header">
          <h1 class="modal-title fs-5 text-info" id="addEventModalLabel">Add New Event</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" title="Close"></button>
        </div>
        <div class="modal-body">
          <CreateEventForm />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import { AuthService } from '../services/AuthService'
import CreateEventForm from './CreateEventForm.vue'

export default {
    setup() {
        return {
            user: computed(() => AppState.user),
            account: computed(() => AppState.account),
            async login() {
                AuthService.loginWithPopup();
            },
            async logout() {
                AuthService.logout({ returnTo: window.location.origin });
            }
        };
    },
    components: { CreateEventForm }
}
</script>

<style lang="scss" scoped>
.dropdown-menu {
  user-select: none;
  display: block;
  transform: scale(0);
  transition: all 0.15s linear;
}

.dropdown-menu.show {
  transform: scale(1);
}

.hoverable {
  cursor: pointer;
}

li {
  margin-bottom: 0.5rem;
}

.logout:hover {
  cursor: pointer;
}

.photo {
  height: 5.25rem;
  width: 5.25rem;
  border: 1px solid #56C7FB;
}
</style>
