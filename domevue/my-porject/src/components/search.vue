<template>
  <div>
    <footerbar></footerbar>
    <div class="search">
    	<input type="text" name="search" placeholder="Find a community or post">
    </div>
  </div>
</template>

<script>
import footerbar from '@/components/footerbar'

export default {
  name: 'home',
  components: {
    footerbar
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.search{
	padding: 0.2rem;
  background-color: #fff;
}
input{
	background-color: #EFEFED;
	width: 100%;
	border:none;
	padding-left: 0.1rem;
	box-sizing: border-box;
	outline: none;
  line-height: 0.6rem;
}
</style>
