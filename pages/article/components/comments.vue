<template>
  <div>
    <form class="card comment-form">
      <div class="card-block">
        <textarea
          class="form-control"
          placeholder="Write a comment..."
          rows="3"
        ></textarea>
      </div>
      <div class="card-footer">
        <img :src="user.image" class="comment-author-img" />
        <button class="btn btn-sm btn-primary">Post Comment</button>
      </div>
    </form>

    <div class="card" v-for="comment in comments" :key="comment.id">
      <div class="card-block">
        <p class="card-text">
          {{ comment.body }}
        </p>
      </div>
      <div class="card-footer">
        <nuxt-link
          :to="{
            name: 'profile',
            params: {
              username: comment.author ? comment.author.username : '',
            },
          }"
          class="comment-author"
        >
          <img
            :src="comment.author ? comment.author.image : ''"
            class="comment-author-img"
          />
        </nuxt-link>
        &nbsp;
        <nuxt-link
          :to="{
            name: 'profile',
            params: {
              username: comment.author ? comment.author.username : '',
            },
          }"
          class="comment-author"
          >{{ comment.author ? comment.author.username : "" }}</nuxt-link
        >
        <span class="date-posted">{{
          comment.creatAt | date("MMM DDD, YYYY")
        }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getComments } from "@/api/article";
export default {
  name: "ArticleComments",
  props: {
    slug: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      comments: [],
    };
  },
  async mounted() {
    const { comments } = await getComments(this.slug);
    this.comments = comments;
  },
  computed: {
    ...mapState(["user"]),
  },
};
</script>

<style>
</style>