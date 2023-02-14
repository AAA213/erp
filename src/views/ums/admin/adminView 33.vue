<template>
  <div class="basic-page-wrapper">
    <BasicSearchTable
      :tableFields="state.tableFields"
      :searchFields="state.searchFields"
      v-model:searchForm="state.searchForm"
      v-model:pagination="state.pagination"
      :tableData="state.data"
      :total="state.pagination.total"
      @search="handleSearch"
      @reset="handleSearch"
      @pagination="loadTableData"
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
    </BasicSearchTable>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from "vue";
// import { SmileOutlined } from "@ant-design/icons-vue";
import getTableFields from "./utils/table-fields";
import getSearchFields from "./utils/search-fields";
import type { userListObj } from "@/types/apiTypes";
import { getUserList } from "@/apis/admin";
import BasicSearchTable from "@/components/BasicSearchTable/index.vue";
const state: {
  tableFields: object[];
  searchFields: object[];
  data: userListObj[];
  searchForm: object;
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
  searchFields: getSearchFields(),
  // 表格数据
  data: [],
  searchForm: {},
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

const handleSearch = () => {
  state.pagination.current = 1;
  state.pagination.pageSize = 10;

  loadTableData();
};

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
