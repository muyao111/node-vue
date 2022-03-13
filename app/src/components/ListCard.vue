<template>
  <my-card :title="title" :img="img" :icon="icon" :showLine="showLine">
    <!-- 插槽1 -->
    <slot name="slide" />
    <div class="card-body fs-14">
      <!-- 导航 -->
      <div class="nav flex jc-between mt-3 mx-1">
        <div class="nav-item" :class="{ active: active === i }" v-for="(item, i) in categories" :key="i">
          <!-- <div class="nav-link fs-12" @click="active = i">{{ item.name }}</div> -->
          <div class="nav-link fs-13" @click="$refs.swi.swiper.slideTo(i)">{{ item.name }}</div>
        </div>
      </div>
      <!-- 轮播效果 -->
      <swiper ref="swi" :options="{ autoHeight: true }" @slide-change="() => (active = $refs.swi.swiper.realIndex)">
        <swiper-slide v-for="(item, i) in categories" :key="i">
          <!-- 插槽2 -->
          <slot name="categories" :item="item" />
        </swiper-slide>
      </swiper>
    </div>
  </my-card>
</template>

<script>
export default {
  props: {
    title: { type: String, required: true }, // 标题
    img: { type: String, required: true }, // 标题左侧图标
    icon: { type: String }, // 标题右侧图标
    showLine: { type: Boolean, default: true }, // 是否显示标题下的横线
    categories: { type: Array }, // 分类nav
  },
  data() {
    return {
      active: 0, // 高亮
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
</style>
