<template>
  <div class="ticket-card d-flex gap-3 bg-dark-lighten p-3 rounded text-info elevation-2" v-if="towerEvent">
    <router-link aria-label="Go to Event Details page" :to="{ name: 'EventDetails', params: { eventId: towerEvent.id } }">
      <img :src="towerEvent.coverImg" :alt="towerEvent.name" :title="towerEvent.name">
    </router-link>
    <div class="d-flex flex-column">
      <div class="d-flex flex-column h-100">
        <span>{{towerEvent.name}}</span>
        <span>{{towerEvent.location}}</span>
        <span>{{new Date(towerEvent.startDate).toDateString() + " @ " + new Date(towerEvent.startDate).toLocaleTimeString()}}</span>
      </div>
      <button class="btn btn-danger px-5" aria-label="Unattend event" @click="unattend()">not going</button>
    </div>
  </div>
  <div v-else>
    <span>Loading...</span>
  </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState";
import { Ticket } from "../models/Ticket.js";
import { TowerEvent } from "../models/TowerEvent.js";
import { ticketsService } from "../services/TicketsService";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";

  export default {
    props: {
      towerEvent: { type: [TowerEvent, Object] }
    },
    setup(props) {
      return {
        account: computed(() => AppState.account),
        async unattend() {
          try {
            const ticket = AppState.tickets.find(t => t.eventId === props.towerEvent.id && t.accountId === this.account.id)
            if (!ticket) {
              throw new Error("You cannot unattend an event you do not have a ticket for.")
            }
            await ticketsService.unattendByTicketId(ticket.id)
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
  img {
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