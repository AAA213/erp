<template>
  <div class="home">
    <div class="home_header">
      <LayoutHeader />
    </div>
    <div class="home_menu"><LayoutMenu /></div>
    <div class="home_content">
      <LayoutContent />
    </div>
  </div>
</template>
<script lang="ts" setup>
import LayoutHeader from "./components/LayoutHeader.vue";
import LayoutMenu from "./components/LayoutMenu.vue";
import LayoutContent from "./components/LayoutContent.vue";
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
    bottom: 0px;
    padding: 18px;
    // background-color: #dcdcdc;
  }
}
</style>
