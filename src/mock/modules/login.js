import {users} from '../data'
// 系统登陆模块
export function login() {
    return {
        url: "login",
        method: "post",
        response: (opts) => {
            const name = opts.data.account
            if(
                users.find(
                    (v) => v.name === opts.data.account && v.password === opts.data.password
                )
            ){
                return {
                    code: 200,
                    msg: '',
                    data: {
                        token: name +  "@eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZGlpbiIsImV4cC",
                        name
                    }
                }
            } else {
                return {
                    code: -1,
                    msg: '用户名或密码错误'
                }
            }
            
        
        }
    }
}
// 退出登陆
export function logout() {
    return {
        url: "logout",
        method: "get",
        response: {
            code: 200,
            msg: null,
            data: {}
        }
    }
}