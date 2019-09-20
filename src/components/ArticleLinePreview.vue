<template>
  <div class="pb-4">
    <router-link :to="`/article/${article.id}`" class="flex">
      <div class="previewImage mr-4">
        <img :alt="article.title" :src="article.heroImage.file.url" />
      </div>
      <div>
        <div class="mt-2 text-xl font-bold">{{article.title}}</div>
        <small class="previewDate">{{convertToDate(article.publishDate)}}</small>
      </div>
      <p/>
    </router-link>
  </div>
</template>


<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Article } from "../models/article";
import Fluid from "../components/Fluid.vue";
import { DateHelper } from '../utility/dateHelper';

@Component({
  components: {
    Fluid
  },
})
export default class Blog extends Vue {
  @Prop() article;

  constructor() {
    super();
  }

  convertToDate(strDate: string) {
    return DateHelper.convertToDate(strDate);
  }
}
</script>

<style scoped>
.previewImage {
  max-height: 100px;
  width: 100px;
  overflow: hidden;
  display: block;
}
.previewDate {
  text-align: right;
}

.tag {
  color: #a0a0a0;
  text-decoration: none;
  display: inline-block;
  padding: 0.33333rem 0.5rem;
  line-height: 1;
  border-radius: 2px;
  border: 1px solid #a0a0a0;
  margin-right: 0.5em;
}
</style>
