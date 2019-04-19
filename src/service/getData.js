import axios from '@/axios'
export const getTypes=()=>{
    return axios.get("/types")
}

export const getList=(id,page=1)=>axios.get(`/articles/${id}/page/${page}`)

export const getListTop10 = (id)=>axios.get(`/articles/${id}/top10`)

// 合并这个请求
export const getListData = (id)=>axios.all([getList(id),getListTop10(id)])

//  请求文章详情
export const getArticle = (id)=>axios.get(`/article/${id}`)

// 登入
 export const login = (user) => axios.post('/user/login',user)

 // 评论
 export const userComment = (comment) => axios.post('/comment',comment)
  
//获取评论列表
export const getComments = (id,page = 1) => axios.get(`/comments/${id}/page/${page}`)

//删除评论
export const delComment = (id) => axios.delete(`/comment/${id}`)
// 获取轮播图数据
export const getBanner = ()=> axios.get( `/articles/rand`)

//验证token
export const authToken = ()=> axios.post('/user/token')
