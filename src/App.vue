<template>
  <div id="app">
    <top-nav></top-nav>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import TopNav from './components/TopNav.vue'
export default {
  name: 'app',
  computed: {
    // refresh () {
    //   alert(this.$router.params.refreshId)
    //   return this.$router.params.refreshId
    // }
  },
  components: {
    TopNav
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: static;
  font-size: 16px;
}
html,body{width:100%;height:100%;margin:0;padding:0;position: relative !important;}
.content{
  min-height: 100%
}
#app .el-button--primary{
    background-color: RGB(254,218,16);
    border-color: RGB(254,218,16);
    color: RGB(65,65,65);
}
#app .el-button--primary:focus, #app .el-button--primary:hover{
    background-color: #FEEA7B;
    border-color: #FEEA7B;
    color: RGBA(65,65,65,0.8)
}
#app .el-button--warning{
    background-color: #FEEA7B;
    border-color:#FEEA7B;
    color: RGB(65,65,65);
}
#app .el-button--warning:focus, #app .el-button--warning:hover{
   background-color:  RGB(254,218,16);
    border-color:  RGB(254,218,16);
    color: RGBA(65,65,65,0.8)
}
</style>
