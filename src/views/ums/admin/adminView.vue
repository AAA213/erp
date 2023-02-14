<template>
  <div class="basic-page-wrapper">
    <div class="header"></div>
    <div class="table">
      <a-table
        bordered
        :columns="state.tableFields"
        :dataSource="state.data"
        :pagination="state.pagination"
        :scroll="{ y: 440 }"
        :loading="state.loading"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'password'"> ******** </template>
          <template v-if="column.key === 'status'">
            <a-switch
              :loading="state.switchLoading"
              :checkedValue="1"
              :unCheckedValue="0"
              v-model:checked="record.status"
              @change="handleStatusChange(record)"
            />
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from "vue";
// import { SmileOutlined } from "@ant-design/icons-vue";
import getTableFields from "./utils/table-fields";
import type { userListObj } from "@/types/apiTypes";
import { getUserList, upDateUserStatus } from "@/apis/admin";
import { notification } from "ant-design-vue";
const state: {
  tableFields: object;
  data: userListObj[];
  loading: boolean;
  switchLoading: boolean;
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
  loading: true,
  switchLoading: false,
  // 表格分页数据
  pagination: {
    total: 0,
    current: 1,
    pageSize: 10,
    pageSizeOptions: ["5", "10", "15", "20"],
    onChange: (page: number, pageSize: number) => {
      state.loading = true;
      state.pagination.current = page;
      state.pagination.pageSize = pageSize;
      loadTableData();
    },
  },
});

/**
 * 修改用户状态
 */
const handleStatusChange = async (row: { id: number; status: number }) => {
  try {
    state.switchLoading = true;
    const res = await upDateUserStatus({ id: row.id, status: row.status });
    console.log(res);
  } catch (error: any) {
    row.status = row.status === 1 ? 0 : 1;
    notification.open({
      message: "系统提示",
      description: error.message,
    });
  } finally {
    state.switchLoading = false;
  }
};
/**
 * 获取用户列表
 */
const loadTableData = async () => {
  try {
    const res = await getUserList({
      pageNum: state.pagination.current,
      pageSize: state.pagination.pageSize,
    });
    state.data = res.data.list;
    state.pagination.total = res.data.total;
    state.pagination.pageSize = res.data.pageSize;
    state.pagination.current = res.data.pageNum;
  } finally {
    state.loading = false;
  }
};

loadTableData();
</script>
<style lang="less" scoped>
// /deep/ .ant-table-tbody > tr > td {
//   padding: 4px !important;
// }
/deep/ .ant-table-tbody > tr > td {
  padding: 4px;
}
.header {
  height: 100px;
}
</style>
