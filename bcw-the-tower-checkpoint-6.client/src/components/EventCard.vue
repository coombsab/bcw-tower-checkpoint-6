<template>
  <div v-if="towerEvent">
    <router-link aria-label="Go to this event's detail page" title="Go to this event's detail page" :to="{ name: 'EventDetails', params: { eventId: towerEvent.id } }">
      <div class="event-card card bg-dark text-info elevation-2" :style="{backgroundImage: `url(${towerEvent.coverImg})`}">
        <div class="event-card-body p-2">
          <span class="name text-truncate">{{towerEvent.name}}</span>
          <span class="desc text-truncate">{{towerEvent.description}}</span>
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <span v-if="towerEvent.capacity < 1" class="text-danger"><strong>SOLD OUT</strong></span>
              <span v-if="towerEvent.isCanceled" class="text-danger"><strong>CANCELLED</strong></span>
            </div>
            <span class="capacity-text"><span class="capacity" :class="towerEvent.capacity > 0 ? 'text-primary' : 'text-danger'">{{towerEvent.capacity}}</span> left</span>
          </div>
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
    towerEvent: { type: [ TowerEvent, Object ] }
  },

  setup() {
    
    return {
      
    }
  }
}
</script>

<style scoped lang="scss">
  .event-card {
    border: 5px solid #474C61;
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
    background: rgba(0, 0, 0, 0.2);
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

  .capacity-text {
    align-self: flex-end;
  }

  .capacity {
    font-weight: 800;
  }
</style>