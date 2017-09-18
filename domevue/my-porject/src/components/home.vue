<template>
  <div class="home" id="home">
    <footerbar></footerbar>
    <div class="nav">
      <div class="sel-top">
        <div class="tab">
          <span v-on:click="currentView ='newp';selTop = 1">最新</span>
          <span v-on:click="currentView ='hotp';selTop = 2">热门</span>
        </div>
        <b class="line" :class="{line2:currentView =='hotp'}"></b>
      </div>
    </div>
    
    <div class="list-box">
      <transition :is="currentView" keep-alive >

      </transition>
        
    </div>
    
    
    <transition name="overlay"> 
    <div class="overlay" v-if="moreShow">
      <div class="overlay-bg" v-on:click="moreShow = !moreShow"></div>
        <div class="box">
           <ul>
            <li>收藏</li>
            <li>举报</li>
          </ul>
          <span v-on:click="moreShow = !moreShow">取 消</span>
        </div>
    </div>
    </transition>

  </div>
</template>

<script>
import footerbar from '@/components/footerbar'
import newp from '@/components/home/new'
import hotp from '@/components/home/hot'
export default {
  name: 'home',
  components: {
    footerbar,
    newp,
    hotp
  },
  data () {
    return {
      moreShow: false,
      selTop:1,
      currentView: newp
    }
  },
  methods: {
    toggleTabs:function(){

    }
  }

}



</script>

<style lang="less" scoped>
.nav{
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #F7F7F5;
  z-index: 1000;
}
.sel-top{
  font-size: .28rem;
  line-height: 0.9rem;
  text-align: center;
  position: relative;
  width: 3rem;
  left: 50%;
  margin-left: -1.5rem;
  span{
    display: inline-block;
    width: 48%;
  }
  .line{
    display: block;
    height: 2px;
    width: 1rem;
    background-color: #40D7C2;
    position: absolute;
    bottom: 0;
    left: 0;
    transform:translateX(0.24rem);
    transition:all .3s;
  }
  .line2.line{
    transform:translateX(1.8rem);
    background-color: #ed741c;
  }
}
.list-box{
  margin-top: 0.9rem;
}


.mint-loadmore-top{
  margin-top: -1.1rem;
  .icon-1{
    background-position: 0 -.69rem;
    display: block;
    margin:auto;
    width: .7rem;
    height: .7rem;
    margin-top: 0.1rem;
    animation: loading 1s linear infinite alternate;
  }
}
@keyframes loading
{
from {transform: scale(.8);}
to {transform: scale(1.2);}
}
.icon-9{
  display: inline-block;
  width: .4rem;
  height: .4rem;
  background-position: -1.5rem -1.52rem;
  vertical-align: middle;
} 

</style>
