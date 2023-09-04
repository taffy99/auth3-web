import request from "@/request";
// 登陆
export const login = (data) => {
    return request({
        url: "login",
        method: "post",
        data
    })
}
// 登出
export const logout = () => {
    return request({
        url: "logout",
        method: "get"
    })
}