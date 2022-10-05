<template>
  <section class="bg-dark" v-if="towerEvent">
    <div class="event-details-card bg-dark-lighten d-flex flex-column flex-wrap">
      <div class="controls bg-dark-lighten w-100 d-flex align-items-center justify-content-end pe-4">
        <i class="mdi mdi-delete controls selectable mt-2"></i>
      </div>
      <div class="event-details-card-body d-flex justify-content-between align-items-center text-dark bg-dark-lighten px-4 pb-4 gap-3">
        <!-- TODO Figure out how to open a window to the background image -->
        <!-- <div class="window">
          
        </div> -->
        <img :src="towerEvent.coverImg" alt="name" height="200">
        <div class="event-details-content text-light">
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
            <span>{{towerEvent.capacity}} spots left</span>
            <button class="btn btn-warning">Attend <i class="mdi mdi-star-face"></i></button>
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
import { TowerEvent } from "../models/TowerEvent.js";

export default {
  props: {
    towerEvent: { type: TowerEvent }
  },
  setup() {
      return {};
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