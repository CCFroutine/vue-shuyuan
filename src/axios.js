import axios from 'axios'
import router from '@/router/index'
import bus from '@/bus'

// axios.defaults.baseURL = '/api'
axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? '/api' : 'http://localhost:3000/api';
// axios.defaults.baseURL=process.env.NODE_ENV==='development'?'/api':'http://localhost:3000/api'
axios.interceptors.request.use((config) => {
     
    // console.log(config) 
    const token = localStorage.getItem('token')
    token ? config.headers.common['Authorization'] = "Bearer " + token : null
    
    return config

},(err) => {
    return Promise.reject(err)
})

axios.interceptors.response.use((res) => {
    if(res.data.res_code === 401){
        router.push('/login')
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        bus.$emit('logout')
    }
    return res
},(err) => {
    return Promise.reject(err)
})
export default axios