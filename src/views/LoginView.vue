<script setup>
  import {reactive} from "vue";
  import {fetchGet} from "@/api/common.js";
  import {useLoginStore} from "@/store/index.js";
  import {useRouter} from "vue-router";
  const form = reactive({
    username: null,
    password: null
  })

  const router = useRouter()

  const userLoginStore = useLoginStore()

  async function submitForm() {
    let res = await fetchGet("/anno/login",form)
    localStorage.setItem("Authorization",res.data)
    userLoginStore.updateLoginStatus(true)
    userLoginStore.updateAuthorization(res.data)
    router.push("/")
  }

</script>

<template>
  <div class="container">

    <a-alert message="金多多餐饮短信充值客户端，请使用代理账户登录！" style="margin: 4px 0" type="success" />

    <a-input v-model:value="form.username" class="block-margin" placeholder="请输入用户名"></a-input>
    <a-input v-model:value="form.password" class="block-margin" type="password" placeholder="请输入密码"></a-input>
    <a-button class="block-margin" @click="submitForm" block type="primary">登录</a-button>
  </div>
</template>

<style scoped lang="scss">
  .container {
    box-sizing: border-box;
    padding: 20px;

    .block-margin {
      margin: 10px 0;
    }
  }
</style>
