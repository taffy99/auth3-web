// 系统登陆模块
export function login() {
    return {
        url: "login",
        method: "post",
        response: (opts) => {
            const name = opts.data.account
            return {
                code: 200,
                msg: '',
                data: {
                    token: "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZGlpbiIsImV4cC",
                    name
                }
            }
        
        }
    }
}