<template>
  <div v-for="item in props.menuTree" :key="item.id">
    <div v-if="item.children > 0">
      <a-sub-menu>
        <template #icon>
          <MailOutlined />
        </template>
        <template #title>{{ item.title }}</template>
        <MenuItem :menuTree="item.children" :fathName="item.name" />
      </a-sub-menu>
    </div>
    <div v-else>
      <a-menu-item
        v-if="item.hidden === 0"
        :key="
          props.fathName ? `/${props.fathName}/${item.name}` : `/${item.name}`
        "
        >{{ item.title }}</a-menu-item
      >
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
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
</script>
<style less></style>
