<template>
  <div class="Main">
    <!-- 黑色吸顶 -->
    <div class="topbar bgc-grey4">
      <div class="color-white fs-13 flex ai-center px-3 py-1">
        <img src="../assets/logo.png" alt="" height="30" />
        <div class="flex flex-column flex-1 pl-3">
          <div class="fs-12">王者荣耀</div>
          <p class="color-grey2 fs-8">团队成就更多</p>
        </div>
        <button class="btn bgc-primary px-2 py-1 my-1">立即下载</button>
      </div>
    </div>
    <!-- 黄色吸顶 -->
    <div class="nav nav-inverse bgc-primary jc-around fs-13 py-2">
      <div class="nav-item active">
        <router-link tag="div" to="/home">首页</router-link>
      </div>
      <div class="nav-item">
        <router-link tag="div" to="/home">攻略中心</router-link>
      </div>
      <div class="nav-item">
        <router-link tag="div" to="/home">赛事中心</router-link>
      </div>
      <div class="nav-item">
        <router-link tag="div" to="/home">IP新游</router-link>
      </div>
    </div>
    <!-- 路由 -->
    <router-view />
  </div>
</template>

<style>
.topbar {
  position: sticky;
  top: 0;
  z-index: 999;
}
</style>
