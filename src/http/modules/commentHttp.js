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
    let userid=localStorage.getItem("userId");
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
    return `api/common/download?name=${image}`
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
export default {
    getCommentPage,
    updateComment,
    getBlog,
    getBlogNonCount,
    setPageData,
    cleanPageData,
    updateCommentStuats,
    getImage,
    handlePostRecomment,
    handlePostComment
}
