<template>
  <div class="page-hero" v-if="hero">
    <!-- 黑色吸顶 -->
    <div class="topbar bgc-grey4">
      <div class="color-white fs-13 flex ai-center px-3 py-1">
        <img src="../assets/logo.png" alt="" height="30" />
        <div class="flex-1 ml-3 flex ai-center">
          <span>王者荣耀</span>
          <span class="ml-3">攻略站</span>
        </div>
        <router-link :to="'/'" tag="div" class="fs-10 flex ai-center">
          <span>更多英雄</span>
          <strong class="fs-17 ml-2">&gt;</strong>
        </router-link>
      </div>
    </div>
    <!-- banner -->
    <div class="banner fs-11 color-white" :style="{ 'background-image': `url(${hero.banner})` }">
      <div class="info flex flex-column h-100 jc-end p-3">
        <div>{{ hero.title }}</div>
        <h2>{{ hero.name }}</h2>
        <div>{{ hero.categories.map((v) => v.name).join('/') }}</div>
        <div class="flex jc-between ai-center fs-13">
          <div class="flex ai-center">
            <span>难度</span>
            <span class="badge bgc-primary fs-8">{{ hero.scores.difficult }}</span>
            <span>技能</span>
            <span class="badge bgc-blue fs-8">{{ hero.scores.skills }}</span>
            <span>攻击</span>
            <span class="badge bgc-hot fs-8">{{ hero.scores.attack }}</span>
            <span>生存</span>
            <span class="badge bgc-grey3 fs-8">{{ hero.scores.survive }}</span>
          </div>
          <router-link to="/" tag="div" class="flex ai-center ta-center color-grey fs-10">
            <span>皮肤: 9</span>
            <span class="fs-17 ml-1">&gt;</span>
          </router-link>
        </div>
      </div>
    </div>
    <!-- content -->
  </div>
</template>

<script>
export default {
  props: {
    id: { required: true },
  },
  data() {
    return {
      hero: null,
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`/heroes/${this.id}`)
      this.hero = res.data
    },
  },
}
</script>

<style lang="scss">
@import '../assets/scss/style.scss';

.page-hero {
  .topbar {
    position: sticky;
    top: 0;
    z-index: 999;
  }
  .banner {
    height: 50vw;
    background: #fff no-repeat top center;
    background-size: auto 100%;
    .info {
      background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
      .badge {
        margin: 0 0.15rem;
        width: 0.25rem;
        height: 0.25rem;
        line-height: 0.25rem;
        text-align: center;
        border-radius: 50%;
        font-size: 0.2rem;
        border: 1px solid rgba(255, 255, 255, 0.2);
      }
    }
  }
}
</style>
