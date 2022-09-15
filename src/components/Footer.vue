<template>
  <div id="footer">
    <p>©拉吉莫拉拉版权所有</p>
    <p>2022</p>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Footer'
}
</script>

<style scoped lang="scss">
  #footer{
    width: 100%;
    height: 200px;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    p{
      font-size: 22px;
    }
  }
</style>
