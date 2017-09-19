<template>
    <div class="detail" id="detail">
       <div class="top">
           <div class="back" @click="routerBack"><img src="../assets/img/arrows.png"></div>
       </div>
        <img :src="require('../assets/img/product/'+num+'.jpg')" class="top-img">
        <div class="content">
            <p>{{num}}小新510S-14IKB(I7/Windows 10 家庭版/8G/256G SSD/集显/粉)</p>
            <span class="money"><small>￥</small>5,299.00</span>
            <small class="yun">快递：0.00</small>
        </div>
        <div class="subjoin">
            <ul>
                <li>
                    <span>极速退货</span>
                    <span>正品保证</span>
                    <span>七天无理由退换</span>
                </li>
                <li>
                    <span>购买可得25积分</span>
                </li>
            </ul>     
        </div>
        <div class="bottom">
            <ul class="clearfix">
                <li>客服</li>
                <router-link tag="li" to="/shoping">购物车</router-link>
            </ul>
            <div class="btn">加入购物车</div>
        </div>
    </div>
</template>

<script>
import {getUrlValue} from '../assets/js/base.js';
export default {
    name: 'detail',
    components: {
        
    },
    data(){
        return{
            num: getUrlValue("key")
        }
    },
    methods:{
        routerBack(){
            this.$router.go(-1);
        }
    }

}
</script>

<style scoped  lang="less">
@import '../assets/css/base.css';
@import '../assets/css/detail.less';
</style>
