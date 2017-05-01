<template>
  <div class="mypost">
    <footerbar></footerbar>
    <div>
    	<ul class="top">
    		<router-link tag="li" to="/user" class="writer left">back</router-link>
				<li class="title">mypost</li>
				<li class="set right"></li>
			</ul>
			
      
      
    </div>
  </div>
</template>

<script>
import footerbar from '@/components/footerbar'

export default {
  name: 'mypost',
  components: {
    footerbar
  },
  data(){
    return{
      
    }
  },
  methods: {
   
  }
}

</script>

<style scoped lang="less">

</style>
