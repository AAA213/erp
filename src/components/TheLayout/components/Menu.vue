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
      <MenuItem :menuTree="newMenu" :fathName="''" />
    </a-menu>
  </div>
</template>
<script lang="ts" setup>
import { reactive, computed } from "vue";
import { useStore } from "@/stores/counter";
import { MailOutlined } from "@ant-design/icons-vue";
import type { MenuProps } from "ant-design-vue";
import { useRouter, type RouteLocationNamedRaw } from "vue-router";
import MenuItem from "./MenuItem.vue";
const props: { menuTree: any; fathName: string } = defineProps({
  menuTree: {
    type: Array,
    required: true,
  },
  fathName: {
    type: String,
    required: true,
  },
});
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
console.log(newMenu);
</script>
<style less></style>
