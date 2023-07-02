import axios from "axios";


const commentApi = axios.create({
    timeout: 5000,
    headers: {
        'Content-Type': "application/json; charset=utf-8"
    },
    baseURL:"/api"
})

commentApi.interceptors.request.use(config => {
    config.headers['Authorization'] = "test"
    return config
})
commentApi.interceptors.response.use(res=>{
    // console.log(res)
    return res
})
commentApi.interceptors.response.use(response=>{
    let res = response
    //console.log(res)
    if(res.status === 200){
        return response
    }else{
        return Promise.reject(response.data.msg)
    }
},error=>{
        return Promise.reject(error)

})
export default commentApi;
