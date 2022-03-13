<template>
  <!-- head 头部 -->
  <div class="bgc-white mt-2" :class="{ 'p-3': !plain, 'p-2': plain }">
    <!-- <div class="flex ai-center" :class="{ 'pb-3': !plain, 'card': !plain }"> -->
    <div class="flex ai-center" :class="{ 'pb-3': !plain, 'pb-2': plain, 'b-bottom': !plain }">
      <img height="14" :src="require(`../assets/icons/${img}.png`)" alt="" />
      <div class="fs-16 flex-1 pl-2">
        <div v-if="!plain">{{ title }}</div>
        <div v-else>
          <strong>{{ title }}</strong>
        </div>
      </div>
      <i class="iconfont icon-xianxingtubiaozhizuomoban-25" v-if="!plain" />
    </div>
    <!-- 插槽 -->
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, required: true },
    img: { type: String, required: true },
    icon: { type: String },
    // showLine: { type: Boolean, default: true },
    plain: { type: Boolean },
  },
}
</script>

<style lang="scss">
@import '../assets/scss/style.scss';

// .card {
//   border-bottom: 1px solid $border-color;
// }
</style>
