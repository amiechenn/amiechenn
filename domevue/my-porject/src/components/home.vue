<template>
  <div class="home" id="home">
    <footerbar></footerbar>
    <div class="sel-top">
      <div class="tab">
        <span v-on:click="topSel=1">最新</span>
        <span v-on:click="topSel=2">热门</span>
      </div>
      <b class="line" :class="{line2:topSel==2}"></b>
    </div>
    <div>
      <ul class="list" id="list" ref="list">
        <li class="area" v-for="(item, index) in itemsList">
          <div class="top">
            <span class="time">（{{index}}） {{item.time | time}}</span>
            <span class="more-btn" v-on:click="moreShow = !moreShow">···</span>
          </div>
          <div class="content" :class="{'style1':item.type == 1 ,style2:item.type == 2||item.type == 3}">
            <p>{{item.content}}</p>
            <span>
              <img :src="item.img" />
            </span>
            
          </div>
          <div class="bottom">
            <ul>
              <li class="item2">
                <i class="icon ico5" v-on:click="item.zan += 1;item.zanStatus=1" :class="{'active':item.zanStatus == 1}"></i>
                <span>{{item.zan}}</span>
                <!-- <i class="icon ico2"v-on:click="item.zan -= 1;item.zanStatus=2" :class="{'active':item.zanStatus == 2}"></i> -->
              </li>
              <li class="item2">
                <i class="icon ico3"></i>
                <span>{{item.comment}}</span>
              </li>
              <li>
                <i class="icon ico4"></i>
                <span>分享</span>
              </li>
            </ul>
          </div>
        </li>
      </ul>
        
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
import {upLoad,downLoad} from '../assets/js/util.js'
import homeJson from '../../static/home.json'
 
export default {
  name: 'home',
  components: {
    footerbar
  },
  data () {
    return {
      topSel:1,
      moreShow: false,
      count:0,
      items:'',
      itemsList:'',
      topStatus: '',
      allLoaded:false,
      localItem:homeJson
    }
  },
  mounted:function(){
    let self = this
    this.getJson()
    window.addEventListener('scroll', function(){
      downLoad(self.$refs.list,function(){
        self.itemsList.push(self.itemsList[0])
      })
    });
    
    upLoad(this.$refs.list,function(){
      self.itemsList.unshift(self.itemsList[3])
    })
  },
  beforeDestroy:function(){
    window.removeEventListener('scroll', downLoad);
  },
  methods: {
    getJson:function(){
      this.$http.get("http://127.0.0.1:8081/").then(
        (res) => {
        // 处理成功的结果
        this.items = res.data
        this.itemsList = res.data.object.list
      }, (res) =>  {
        // 处理失败的结果
        this.item = this.localItem
        this.itemsList = this.item.object.list
      })
    },
    
    
    
  }

}



</script>

<style lang="less" scoped>
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

.area{
  padding: 0 .20rem;
  background-color: #fff;
  margin-bottom: .2rem;
  // height: 8rem;
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
    width: 0.4rem;
    height: 0.3rem;
  }
  .active.ico1{
    background-position: .04rem -1.94rem;
  }
  .active.ico2{
    background-position: -0.3rem -1.94rem;
  }
  .active.ico5{
    background-position: -1.1rem -1.94rem;
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
  .ico5{
    background-position: -.69rem -1.94rem;
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
  
}
.style2{
  span{
    display: none;
  }
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
