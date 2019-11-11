import axios from './axios'
import request from './fetch'

export function login() {
    return axios.post('/post', {
        name: 'axiospost'
    })
}
export function test() {
    return request('/get', {
        method: 'get',
        params: { name: 'fetch' }
    })
}
export function fetchpost() {
    return request('/post', {
        method: 'post',
        type: 'urlencoded',
        body: {
            name: 'fetchpost'
        }
    })
}
export function axiosget() {
    return axios.get("/get", {
        params: {
            name: "axiosget"
        }
    })
}