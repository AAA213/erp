<template>
  <div style="width: 100%; height: 100%; overflow: auto">
    <a-menu
      v-model:selectedKeys="state.selectedKeys"
      style="width: 100%; height: 100%"
      mode="inline"
      :open-keys="state.openKeys"
      @openChange="onOpenChange"
      @click="handleClick"
    >
      <a-menu-item key="/index">首页</a-menu-item>

      <a-sub-menu v-for="item in newMenu" :key="item.id">
        <template #icon>
          <MailOutlined />
        </template>
        <template #title>{{ item.title }}</template>
        <div v-for="childItem in item.children" :key="childItem.id">
          <!-- 去除不是菜单的选项 -->
          <a-menu-item
            v-if="childItem.hidden === 0"
            :key="`/${item.name}/${childItem.name}`"
            >{{ childItem.title }}</a-menu-item
          >
        </div>
      </a-sub-menu>
    </a-menu>
  </div>
</template>
<script lang="ts" setup>
import { reactive, computed } from "vue";
import { useStore } from "@/stores/counter";
import { MailOutlined } from "@ant-design/icons-vue";
import type { MenuProps } from "ant-design-vue";
import { useRouter, type RouteLocationNamedRaw } from "vue-router";

const state: { openKeys: number[]; rootSubmenuKeys: []; selectedKeys: [] } =
  reactive({
    rootSubmenuKeys: [],
    openKeys: [],
    selectedKeys: [],
  });
const onOpenChange = (openKeys: number[]) => {
  // 仅展开一项
  state.openKeys = [openKeys.pop() as number];
};
const store = useStore();

// 防止出现 store.menu 有值但  const newMenu 没有值的情况
// 当异步请求到了之后，会重新获取 newMenu 的值
const newMenu = computed(() => {
  return store.newMenu;
});
let router = useRouter();
const handleClick: MenuProps["onClick"] = (menuInfo) => {
  router.push(menuInfo.key as RouteLocationNamedRaw);
};
</script>
<style less></style>
