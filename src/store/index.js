import { defineStore} from "pinia";
import {ref} from "vue";
import {fetchGet} from "@/api/common.js";

export const useLoginStore = defineStore("loginStatus",()=>{

    const initStatus = ref(false)

    const loginStatus = ref(false)
    const auth = ref(null)
    function updateLoginStatus(newLoginStatus){
        loginStatus.value = newLoginStatus
    }

    function updateAuthorization(authorization) {
        auth.value = authorization
    }

    function updateInitStatus() {
        initStatus.value = true
    }

    async function validUserStatus() {
        try {
            await fetchGet("/v1/health")
            loginStatus.value = true
        }catch (error) {
            return error
        }
    }



    return {
        initStatus,
        loginStatus,
        auth,
        updateLoginStatus,
        updateAuthorization,
        updateInitStatus,
        validUserStatus
    }
})
