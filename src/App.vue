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
}
html,body{width:100%;height:100%;margin:0;padding:0;position: relative !important;}
.content{
  min-height: 100%
}
</style>
