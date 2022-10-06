<template>
  <div v-if="towerEvent">
    <router-link :to="{ name: 'EventDetails', params: { eventId: towerEvent.id } }">
      <div class="event-card card bg-dark text-visible" :style="{backgroundImage: `url(${towerEvent.coverImg})`}">
        <div class="event-card-body p-2">
          <span class="name text-truncate text-white">{{towerEvent.name}}</span>
          <span class="desc text-truncate text-white">{{towerEvent.description}}</span>
          <span class="capacity text-white">{{towerEvent.capacity}} left</span>
        </div>
      </div>
    </router-link>
  </div>
  <div v-else>
    <span>Loading...</span>
  </div>
</template>

<script>
import { TowerEvent } from "../models/TowerEvent.js"

export default {
  props: {
    towerEvent: { type: TowerEvent, required: true }
  },

  setup() {
    
    return {
      
    }
  }
}
</script>

<style scoped lang="scss">
  .event-card {
    border: 1px solid #56C7FB;
    // box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 3px;
    width: 18.5rem;
    height: 16.3125rem;
    background-size: cover;
    background-position: center;
    display: flex;
    justify-content: flex-end;
  }

  .event-card-body {
    height: 6.0625rem;
    backdrop-filter: blur(10px);
    background: rgba(204, 243, 253, 0.2);
    border: 1px solid rgba(86, 199, 251, 0.2);
    border-radius: 3px;
    display: flex;
    flex-direction: column;
    font-family: 'Nunito', sans-serif;
    overflow-y: hidden;
  }

  .name {
    font-weight: 700;
    font-size: 1.125rem;
  }

  .capacity {
    align-self: flex-end;
  }
</style>