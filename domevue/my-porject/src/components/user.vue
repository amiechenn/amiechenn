<template>
  <div class="user">
    <footerbar></footerbar>
    <div>
    	<ul class="top">
    		<li class="title">miemei</li>
    		<li class="set right"><i class="icon icon-set"></i></li>
    	</ul>
    	<div class="area1">
    		<div class="item left">
    			<i class="icon icon-kama"></i>
					<span>
						<b>1</b>
						<small>karma</small>
					</span>
    		</div>
    		<div class="item">
    			<i class="icon icon-age"></i>
					<span>
						<b>1d</b>
						<small>reddit age</small>
					</span>
    		</div>
    	</div>
    	<div class="area2">
    		<ul>
    			<li>
    				<i>◐</i>
    				<p>history</p>
    				<a>></a>
    			</li>
    			<li>
    				<i>◐</i>
    				<p>saved</p>
    				<a>></a>
    			</li>
    			<li>
    				<i>◐</i>
    				<p>my posts</p>
    				<a>></a>
    			</li>
    			<li>
    				<i>◐</i>
    				<p>my comments</p>
    				<a>></a>
    			</li>
    			<li>
    				<i>◐</i>
    				<p>upvoted</p>
    				<a>></a>
    			</li>
    			<li>
    				<i>◐</i>
    				<p>friends</p>
    				<a>></a>
    			</li>
    			<li>
    				<i>◐</i>
    				<p>hidden</p>
    				<a>></a>
    			</li>
    		</ul>
    	</div>
    </div>
  </div>
</template>

<script>
import footerbar from '@/components/footerbar'

export default {
  name: 'user',
  components: {
    footerbar
  }
}

</script>

<style scoped lang="less">
.user{

}
.icon{
    display: inline-block;
    width: 0.4rem;
    height: 0.5rem;
}
.icon-set{
    background-position: .2rem -2.22rem;
    height: 0.9rem;
    width: 0.7rem;
}
.icon-kama{
    background-position: -2rem -1.5rem;
}
.icon-age{
    background-position: -2.6rem -1.5rem;
    width: 0.45rem;
}
.area1{
	border-bottom: 1px solid #e2e2e2;
	&:after{
    display: table;
    content:'';
    clear: both;
	}
	.item{
		float: left;
		width: 50%;
		box-sizing: border-box;
		padding: 0px 0.2rem;
		margin: 0.2rem 0;
		span{
			display: inline-block;
			vertical-align: middle;
		}
        i{
            vertical-align: middle;
            margin-right: 0.2rem
        }
		b{
			font-weight: normal;
			display: block;
		}
		small{
			display: block;
			color: #C0BFBF;
		}
	}
	.left{
		border-right: 1px solid #e2e2e2;
	}
}
.area2{
	li{
		line-height: 0.8rem;
		i{
			color: #C0BFBF;
			width: .5rem;
			display: inline-block;
			text-align: center;
		}
		p{
			text-transform: capitalize;
			display: inline-block;
		}
		a{
			float: right;
			padding-right: 0.2rem;
		}
	}
}
</style>
