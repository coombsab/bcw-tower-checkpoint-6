<template>
  <div class="ticket-card d-flex gap-3 bg-dark-lighten p-3 rounded" v-if="towerEvent">
    <img :src="towerEvent.coverImg" :alt="towerEvent.name" :title="towerEvent.name">
    <div class="d-flex flex-column">
      <div class="d-flex flex-column h-100">
        <span>{{towerEvent.name}}</span>
        <span>{{towerEvent.location}}</span>
        <span>{{new Date(towerEvent.startDate).toDateString() + " @ " + new Date(towerEvent.startDate).toLocaleTimeString()}}</span>
      </div>
      <button class="btn btn-danger px-5">not going</button>
    </div>
  </div>
  <div v-else>
    <span>Loading...</span>
  </div>
</template>

<script>
import { Ticket } from "../models/Ticket.js";
import { TowerEvent } from "../models/TowerEvent.js";

  export default {
    props: {
      towerEvent: { type: [TowerEvent, Object] }
    },
    setup() {
      return {
        async unattend() {
          try {
          
          }
          catch(error) {
            logger.log('[unattend]', error)
            Pop.error(error.message)
          }
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .ticket-card>img {
    height: 15.875rem;
  }

  span {
    margin-bottom: 0.125rem;
  }

  button {
    align-self: flex-end;
    justify-self: flex-end;
  }

  .h-100 {
    height: 100%;
  }
</style>