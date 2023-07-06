import request from "../requst.js"

async function getSystemById(data){
    return  await request({
        url:"/system/byId",
        method:"post",
        params:{
            id:data
        }
    })
}
async function updateSystem(data){
    return  await request({
        url:"/system/update",
        method:"post",
        data
    })
}

export default {
    getSystemById,
    updateSystem
}