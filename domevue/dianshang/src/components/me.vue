<template>
    <div class="me">
        <footerbar></footerbar>
        <div class="top">
            <img src="../assets/img/me.png">
            <router-link tag="h2" to="/login">登录/注册</router-link>
            <!-- <h3>LEVEL: 1</h3> -->
        </div>
        <div class="tab-box">
            <div class="my-list clearfix">
                <a class="left">我的订单</a>
                <a class="right">查看全部订单</a>
            </div>
            <ul class="clearfix">
                <li>
                    <i class="me-ico tab1"></i>
                    <h4>待支付</h4>
                </li>
                <li>
                    <i class="me-ico tab2"></i>
                    <h4>待发货</h4>
                </li>
                <li>
                    <i class="me-ico tab3"></i>
                    <h4>待收货</h4>
                </li>
                <li>
                    <i class="me-ico tab4"></i>
                    <h4>待评价</h4>
                </li>
            </ul>
        </div>
        <div class="list">
            <ul>
                <li class="item1 clearfix">
                   <i class="me-ico"></i>
                   <h4>优惠券</h4> 
                   <a href="" class="go"><img src="../assets/img/arrows.png"></a>
                </li>
                <li class="item2 clearfix">
                   <i class="me-ico"></i>
                   <h4>活动</h4> 
                   <a href="" class="go"><img src="../assets/img/arrows.png"></a>
                </li>
                <li class="item3 clearfix">
                   <i class="me-ico"></i>
                   <h4>联系客服</h4> 
                   <a href="" class="go"><img src="../assets/img/arrows.png"></a>
                </li>
                <li class="item4 clearfix">
                   <i class="me-ico"></i>
                   <h4>关于我们</h4> 
                   <a href="" class="go"><img src="../assets/img/arrows.png"></a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import footerbar from '@/components/footer';
import '../assets/js/base.js';
export default {
  name: 'me',
  components: {
    footerbar
  }
}
</script>

<style scoped  lang="less">
@import '../assets/css/base.css';
@import '../assets/css/me.less';
</style>
