<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>/* eslint-disable */
  export default {
  name: 'App',
  //提供一个依赖
  provide(){
    return {
      reload:this.reload
    }
  },
  data(){
    return {
      isRouterAlive:true
    }
  },
  //声明reload方法，控制router-view的显示或隐藏，从而控制页面的再次加载
  methods:{
    reload(){
      this.isRouterAlive = false;
      this.$nextTick(function(){
        this.isRouterAlive=true
      })
    }
  }
}
</script>

<style lang="less">
.size{
  width: 100%;
  height: 100%;
}
html,body{
  .size;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
#app {
  .size;
}
</style>
