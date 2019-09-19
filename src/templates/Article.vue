<template>
  <article class="primary">
    <div class="hero" v-if="article.title != ''">
      <div class="heroImage">
        <Fluid class="topImage" :alt="article.title" :src="article.heroImage.file.url" />
        <!-- <img
          :alt="alt"
          :src="article.heroImage.fields.file.url"
          style="width: 100%; height: 300px; object-fit: cover; object-position: center center; opacity: 1; transition: opacity 0.5s ease 0s;"
        >-->
      </div>
    </div>
    <div class="social right">
      <a
        target="_blank"
        class="facebook-share-button"
        :href="`https://www.facebook.com/sharer/sharer.php?${facebookUrl}`"
        aria-label >
        <img src="@/assets/facebook.svg" class="social-icon" />
      </a>
      <a
        target="_blank"
        class="twitter-share-button"
        :href="'https://twitter.com/intent/tweet?' + twitterContent + '&' + twitterHashtag + '&' + twitterUrl"
        aria-label >
        <img src="@/assets/twitter.svg" class="social-icon" />
      </a>
    </div>
    <div class="section">
      <div class="article">
        <h1>{{article.title}}</h1>
        <p style="display: block">{{convertToDate(article.publishDate)}}</p>
      </div>
      <hr />

      <div v-if="markdown.length != 0" v-html="markdown" />
    </div>
  </article>
</template>

<page-query>
query Index($id: ID!) {
  contentfulBlogPost (id: $id){
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
</page-query>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { Article } from "../models/article";
import { Route } from "vue-router";
import Fluid from "../components/Fluid.vue";
import marked from "marked";
import { DateHelper } from "../utility/dateHelper";
import { Constant } from "../utility/constant";

@Component({
  components: {
    Fluid
  }
  // metaInfo() {
  //   return {
  //     title: `${this.article.title} Best Books`,
  //     meta: [
  //       { hid: "description", name: "description", content: `Best books of ${this.article.title}` },
  //       { hid: 'og-title', property: 'og:title', content: this.article.title },
  //       { hid: 'og-type', property: 'og:type', content: "book-top-10" },
  //       { hid: 'og-url', property: 'og:url', content: `${Constant.SiteURL}/blog/${this.articleSlug}` },
  //       { hid: 'og-image', property: 'og:image', content: `${this.article.heroImage.url}` },
  //       { property: 'og:image:width', content: "0" },
  //       { property: 'og:image:height', content: "0" }
  //     ]
  //   };
  // }
})
export default class BlogArticle extends Vue {
  article: Article = new Article();
  articleSlug: string = "";
  markdown: string = "";
  sitePrefix = `${Constant.SiteURL}/blog/`;
  facebookUrl: string = "";
  twitterContent = "";
  twitterUrl = "";
  twitterHashtag = "";
  $page: any;

  constructor() {
    super();
  }

  created() {
  }

  mounted() {
    this.article = this.$page.contentfulBlogPost;
    this.markdown = marked(this.$page.contentfulBlogPost.body);
    this.articleSlug = this.$page.contentfulBlogPost.slug;
    this.facebookUrl = `u=${this.sitePrefix}${this.articleSlug}`;
    this.twitterUrl = `url=${this.sitePrefix}${this.articleSlug}`;
    this.twitterHashtag = `hashtags=${Constant.SocialMediaHashtag}`;
    this.twitterContent = `text=Check out the top 10 picks of ${this.article.title} at Top Trend Books!`;
  }

  convertToDate(strDate: string) {
    return DateHelper.convertToDate(strDate);
  }
}
</script>

<style scoped>
@import "../css/blog.css";

article .social {
  display: inline-block;
  margin-top: 2rem;
  margin-right: 3rem;
}
article .social.mobile {
  margin-top: 2rem;
  margin-right: 1rem;
}

article .social-icon {
  width: 40px;
}

article .facebook-share-button {
  margin-right: 10px;
}

article {
  text-align: left;
  padding-bottom: 20px;
}
article ul {
  list-style: disc inside;
  margin-bottom: 1rem;
}
article ul li {
  margin-bottom: 1rem;
  text-align: left;
}
article ul li a {
  margin-bottom: 1rem;
}
article ol li {
  margin-bottom: 1rem;
  text-align: left;
}
article a {
  color: #4a4a4a;
}
article a img {
  max-width: 300px;
  /* width: 150px; */
  padding-bottom: 10px;
}
.topImage img {
  /* padding: 10px 0 5px 0; */
  /* width: 40% !important; */
  margin-bottom: -5px;
}
article .book-title {
  text-align: left;
}

article img {
  width: 100%;
}
</style>

