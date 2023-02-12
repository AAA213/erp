<template>
  <div class="home">
    <div class="home_header">
      <HomeHeader />
    </div>
    <div class="home_menu"><HomeMenu /></div>
    <div class="home_content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script lang="ts" setup>
import HomeHeader from "./components/HomeHeader.vue";
import HomeMenu from "./components/HomeMenu.vue";
</script>
<style lang="less" scoped>
.home {
  height: 100%;
  position: relative;

  .home_header {
    height: 70px;
    width: 100%;
    background-color: #ff1414;
  }
  .home_menu {
    position: absolute;
    top: 70px;
    left: 0;
    bottom: 0;
    width: 250px;
    height: calc(100%-70px);
  }
  .home_content {
    position: absolute;
    top: 70px;
    left: 250px;
    right: 0;
    bottom: 0;
    background-color: #a387ff;
  }
}
</style>
