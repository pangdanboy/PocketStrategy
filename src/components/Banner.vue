<template>
  <div id="banner">
    <slot name="title"></slot>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Banner',
  methods: {
  }
}
</script>

<style scoped lang="scss">
  #banner{
  width: 100%;
  .title{
    width: 0px;
    font-size: 32px;
    color: rgba(255,255,255,1);
    position: absolute;
    text-align: center;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    white-space: nowrap;
    overflow: hidden;
  }
}
</style>
