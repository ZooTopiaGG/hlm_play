<template>
  <div class="login">
    <div class="bg">
      <img src="../assets/images/bg.png">
    </div>
    <div class="form">
      <div class="formbox">
        <div class="title">商家端登录</div>
        <div class="input-group">
          <div class="inp input1">
            <span></span>
            <input type="tel" name="" v-model="telPhone" placeholder="请输入手机号">
          </div>
          <div class="inp input2">
            <span></span>
            <input type="password" name="" v-model="password" placeholder="请输入密码">
          </div>
          <div class="inp1 input3">
            <el-button type="primary" @click="login">进入场馆</el-button>
          </div>
          <div class="label">
            <span @click="open" style="cursor: pointer">联系客服</span>
            <span style="cursor: pointer" @click="updatePwd">忘记密码</span>
          </div>
        </div>
      </div>
    </div>
    <div class="loginBtm">
      <bottom-nav></bottom-nav>
    </div>
  </div>
</template>
<script>
  import BottomNav from './BottomNav.vue'
  import axios from 'axios'
  import qs from 'qs'
  import { mapGetters } from 'vuex'
  import { Message } from 'element-ui'
  import { bus } from '../assets/js/public.js'
  export default {
    name: 'login',
    data () {
      return {
        telPhone: '',
        password: ''
      }
    },
    computed: {
      ...mapGetters([
        'GET_LOGIN_RESULT'
      ])
    },
    components: {
      BottomNav
    },
    methods: {
      login () {
        let para = {
          mobile : this.telPhone,
          password: this.password
        }
        para = qs.stringify(para)
        axios.post('seller/login', para)
        .then(res => {
          this.$store.dispatch('LOGIN_RESULT',res.data)
          var r = JSON.stringify(res.data)
          window.localStorage.setItem('hlm_l_r', r)
          if(this.$route.params.fromId == 2){
            this.$router.push({ path: '/', params: { refreshId: Math.random() * 10 } })
          }else{
            window.location.href = 'http://www.heermengsport.com/'
          }
          Message.success({
            message: '登陆成功'
          })
        })
        .catch(err => {
          console.log(err)
        })
      },
      open () {
        const h = this.$createElement;
        this.$msgbox({
          title: '荷尔蒙体育提示',
          message: h('div', null, [
            h('p', null, '0571-87975791'),
            h('p', null, '周一至周六9:00-22:00'),
            h('p', null, '周日及法定节假日10:00-18:00'),
          ]),
          customClass: 'hlm_sport',
          showCancelButton: false,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        })
      },
      updatePwd () {
        this.$router.push({ name: 'forget' })
      }
    },
    mounted () {
      var res = window.localStorage.getItem('hlm_l_r')
      res = JSON.parse(res)
      if(this.GET_LOGIN_RESULT && this.GET_LOGIN_RESULT.token){
        bus.$emit('name', this.GET_LOGIN_RESULT.name)
      }else if(res && res.token){
        bus.$emit('name', res.name)
      }else{
        return
      }
    }
  }
</script>
<style scoped>
 .loginBtm{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
  }
  .form{
    width: 441px;
    height: 401px;
    background: rgba(255,255,255,0.78);
    position:fixed;
    left: 50%;
    margin-left: -220.5px;
    top: 50%;
    margin-top: -220.5px;
  }
  .formbox{
    padding: 46px 73px 0 67px;
  }
  .title{
    text-align: center;
    color: #414141;
    font-size: 30px;
    margin-bottom: 34px
  }
  .inp{
    position: relative;
    margin-bottom: 28px; 
  }
  .inp input{
    width: 246px;
    height: 50px;
    border: 1px solid #DCDCDC;
    background: rgba(0,0,0,0.05);
    padding-left: 55px;
    font-size: 16px;
  }
  .inp input:focus{
    border-color: #20a0ff;
  }
  .inp span{
    position: absolute;
    top: 1px;
    left: 0;
    width: 50px;
    height: 50px;
  }
  .input1 span{
    background: url(../assets/images/tel.png) no-repeat;
    background-size: cover
  }
  .input2 span{
    background: url(../assets/images/mm.png) no-repeat;
    background-size: cover
  }
  .input3 button{
    width: 100%;
    height: 51px;
    font-size: 20px;
    color: #414141;
  }
  .label{
    margin-top: 12px;
    text-align: right;
    color: #414141;
    font-size: 16px;
  }
</style>
<style>
.hlm_sport .el-message-box__content {
  padding: 20px;
}
.hlm_sport .el-message-box__message{
  text-align: center;
}
.hlm_sport .el-message-box__message p:nth-child(1){
  font-size: 16px;
  font-weight: bold;
}
.el-button--primary{
    background-color: RGB(254,218,16);
    border-color: RGB(254,218,16);
    color: RGB(65,65,65);
}
.el-button--primary:focus, .el-button--primary:hover{
  background-color: #FEEA7B;
    border-color: #FEEA7B;
    color: RGBA(65,65,65,0.8)
}
  .bg{
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right:0;
    margin: 80px 0 93px;
    z-index: -1
  }
  .bg img{
    width: 100%;
    min-height: 100%;
    min-width: 1200px;
  }
 
</style>