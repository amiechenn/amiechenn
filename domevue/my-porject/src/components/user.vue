<template>
  <div class="user">
    <footerbar></footerbar>
    <div>
    	<ul class="top">
    		<li class="title">miemei</li>
    		<li class="set right"><i class="icon icon-set"></i></li>
    	</ul>
    	<div>
            <ul>
                 
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

</style>
