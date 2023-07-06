import request from "@/http/request";
import ElementUI from "element-ui";
async function getCommentPage(data) {
    return await request({
        url:"/comment/page",
        method:"post",
        data
    })
}
async function updateComment(id1,i) {
    return await request({
        url:"/comment/updateMianCommentStatus",
        method:"get",
        params:{
            id: id1,
            status: i
        }
    })
}
async function getBlog(page,pageSize) {
    let userid=localStorage.getItem("LoginUserId");
    return await request({
        url:"/blog/page",
        method:"get",
        params:{
            pageSize:pageSize,
            pageNum:page,
            userId:userid
        }
    })
}
async function getBlogNonCount(id) {
    return await request({
        url:"/comment/blogNonCount",
        method:"get",
        params:{
            blogId:id
        }
    })
}
function setPageData(e) {

    if(e.blogId!==null){
        getCommentPage(e.pageQuary).then(re=>{
            e.recommentList=re.data.data.records;
            e.activeName='2';
            e.total=re.data.data.total
        })
    }
    else {
        ElementUI.Message.error("请选择要管理的博客");
    }
}
function cleanPageData(e) {
    e.pageQuary={
        input:null,
        userId:null,
        blogId:e.blogId,
        page:1,
        pageSize:5,
        time:null,
        status:null
    }
    e.recommentList=[]
}
function updateCommentStuats(id,i) {
    updateComment(id,i)
}
function getImage (image) {
    return `${image}`
}
function getImage1 (image) {
    return `api/common/downlaod?name=${image}`
}
// eslint-disable-next-line no-unused-vars
async function handlePostRecomment(data){
    return await request({
        url:"/recomment/postRecomment",
        method:"post",
        data
    })
}
async function handlePostComment(data){
    return await request({
        url:"/comment/postMianComment",
        method:"post",
        data
    })
}
async function getUserInfoById(id){
    return await request({
        url:"/user/getInfoById",
        method:"get",
        params:{
            id:id
        }
    })
}
async function getUserInfoByPid(pid){
    return await request({
        url:"/user/getInfoByPid",
        method:"get",
        params:{
            id:pid
        }
    })
}
async function getRecommentPage(data) {
    return await request({
        url:"/recomment/getPageRecommentFromMainComment",
        method:"post",
        data
    })
}
async function getRecomentReCount(id) {
    return await request({
        url:"/recomment/getRecomentReCount",
        method:"get",
        params:{
            id:id
        }
    })
}
async function getById(id) {
    return await request({
        url:"/comment/getById",
        method:"get",
        params:{
            id:id
        }
    })
}

export default {
    getById,
    getRecomentReCount,
    getUserInfoById,
    getCommentPage,
    updateComment,
    getBlog,
    getBlogNonCount,
    setPageData,
    cleanPageData,
    updateCommentStuats,
    getImage,
    handlePostRecomment,
    handlePostComment,
    getRecommentPage,
    getUserInfoByPid,
}
