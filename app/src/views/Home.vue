<template>
  <div class="home-container">
    <swiper :options="swiperOption">
      <swiper-slide>
        <img class="w-100" height="165" src="../assets/images/2b4094f90bb3dd4a8ba3095575fce446.jpeg" alt="" />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" height="165" src="../assets/images/d0269e7ad98e9466548de6d172c7f05d.jpeg" alt="" />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" height="165" src="../assets/images/e1fd369ad2246bbaddd32db937637c55.jpeg" alt="" />
      </swiper-slide>
      <div class="swiper-pagination swiper-home ta-right pr-2 pb-1" slot="pagination"></div>
    </swiper>
    <!-- end of swiper -->
    <div class="nav bgc-white ta-center pt-2 flex flex-column">
      <div class="flex flex-wrap fs-17">
        <div class="nav-items mb-4 pt-2">
          <i class="sprite sprite-news" />
          <div class="fs-12">爆料站</div>
        </div>
        <div class="nav-items mb-4 pt-2">
          <i class="sprite sprite-story" />
          <div class="fs-12">故事站</div>
        </div>
        <div class="nav-items mb-4 pt-2">
          <i class="sprite sprite-mall" />
          <div class="fs-12">周边商城</div>
        </div>
        <div class="nav-items mb-4 pt-2">
          <i class="sprite sprite-test" />
          <div class="fs-12">体验服</div>
        </div>
        <div class="nav-items mb-4 pt-2">
          <i class="sprite sprite-newcome" />
          <div class="fs-12">新人专区</div>
        </div>
        <div class="nav-items mb-4 pt-2">
          <i class="sprite sprite-glory" />
          <div class="fs-12">荣耀·传承</div>
        </div>
        <div class="nav-items mb-4 pt-2">
          <i class="sprite sprite-camp" />
          <div class="fs-12">王者营地</div>
        </div>
        <div class="nav-items mb-4 pt-2">
          <i class="sprite sprite-pub" />
          <div class="fs-12">公众号</div>
        </div>
        <div class="nav-items mb-4 pt-2">
          <i class="sprite sprite-glory" />
          <div class="fs-12">版本介绍</div>
        </div>
        <div class="nav-items mb-4 pt-2">
          <i class="sprite sprite-camp" />
          <div class="fs-12">对局环境</div>
        </div>
        <div class="nav-items mb-4 pt-2">
          <i class="sprite sprite-pub" />
          <div class="fs-12">IP共创计划</div>
        </div>
      </div>
      <div class="bgc-grey fs-12 flex ai-center jc-center py-2">
        <i class="sprite sprite-arrow mr-1" />
        <span>收起</span>
      </div>
    </div>
    <!-- end of nav -->
    <my-list-card title="新闻资讯" img="icon_08" :categories="newsCats">
      <template #categories="{ item }">
        <router-link tag="div" :to="`/ariticles/${news._id}`" class="flex ai-center mt-3 mx-1" v-for="(news, i) in item.newsList" :key="i">
          <span class="news-hot fs-10">{{ news.categoryName }}</span>
          <span class="text-ellipsis flex-1 ml-1 mr-4">{{ news.title }}</span>
          <span class="color-grey1 fs-12">{{ news.createdAt | dateFormat }}</span>
        </router-link>
      </template>
    </my-list-card>
    <!-- end of news-card -->
    <!-- <my-list-card title="英雄列表" img="icon_08" :showLine="false" :categories="heroCats"> -->
    <my-list-card title="英雄列表" img="icon_08" :categories="heroCats">
      <template #slide>
        <swiper :options="swiperOption">
          <swiper-slide>
            <img class="w-100" src="../assets/images/39070448590418.jpg" alt="" />
          </swiper-slide>
          <swiper-slide>
            <img class="w-100" src="../assets/images/782111465173105.jpg" alt="" />
          </swiper-slide>
          <swiper-slide>
            <img class="w-100" src="../assets/images/310571306364037.png" alt="" />
          </swiper-slide>
          <div class="swiper-pagination swiper-home ta-right pr-2 pb-1" slot="pagination"></div>
        </swiper>
      </template>
      <template #categories="{ item }">
        <div class="flex flex-wrap" style="margin: 0.2rem -0.1rem">
          <router-link :to="`/heroes/${hero._id}`" tag="div" class="hero-wrapper ta-center px-2 mt-1" v-for="(hero, i) in item.heroList" :key="i">
            <img class="hero-img w-100" :src="hero.avatar" alt="" />
            <div class="fs-12">{{ hero.name }}</div>
          </router-link>
        </div>
      </template>
    </my-list-card>
    <!-- end of hero-card -->
    <my-list-card title="精彩视频" img="icon_08"></my-list-card>
    <!-- end of video-card -->
    <my-list-card title="百态王者" img="icon_08"></my-list-card>
    <!-- end -->
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  filters: {
    dateFormat(val) {
      return dayjs(val).format('MM/DD')
    },
  },
  data() {
    return {
      // 新闻资讯mock数据
      // newsCats: new Array(5).fill({}).map((v) => ({
      //   name: '热门',
      //   newsList: new Array(5).fill({}).map((v) => ({
      //     catrgoryName: '公告',
      //     title: 'ksalnkngsfas',
      //     date: '06/01',
      //   })),
      // })),
      newsCats: [], // 新闻资讯
      heroCats: [], // 英雄分类
      swiperOption: {
        autoplay: {
          delay: 2500,
        },
        pagination: {
          el: '.swiper-home',
        },
      },
    }
  },
  created() {
    this.fetchNewsCats()
    this.fetchHeroCats()
  },
  methods: {
    async fetchNewsCats() {
      const res = await this.$http.get('/news/list')
      this.newsCats = res.data
    },
    async fetchHeroCats() {
      const res = await this.$http.get('/heroes/list')
      this.heroCats = res.data
    },
  },
}
</script>

<style lang="scss">
@import '../assets/scss/style.scss';

.swiper-pagination-bullets {
  .swiper-pagination-bullet {
    opacity: 1;
    border-radius: 0.04rem;
    background: map-get($colors, 'white');
    &.swiper-pagination-bullet-active {
      background: map-get($colors, 'dot');
    }
  }
}

.nav {
  .nav-items {
    width: 25%;
    border-left: 0.02rem solid $border-color;
    &:nth-child(4n + 1) {
      border-left: none;
    }
  }
}

.card-body {
  .news-hot {
    padding: 0 0.04rem;
    border-radius: 0.05rem;
    color: map-get($colors, 'hot');
    border: 0.02rem solid map-get($colors, 'hot');
  }
  .hero-wrapper {
    width: 20%;
    .hero-img {
      border-radius: 0.04rem;
    }
  }
}
</style>
