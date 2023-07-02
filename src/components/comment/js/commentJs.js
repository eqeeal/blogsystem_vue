import {getCommentPage, updateComment} from "@/components/comment/api/comment";
import ElementUI from "element-ui";

export function setPageData(e) {
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
export function cleanPageData(e) {
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
export function updateCommentStuats(id,i) {
    updateComment(id,i)
}
export function getImage (image) {
    return `api/common/download?name=${image}`
}
// eslint-disable-next-line no-unused-vars
export function handlePostRecomment(index,row){

}
