<template>
    <div class="detail" id="detail">
        <footerbar></footerbar>
        <img src="">
        
        
    </div>
</template>

<script>
import footerbar from '@/components/footer';
import '../assets/js/base.js';
export default {
  name: 'detail',
  components: {
    footerbar
  }

}
</script>

<style scoped  lang="less">
@import '../assets/css/base.css';
@import '../assets/css/detail.less';
</style>
