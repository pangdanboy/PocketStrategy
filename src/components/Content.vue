<template>
  <div id="content">
    <slot name="content-in"></slot>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Content'
}
</script>

<style scoped lang="scss">
  #content{
    width: 100%;
    background-image: linear-gradient(to top, #feada6 0%, #f5efef 100%);
    padding-top: 20px;
  }
</style>
