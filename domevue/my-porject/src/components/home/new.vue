<template>
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
</template>
<script>
import {upLoad,downLoad} from '../../assets/js/util.js'
import homeJson from '../../../static/home.json'

export default {
  name: 'new',
  data () {
    return {
      items:'',
      itemsList:'',
      localItem:homeJson
    }
  },
  mounted:function(){
    let self = this
    this.getJson()
    window.addEventListener('scroll', this.newDownLoad);
    
    upLoad(this.$refs.list,function(){
      self.itemsList.unshift(self.itemsList[3])
    })
  },
  beforeDestroy:function(){
    window.removeEventListener('scroll', this.newDownLoad);
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
    newDownLoad:function(){
    	 let self = this
    	 downLoad(self.$refs.list,function(){
        self.itemsList.push(self.itemsList[0])
      })
    }
    
    
    
  }

}

</script>
<style lang="less" scoped>
.area{
  padding: 0 .20rem;
  background-color: #fff;
  margin-bottom: .2rem;
  // height: 8rem;
}
.list{
  position: relative;
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
.top{
  color: #C0BFBF;
  line-height: .8rem;
  border-bottom: 1px solid #f5f5f5;
  .more-btn{
    float: right;
    font-size: .5rem;
  }
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

</style>