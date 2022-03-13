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
          <router-link to="/" tag="div" class="flex ai-center ta-center color-grey1 fs-10">
            <span>皮肤: 9</span>
            <span class="fs-17 ml-1">&gt;</span>
          </router-link>
        </div>
      </div>
    </div>
    <!-- 大容器 -->
    <div class="skills">
      <div class="bgc-white px-3 pt-2">
        <div class="nav fs-14 pb-1 d-flex jc-around b-bottom">
          <div class="nav-item active">
            <div class="nav-link">英雄初识</div>
          </div>
          <div class="nav-item">
            <div class="nav-link">进阶攻略</div>
          </div>
        </div>
      </div>
      <!-- swiper -->
      <swiper>
        <!-- 英雄初识 swiper -->
        <swiper-slide>
          <div>
            <div class="bgc-white px-2 py-2">
              <div class="flex">
                <router-link tag="button" to="/" class="btn btn-lg flex-1 bgc-grey flex ai-center jc-center">
                  <img src="../assets/icons/icon_06.png" alt="" height="20" />
                  <span class="ml-2">英雄介绍视频</span>
                </router-link>
                <router-link tag="button" to="/" class="btn btn-lg flex-1 bgc-grey flex ai-center jc-center ml-1">
                  <img src="../assets/icons/icon_07.png" alt="" height="20" />
                  <span class="ml-3">一图识英雄</span>
                </router-link>
              </div>
              <div v-if="hero.skills">
                <div class="">
                  <div class="flex jc-around mt-5">
                    <img class="icon" v-for="(item, i) in hero.skills" :key="i" :src="item.icon" @click="curIndex = i" :class="{ active: curIndex === i }" />
                  </div>
                  <div class="fs-14 mt-4" v-if="curSkill">
                    <strong>{{ curSkill.name }}</strong>
                    <span class="fs-12 ml-5 pl-3 color-grey1"> (冷却值：{{ curSkill.delay }} 消耗：{{ curSkill.cost }})</span>
                  </div>
                  <p class="fs-13 mt-4">{{ curSkill.desc }}</p>
                </div>
              </div>
            </div>
            <!-- card -->
            <my-card plain title="出装推荐" img="icon_08">
              <div v-if="hero.items1">
                <div class="fs-15">顺风出装</div>
                <div class="flex jc-between mt-2 mx-1">
                  <div class="flex flex-column ai-center" v-for="(item, i) in hero.items1" :key="i">
                    <img :src="item.icon" alt="" height="45" width="45" :style="{ 'border-radius': '50%' }" />
                    <div class="fs-9 my-1">{{ item.name }}</div>
                  </div>
                </div>
              </div>
              <div class="b-bottom"></div>
              <div v-if="hero.items2">
                <div class="fs-15 mt-2">逆风出装</div>
                <div class="flex jc-between mt-2 mx-1">
                  <div class="flex flex-column ai-center" v-for="(item, i) in hero.items2" :key="i">
                    <img :src="item.icon" alt="" height="45" width="45" :style="{ 'border-radius': '50%' }" />
                    <div class="fs-9 mt-1">{{ item.name }}</div>
                  </div>
                </div>
              </div>
            </my-card>
            <my-card plain title="使用技巧" img="icon_08">
              <p class="fs-13">{{ hero.usageTips }}</p>
            </my-card>
            <my-card plain title="对抗技巧" img="icon_08">
              <p class="fs-13">{{ hero.battleTips }}</p>
            </my-card>
            <my-card plain title="团战思路" img="icon_08">
              <p class="fs-13">{{ hero.teamTips }}</p>
            </my-card>
            <my-card plain title="英雄关系" img="icon_08">
              <div class="b-bottom pb-2" v-if="hero.partners">
                <div class="fs-15">最佳搭档</div>
                <div class="flex mt-2" v-for="(item, i) in hero.partners" :key="i">
                  <img :src="item.hero.avatar" alt="" height="45" width="45" />
                  <p class="fs-13 ml-2">{{ item.desc }}</p>
                </div>
              </div>
            </my-card>
          </div>
        </swiper-slide>
        <!-- 进阶攻略 swiper -->
        <swiper-slide> </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: { required: true },
  },
  data() {
    return {
      curIndex: 0,
      hero: null,
    }
  },
  computed: {
    curSkill() {
      return this.hero.skills[this.curIndex]
    },
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
  .skills {
    img.icon {
      width: 1.3rem;
      height: 1.3rem;
      border-radius: 50%;
      padding: 0.01rem;
      border: 3px solid map-get($colors, 'white');
      &.active {
        border-color: map-get($colors, 'primary');
      }
    }
  }
}
</style>
