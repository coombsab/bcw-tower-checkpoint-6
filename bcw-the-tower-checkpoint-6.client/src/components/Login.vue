<template>
  <span class="d-flex flex-column align-items-center mb-3">
    <button class="btn selectable text-light text-uppercase my-2 my-lg-0" @click="login" v-if="!user.isAuthenticated">
      Login
    </button>

    <div class="mb-3" v-if="account.picture || user.picture">
      <router-link :to="{ name: 'Account' }">
        <img :src="account.picture || user.picture" alt="account photo" height="40" class="rounded"/>
      </router-link>
    </div>
    <div v-else>
      <span class="text-light mb-3">{{ account.name || user.name }}</span>
    </div>

    <ul class="navbar-nav text-center">
      <li>
        <router-link :to="{ name: 'Home' }" class="btn text-light selectable text-uppercase">
          Home
        </router-link>
      </li>
    </ul>

    <button class="btn text-light mb-3" data-bs-toggle="modal" data-bs-target="#exampleModal">New Event</button>

    <div class="text-danger logout" @click="logout" v-if="user.isAuthenticated">
      <i class="mdi mdi-logout"></i>
      <span>logout</span>
    </div>
  </span>

  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5 text-dark" id="exampleModalLabel">Add New Event</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body text-dark">
          <CreateEventForm />
        </div>
      </div>
    </div>
  </div>


    <!-- <div class="dropdown my-2 my-lg-0" v-else>
      <div class="dropdown-toggle selectable" data-bs-toggle="dropdown" aria-expanded="false" id="authDropdown">
      </div>
      <div class="dropdown-menu p-0 list-group w-100" aria-labelledby="authDropdown">
        <router-link :to="{ name: 'Account' }">
          <div class="list-group-item list-group-item-action hoverable">
            Manage Account
          </div>
        </router-link>
        <div class="list-group-item list-group-item-action hoverable text-danger" @click="logout">
          <i class="mdi mdi-logout"></i>
          logout
        </div>
      </div>
    </div> -->
 
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
</style>
