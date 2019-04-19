<template>
    <div class="comment">
        <div class="comment-heading">
            <textarea v-model="content"></textarea>
            <button @click="sendContent">发布</button>
        </div>
        <div class="comment-body">
            <span>最新评论({{comments.length}})</span>
            <ul>
                <li class="comment-item"
                v-for="(comment,index) in comments"
                :key="comment.id">
                    <img :src="comment.img_url" alt="">
                    <div class="item-body">
                        <div>
                            <span class="name">{{comment.nikiname}}</span>
                            <span class="time">{{comment.reply_time}}</span>
                            <span v-if="comment.isDel" @click="del(comment.id,index)">x</span>
                        </div>
                        <p>{{comment.content}}</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import {userComment,delComment} from '@/service/getData'
export default {
    data(){
        return{
            content:''
        }
    },
    props:{
        comments:Array
    },
    methods:{
        sendContent(){
            const id = this.$route.params.id
            userComment({article_id:id,content:this.content}).then((res)=>{
                // console.log(res)
                if(res.data.res_code === 200){
                    this.$emit('send:content',res.data.res)
                    this.content=''
                }
            })
        },
        del(id,index){
            delComment(id).then((res)=>{
                console.log(res)
                if(res.data.res_code === 200){
                    this.$emit('del:comment',index)
                }
            })
        }

    }
}
</script>

<style>

</style>
