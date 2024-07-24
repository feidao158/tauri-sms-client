

import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue"
import BusinessView from "@/views/Business.vue"
import {createMemoryHistory, createRouter} from "vue-router";

import {useLoginStore} from "@/store/index.js";

const routes = [
    {
        path: "/",
        component: HomeView,
    },
    {
        path: "/login",
        component: LoginView
    },
    {
        path: "/business",
        component: BusinessView
    }
]


const router = createRouter({
    history: createMemoryHistory(),
    routes
})


const whiteList = ["/login"]

router.beforeEach(async (to,from)=>{
    const loginStore = useLoginStore()
    //初始化

    if(!loginStore.initStatus) {
        let authKey = localStorage.getItem("Authorization")
        //判断有没有存储authKey
        if (authKey) {
            loginStore.updateAuthorization(authKey)
            await loginStore.validUserStatus()
        }else {
            loginStore.updateInitStatus(true)
            loginStore.updateLoginStatus(false)
        }
    }

    const loginStatus = loginStore.loginStatus
    if (loginStatus) {
        return true
    }
    if (!loginStatus) {
        if (whiteList.includes(to.path)){
            return true
        }else {
            console.log('未登录 跳转登录页')
            return "/login"
        }
    }

    return true
})

export default router
