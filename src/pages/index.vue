<template>
  <Layout>
    <div class="flex flex-wrap">
      <div v-for="(tag, index) in tags" :key="index" class="tag" v-on:click="filterByTag(tag)">{{tag}}</div>
    </div>
    <div class="flex align-middle mb-8">
      <input
        class="w-full py-2 border-2 px-4"
        type="search"
        v-model="keyword"
        v-on:keyup.enter="internalSearch()"
        placeholder="Keyword"
      />
      <p class="text-center w-16 font-bold text-xl text-blue-400 mt-1">
        {{articles.length}}
      </p>
    </div>
    <div class="section">
      <ul class="article-list">
        <li v-for="(article, index) in articles" :key="index">
          <ArticleLinePreview :article="article"/>
        </li>
      </ul>
    </div>
  </Layout>
</template>

<page-query>
query Index {
  allContentfulBlogPost(sortBy: "publishDate", order:DESC) {
    totalCount
    edges {
      node {
        id
      	title
        slug
        heroImage {
          description
          file {
            fileName
            url
          }
        }
        description
        body
        publishDate
        tags
      }
    }
  }
}
</page-query>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { Article } from "@/models/article";
import ArticlePreview from "@/components/ArticlePreview.vue";
import ArticleLinePreview from "@/components/ArticleLinePreview.vue";

@Component({
  components: {
    ArticlePreview,
    ArticleLinePreview
  },
})
export default class Blog extends Vue {
  $page: any;
  originalArticles: Array<Article> = new Array<Article>();
  articles: Array<Article> = new Array<Article>();
  tags: Array<string> = [];
  keyword: string = "";

  constructor() {
    super();
  }

  mounted() {
    this.originalArticles = this.$page.allContentfulBlogPost.edges.map(e => e.node);
    this.articles = this.originalArticles;
    this.originalArticles.forEach(a => {
      this.tags = this.tags.concat(a.tags);
    })
    this.tags = this.tags.filter(function(elem, index, self) {
      return index === self.indexOf(elem);
    })

    this.keyword = "";
  }

  filterByTag(tag: string) {
    this.articles = this.originalArticles.filter(a => a.tags.includes(tag));
  }

  internalSearch() {
    this.articles = this.originalArticles.filter(a => a.body.includes(this.keyword));
  }
}
</script>

<style scoped>
.article-list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 4vmin;
}

.tag {
  align-items: center;
  font-size: .85rem;
  padding: .5rem .75rem;
  background: #ebf1fe;
  border-radius: 4px;
  margin-right: .5rem;
  margin-bottom: .5rem;
  font-weight: 600;
  color: #5183f5;
  cursor: pointer;
}
</style>
