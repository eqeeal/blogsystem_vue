import axios from "axios"
import ElementUI from "element-ui"
import router from "@/router"

axios.defaults.baseURL = "http://localhost:8081"
const request = axios.create({
    timeout: 5000,
	headers: {
		'Content-Type': "application/json;charset=utf-8"
	}
})
request.interceptors.request.use(config => {
	config.headers['Authorization'] = localStorage.getItem("token")
	return config
})
export default request