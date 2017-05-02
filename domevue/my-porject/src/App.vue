<template>
  <div id="app" class="app">
    <keep-alive>
      <router-view ></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
body{
  margin:0;
  background-color: #F7F7F5;
  font-size: 0.24rem;
  padding-bottom: .9rem;
}
ul{
  list-style-type: none;
  &:after{
    display: table;
    content:'';
    clear: both;
  }
}
h1,h2,h3,h4,p,ul,li{
	margin:0;
   padding: 0;
}
i{
	font-style: normal;
}
a{
	text-decoration: none;
}
.top{
	line-height: .9rem;
	border-bottom: 1px solid #e2e2e2;
	position: relative;
	background-color: #fff;
  height: 0.9rem;
	li{
		display: block;
    height: 0.9rem;
	}
	.title{
		display: inline-block;
		font-weight: normal;
		text-align: center;
		width: 100%;
		font-size: .3rem;
	}
	.left{
		position: absolute;
		top: 0;
		left: 0;
		width: .9rem;
		text-align: center;
	}
	.right{
		position: absolute;
		top: 0;
		right: 0;
		width: .9rem;
		text-align: center;
	}
}
.overlay{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  .overlay-bg{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
  }
  .box{
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    bottom: 0.2rem;
    left: 50%;
    width: 95%;
    margin-left: -47.5%;
    box-sizing: border-box;
    overflow: hidden;
    opacity: 1;
    h2{
	    font-size: .24rem;
	    color: #C0BFBF;
	    border-bottom: 1px solid #e2e2e2;
	    padding: .2rem;
      font-size: normal;
	  }
    ul{
      padding: 0 0.2rem;
    }
    li{
      line-height: .9rem;
      text-transform:capitalize;
      text-align: center;
    }
    i{
      color: #C0BFBF;
      display: inline-block;
    }
    span{
      text-align: center;
      display: block;
      background-color: #f5f5f5;
      color: #C0BFBF;
      line-height: .7rem;
    }
  }
}
.overlay-enter-active, .overlay-leave-active{
  transition: all 0.3s ease;
  .overlay-bg{
    transition: all 0.3s ease;
  }
  .box{
    transition: all 0.3s ease;
  }   
}
.overlay-enter, .overlay-leave-to{
  .overlay-bg{
    opacity: 0 ;
  }
  .box{
    transform: translate(0,100%);
  }
}
.icon{
  background-size: 4.5rem;
  background-image: url('http://amiechenn.github.io/amiechenn/domevue/my-porject/static/icon.png');
  // background-image: url('assets/icon.png')
}
</style>
