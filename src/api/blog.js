import request from "./request"
const name = "/blog"
export default {
    page(data) {
        return request({
            method: 'get',
            url: `${name}/page`,
            params: data
        })
    },
    deleteBlog(data){
        return request({
            method:`delete`,
            url:`${name}/delete`,
            data
        })
    },
    getById(id){
        return request({
            method:"get",
            url:`${name}/getByBlogId/${id}`,
        })
    },
    getAuthor(id){
        return request({
            method:'get',
            url:`${name}/getUserByBlogId/${id}`
        })
    },
    add(blog,tagList){
        return request({
            method:'post',
            url:`${name}/add`,
            data:blog,
            params:{"tagList":tagList}
        })
    },
    getTagIds(id){
        return request({
            method:'get',
            url:`${name}/getTagIds/${id}`
        })
    },
    updateBlog(blog,tagList){
        return request({
            method:'put',
            url:`${name}/update`,
            data:blog,
            params:{"tagList":tagList}
        })
    },
    getUserInfo(){
        var phone = localStorage.getItem("LoginUser")
        return request({
            method:'get',
            url:`/user/getNowUserInfo`,
            params:{"phone":phone}
        })
    },
    getUserId(){
        var phone = localStorage.getItem("LoginUser")
        return request({
            method:'get',
            url:`/user/getNowUserId`,
            params:{"phone":phone}
        })
    },
    getCategoryOptions(){
        return request({
            method:'get',
            url:`/category/getCategory`,
        })
    },
    getTagOptions(){
        return request({
            method:'get',
            url:`/tag/getTagOptions`,
        })
    },
    getBlogInfo(){
        var id = localStorage.getItem("userId")
        return request({
            method:'get',
            url:`${name}/getCountInfo/${id}`,
            // method:'get',
            // url:`/tag/getTagOptions/${id}`,
        })
    }
}