import request from "../requst.js"
function login(data) {
    return request({
        url: '/user/login',
        params: data
    })
}
//得到所有用户数据
function getall() {
    return request({
        url: '/user/findAll',
        method: "get"
    })
}
//删除所有用户
function delUser(data) {
    return request({
        url: '/user/delete',
        method: "post",
        data
        //或者data：data
    })
}
//批量刪除
function delUsers(data) {
    return request({
        url: "/user/delUsers",
        method: "post",
        data
    })
}
//更新用户信息
function updateUser(data) {
    return request({
        url: "/user/update",
        method: "post",
        data
    })
}
//通过手机号查询用户
function getUserByPhone(data) {
    return request({
        url: "/user/getbyPhone",
        method: "post",
        params: {
            userphone: data
        }
    })
}
//分页查询
function page1(page, pageSize) {
    return request({
        url: "/user/page1",
        method: "get",
        params: {
            pageSize: pageSize,
            page: page,
        }
    })
}
//模糊查询
function page(username, page, pageSize) {
    return request({
        url: "/user/page",
        method: "get",
        params: {
            username: username,
            pageSize: pageSize,
            pageNum: page,
        }
    })
}
//新增用户
function add(data) {
    return request({
        url: "/user/add",
        method: "post",
        data
    })

}
// function 
// function login(data) {
//     return request({
//         url: '/login',
//         params:data
//     })
// }
function getBlogByUserId(id){
    return request({
        url: "/blog/getBlogByUserId",
        method: "get",
        params:{
            id:id
        }
    })
}
function getEchartsData(e){
    // alert(e);
    if(e===null){
        let id=localStorage.getItem("userId")
        return request({
            url: "/blog/getEchartsData",
            method: "get",
            params:{
                userId:id
            }
        })
    }
    else{
        return request({
            url: "/blog/getEchartsDataByBlogId",
            method: "get",
            params:{
                blogId:e
            }
        })
    }
}
export default {
    login,
    getall,
    delUser,
    delUsers,
    updateUser,
    getUserByPhone,
    page,
    page1,
    add,
    getBlogByUserId,
    getEchartsData
}