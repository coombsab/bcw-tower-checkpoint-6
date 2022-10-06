<template>
  <div class="attendee-card d-flex flex-wrap gap-2 p-2 bg-dark-lighten rounded" v-if="tickets">
    <img v-for="t in tickets" :src="t.profile?.picture" :alt="t.profile?.name" :title="t.profile?.title">
  </div>
  <div v-else>
    Loading...
  </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { AppState } from "../AppState.js";
import { towerEventsService } from "../services/TowerEventsService.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";

export default {
  setup() {
    const route = useRoute()
    async function getTicketsForEvent() {
      try {
        await towerEventsService.getTicketsForEvent(route.params.eventId)
      }
      catch(error) {
        logger.log('error', error)
        Pop.error(error.message)
      }
    }
    onMounted(() => {
      getTicketsForEvent()
    })
    return {
      tickets: computed(() => AppState.tickets)
    }
  }
}
</script>

<style scoped lang="scss">
  .attendee-card>img {
    height: 2.8125rem;
    width: 2.8125rem;
    border-radius: 50%;
  }
</style>