<template>
  <div class="event-details">
    <EventDetails :towerEvent="towerEvent" />
    <p class="text-info">See who is attending</p>
    <AttendeeCard />

    <p class="mx-10 text-info">What people are saying</p>
    <div class="comments-card bg-dark-lighten d-flex flex-column mx-10">
      <div class="align-self-end pe-5 text-success" v-if="user.isAuthenticated">
        <p>Join the conversation</p>
      </div>
      <CreateComment v-if="user.isAuthenticated" />
      <div class="comments-container px-5 scrollable" :class="!user.isAuthenticated ? 'mt-3' : ''">
        <CommentCard v-for="c of comments" :key="c.id" :comment="c" />
      </div>
    </div>
  </div>

</template>

<script>
import EventDetails from "../components/EventDetails.vue";
import CommentCard from "../components/CommentCard.vue";
import CreateComment from "../components/CreateComment.vue";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { onMounted } from "vue";
import { towerEventsService } from "../services/TowerEventsService.js";
import { useRoute } from "vue-router";
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState.js";
import AttendeeCard from "../components/AttendeeCard.vue";
import { ticketsService } from "../services/TicketsService";
export default {
    setup() {
      const route = useRoute()
      async function getEventById() {
        try {
          // console.log("params", route.params.eventId)
          await towerEventsService.getEventById(route.params.eventId)
        }
        catch(error) {
          logger.log('error', error)
          Pop.error(error.message)
        }
      }

      async function getCommentsByEventId() {
        try {
          await towerEventsService.getCommentsByEventId(route.params.eventId)
        }
        catch(error) {
          logger.log('error', error)
          Pop.error(error.message)
        }
      }
      onMounted(() => {
        getEventById()
        getCommentsByEventId()
      })
        return {
          towerEvent: computed(() => AppState.activeEvent),
          comments: computed(() => AppState.comments.sort().reverse()),
          user: computed(() => AppState.user)
        };
    },
    components: { EventDetails, CommentCard, CreateComment, AttendeeCard }
}
</script>

<style scoped lang="scss">
  p {
    margin-bottom: 0;
    margin-top: 1rem;
  }
  .window {
    height: 20rem;
    width: 20rem;
    min-height: 20rem;
    min-width: 20rem;
    background-color: rgba(0, 0, 0, 0);
  }

  .bg-transparent {
    background: rgba(36, 109, 142, 0.6);
    border: 1px solid rgba(204, 243, 253, 0.2);
    backdrop-filter: blur(15px);
    /* Note: backdrop-filter has minimal browser support */

    border-radius: 3px;
  }


  .mx-10 {
    margin-left: 10rem;
    margin-right: 10rem;
  }

  .comments-container {
    min-height: 40.1vh;
  }
</style>