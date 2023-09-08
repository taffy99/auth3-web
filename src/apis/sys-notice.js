import request  from "@/request"
// 分页查询
export const listPage = (data) => {
    return request({
        url: 'sys/notice/listPage',
        method: 'get',
        data
    })
}