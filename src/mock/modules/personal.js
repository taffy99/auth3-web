import user from '../../store/modules/user'
import {users} from '../data'
export function userInfo() {
    return {
        url: "personal/userinfo",
        type: "get",
        response: (opts) => {
            const token = localStorage.getItem('pm_token')
            if(token) {
                const uinfo = {
                    ...users.find((v)=>v.name === token.split('@')[0])
                }
                delete uinfo.password
                return {
                    code: 200,
                    data: {
                        ...uinfo,
                        'unReadCount|0-10':0
                    }
                }
            } else {
                return {
                    code: -2,
                    msg: '请先登录！'
                }
            }
        }
    }
}