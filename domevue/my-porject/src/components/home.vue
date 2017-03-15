<template>
  <div class="home" id="home">
    <footerbar></footerbar>
    <h1>reddit</h1>
    <div class="sel">
      <div class="sel-btn" v-on:click="sortShow = !sortShow"><i class="icon icon-9"></i><span>HOT POSTS</span><i class="arrows"></i></div>
    </div>
    <div style="height:5rem;">
      <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
        <ul class="list">
          <li class="area" v-for="(item, index) in itemsList">
            <div class="top">
              <span class="time">r{{index}}/{{item.community}}·{{item.time}}{{item.type}}</span>
              <span class="more-btn" v-on:click="moreShow = !moreShow">···</span>
            </div>
            <div class="content" :class="{'style1':item.type == 1,style2:item.type == 2}">
              <p>{{item.text}}</p>
              <span>
                <img :src="item.img" />
                <a><small>{{item.url}}</small></a>
              </span>
              
            </div>
            <div class="bottom">
              <ul>
                <li class="item1">
                  <i class="icon ico1" v-on:click="item.zan+=1;item.zanStatus=1" :class="{'active':item.zanStatus == 1}"></i>
                  <span>{{item.zan}}</span>
                  <i class="icon ico2"v-on:click="item.zan-=1;item.zanStatus=2" :class="{'active':item.zanStatus == 2}"></i>
                </li>
                <li class="item2">
                  <i class="icon ico3"></i>
                  <span>{{item.comment}}</span>
                </li>
                <li>
                  <i class="icon ico4"></i>
                  <span>Share</span>
                </li>
              </ul>
            </div>
          </li>
        </ul>
        <div slot="top" class="mint-loadmore-top">
          <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }"><i class="icon icon-1"></i></span>
          <span v-show="topStatus === 'loading'">Loading...</span>
        </div>
        
      </mt-loadmore>
    </div>
    <transition name="overlay"> 
    <div class="overlay" v-if="sortShow">
      <div class="overlay-bg" v-on:click="sortShow = !sortShow"></div>
        <div class="box">
          <h2>SORT POSTS BY:</h2>
           <ul>
            <li><i>☁</i>Hot</li>
            <li><i>☁</i>New</li>
            <li><i>☁</i>Top</li>
            <li><i>☁</i>Controversial</li>
          </ul>
          <span  v-on:click="sortShow = !sortShow">CLOSE</span>
        </div>
    </div>
    </transition>
    
  </scroller>
    <transition name="overlay"> 
    <div class="overlay" v-if="moreShow">
      <div class="overlay-bg" v-on:click="moreShow = !moreShow"></div>
        <div class="box">
           <ul>
            <li><i>☁</i>save</li>
            <li><i>☁</i>hide</li>
            <li><i>☁</i>report</li>
          </ul>
          <span v-on:click="moreShow = !moreShow">CLOSE</span>
        </div>
    </div>
    </transition>

  </div>
</template>

<script>
import Scroller from 'vue-scroller'
import footerbar from '@/components/footerbar'
import homeJson from '../../static/home.json'

export default {
  name: 'home',
  components: {
    footerbar,
    homeJson,
    Scroller
  },
  data () {
    return {
      sortShow: false,
      moreShow: false,
      count:0,
      items:homeJson,
      itemsList:homeJson.list,
      topStatus: '',
      allLoaded:false
    }
  },
  methods: {
    handleTopChange(status) {
      this.topStatus = status;
    },
    loadTop: function () {
      for(var i = 1;i < 3; i++){
        this.itemsList.push(this.itemsList[i])
      } 
      this.$refs.loadmore.onTopLoaded();
    },

    loadBottom: function () {
      for(var i = 1;i < 3; i++){
        this.itemsList.push(this.itemsList[i])
      }          
      // this.allLoaded = true;// 若数据已全部获取完毕
      this.$refs.loadmore.onBottomLoaded();
    }
  }
}



</script>

<style lang="less" scoped>
h1{
  font-size: .4rem;
  line-height: 0.9rem;
  text-align: center;
  background-color: #fff;
}
.sel{
  color: #C0BFBF;
  display: block;
  line-height: 0.9rem;
  padding-left: .2rem;
  border-bottom: 1px solid #e2e2e2;
  .sel-btn{
    width: 2.20rem;
  }
  span{
    display: inline-block;
    padding-right: 0.15rem;
    vertical-align: middle;
  }
  .arrows{
    display: inline-block;
    border-right: 0.12rem solid transparent;
    border-top: 0.12rem solid #C0BFBF;
    border-left: 0.12rem solid transparent;
    vertical-align: middle;
  }
  .icon-9{
    display: inline-block;
    width: .4rem;
    height: .4rem;
    background-position: -1.5rem -1.52rem;
    vertical-align: middle;
  } 
}
.area{
  padding: 0 .20rem;
  background-color: #fff;
  margin-bottom: .2rem;
  height: 400px;
}
.top{
  color: #C0BFBF;
  line-height: .8rem;
  border-bottom: 1px solid #f5f5f5;
  .more-btn{
    float: right;
    font-size: .5rem;
  }
}
.list{
  position: relative;
}
.bottom{
  color: #C0BFBF;
  line-height: .4rem;
  padding:0.2rem 0;
  ul{
    width: 100%;
  }
  li{
    float: left;
    width: 33.1%;
    text-align: center;
    span{
      padding: 0.2rem;
    }
  }
  .item1,.item2{
    border-right: 1px solid #e2e2e2;
  }
  i{
    display: inline-block;
    width: 0.3rem;
    height: 0.3rem;
  }
  .active.ico1{
    background-position: .04rem -1.94rem;
  }
  .active.ico2{
    background-position: -0.3rem -1.94rem;
  }
  .ico1{
    background-position: .05rem -1.52rem;
  }
  .ico2{
    background-position: -0.3rem -1.52rem;
  }
  .ico3{
    background-position: -0.7rem -1.52rem;
  }
  .ico4{
    background-position: -1.15rem -1.52rem;
  }
}
.content{
  padding:0.2rem 0;
  p{
    font-size: .3rem;
    padding-bottom: 0.2rem;
  }
}
.style1{
  img{
    width: 100%;
  }
  a{
    display: none;
  }
}
.style2{
  &:after{
    display: table;
    content:'';
    clear: both;
  }
  p{
    width: 70%;
    float: left;
    padding-right:.2rem;
    box-sizing: border-box;
  }
  span{
    float: left;
    width: 30%;
    position: relative;
    border-radius:5px;
    overflow: hidden;
    img{
      width: 100%;
      display: block;
    }
    a{
      background-color: rgba(0, 0, 0, 0.7);
      position: absolute;
      bottom: 0;
      color: #fff;
      width: 100%;
      box-sizing: border-box;
      padding: 0 .10rem;
      small{
        display: inline-block;
        overflow: hidden;
        line-height: .4rem;
        font-size: .26rem;
        width: 100%;
      }
    }
  }
}
.mint-loadmore-top{
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

</style>
