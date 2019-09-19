<template>
  <div class="section">
    <ul class="article-list">
      <li v-for="(edge, index) in $page.allContentfulBlogPost.edges" :key="index">
        <ArticlePreview :article="edge.node"/>
      </li>
    </ul>
  </div>
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
      }
    }
  }
}
</page-query>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { Article } from "../models/article";
import ArticlePreview from "../components/ArticlePreview.vue";

@Component({
  components: {
    ArticlePreview
  },
  // metaInfo() {
  //   return {
  //     title: 'Blog',
  //     meta: [
  //       { hid: "description", name: "description", content: "We weekly introduce 10 awesome books based on our data mining engine." },
  //     ]
  //   }
  // }
})
export default class Blog extends Vue {
  articles: Array<Article> = new Array<Article>();
}
</script>

<style scoped>
.container {
  max-width: 1200px !important;
}

.fa-icon {
  margin-left: 0.25em;
  margin-right: 0.25em;
}
.simpleicon svg {
  height: 1.5em;
  width: 1.5em;
}
.nav-logo {
  margin-right: 1em;
}

body {
  margin: 0;
}

p {
  margin-bottom: 1rem;
}
.section {
  padding: 1.5rem;
}
main .section {
  padding: 0rem 1.5rem;
}
main .section:first-child {
  padding: 2rem 1.5rem;
}
main .section:last-child {
  padding: 0rem 1.5rem 2rem 1.5rem;
}

.footer {
  border-top: 1px solid #ddd;
  padding-bottom: 3rem;
}

.article-list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 4vmin;
}

.list-inline {
  margin: 0;
  padding: 0;
  list-style: none;
}

.list-inline li {
  display: inline-block;
}
</style>
