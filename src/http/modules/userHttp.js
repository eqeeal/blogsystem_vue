import request from "../request"
function login(data) {
    return request({
        url: '/login',
        params:data
    })
}
function register() { }

export default {
    login
}