<template>
  <div class="basic-search-table">
    <div>
      <slot name="componentLeft" />
    </div>
    <div
      class="main-wrapper"
      :class="{
        'has-left': $slots.componentLeft,
        'has-right': $slots.componentRight,
      }"
    >
      <!-- .sync 改为 v-model -->
      <!-- <Search
        v-if="searchFields && searchFields.length"
        ref="search"
        :fields="searchFields"
        v-model:form="_searchForm"
        :labelWidth="searchLabelWidth"
        :defaultForm="defaultSearchForm"
        @search="$emit('search')"
        @reset="handleReset"
      >
        <template v-for="item in searchSlots" v-slot:[item.key]>
          <slot :name="item.key" />
        </template>
      </Search> -->

      <!-- 表格上方的按钮插槽 -->
      <div
        v-if="$slots.tableTopTools"
        class="table-top-tools"
        ref="tableTopTools"
      >
        <slot name="tableTopTools" />
      </div>

      <!-- 表格 -->
      <div v-loading="loading">
        <Table
          ref="table"
          :fields="tableFields"
          :data="tableData"
          v-bind="$attrs"
          v-on="$attrs"
        >
          <template #bodyCell>
            <slot name="bodyCell" />
          </template>
        </Table>
      </div>
    </div>
    <div>
      <slot name="componentRight" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, computed, useSlots } from "vue";
const slots = useSlots();
// 获取table组件
const table = ref(null);
const props = defineProps({
  // 搜索字段
  searchFields: {
    type: Array,
  },
  // 表格字段
  tableFields: {
    type: Array,
  },
  // 搜索表单
  searchForm: {
    type: Object,
  },
  // 默认的搜索参数，用于重置
  defaultSearchForm: {
    type: Object,
  },
  // 搜索表单label宽度
  searchLabelWidth: {
    type: String,
  },
  // 分页参数
  pagination: {
    type: Object,
  },
  total: {
    type: Number,
    default: 0,
  },
  // 表格数据
  tableData: {
    type: Array,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits([
  "update:searchForm",
  "update:pagination",
  "pagination",
  "reset",
]);
const _searchForm = computed({
  get() {
    return props.searchForm;
  },
  set(val) {
    emit("update:searchForm", val);
  },
});
let _pagination = computed({
  get() {
    return props.pagination;
  },
  set(val) {
    emit("update:pagination", val);
  },
});

// 通过正则表达 获取 search_xxx 中的 xxx
const searchSlots = computed(() => {
  const mySlots: { key: any; slot: any }[] = [];
  Object.keys(slots).forEach((key) => {
    if (/^search/.test(key)) {
      mySlots.push({
        key,
        slot: slots[key],
      });
    }
  });
  return mySlots;
});

// 通过正则表达 获取 tableBody_xxx 中的 xxx
const tableSlots = computed(() => {
  const mySlots: { key: any; slot: any }[] = [];
  Object.keys(slots).forEach((key) => {
    if (/^table/.test(key)) {
      mySlots.push({
        key,
        slot: slots[key],
      });
    }
  });
  return mySlots;
});

/**
 * 分页器 size change
 */
const handleSizeChange = (pageSize: number) => {
  const pagination = {
    ..._pagination,
    pageSize,
  };
  _pagination.value = pagination;
  emit("pagination");
};
/**
 * 分页器 currentPage change
 */
const handleCurrentChange = (pageNum: number) => {
  const pagination = {
    ..._pagination,
    pageNum,
  };
  _pagination.value = pagination;
  emit("pagination");
};
/**
 * 重置
 */
const handleReset = () => {
  _pagination.value = {
    pageNum: 1,
    pageSize: 10,
  };
  try {
    // 调用 table组件的 重置事件
    // table.value?.basicTable.clearSelection();
  } catch (error) {
    console.warn(error);
  }
  emit("reset");
};
</script>
<style scoped lang="less">
.basic-search-table {
  display: flex;
  .main-wrapper {
    flex: 1;
    min-width: 0;

    &.has-left {
      margin-left: 14px;
    }
    &.has-right {
      margin-right: 14px;
    }
  }
}
.table-top-tools {
  margin-bottom: 8px;
}
.pagination {
  margin-top: 8px;
  text-align: right;
}

.basic-search-table {
  display: flex;
  // 根据是否有左右插槽决定样式
  .main-wrapper {
    flex: 1;
    min-width: 0;

    &.has-left {
      margin-left: 14px;
    }
    &.has-right {
      margin-right: 14px;
    }
  }
}
.table-top-tools {
  margin-bottom: 8px;
}
.pagination {
  margin-top: 8px;
  text-align: right;
}
</style>
