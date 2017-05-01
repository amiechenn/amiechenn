<template>
  <div class="footerbar">
    <ul class="footer">
      <router-link tag="li" to="/home"><i class="icon icon-1"></i></router-link>
      <router-link tag="li" to="/search"><i class="icon icon-2"></i></router-link>
      <li v-on:click="sendShow = !sendShow" class="send-li"><i v-bind:class="{hide:sendShow}" class="icon icon-5"></i></li>
      <router-link tag="li" to="/inbox"><i class="icon icon-3"></i></router-link>
      <router-link tag="li" to="/user"><i class="icon icon-4"></i></router-link>
    </ul>
    <transition name="overlay"> 
        <div class="overlay" v-if="sendShow">
          <div class="overlay-bg" v-on:click="sendShow = !sendShow"></div>
            <div class="box2" >
              <h2>发布</h2>
               <ul>
                <li  v-on:click="sendtextShow = !sendtextShow;sendShow = !sendShow"><i class="icon icon-6"></i><p>文字</p></li>
                <li  v-on:click="sendimgShow = !sendimgShow;sendShow = !sendShow"><i class="icon icon-7"></i><p>图文</p></li>
              </ul>
              <i class="zf"></i>
              <span v-on:click="sendShow = !sendShow" class="close-send icon"></span>
            </div>
        </div>
    </transition>
    <sendtext :sendtextOpen="sendtextShow" v-on:closeSendtext="FcloseSendtext"></sendtext>
    <sendimg :sendtextOpen="sendimgShow" v-on:closeSendtext="FcloseSendtext"></sendimg>
  </div>
</template>

<script>
import sendtext from '@/components/send/sendtext'
import sendimg from '@/components/send/sendimg'
export default {
  name: 'footerbar',
  components: {
    sendtext,
    sendimg
  },
  data () {
    return {
      sendShow: false,
      sendtextShow:false,
      sendimgShow:false
    }
  },
  methods: {
    FcloseSendtext: function () {
      this.sendtextShow = false
      this.sendimgShow = false
    }
  }
  
}
</script>

<style lang="less" scoped >
.router-link-active{
  color: #009a61;
}
.footer{
  position: fixed;
  bottom: 0;
  width: 100%;
  height: .9rem;
  border-top: 1px solid #e2e2e2;
  background-color: #fff;
  z-index: 999;
  li{
    float: left;
    width: 20%;
    text-align: center;
    i{
      font-style: normal;
    }
  }
  .hide{
    opacity: 0;
    transform:rotate(45deg);
  }
  .send-li{
    i{
      transition: all 0.3s linear;
    }
  }
  i{
    display: block;
    margin:auto;
    width: .7rem;
    height: .7rem;
    margin-top: 0.1rem;
  }
  .router-link-active{
     .icon-1{
      background-position: 0 -.67rem;
     }
     .icon-2{
      background-position: -.65rem -.68rem;
    }
    .icon-3{
      background-position: -1.3rem -.68rem;
    }
    .icon-4{
      background-position: -1.9rem -.68rem;
    }
  }
  .icon-1{
    background-position:  0 0rem;
   }
  .icon-2{
    background-position: -.65rem 0;
  }
  .icon-3{
    background-position: -1.3rem 0;
  }
  .icon-4{
    background-position: -1.9rem 0;
  }
  .icon-5{
    background-position: -2.61rem 0;
  }
}

.overlay{
  .box2{
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    bottom: 1.1rem;
    left: 50%;
    width: 70%;
    margin-left: -35%;
    box-sizing: border-box;
    padding-top: 0.1rem;
     h2{
      text-align: center;
      font-weight: normal;
      font-size: .34rem;
      padding: 0.2rem 0;
    }
  }
  ul{
    padding: 0 0.1rem;
    text-align: center;
    padding-bottom: 0.2rem;
  }
  li{
    float: left;
    width: 50%;
    i{
      display: block;
      width:1.2rem;
      height: 1.2rem;
      margin: auto; 
    }
    .icon-6{
      background-position: 0 -3.05rem;
    }
    .icon-7{
      background-position: -1.62rem -3.05rem;
    }
  }
  .zf{
    display:block;
    width: 0.3rem;
    height: 0.3rem;
    background-color: #fff;
    position: absolute;
    bottom: -0.14rem;
    transform:rotate(45deg);
    left: 50%;
    margin-left: -0.15rem;
  }
  p{
    font-size: 0.2rem;
    line-height: 0.4rem;
  }
  span{
    display: block;
    position: absolute;
    left: 50%;
    margin-left: -0.35rem;
    bottom: -1rem;
    width: .7rem;
    height: .7rem;
    background-position: -2.61rem -.69rem;
    transform:rotate(45deg); 
  }
}
.overlay-enter-active, .overlay-leave-active{
  transition: all 0.2s linear;
  .close-send{
    transition: all 0.2s linear;
    
  }
}
.overlay-enter, .overlay-leave-to{
  opacity: 0 ;
  .close-send{
    transform: rotate(0deg);
    color: #2c3e50;
  }
}
.text-transition { 
  transition: transform 1s linear;
}
.text-enter{
  transform: translate(0,-100px);
  opacity: 0;
}
.text-leave {
  transform: translate(0,100px);
  opacity: 0;
}
</style>
