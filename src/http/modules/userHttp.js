import request from "../requst.js"
function login(data) {
    return request({
        url: '/user/login',
        params:data
    })
}
//得到所有用户数据
function getall() {
    return request({
        url: '/user/findAll',
        method:"get"
    })
 }
 //删除所有用户
 function delUser(data){
    return request({
        url: '/user/delete',
        method:"post",
        data
        //或者data：data
    })
 }
 //批量刪除
 function delUsers(data){
    return request({
        url:"/user/delUsers",
        method:"post",
        data
    })
 }
 //更新用户信息
 function updateUser(data){
    return request({
        url:"/user/update",
        method:"post",
        data
    })
 }
 //通过手机号查询用户
 function getUserByPhone(data){
    return request({
        url:"/user/getbyPhone",
        method:"post",
        params:{
            userphone:data
        }
    })
 }

export default {
    login,
    getall,
    delUser,
    delUsers,
    updateUser,
    getUserByPhone
}