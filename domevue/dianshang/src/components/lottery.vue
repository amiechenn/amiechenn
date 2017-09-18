<template>
    <div class="me">
        <footerbar></footerbar>
        <div class="top">
            <img src="../assets/img/me.png">
            <h2>进击的Q先森</h2>
            <h3>LEVEL: 1</h3>
        </div>

    </div>
</template>

<script>
import footerbar from '@/components/footer';
import '../assets/js/base.js';
export default {
  name: 'me',
  components: {
    footerbar
  }
}
</script>

<style scoped  lang="less">
@import '../assets/css/base.css';
@import '../assets/css/me.less';
</style>
