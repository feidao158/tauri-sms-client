import instance from "@/utils/request.js";

export function fetchGet(url,params){
    return instance({
        url,
        method: "get",
        params
    })
}

export function fetchPost(url,data) {
    return instance({
        url,
        method: "post",
        data
    })
}
