<template>
  <div class="text-info" v-if="tickets.length > 0">
    <h1>My Events</h1>
    <div class="d-flex flex-wrap justify-content-around">
      <EventCard class="my-2" v-for="t in tickets" :key="t.eventId" :towerEvent="t.event" />
    </div>
    <h1>Upcoming events</h1>
    <div class="d-flex flex-column align-items-center">
      <TicketCard class="my-2" v-for="t in tickets" :key="t.id" :towerEvent="t.event" />
    </div>
  </div>
  <div v-else>
    <span>You do not currently have tickets for any events</span>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { accountService } from "../services/AccountService"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import EventCard from "../components/EventCard.vue"
import TicketCard from "../components/TicketCard.vue"
export default {
    setup() {
        async function getMyEvents() {
            try {
                await accountService.getTicketsByAccountId();
            }
            catch (error) {
                logger.log(error, "[getMyEvents]");
                Pop.error(error.message);
            }
        }
        onMounted(() => {
            getMyEvents();
        });
        return {
            account: computed(() => AppState.account),
            tickets: computed(() => AppState.tickets)
        };
    },
    components: { EventCard, TicketCard }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
