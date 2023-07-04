import request from "../request";
//所有的链接列表
function getAllLinks(){
    return request({
        url:"/link/findAll"
    })
}
export default{
    getAllLinks
}