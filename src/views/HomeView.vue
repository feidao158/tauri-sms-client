<script setup>
import {reactive, ref} from "vue";
import {message} from "ant-design-vue";

import {fetchGet} from "@/api/common.js";

import {Modal} from "ant-design-vue";

const storeCode = ref(null)

const rechargeCount = ref(0)

let storeSmsInfo = ref({
  dataStatus: false
})
async function queryStore() {
  let res = await fetchGet("/v1/sms/info", {
    storeCode: storeCode.value
  })
  storeSmsInfo.value = Object.assign(storeSmsInfo.value, {
    dataStatus: true,
    ...res.data,
  })
  message.info("查询成功")
}

function updateSmsStatus(status) {
  Modal.confirm({
    title: "确认提示",
    content: "是否更新短信状态",
    async onOk() {
      await fetchGet("/v1/sms/updateStatus",{
        storeCode: storeSmsInfo.value.storeCode,
        switchStatus: status
      })
      await queryStore()
    }
  })
}

function rechargeHandler() {
  Modal.confirm({
    title: "确实提示",
    content: "是否充值",
    async onOk() {
      await fetchGet("/v1/sms/recharge",{
        storeCode: storeSmsInfo.value.storeCode,
        rechargeCount: rechargeCount.value
      })
      await queryStore()
    }
  })
}

</script>


<template>
  <div class="container">
    <a-input v-model:value="storeCode" placeholder="请输入门店编码"></a-input>
    <a-button class="block-margin" block type="primary" @click="queryStore">查询</a-button>

    <div v-if="storeSmsInfo.dataStatus">
      <div class="border-box">
        <div class="title">
          短信开关状态：
        </div>

        <div class="content">
          <a-switch @change="updateSmsStatus"  v-model:checked="storeSmsInfo.smsSwitch"/>
        </div>
      </div>

      <div class="border-box">
        <div class="title">
          当前短信条数：
        </div>
        <div class="content">
          <div style="display: flex;justify-content: space-between;align-items: center">
            <div>
              {{ storeSmsInfo.smsCount }}
            </div>

            <div style="display:flex;">
              <a-input placeholder="请输入充值数量" v-model:value="rechargeCount" type="number"  style="margin: 0 4px"></a-input>
              <a-button type="primary" danger @click="rechargeHandler">充值</a-button>
            </div>

          </div>
        </div>
      </div>




    </div>

  </div>
</template>

<style lang="scss" scoped>
.container {
  padding: 20px;

  .block-margin {
    margin: 10px 0;
  }

  .border-box {
    box-sizing: border-box;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    padding: 8px;
    margin: 12px 0;
    display: flex;
    align-items: center;

    .title {
      font-weight: bold;
      width: 120px;
    }

    .content {
      flex: 1;
    }

  }
}
</style>
