<template>
  <section class="row">
    <div class="col-12 p-3 hero-col">
      <div class="hero mx-3 p-5 fs-4 elevation-2">
      </div>
      <div class="hero-content text-info p-3 rounded">
        <p>Get ahead of the scalpers.</p>
        <p>Reserve your seats now with</p>
        <p>real events for real people.</p>
      </div>

    </div>
    <div class="col-12 p-3 bg-dark">
      <div class="d-flex justify-content-around align-items-center mx-3 bg-dark-lighten rounded elevation-2 filter-bar">
        <button @click="getEventsByType('')" class="btn text-light" aria-label="Filter All Events" title="Filter All Events">All</button>
        <button @click="getEventsByType('concert')" class="btn text-light" aria-label="Filter Concert Events" title="Filter Concert Events">Concert</button>
        <button @click="getEventsByType('convention')" class="btn text-light" aria-label="Filter Convention Events" title="Filter Convention Events">Convention</button>
        <button @click="getEventsByType('sport')" class="btn text-light" aria-label="Filter Sport Events" title="Filter Sport Events">Sport</button>
        <button @click="getEventsByType('digital')" class="btn text-light" aria-label="Filter Digital Events" title="Filter Digital Events">Digital</button>
        <button @click="getEventsByType('auction')" class="btn text-light" aria-label="Filter Auction Events" title="Filter Auction Events">Auction</button>
      </div>
    </div>
    <section class="row scrollable" v-if="towerEvents.length > 0">
      <div class="col-md-3 p-5" v-for="e in towerEvents" :key="e.id">
        <EventCard :towerEvent="e" />
      </div>
    </section>
    <section class="row" v-else>
      <div class="col-12 text-center pt-5">
        <span>No events found.</span>
      </div>
    </section>
  </section>
</template>

<script>
import { onMounted } from "vue";
import { logger } from "../utils/Logger.js";
import { towerEventsService } from "../services/TowerEventsService.js";
import Pop from "../utils/Pop.js";
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState.js";
import EventCard from "../components/EventCard.vue";

export default {
  setup() {
    async function getEvents() {
      try {
        await towerEventsService.getEvents();
      }
      catch (error) {
        logger.log("[getEvents]", error);
        Pop.error(error.message);
      }
    }
    onMounted(() => {
        getEvents();
    });
    return {
      towerEvents: computed(() => AppState.events),
      async getEventsByType(type) {
        try {
          await towerEventsService.getEvents(type);
        }
        catch (error) {
            logger.log("[getEventsByType]", error);
            Pop.error(error.message);
        }
      }
    };
  },
  components: { EventCard }
}
</script>

<style scoped lang="scss">
// TODO figure out blur for picture while not blurring text
.hero {
  background-image: url("https://images.unsplash.com/photo-1519750157634-b6d493a0f77c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-clip: initial;
  border: 1px solid #56C7FB;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
  filter: blur(2.5px);
  height: 15rem;
}

.hero-col {
  position: relative;
}
.hero-content {
  position: absolute;
  // backdrop-filter: blur(10px);
  background-color: black;
  background-color: rgba(0, 0, 0, 0);
  // height: 100%;
  // width: 100%;
  left: 3%;
  top: 13%;
  font-size: 1.5rem;
  font-family: 'Alegreya Sans', sans-serif;
  letter-spacing: 0.05rem;
}

// TODO maybe a more efficient (and dynamic) way to take up the remaining screen height?
.scrollable {
  height: 62.9vh;
  overflow-y: auto;
}

.filter-bar {
  font-family: 'Alegreya Sans', sans-serif;
}
</style>
