<template>
  <div class="message">
    <ul>
      <li>
        <h3>reddit<span>·3d</span></h3>
        <p>hello！lalllalallalalala</p>
        <p>lalllalallalalala</p>
      </li>
      <li>
        <h3>reddit<span>·3d</span></h3>
        <p>hello！lalllalallalalala</p>
        <p>lalllalallalalala</p>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'message',
  components: {
  }
}

</script>

<style scoped lang="less">
.message{
  width: 100%;
}
li{
  background-color: #fff;
  width: 100%;
  padding: 0 .2rem;
  box-sizing: border-box;
  padding-bottom: .2rem;
  margin-bottom: 0.1rem;
  h3{
    font-weight: normal;
    font-size: .24rem;
    line-height: .8rem;
    span{
      color: #C0BFBF;
    }
  }
  p{
    color: #C0BFBF;
    line-height: 0.4rem;
  }
}
</style>
