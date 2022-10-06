<template>
  <section class="bg-dark" v-if="towerEvent">
    <div class="event-details-card bg-dark-lighten d-flex flex-column flex-wrap">
      <div class="controls bg-dark-lighten w-100 d-flex align-items-center justify-content-end pe-4">
        <i class="mdi mdi-delete controls selectable mt-2" @click="cancelEvent()" v-if="account.id === towerEvent.creatorId"></i>
      </div>
      <div class="event-details-card-body d-flex align-items-center text-dark bg-dark-lighten px-4 pb-4 gap-3">
        <!-- TODO Figure out how to open a window to the background image -->
        <!-- <div class="window">
          
        </div> -->
        <img :src="towerEvent.coverImg" alt="name" height="200">
        <div class="event-details-content text-light w-100">
          <div class="d-flex justify-content-between my-4">
            <div class="d-flex flex-column">
              <span>{{towerEvent.name}}</span>
              <span>{{towerEvent.location}}</span>
            </div>
            <div class="d-flex flex-column">
              <span>{{towerEvent.formattedDate}}</span>
              <span>starting at {{towerEvent.formattedTime}}</span>
            </div>
          </div>
          <p class="my-4">{{towerEvent.description}}</p>
          <div class="d-flex justify-content-between align-items-center content-end">
            <div class="d-flex align-items-center gap-3">
              <span>{{towerEvent.capacity}} spots left</span>
              <span v-if="towerEvent.isCanceled" class="text-danger"><strong>CANCELLED</strong></span>
              <span v-if="towerEvent.capacity === 0" class="text-danger"><strong>SOLD OUT</strong></span>
            </div>
            <!-- TODO Figure out changing which button is displayed -->
            <div class="d-flex gap-2">
              <button @click="unattend()" class="btn btn-danger" v-if="myTicket">Unattend</button>
              <div v-else>
                <button @click="attend()" class="btn btn-warning" v-if="!towerEvent.isCanceled && towerEvent.capacity !== 0">Attend <i class="mdi mdi-star-face"></i></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section v-else>
    <span>Loading...</span>
  </section>
</template>

<script>
import { computed } from "@vue/reactivity";
import { TowerEvent } from "../models/TowerEvent.js";
import { AppState } from "../AppState";
import { accountService } from "../services/AccountService";
import { onMounted } from "vue";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { Account } from "../models/Account";
import { ticketsService } from "../services/TicketsService";
import { towerEventsService } from "../services/TowerEventsService";


export default {
  props: {
    towerEvent: { type: TowerEvent }
  },
  setup(props) {
    function isAttending() {
      AppState.tickets.forEach(ticket => {
        if (ticket.eventId === props.towerEvent.id && ticket.accountId === AppState.account.id) {
          AppState.isAttending = true
        }
      })
      AppState.isAttending = false
      AppState.myTicketForCurrentEvent = AppState.tickets.find(t => t.eventId === props.towerEvent.id && t.accountId === AppState.account.id)
    }

    onMounted(() => {
      isAttending()
    })
      return {
        tickets: computed(() => AppState.tickets),
        account: computed(() => AppState.account),
        activeEvent: computed(() => AppState.activeEvent),
        attendance: computed(() => AppState.isAttending),
        myTicket: computed(() => AppState.myTicketForCurrentEvent),
        isAttending,
        async unattend() {
          try {
            const ticket = AppState.tickets.find(t => t.eventId === props.towerEvent.id && t.accountId === this.account.id)
            if (!ticket) {
              throw new Error("You cannot unattend an event you do not have a ticket for.")
            }
            await ticketsService.unattendByTicketId(ticket.id)
            this.isAttending()
          }
          catch(error) {
            logger.log('[unattend]', error)
            Pop.error(error.message)
          }
        },
        async attend() {
          try {
            await ticketsService.addTicketByEventId(props.towerEvent.id)
            this.isAttending()
          }
          catch(error) {
            logger.log('[attend]', error)
            Pop.error(error.message)
          }
        },
        async cancelEvent() {
          try {
            const yes = await Pop.confirm()
            if (!yes) {
              return
            }
            await towerEventsService.cancelEvent(props.towerEvent.id)
          }
          catch(error) {
            logger.log('[cancelEvent]', error)
            Pop.error(error.message)
          }
        }
      };
  },
}
</script>

<style scoped lang="scss">
  p {
    margin: 0;
  }
  span {
    margin-bottom: 0.125rem;
  }
  .event-details-card {
    background-image: url("https://thiscatdoesnotexist.com");
    background-size: cover;
    background-position: center;
  }
</style>