<template>
  <div class="topnav">
    <div class="navbox flex flex-pack-justify margin">
      <div class="left">
        <img class="img1" src="../assets/images/18.png">
      </div>
      <div class="right flex-pack-justify flex">
        <a href="http://www.heermengsport.com/">首页</a>
        <router-link :to="{ path: '/home'}">发布培训</router-link>
        <span v-if="show">
          <!-- <router-link :to="{ path: '/login', params:{ fromId: 2 }}">登录</router-link> -->
          <span @click="toLogin" style="cursor: pointer;">登录</span>
        </span>
        <span class="yetLogin" v-else>
          <img src="../assets/images/10.png">
          <span>{{ name }}</span>
          <span @click.stop="outLogin" style="margin-left:20px;cursor: pointer;">退出</span>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import { bus } from '../assets/js/public.js'
  export default {
    name: 'topnav',
    data () {
      return {
        show: true,
        name: ''
      }
    },
    computed: {
      ...mapGetters([
        'GET_LOGIN_RESULT'
      ])
    },
    methods: {
      toLogin () {
        this.$router.push({ name: 'login', params:{ fromId: 2 } })
      },
      outLogin () {
        window.localStorage.removeItem('hlm_l_r')
        location.href = location.href
      }
    },
    mounted () {
      bus.$on('name', (res) => {
        this.name = res
        this.show = false
      })
    }
  }
</script>
<style>
  .topnav{
    height: 80px;
    border-bottom: 1px solid #eee; 
    box-shadow: 0 2px 5px rgba(0,0,0,0.2)
  }
  .navbox{
    width: 1190px;
    min-width: 1190px;
  }
  .left{
    min-width: 710px;
    height: 80px;
    background: url(../assets/images/88e643b27f0b9b11bede98f8fa8c2ea7.png) no-repeat;
    background-position-y: bottom;
  }
  .img1{
    height: 50px;
    width: 221px;
    margin-top: 15px;
    margin-left: 195px; 
  }
  .right{
    height: 80px;
    min-width: 300px;
    line-height: 80px;
  }
  .right a{
    color: #414141;
    font-size: 17px;
    transition: all 0.3s;
  }
  .right a:hover{
    color: #fddb10;
  }
  .line{
    position: relative;
    top: -2px;
  }
  .yetLogin{
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .yetLogin img{
    width: 36px;
    height: 36px;
    border-radius: 100%;
    margin-right: 10px;
  }
</style>