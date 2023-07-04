import axios from "axios"
let baseUrl = "http://localhost:8081"//请求前缀
export default function request(option) {
    return axios({
        ...option,
        url: baseUrl + option.url
    })
}
