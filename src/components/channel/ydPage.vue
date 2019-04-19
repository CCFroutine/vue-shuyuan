<template>
    <div class="page">
        <ul v-if="pages" class="row">
            <li @click="sendPage(currentPage-1)" class="pull-left next-prve" v-if="currentPage > 1">上一页</li>
            <template  v-for="page in pages">
                 <li 
                 @click="sendPage(page)"
                 v-if="page >= start && page<= end"
                class="pull-left num-page"
                :key="page"
                :class="{active:currentPage === page}">{{page}}</li>
            </template>
           <li @click="sendPage(currentPage+1)" class="pull-left next-prve" v-if="currentPage < pages">下一页</li>
        </ul>
    </div>
</template>

<script>
import bus from '@/bus.js'
export default {
    props:{
        pages:Number,
        currentPage:Number
    },
    data(){
        return{
            interval:3
        }
    },
    methods:{
        sendPage(page){
            bus.$emit('send:page',page)
        }
    },
    computed:{
        start(){
            let num = Math.max(1,this.currentPage-this.interval)
            if((this.currentPage+this.interval)>this.page){
                num = (this.page-2*this.interval) < 1 ? 1 : (this.pages-2*this.interval);
            }
            return num
        },
        end(){
            let num = Math.min(this.currentPage + this.interval,this.pages)
            if(this.currentPage < (this.interval + 1)){
                num = (2 * this.interval+1) > this.pages ? this.pages :(2*this.interval +1)
            }
            return num
        }
    }
}
</script>

<style>
.page{
    width: 620px;
    height: 100px;
    text-align: center;
    line-height: 60px;
}

.active{
    color:red;
}
/* .next-prve{
    border:1px solid red;
    border-radius: 50px;
} */
</style>
