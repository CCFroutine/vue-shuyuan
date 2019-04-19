<template>
    <div class="row container">
        <!-- 左侧 详情 评论 -->
       <div class="wrapper pull-left">
           <!-- 文章详情 -->
           <yd-article 
           :article="article"></yd-article>
           <!-- <div v-else class="">未找到页面</div> -->
           
           <!-- 评论  -->
           <yd-comment 
           :comments="comments"
           @send:content="getContent"
           @del:comment="delComment"></yd-comment>
       </div>
       <div class="aside pull-right">
           <!-- 轮播 -->
           <yd-banner :banners="banners"></yd-banner>
       </div>
    </div>
</template>

<script>
// 引入获取文章详情接口
import {getArticle,getComments,getBanner} from '@/service/getData'
import ydArticle from '@/components/article/ydArticle.vue'
import ydComment from '@/components/article/ydComment.vue'
import ydBanner from '@/components/article/ydBanner.vue'
export default {
    components:{
        ydArticle,
        ydComment,
        ydBanner
    },
    data(){
        return{
            article:{},
            comments:[],
            banners:[]
        }
    },
    methods:{
       getContent(comment){
           this.comments.push(comment)
       },
       delComment(index){
           this.comments.splice(index,1)
       }
    },
    activated(){
        // document.querySelector('title').innerText=this.article.title
    },
    beforeRouteUpdate(to,from,next){
        if(!this.article.title){
            next('/404')
        }else{
            next()
        }
    },
    created(){
        const id = this.$route.params.id
        // console.log(id)
        getArticle(id).then( res => {
            // console.log(res)
            if(res.data.res_code===200){
                this.article = res.data.res
                // document.querySelector('title').innerText=this.article.title
            }else{
                 // 需要用代码跳到404
                this.$router.replace('/404')
            }
        })
        getComments(id).then(res => {
            // console.log(res)
            if(res.data.res_code === 200){
                this.comments = res.data.res
            }
        })
        getBanner().then(res=>{
            // console.log(res)
            this.banners = res.data.res
        })
    }
}
</script>

<style>

</style>
