<template>
    <div class="login">
        <div class="from-group">
            <input v-model="user.email" type="text" class="emil" placeholder="请输入邮箱">
        </div>
        <div class="from-group">
            <input v-model="user.password" type="text" class="passdword" placeholder="请输入密码">
        </div>
        <div class="from-group">
            <button class="btn" @click="login">登入</button>
        </div>
    </div>
</template>

<script>
import {login as userlogin} from '@/service/getData'
import bus from '@/bus.js'
export default {
    data(){
        return{
            user:{
                email:'',
                password:''
            }
        }
    },
    methods:{
        login(){
            userlogin(this.user).then(res=>{
                // console.log(res)
                if(res.data.res_code === 200){
                   this.$router.replace('/') 
                   localStorage.setItem('token',res.data.res.token)
                   localStorage.setItem('user',JSON.stringify(res.data.res.user))
                    bus.$emit('send:user',res.data.res.user)
                    this.user.password=''
                }
            })
        }
    }
}
</script>

<style>
.login{
    width: 1010px;
    margin:30px auto;
}
.from-group{
    margin-bottom:20px;
}
.from-group input{
    border:none;
    background: #fff;
    padding: 15px;
    width: 300px;
}
.from-group .btn{
    border:none;
    background: #f30;
    padding: 10px;
    width: 80px;
    color:white;
}
</style>
