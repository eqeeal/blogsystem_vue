import commentApi from "@/components/comment/js/commentApi";
export function getCommentPage(data) {
    return commentApi({
        url:"/comment/page",
        method:"post",
        data
    })
}
export function updateComment(id1,i) {
    return commentApi({
        url:"/comment/updateMianCommentStatus",
        method:"get",
        params:{
            id: id1,
            status: i
        }
    })
}
export function getBlog(page,pageSize) {
    let userid=localStorage.getItem("userId");
    return commentApi({
        url:"/blog/page",
        method:"get",
        params:{
            pageSize:pageSize,
            pageNum:page,
            userId:userid
        }
    })
}
export function getBlogNonCount(id) {
    return commentApi({
        url:"/comment/blogNonCount",
        method:"get",
        params:{
            blogId:id
        }
    })
}
