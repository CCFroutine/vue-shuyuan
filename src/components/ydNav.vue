<template>
   <div class="nav">
        <nav>
            <router-link
            exact
            active-class="active"
            v-for="type in types"
            :key="type.id"
            :to="'/channel/' + type.id">{{type.type}}</router-link>
            <!-- <yd-user 
            :user="user"
            @logout="user=''"></yd-user> -->
            <yd-user 
            :user="user"
            @logout="qqq"></yd-user>
        </nav>
    </div>
</template>

<script>
import {getTypes} from '@/service/getData'
import ydUser from '@/components/ydUser'
import bus from '@/bus.js'
export default {
    components:{
        ydUser
    },
    data(){
        return{
            types:[],
            user:localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : ''
        }
    },
 methods:{
     qqq(){
        this.user=''
    }
 },
  created() {
    // this.getNav();
    getTypes().then(res=>{
        if(res.data.res_code === 200){
            this.types = res.data.res
        }
    })
    bus.$on('send:user',(user)=>{
        this.user = user
    })
    bus.$on('logout',()=>{
        this.user = {}
    })
    
  }
};
</script>

<style>
.nav{
    background: #fff
}
nav{
    width: 1010px;
    margin: 0 auto;
    height: 100px;
    line-height: 100px;
}
nav a{
    float:left;
    margin-right:20px;
    padding: 0 20px;
}
nav .active{
    color:#f30;
}
</style>
