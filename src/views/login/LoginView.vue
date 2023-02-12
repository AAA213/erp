<template>
  <div>
    <a-form
      :model="formState"
      name="basic"
      :rules="rules"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
      @finish="handelLogin"
      @finishFailed="onFinishFailed"
    >
      <a-form-item label="用户名" name="username">
        <a-input v-model:value="formState.username" />
      </a-form-item>

      <a-form-item label="密码" name="password">
        <a-input-password v-model:value="formState.password" />
      </a-form-item>

      <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
        <a-checkbox v-model:checked="formState.remember">记住密码</a-checkbox>
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" html-type="submit">登录</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from "vue";
import { login } from "@/apis/login";
import { setTokenInfo } from "@/utils/token";
import { useRouter } from "vue-router";
import { useStore } from "@/stores/counter";
// 获取路由对象
let router = useRouter();
// 登录表单数据接口
interface loginFrom {
  username: string;
  password: string;
  remember: Boolean;
}
const formState: loginFrom = reactive({
  username: "admin",
  password: "123456",
  remember: true,
});
const rules = reactive({
  username: [{ required: true, message: "请输入用户名！" }],
  password: [{ required: true, message: "请输入密码！" }],
});
/**
 * 登录
 * @param values 登录表单数据
 */
const store = useStore();
const handelLogin = async (values: loginFrom) => {
  // console.log("Success:", values);
  const res = await login(values);
  // 保存 token
  setTokenInfo(res.data.tokenHead, res.data.token);

  // 获取用户信息并保存用户信息到 pinia
  await store.getAdminUserInfo();
  // 避免死循环，先跳转到一个不存在的路由，在路由守卫里拦截
  router.push("/homePage");
};
const onFinishFailed = (errorInfo: loginFrom) => {
  console.log("Failed:", errorInfo);
};
</script>
<style less></style>
