import { roles, users } from "../data"

// 分页查询
export function listPage() {
    return {
        url: 'app/user/listPage',
        type: 'get',
        response: (opts) => {
            const { pageNum, pageSize, name} = opts.data
            let set = users.map(v=>{
                const o = { ...v }
                if(v.id<=4) {
                    o.password = o.name
                    o.roleName = roles.find(item=> item.name === o.roleId)?.label
                    o.ip = '@ip'
                    o.visitTime = '@date @time'
                }
                return o

            })
            if(name) {
                set = set.filter(v => v.name === name)
            }
            const totalSize = set.length
            const totalPages = Math.ceil(totalSize/pageSize)
            let lastIndex = pageNum * pageSize
            if (lastIndex > totalSize) {
                lastIndex = totalSize
            }
            let resData = []
            if(pageNum >= 1 && pageNum <= totalPages) {
                resData = set.slice((pageNum - 1) * pageSize, lastIndex)
            }
            return {
                code: 200,
                msg: null,
                data: {
                    pageNum,
                    pageSize,
                    totalSize,
                    content: resData
                }
            }
        }
    }
}