<template>
	<transition name="sendtext">
	  <div class="send-text" v-if="sendtextOpen">
	  	<form>
		  	<ul class="top">
		  		<li v-on:click="closeSendtext" class="back left">×</li>
		  		<li class="title">图文</li>
		  		<li class="send right" v-on:click="postImg()">发布</li>
		  	</ul>
		  	<div class="content">
		  		<div class="img-box" v-if="!imgChange">
		  			<!-- <label><i class="icon icon-camera"></i>相机</label> -->
					<label for="fliePost"><i class="icon icon-photoss" for="fliePost"></i>照片/相机</label>
					<input type="file" v-on:change="getImg" id="fliePost" ref="inputer"  accept="image/*,video/*;" style="display:none" capture="camera">
		  		</div>
		  		 
		  		<div v-if="imgChange"><img :src="img" width="100%"></div>    
		  		<input type="text" name="title" placeholder="写一些有趣的文字" v-model="content">
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
 			img:'',
 			content:'',
 			type:1,
 			time:new Date(),
 			comment:0,
 			zan:0,
 			imgChange:false,//切换选择和图片div
 		}
 	},
 	props:['sendtextOpen'],
 	methods: {
    	closeSendtext: function () {
	      	this.$emit('closeSendtext')
	      	this.imgChange = false
	    },
   		postImg:function(){
	    	this.time = this.time.getTime()
	      	this.$http.get("http://127.0.0.1:8081/textpost?content="+this.content+"&img="+this.img+"&type="+this.type+"&time="+this.time+"&comment="+this.comment+"&zan="+this.zan).then(
	        	(res) => {
		        // 处理成功的结果
		        console.log(res.data);
		        this.$router.push({path:'/home'})
	      	}, (res) =>  {
	      		// 处理失败的结果
	      		console.log(res.data);
	      	})
    	},
    	getImg:function(){
    		console.log(this.$refs.inputer)
    		var file = this.$refs.inputer.files[0]; //获取file对象
    		if(!/image\/\w+/.test(file.type)){ 
		        alert("文件必须为图片！"); 
		        return false; 
		    }
		    this.imgChange = true
		    /*获取图片进行预览*/
		    var self = this;
		  	// 看支持不支持FileReader
            if (!file || !window.FileReader) return;
    
            if (/^image/.test(file.type)) {
                // 创建一个reader
                var reader = new FileReader();
                // 将图片将转成 base64 格式
                reader.readAsDataURL(file);
                // 读取成功后的回调
                reader.onloadend = function () {
                    self.img =  this.result;
                    console.log(this.result)
                }
            }

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
	.img-box{
		width: 70%;
		margin:0.5rem auto;
		text-align: center;
		label{
			width: 49%;
			display: inline-block;
		}
	}
	i{
		display: block;
	    width: 1.3rem;
	    height: 1.3rem;
	    margin: auto;
	    margin-bottom: 0.2rem;
	}
	.icon-camera{
		background-position: 0rem -4.4rem;
	}
	.icon-photoss{
		background-position: -1.35rem -4.4rem;
	}

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
