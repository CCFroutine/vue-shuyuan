<template>
    <div class="row container">
        <yd-list 
        :articles="channelList.articles"
        :count="channelList.count"
        :page="channelList.page"></yd-list>
        <yd-list-top10
        :articles="channelListTop10.articles"
        :type="channelListTop10.type"></yd-list-top10>
    </div>
</template>

<script>
import bus from '@/bus.js'
import ydList from '@/components/channel/ydList'
import ydListTop10 from '@/components/channel/ydListTop10'
import {getListData,getList} from '@/service/getData'
export default {
    components:{
        ydList,ydListTop10
    },
    data(){
        return{
            channelList:{},
            channelListTop10:{}
        }
    },
    created(){
        const id = this.$route.params.id
        // console.log(id)
        getListData(id).then(([getList,getListTop10]) => {
            // console.log(getListTop10.data.res)
                this.channelList = getList.data.res
                this.channelListTop10 = getListTop10.data.res
        })
        bus.$off('send:page')
        bus.$on('send:page',(page)=>{
            console.log(page,id)
            getList(id,page).then(res=>{
                this.channelList = res.data.res
            })
        })
    },
    deactivated(){
        bus.$off('send:page')
    }
}
</script>

<style>

</style>
