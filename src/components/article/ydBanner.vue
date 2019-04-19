<template>
    <div class="banner">
        <div class="banner-heading row">
            <h1 class="pull-left banner-title">其他相关节目</h1>
            <div class="control pull-right">
                <span @click="prev" :class="{disabled:index===0}">上</span>
                <span @click="next" :class="{disabled:index===4}">下</span>
            </div>
        </div>
        <div class="articles">
            <ul class="row"
            :style="{transform:'translate3d('+(-index*330)+'px,0,0)'}">
                <router-link 
                tag="li"
                v-for="article in banners"
                :key="article.id"
                class="pull-left"
                :to="'/article/' + article.id">
                <img height="84" width="100%" :src="article.img_url" alt="">
                <span class="tilte">{{article.title}}</span>
                </router-link>
            </ul>
        </div>
    </div>
</template>

<script>
// import getBanner from "@/service/getData"
export default {
    data(){
        return{
            index:0
        }
        
    },
    props:{
        banners:Array
    },
    methods:{
        prev(){
            if(this.index>0){
                this.index--
            }
        },
        next(){
            if(this.index<4){
                this.index++
            }
        }
    }
}
</script>

<style>
  .banner-title {
    font-weight: bold;
    border-left: 3px solid #f30;
    padding-left: 10px;
  }
  .articles {
    overflow: hidden;
    width: 300px;
  }
  .articles ul {
    width: 1650px;
    /* height: 278px; */
    transition: all .3s;
  }
  .articles li {
    width: 135px;
    margin-right: 30px;
    padding-top: 30px;
  }

  .banner .title {
    display: block;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-top: 10px;
    font-size: 12px;
    color: #707070;
  }
  .control i{
    font-size: 12px;
  }
  .control .disabled {
    color: #707070;
    cursor: not-allowed;
  }
</style>
