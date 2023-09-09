import request  from "@/request"
// 分页查询
export const listPage = (data) => {
    return request({
        url: 'app/user/listPage',
        method: 'get',
        data
    })
}