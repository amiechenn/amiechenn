<template>
	<transition name="sendtext">
	  <div class="send-text" v-if="sendtextOpen">
	  	<form>
		  	<ul class="top">
		  		<li v-on:click="closeSendtext" class="back left">×</li>
		  		<li class="title">文字</li>
		  		<li class="send right" v-on:click="postText()">发布</li>
		  	</ul>
		  	<div class="content">
		  		<textarea placeholder="写点内容···" name="content" v-model="inputContent"></textarea>
		  	</div>
	  	</form>
	  </div>
	</transition>
</template>

<script>

export default {
  name: 'send-text',
 	data(){
 		return{
 			inputContent:'',
 			type:2,
 			time:new Date(),
 			comment:0,
 			zan:0
 		}
 	},
 	props:['sendtextOpen'],
 	methods: {
    closeSendtext: function () {
      this.$emit('closeSendtext')
    },
    postText:function(){
    	this.time = this.time.getTime()
      	this.$http.get("http://127.0.0.1:8081/textpost?content="+this.inputContent+"&type="+this.type+"&time="+this.time+"&comment="+this.comment+"&zan="+this.zan).then(
        	(res) => {
	        // 处理成功的结果
	        this.$router.push({path:'/home'})
      	}, (res) =>  {
      	// 处理失败的结果
      		this.closeSendtext()
	      	this.$router.push({path:'/home'})
      })
    },
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
