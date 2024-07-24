import axios from "axios";
import {message} from "ant-design-vue";
import {useLoginStore} from "@/store/index.js";

import {useRouter} from "vue-router";
// https://erpm.jindd.com.cn/go
const instance = axios.create({
    baseURL: "https://erpm.jindd.com.cn/go",
    timeout: 5000,
})

const router = useRouter()


instance.interceptors.request.use((config)=>{

    const userLoginStore = useLoginStore()
    const auth = userLoginStore.auth
    if (auth) {
        config.headers["Authorization"] = auth
    }

    return config
})


instance.interceptors.response.use(response=>{
    if (response.status !== 200){
        message.error("服务器异常")
        return Promise.reject("服务器异常")
    }
    let res = response.data
    let resCode = res.code
    if (resCode === 401){
        //TODO 清理状态
        localStorage.removeItem("Authorization")
        message.error("请重新登录")
        router.replace("/")
        //TODO 到登录页
    }
    if (resCode ===500){
        let errMsg = res.msg || "业务异常"
        message.warn(errMsg)
        return Promise.reject(errMsg)
    }
    if (resCode === 200) {
        return res
    }
})

export default instance
