<template>
  <section class="bg-dark elevation-2" v-if="towerEvent">
    <div class="event-details-card bg-dark-lighten d-flex flex-column flex-wrap rounded" :style="{ backgroundImage: `url(${towerEvent.coverImg})` }">
      <div class="event-details-card-body d-flex align-items-center bg-dark-lighten px-4 pb-4 gap-3 rounded">
        <!-- TODO Figure out how to open a window to the background image -->
        <!-- <div class="window"></div> -->
        <img :src="towerEvent.coverImg" :alt="towerEvent.name" height="200" class="mt-4 rounded">
        <div class="event-details-content text-info w-100">
          <div class="controls w-100 d-flex align-items-center justify-content-end">
            <i class="mdi mdi-delete controls selectable mt-2 text-info" title="Cancel Event" aria-label="Cancel Event" @click="cancelEvent()" v-if="account.id === towerEvent.creatorId && !towerEvent.isCanceled"></i>
          </div>
          <div class="d-flex justify-content-between my-4">
            <div class="d-flex flex-column">
              <span><strong>{{towerEvent.name}}</strong></span>
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
              <span><span class="capacity" :class="towerEvent.capacity > 0 ? 'text-primary' : 'text-danger'">{{towerEvent.capacity}}</span> spots left</span>
              <span v-if="towerEvent.isCanceled" class="text-danger"><strong>CANCELLED</strong></span>
              <span v-if="towerEvent.capacity === 0" class="text-danger"><strong>SOLD OUT</strong></span>
            </div>
            <!-- TODO Figure out changing which button is displayed -->
            <div class="d-flex gap-2" v-if="user.isAuthenticated">
              <button aria-label="Unattend Event" @click="unattend()" class="btn btn-danger elevation-3" v-if="myTicket">Unattend</button>
              <div v-else>
                <div v-if="!towerEvent.isCanceled">
                  <button aria-label="Attend Event" @click="attend()" class="btn btn-warning elevation-3" v-if="towerEvent.capacity > 0">Attend <i class="mdi mdi-human"></i></button>
                </div>
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

  <!-- TODO Experimenting with masking and clipping to do a similar effect to the figma -->
  <!-- <svg width="600" height="400">
    <mask id="svgmask1">
      <polygon fill="#ffffff" points="200 0, 400 400, 0 400"></polygon>
    </mask>
    <image xmlns:xlink="http://www.w3.org/1999/xlink" v-bind:xlink:href="towerEvent.coverImg" mask="url(#svgmask1)" class="mask-img"></image>
  </svg>
  <img :src="towerEvent.coverImg" alt="" class="window"> -->
</template>

<script>
import { computed } from "@vue/reactivity";
import { TowerEvent } from "../models/TowerEvent.js";
import { AppState } from "../AppState";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { ticketsService } from "../services/TicketsService";
import { towerEventsService } from "../services/TowerEventsService";


export default {
  props: {
    towerEvent: { type: TowerEvent }
  },
  setup(props) {
      return {
        tickets: computed(() => AppState.tickets),
        account: computed(() => AppState.account),
        user: computed(() => AppState.user),
        // activeEvent: computed(() => AppState.activeEvent),
        myTicket: computed(() => AppState.tickets.find(t => t.eventId === props.towerEvent.id && t.accountId === AppState.account.id)),
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
        },
        async attend() {
          try {
            await ticketsService.addTicketByEventId(props.towerEvent.id)
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
    // background-image: url("https://thiscatdoesnotexist.com");
    background-size: cover;
    background-position: center;
  }

  .event-details-card-body {
    backdrop-filter: blur(15px);
    background-color: rgba(0, 0, 0, 0.5);
  }

  .window {
    clip-path: circle(200px at center);
    height: 20rem;
    width: 30rem;
  }
  .mask-img {
    height: 20rem;
    width: 30rem;
  }

  .capacity {
    font-weight: 800;
  }
</style>