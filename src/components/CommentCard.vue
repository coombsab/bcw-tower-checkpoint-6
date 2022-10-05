<template>
  <div class="comment-card my-2 d-flex gap-2 bg-dark-lighten align-items-center" v-if="comment">
    <img :src="comment.creator.picture" :alt="comment.creator.name">
    <div class="comment-card-body p-2 bg-light text-dark w-100">
      <div class="comment-card-body-title d-flex gap-2 mb-2 align-items-center">
        <h4>{{comment.creator.name}}</h4>
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
import { Comment } from "../models/Comment.js";

export default {
  props: {
    comment: { type: Comment }
  },

  setup() {
    
    return {
      
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