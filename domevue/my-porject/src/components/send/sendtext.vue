<template>
	<transition name="sendtext">
	  <div class="send-text" v-if="sendtextOpen">
	  	<ul class="top">
	  		<li v-on:click="closeSendtext" class="back left">×</li>
	  		<li class="title">text post</li>
	  		<li class="send right">post</li>
	  	</ul>
	  	<div class="content">
	  		<input type="text" name="title" placeholder="An interesting title">
	  		<textarea placeholder="You text post (optional)"></textarea>
	  	</div>
	  </div>
	</transition>
</template>

<script>

export default {
  name: 'send-text',
 	data(){
 		return{
 		}
 	},
 	props:['sendtextOpen'],
 	methods: {
    closeSendtext: function () {
      this.$emit('closeSendtext')
    }
  },
}

</script>

<style lang="less" scoped>
.send-text{
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	z-index: 1001;
	background-color: #fff;
}
.top{
	.title{
		text-transform:capitalize;
	}
	.back{
		font-size: .6rem;
		line-height: .9rem;
		
	}
	.send{
		color: #009a61;
	}
}
.content{
	padding: 0.2rem;
}
input,textarea{
	display: block;
	border: none;
	width: 100%;
}
input{
	font-size: .28rem;
	line-height: 0.8rem;
	margin-bottom: 0.4rem
}
textarea{
	line-height: 0.4rem;
	height: 4rem;
}
.sendtext-enter-active, .sendtext-leave-active{
  transition: all 0.3s ease;
   
}
.sendtext-enter, .sendtext-leave-active{
  transform: translate(0,100%);
}
</style>
