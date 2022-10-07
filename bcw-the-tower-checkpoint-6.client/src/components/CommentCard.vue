<template>
  <div class="comment-card my-2 d-flex gap-2 bg-dark-lighten align-items-center" v-if="comment">
    <img :src="comment.creator.picture" :alt="comment.creator.name">
    <div class="comment-card-body p-2 bg-light text-dark w-100">
      <div class="comment-card-body-title d-flex gap-2 mb-2 align-items-center">
        <div class="d-flex justify-content-between align-items-center w-100">
          <h4>{{comment.creator.name}}</h4>
          <i class="mdi mdi-delete controls selectable mt-2 text-dark on-hover" title="Remove Comment" aria-label="Remove Comment" @click="removeComment()" v-if="comment.creatorId === account.id"></i>
        </div>
        <h6 v-if="comment.isAttending">Attending this event</h6>
      </div>
      <p>{{comment.body}}</p>
    </div>
  </div>
  <div v-else>
    <span>Loading...</span>
  </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState";
import { Comment } from "../models/Comment.js";
import { commentsService } from "../services/CommentsService";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";

export default {
  props: {
    comment: { type: Comment }
  },

  setup(props) {
    return {
      account: computed(() => AppState.account),
      async removeComment() {
        try {
          const yes = await Pop.confirm()
          if (!yes) {
            return
          }
          await commentsService.removeCommentById(props.comment.id)
        }
        catch(error) {
          logger.log('[removeComment]', error)
          Pop.error(error.message)
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .comment-card>img {
    height: 4.9375rem;
    width: 4.9375rem;
    border-radius: 50%;
  }

  h6 {
    color: blueviolet;
  }
</style>