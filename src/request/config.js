export default {
    method: 'get',
    // 基础 url 前缀
    baseURL: 'http://localhost:8001',
    // 请求头信息
    headers: {
        'Content-Type': 'application/json; charset=UTF-8'
    },
    // 设置超时时间
    timeout: 10000,
    // 携带凭证
    withCredentials: true,
    // 返回数据类型
    responseType: 'json'
}