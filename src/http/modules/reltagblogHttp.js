import request from "../request";
//所有的链接列表
function getblogcountbytag(){
    return request({
        url:"/relTagBlog/tagcountbyblog"
    })
}
function getTagName(){
    return request({
        url:"/relTagBlog/gettagname"
    })
}
function getBlogCount(){
    return request({
        url:"/relTagBlog/getblogCount"
    })
}
function getCategoryCount(){
    return request({
        url:"/relTagBlog/getCategoryCount"
    })
}
export default{
    getblogcountbytag,
    getTagName,
    getBlogCount,
    getCategoryCount
}