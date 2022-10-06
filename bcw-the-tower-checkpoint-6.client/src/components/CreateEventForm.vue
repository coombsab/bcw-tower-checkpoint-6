<template>
  <!-- TODO make into floating labels -->
  <form @submit.prevent="handleSubmit()">
    <div class="d-flex flex-column">
      <input type="text" placeholder="Event Name" v-model="editable.name" maxlength="50" required>
      <input type="text" placeholder="Event Description" v-model="editable.description" maxlength="1000" required>
      <input type="text" placeholder="Event Location" v-model="editable.location" maxlength="50" required>
      <input type="url" placeholder="Event Cover Image" v-model="editable.coverImg" maxlength="500" required>
      <input type="number" placeholder="Event Capacity" v-model="editable.capacity" min="0" max="9999999" required>
    </div>
    <div class="d-flex justify-content-between">
      <input type="datetime-local" :min="todayFormatted" v-model="editable.startDate" required>
      <select name="type" id="type" v-model="editable.type">
        <option value="concert">Concert</option>
        <option value="convention">Convention</option>
        <option value="sport">Sport</option>
        <option value="digital">Digital</option>
        <option value="auction">Auction</option>
      </select>
    </div>
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    <button type="submit" class="btn btn-primary">Create Event</button>
  </form>
</template>

<script>
import { computed } from "@vue/reactivity";
import { Modal } from "bootstrap";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { AppState } from "../AppState";
import { towerEventsService } from "../services/TowerEventsService";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";

export default {
  setup() {
    const router = useRouter()
    const editable = ref({})
    function getTodayInLocal() {
        const today = new Date()
        let dd = today.getDate()
        let mm = today.getMonth() + 1
        let yyyy = today.getFullYear()
        let hh = today.getHours()
        let m = today.getMinutes()

        if (dd < 10) {
          dd = '0' + dd
        }
        if (mm < 10) {
          mm = '0' + mm
        }
        if (hh < 10) {
          hh = '0' + hh
        }
        if (m < 10) {
          m = '0' + m
        }
        let todayFormatted = yyyy + '-' + mm + '-' + dd + 'T' + hh + ':' + m
        editable.startDate = todayFormatted
        AppState.todayFormatted = todayFormatted
      }
      getTodayInLocal()
    return {
      editable,
      router,
      todayFormatted: computed(() => AppState.todayFormatted),
      async handleSubmit() {
        try {
          const towerEvent = await towerEventsService.addEvent(editable.value)
          Modal.getOrCreateInstance(document.getElementById('addEventModal')).hide()
          router.push({ name: "EventDetails", params: { eventId: towerEvent.id }})
        }
        catch(error) {
          logger.log('[handleSubmit]', error)
          Pop.error(error.message)
        }
      },
      
    }
  }
}
</script>

<style scoped lang="scss">
  input {
    margin-bottom: 0.5rem;
  }
</style>