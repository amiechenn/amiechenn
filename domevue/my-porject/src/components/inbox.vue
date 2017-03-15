<template>
  <div class="inbox">
    <footerbar></footerbar>
    <div>
    	<ul class="top">
    		<li class="writer left"></li>
				<li class="title">Inbox</li>
				<li class="set right"></li>
			</ul>
			<ul class="nav">
				<li v-on:click="toggleTabs('tab1',1)" :class="{active:active==1}">messages</li>
				<li v-on:click="toggleTabs('tab2',2)" :class="{active:active==2}">comments</li>
				<li v-on:click="toggleTabs('tab3',3)" :class="{active:active==3}">post replies</li>
				<li v-on:click="toggleTabs('tab4',4)" :class="{active:active==4}">mentions</li>
			</ul>
      
      <div class="box">
        <transition v-bind:name="dir"> 
        <div :is="currentView" class="rel"  keep-alive></div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import footerbar from '@/components/footerbar'
import tab1 from '@/components/inbox/message'
import tab2 from '@/components/inbox/message2'
import tab3 from '@/components/inbox/message3'
import tab4 from '@/components/inbox/message4'

export default {
  name: 'inbox',
  components: {
    footerbar,
    tab1,
    tab2,
    tab3,
    tab4
  },
  data(){
    return{
      dir:'left',
      currentView: tab1,
      active:1
    }
  },
  methods: {
    //绑定tab的切换事件
    toggleTabs: function(tabText,index) {
      this.currentView = tabText;
      if(index>this.active){
        this.dir = 'left'
        this.active = index
      }else{
        this.dir = 'right'
        this.active = index
      }
    }
  }
}

</script>

<style scoped lang="less">
.nav{
  background-color: #fff;
  line-height: 0.8rem;
  text-transform: capitalize;
  border-bottom: 1px solid #e2e2e2;
  li{
    float: left;
    width: 25%;
    text-align: center;
    border-bottom: 2px solid #fff;
    color: #C0BFBF;
  }
  .active{
    border-bottom: 2px solid #009a61;
    color: #2c3e50;
  }
}
.left-enter-active, .left-leave-active{
  transition: all 0.5s ease;
}
.left-enter{
  transform: translate(100%,0);
}
.left-leave-to{
  transform: translate(-100%,0);
}
.right-enter-active, .right-leave-active{
  transition: all 0.5s ease;
}
.right-enter{
  transform: translate(-100%,0);
}
.right-leave-to{
  transform: translate(100%,0);
}
.box{
  position: relative;
}
.rel{
  position: absolute;
  top: 0;
  left: 0;
}
</style>
