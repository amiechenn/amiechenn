<template>
  <div class="footerbar">
    <ul class="footer">
      <router-link tag="li" to="/index"><i class="ico icon-1"></i>首页</router-link>
      <router-link tag="li" to="/list"><i class="ico icon-2"></i>选购</router-link>
      <router-link tag="li" to="/shoping"><i class="ico icon-3"></i>购物车</router-link>
      <router-link tag="li" to="/me"><i class="ico icon-4"></i>我的</router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'footerbar'
}
</script>

<style lang="less" scoped >
.ico{
    background-image: url(../assets/img/icon.png);
    background-size: 4.90rem 3.86rem;
}
.footerbar{
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 1rem;
  border-top: 1px solid #e2e2e2;
  background-color: #fff;
  z-index: 999;
  line-height: 0.15rem;
  color: #e3ad88;
  li{
    float: left;
    width: 25%;
    text-align: center;
    font-size: 0.2rem;
    i{
      font-style: normal;
    }
  }
  i{
    display: block;
    margin:auto;
    width: .7rem;
    height: .7rem;
    margin-top: 0.05rem;
  }
  .router-link-active{
    color: #e86f6b;
     .icon-1{
      background-position: 0.03rem -.95rem;
     }
     .icon-2{
      background-position: -.85rem -.95rem;
    }
    .icon-3{
      background-position: -1.82rem -.95rem;
    }
    .icon-4{
      background-position: -2.65rem -.95rem;
    }
  }
  .icon-1{
    background-position:  0.03rem 0rem;
   }
  .icon-2{
    background-position: -.85rem 0;
  }
  .icon-3{
    background-position: -1.82rem 0;
  }
  .icon-4{
    background-position: -2.65rem 0;
  }
  
}

</style>
