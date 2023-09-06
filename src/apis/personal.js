import request from '@/request'
// 用户基本信息
export const userInfo = (data) => {
    return request({
        url: "personal/userInfo",
        methods: "get",
        data
    })
}
// 导航菜单
export const menuTree = (data) => {
    return request({
        url: "personal/menuTree",
        method: 'get',
        data
    })
}