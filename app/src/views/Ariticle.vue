<template>
  <div class="page-ariticle" v-if="ariticles">
    <!-- 标题 -->
    <div class="flex ai-center fs-16 p-2 b-bottom">
      <i class="iconfont color-blue fs-10"></i>
      <strong class="flex-1 color-blue fs-13 text-ellipsis">{{ ariticles.title }}</strong>
      <div class="color-grey1 fs-10">{{ ariticles.createdAt | dateFormat }}</div>
    </div>
    <!-- 内容 -->
    <div class="body fs-16 px-3 py-2" v-html="ariticles.body"></div>
    <!-- 底部 -->
    <div class="b-top px-3 py-2">
      <div class="flex ai-center">
        <strong class="color-dot fs-16">相关资讯</strong>
      </div>
      <div class="fs-13 mt-2 color-blue">
        <router-link :to="`/ariticles/${item._id}`" tag="p" v-for="item in ariticles.related" :key="item._id">{{ item.title }}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  props: {
    id: { required: true },
  },
  data() {
    return {
      ariticles: null,
    }
  },
  filters: {
    dateFormat(val) {
      return dayjs(val).format('YYYY-MM-DD')
    },
  },
  watch: {
    // id: 'fetch', // 简写方法：监听到路由props改变时触发fetch()
    id() {
      this.fetch()
    },
  },
  created() {
    this.fetch()
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`/ariticles/${this.id}`)
      this.ariticles = res.data
    },
  },
}
</script>

<style lang="scss">
.page-ariticle {
  .body {
    img {
      max-width: 100%;
      height: auto;
    }
    iframe {
      width: 100%;
      height: auto;
    }
  }
}
</style>
