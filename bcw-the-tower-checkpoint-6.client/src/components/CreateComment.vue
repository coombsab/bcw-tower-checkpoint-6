<template>
  <form @submit.prevent="handleSubmit()" class="d-flex flex-column px-5">
    <textarea name="commentBody" id="commentBody" class="form-control" cols="30" rows="5" v-model="editable" aria-label="Input a comment" placeholder="Tell the people..."></textarea>
    <button type="submit" aria-label="Post Comment" class="align-self-end my-2 btn btn-success">post comment</button>
  </form>
</template>

<script>
import { computed } from "@vue/reactivity";
import { ref } from "vue";
import { AppState } from "../AppState.js";
import { commentsService } from "../services/CommentsService.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";

export default {
  setup() {
    const editable = ref("")
    return {
      editable,
      towerEvent: computed(() => AppState.activeEvent),
      async handleSubmit() {
        try {
          const commentData = {
            eventId: this.towerEvent.id,
            body: editable.value
          }
          await commentsService.addComment(commentData)
          editable.value = ""
        }
        catch(error) {
          logger.log('error', error)
          Pop.error(error.message)
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
  
</style>