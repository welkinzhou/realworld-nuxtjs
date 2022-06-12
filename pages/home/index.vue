<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item" v-if="user">
                <nuxt-link
                  class="nav-link"
                  :class="{
                    active: tab === 'your_feed',
                  }"
                  exact
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'your_feed',
                    },
                  }"
                  >Your Feed</nuxt-link
                >
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{
                    active: tab === 'global_feed',
                  }"
                  exact
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'global_feed',
                    },
                  }"
                  >Global Feed</nuxt-link
                >
              </li>
              <li class="nav-item" v-if="tag">
                <nuxt-link
                  class="nav-link active"
                  :class="{
                    active: tab === 'tag',
                  }"
                  exact
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'tag',
                      tag: tag,
                    },
                  }"
                  >#{{ tag }}</nuxt-link
                >
              </li>
            </ul>
          </div>
          <!-- 文章预览区域 -->
          <div
            class="article-preview"
            v-for="article in articles"
            :key="article.slug"
          >
            <div class="article-meta">
              <nuxt-link
                :to="{
                  name: 'profile',
                  params: { username: article.author.username },
                }"
                ><img :src="article.author.image"
              /></nuxt-link>
              <div class="info">
                <nuxt-link
                  :to="{
                    name: 'profile',
                    params: { username: article.author.username },
                  }"
                  class="author"
                  >{{ article.author.username }}</nuxt-link
                >
                <span class="date">{{
                  article.creatAt | date("MMM DD, YYYY")
                }}</span>
              </div>
              <button
                class="btn btn-outline-primary btn-sm pull-xs-right"
                :class="{ active: article.favorited }"
                :disabled="article.favoriteDisabled"
                @click="onFavorite(article)"
              >
                <i class="ion-heart"></i> {{ article.favoritesCount }}
              </button>
            </div>
            <nuxt-link
              :to="{
                name: 'article',
                params: {
                  slug: article.slug,
                },
              }"
              class="preview-link"
            >
              <h1>{{ article.title }}</h1>
              <p>{{ article.description }}</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>

          <!-- 分页 -->
          <nav>
            <ul class="pagination">
              <!-- ngRepeat: pageNumber in $ctrl.pageRange($ctrl.totalPages) -->
              <li
                class="page-item active"
                v-for="item in totalPages"
                :key="item"
                :class="{ active: item === page }"
              >
                <nuxt-link
                  class="page-link"
                  :to="{
                    name: 'home',
                    query: {
                      page: item,
                      tag: $route.query.tag,
                      tab: tab,
                    },
                  }"
                  >{{ item }}</nuxt-link
                >
              </li>
              <!-- end ngRepeat: pageNumber in $ctrl.pageRange($ctrl.totalPages) -->
            </ul>
          </nav>
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>
            <!-- 标签列表 -->
            <div class="tag-list">
              <nuxt-link
                v-for="item in tags"
                :key="item"
                :to="{
                  name: 'home',
                  query: {
                    tab: 'tag',
                    tag: item,
                  },
                }"
                class="tag-pill tag-default"
                >{{ item }}</nuxt-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import {
  getArticles,
  getFeedArticles,
  addFavorite,
  delFavorite,
} from "@/api/article";
import { getTags } from "@/api/tag.js";

export default {
  name: "Home",
  // 同构渲染获取数据
  async asyncData({ query, store }) {
    const pageSize = 10;
    const page = Number.parseInt(query.page || 1); // 获取路由page参数
    const { tag } = query;

    // const data = await getArticles({
    //   limit: pageSize,
    //   offset: (page - 1) * pageSize,
    // });

    // const { tags } = await getTags();
    const tab = query.tab || "global_feed";
    const articlesMethod =
      store.state.user && tab === "your_feed" ? getFeedArticles : getArticles;

    const [{ articles, articlesCount }, { tags }] = await Promise.all([
      articlesMethod({
        limit: pageSize,
        offset: (page - 1) * pageSize,
        tag,
      }),
      getTags(),
    ]);
    articles.forEach((el) => (el.favoriteDisabled = false));
    return {
      articles,
      articlesCount,
      pageSize,
      page,
      tags,
      tag,
      tab,
    };
  },
  methods: {
    async onFavorite(article) {
      const { favorited, slug, favoriteDisabled } = article;
      favoriteDisabled = true;
      if (favorited) {
        await delFavorite(slug);
        article.favorited = false;
        article.favoritesCount -= 1;
      } else {
        await addFavorite(slug);
        article.favorited = true;
        article.favoritesCount += 1;
      }
      favoriteDisabled = false;
    },
  },
  // 默认情况下，query 改变不会触发 asyncData 方法，需要添加 watchQuery
  watchQuery: ["page", "tag", "tab"],
  computed: {
    ...mapState(["user"]),
    totalPages() {
      return Math.ceil(this.articlesCount / this.pageSize);
    },
  },
};
</script>

<style>
</style>