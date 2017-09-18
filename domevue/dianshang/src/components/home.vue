<template>
    <div class="home" id="home">
        <footerbar></footerbar>
        <form action="javascript:search();" class="search">
            <span class="logo ico"></span>
            <input type="search" name="搜索" placeholder="请输入搜索内容" class="ico">
        </form>
        <div class="area">
            <div class="banner">
                <img src="../assets/img/banner.jpg">
            </div>
            <div class="tab-box">
                <ul class="clearfix">
                    <li>
                        <span class="ico item1"></span>
                        <h3>笔记本</h3>
                    </li>
                    <li>
                        <span class="ico item2"></span>
                        <h3>Yoga系列</h3>
                    </li>
                    <li>
                        <span class="ico item3"></span>
                        <h3>一体机</h3>
                    </li>
                    <li>
                        <span class="ico item4"></span>
                        <h3>其他</h3>
                    </li>
                </ul>
            </div>
        </div>
        <div class="area new-box">
            <h1 class="title">新品上市<small>/NEW ARRIAVEL</small></h1>
            <div class="item">
                <img src="../assets/img/1.jpg">
                <div class="text">
                    <h2>小新超燃版 510S-IKB 粉色</h2>
                    <p>Windows10 家庭版/I7/Windows 10 家庭版/14英寸/4G/1T/粉</p>
                    <strong class="money">￥4,699.00</strong>
                </div>
            </div>
            <div class="item">
                <img src="../assets/img/1.jpg">
                <div class="text">
                    <h2>小新超燃版 510S-IKB 粉色</h2>
                    <p>Windows10 家庭版/I7/Windows 10 家庭版/14英寸/4G/1T/粉</p>
                    <strong class="money">￥4,699.00</strong>
                </div>
            </div>
        </div>
        <div class="area hot-box">
            <h1 class="title">明星产品<small>/HOT SALE</small></h1>
            <swiper :options="swiperOption" ref="mySwiper" class="clearfix hot-list">
                <swiper-slide class="item">
                    <img src="../assets/img/1.jpg">
                    <div class="text">
                        <h2>联想YOGA平板3</h2>
                        <strong class="money">￥4,699.00</strong>
                    </div>
                </swiper-slide>
                <swiper-slide class="item">
                    <img src="../assets/img/2.jpg">
                    <div class="text">
                        <h2>联想YOGA平板3</h2>
                        <strong class="money">￥4,699.00</strong>
                    </div>
                </swiper-slide>
                <swiper-slide class="item">
                    <img src="../assets/img/2.jpg">
                    <div class="text">
                        <h2>联想YOGA平板3</h2>
                        <strong class="money">￥4,699.00</strong>
                    </div>
                </swiper-slide>
                <swiper-slide class="item">
                    <img src="../assets/img/2.jpg">
                    <div class="text">
                        <h2>联想YOGA平板3</h2>
                        <strong class="money">￥4,699.00</strong>
                    </div>
                </swiper-slide>
                <swiper-slide class="item">
                    <img src="../assets/img/2.jpg">
                    <div class="text">
                        <h2>联想YOGA平板3</h2>
                        <strong class="money">￥4,699.00</strong>
                    </div>
                </swiper-slide>
               
            </swiper>
        </div>
        <div class="area lottery-box">
            <h1 class="title">开心翻翻乐<small>/LOTTERY</small></h1>
            <router-link tag="a" to="/lottery"><img src="../assets/img/lottery-banner.jpg" width="100%"></router-link>
        </div>
        <div class="area product-box">
            <h1 class="title">商品推荐<small>/RECOMMENDATION</small></h1>
            <div class="list" >
                <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" :bottom-distance="5" @bottom-status-change="handleBottomChange" ref="loadmore">                   
                <ul class="clearfix"> 
                    <li v-for="(item,index) in itemList" :class="index%2==0?'left':'right'">
                        <router-link tag="a" :to="{path:'detail',query: {key:item}}">
                            <img src="../assets/img/2.jpg">
                            <h2>{{item}}</h2>
                        </router-link>
                        <div class="bottom clearfix">
                            <strong class="money">￥4,699.00</strong>
                            <a class="more">···</a>
                        </div>
                        
                    </li>
                </ul>
                <div slot="bottom" class="mint-loadmore-bottom">
                  <span v-show="bottomStatus === 'drop'" :class="{ 'rotate': bottomStatus === 'drop' }">释放更新</span>
                  <span v-show="bottomStatus === 'pull'">上拉加载</span>
                  <span v-show="bottomStatus === 'loading '">努力加载中</span>
                </div>
                </mt-loadmore>
            </div>
        </div>
    </div>
</template>

<script>
import footerbar from '@/components/footer';
import '../assets/js/base.js';
export default {
    name: 'home',
    components: {
        footerbar
    },
    data(){
        return{
            swiperOption: {
                autoplay: 3000,
                setWrapperSize:true,
                loop : true,
                slidesPerView : 2.5,
             
            },
            itemList: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],
            allLoaded: false,
            bottomStatus: ''

        }
    },
    methods:{
        handleBottomChange(status) {
            this.bottomStatus = status;
        },
        loadBottom: function () {
          for(var i = 1;i < 3; i++){
            this.itemList.push(this.itemList[i])
          }          
          // this.allLoaded = true;// 若数据已全部获取完毕
           this.$refs.loadmore.onBottomLoaded();
        }
    }
}
</script>

<style scoped  lang="less">
@import '../assets/css/base.css';
@import '../assets/css/home.less';
</style>
