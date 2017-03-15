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
  padding: 0 10px;
  box-sizing: border-box;
  padding-bottom: 10px;
  margin-bottom: 5px;
  h3{
    font-weight: normal;
    font-size: 12px;
    line-height: 30px;
    span{
      color: #C0BFBF;
    }
  }
  p{
    color: #C0BFBF;
    line-height: 20px;
  }
}
</style>
