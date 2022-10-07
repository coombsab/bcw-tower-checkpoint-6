<template>
  <!-- TODO make into floating labels -->
  <form @submit.prevent="handleSubmit()">
    <div class="d-flex flex-column">
      <div class="form-floating mb-3 text-dark">
        <input type="text" class="form-control" id="floatingName" placeholder="Event Name" v-model="editable.name" maxlength="50" required>
        <label for="floatingName">Event Name</label>
      </div>
      <div class="form-floating mb-3 text-dark">
        <input type="text" class="form-control" id="floatingDescription" placeholder="Event Description" v-model="editable.description" maxlength="1000" required>
        <label for="floatingDescription">Event Description</label>
      </div>
      <div class="form-floating mb-3 text-dark">
        <input type="text" class="form-control" id="floatingLocation" placeholder="Event Location" v-model="editable.location" maxlength="50" required>
        <label for="floatingLocation">Event Location</label>
      </div>
      <div class="form-floating mb-3 text-dark">
        <input type="url" class="form-control" id="floatingImage" placeholder="Event Cover Image" v-model="editable.coverImg" maxlength="500" required>
        <label for="floatingImage">Event Cover Image</label>
      </div>
      <div class="form-floating mb-3 text-dark">
        <input type="number" class="form-control" id="floatingCapacity" placeholder="Event Capacity" v-model="editable.capacity" min="0" max="9999999" required>
        <label for="floatingCapacity">Event Capacity</label>
      </div>
    </div>
    <div class="d-flex gap-3">
      <input type="datetime-local" class="form-control" id="floatingDateTime" aria-label="Select a start time" :min="todayFormatted" v-model="editable.startDate" required>
      <div class="form-floating text-dark w-100">
        <select name="type" class="form-select" id="floatingSelect" aria-label="Floating Select with Label" v-model="editable.type" required>
          <option value="concert">Concert</option>
          <option value="convention">Convention</option>
          <option value="sport">Sport</option>
          <option value="digital">Digital</option>
          <option value="auction">Auction</option>
        </select>
        <label for="floatingSelect">Select a Type</label>
      </div>
    </div>
    <div class="d-flex justify-content-between mt-3 align-items-center">
      <button type="button" class="btn btn-dark" data-bs-dismiss="modal" aria-label="Close Modal">Close</button>
      <button type="submit" class="btn btn-dark" aria-label="Create Event">Create Event</button>
    </div>
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
      activeEvent: computed(() => AppState.activeEvent),
      async handleSubmit() {
        try {
          await towerEventsService.addEvent(editable.value)
          Modal.getOrCreateInstance(document.getElementById('addEventModal')).hide()
          editable.value = {}
          router.push({ name: "EventDetails", params: { eventId: this.activeEvent.id }})
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

</style>