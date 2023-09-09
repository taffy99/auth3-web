import request  from "@/request"
// 查询机构树
export const listTree = (data) => {
    return request({
        url: 'app/dept/listTree',
        method: 'get',
        data
    })
}