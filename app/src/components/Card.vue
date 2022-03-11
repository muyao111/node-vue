<template>
  <!-- head 头部 -->
  <div class="card bgc-white mt-2 p-3">
    <div class="flex ai-center pb-3" :class="`${showLine}` === 'false' ? '' : 'card-header'">
      <!-- <img height="14" src="../assets/icons/icon_08.png" alt="" /> -->
      <img height="14" :src="require(`../assets/icons/${img}.png`)" alt="" />
      <div class="fs-16 flex-1 pl-2">{{ title }}</div>
      <i class="iconfont" :class="`icon-${icon}`" />
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
    showLine: { type: Boolean, default: true },
  },
}
</script>

<style lang="scss">
@import '../assets/scss/style.scss';

.card {
  .card-header {
    border-bottom: 1px solid $border-color;
  }
  border-bottom: 1px solid $border-color;
}
</style>
