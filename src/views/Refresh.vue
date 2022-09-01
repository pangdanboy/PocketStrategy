<template>
  <div></div>
</template>

<script>
import router from '../router/index'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Refresh',
  mounted () {
    // 跳转到个人中心
    router.push('/user')
  }
}
</script>

<style scoped>

</style>
