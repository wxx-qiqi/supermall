import axios from 'axios'
export function request(config) {
    const instance = axios.create({
        baseURL: 'http://152.136.185.210:7878/api/m5',
        timeout: 5000
    })

    //响应拦截
    instance.interceptors.request.use(config => {
        return config
    }, err => {
        console.log(err);
    })

    //发送网络请求 返回的是promise
    return instance(config)
}