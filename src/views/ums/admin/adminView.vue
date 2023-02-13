<template>
  <div class="basic-page-wrapper">
    <a-table
      :columns="state.tableFields"
      :dataSource="state.data"
      :pagination="state.pagination"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'password'"> ******** </template>
        <template v-if="column.key === 'status'">
          <a-switch
            v-model:checked="record.status"
            @click="handleStatusChange"
          />
        </template>
      </template>
    </a-table>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from "vue";
// import { SmileOutlined } from "@ant-design/icons-vue";
import getTableFields from "./utils/table-fields";
import type { userListObj } from "@/types/apiTypes";
import { getUserList } from "@/apis/admin";

const state: {
  tableFields: object;
  data: userListObj[];
  pagination: {
    total: number;
    current: number;
    pageSize: number;
    pageSizeOptions: string[];
    onChange: Function;
  };
} = reactive({
  // 表格字段
  tableFields: getTableFields(),
  // 表格数据
  data: [],
  // 表格分页数据
  pagination: {
    total: 0,
    current: 1,
    pageSize: 10,
    pageSizeOptions: ["5", "10", "15", "20"],
    onChange: (page: number, pageSize: number) => {
      state.pagination.current = page;
      state.pagination.pageSize = pageSize;
      loadTableData();
    },
  },
});
const handleStatusChange = async () => {};
/**
 * 获取用户列表
 */
const loadTableData = async () => {
  const res = await getUserList({
    pageNum: state.pagination.current,
    pageSize: state.pagination.pageSize,
  });

  state.data = res.data.list;
  state.pagination.total = res.data.total;
  state.pagination.pageSize = res.data.pageSize;
  state.pagination.current = res.data.pageNum;
};

loadTableData();
</script>
