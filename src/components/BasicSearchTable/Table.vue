<template>
  <a-table
    ref="basicTable"
    border
    style="width: 100%"
    tooltip-effect="dark"
    :columns="fields"
    :dataSource="data"
    :max-height="myMaxHeight"
    v-bind="$attrs"
    v-on="$attrs"
  >
    <template #bodyCell="{ column, record }">
      <template v-for="field in _fields" :key="field.key">
        <template v-if="column.key === `${field}`">
          <a>
            {{ record.name }}
          </a>
          <slot name="bodyCell" />
        </template>
      </template>
    </template>
  </a-table>
</template>
<script lang="ts" setup>
import { ref, reactive, computed, onMounted } from "vue";

const props = defineProps({
  fields: {
    type: Array,
    required: true,
  },
  data: {
    type: Array,
    default: () => [],
  },
  maxHeight: {
    type: [String, Number],
  },
  useSelection: {
    type: Boolean,
    default: false,
  },
  useSelectionReserve: {
    type: Boolean,
    default: false,
  },
});

let pageAsTableSelectDialog = reactive({
  radio: "",
});
let myMaxHeight = ref("auto");

let _fields: any = computed(() => {
  // 过滤出无需校验权限、拥有权限等符合条件的列
  // 暂时不需要过滤
  return props.fields.filter((item) => {
    let isPassed = true;

    return isPassed;
  });
});

/**
 * 动态计算表格高度
 */
const calcTableHeight = () => {};
</script>

<style scoped lang="less">
::v-deep {
  .pageAsTableSelectDialog-radio .el-radio__label {
    padding: 0;
  }
}
</style>
