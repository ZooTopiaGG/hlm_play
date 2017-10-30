<template>
  <div class="login">
    <div class="bg">
      <img src="../assets/images/bg.png">
    </div>
    <div class="form" id="form">
      <div class="formbox">
        <!-- <div class="title">商家端登录</div> -->
        <div class="input-group">
          <div class="inp input1">
            <span class="span"></span>
            <input type="tel" name="" v-model="telPhone" placeholder="请输入手机号">
          </div>
           <div class="inp input4">
            <span class="span">
              <i></i>
            </span>
            <input type="tel" name="" v-model="code" placeholder="请输入验证码">
            <el-button id="getCode" :class="{codeStatus:codeStatus}" @click="getCode" :disabled="disabled">{{ codeText }}</el-button>
          </div>
          <div class="inp input2">
            <span class="span"></span>
            <input type="password" name="" v-model="password1" placeholder="请输入新密码">
          </div>
          <div class="inp input2">
            <span class="span"></span>
            <input type="password" name="" v-model="password2" placeholder="请确认新密码">
          </div>
          <div class="inp1 input3">
            <el-button type="primary" @click="update">修改密码</el-button>
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
        password1: '',
        password2: '',
        code: '',
        codeText: '获取验证码',
        codeStatus: false,
        disabled: false,
        timer: ''
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
      getCode () {
        this.cutDown()
        var para = {
          mobile: this.telPhone
        }
        axios.post('sms', para)
        .then(res => {
          Message.success({
            message: '获取成功'
          })
        })
        .catch(err => {
          clearInterval(this.timer)
          this.codeText = '重新获取';
          this.codeStatus = false;
          this.disabled = false
          console.log(err)
        })
      },
      update () {
        if(this.password1 === '' ){
          Message.error({
            message: '密码不能为空'
          })
          return
        }else if(this.password1.length < 6){
          Message.error({
            message: '密码必须在6个字符以上'
          })
          return
        }else{
          if(this.password1 != this.password2){
            Message.error({
              message: '两次密码输入不一致'
            })
            return
          }else{
            var para = {
              mobile: this.telPhone,
              password: this.password1,
              sms_code: this.code
            }
            axios.post('password/reset', para)
            .then(res => {
              alert(1)
              this.$router.go(-1)
            })
            .catch((err) => {
              console.log(err)
            })
          }
        }
      },
      cutDown () {
        var _this = this
        var time = 10
        _this.timer = setInterval(()=>{
          time--;
          if(time == 0){
            clearInterval(_this.timer)
            _this.codeText = '重新获取';
            _this.codeStatus = false;
            _this.disabled = false
          }else{
            _this.codeText = '已发送('+time+'s)';
            _this.codeStatus = true;
            _this.disabled = true
          }
        },1000)
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
  #form{
    height: 460px;
    width: 441px;
    background: rgba(255,255,255,0.78);
    position:fixed;
    left: 50%;
    margin-left: -220.5px;
    top: 50%;
    margin-top: -260px;
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
  .inp span.span{
    position: absolute;
    top: 1px;
    left: 0;
    width: 50px;
    height: 50px;
  }
  .input1 span.span{
    background: url(../assets/images/tel.png) no-repeat;
    background-size: cover
  }
  .input2 span.span{
    background: url(../assets/images/mm.png) no-repeat;
    background-size: cover
  }
  .input4 span.span{
    background: rgb(153, 153, 153);
  }
  .input4 span.span i{
    display: block;
    width: 28px;
    height: 28px;
    background: url(../assets/images/shuru.png) no-repeat;
    background-size: cover;
    margin: 11px auto;
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
  #getCode{
    position: absolute;
    right: 0;
    top: 8px;
  }
  .codeStatus{
    background: #ccc
  }
</style>
<style>
.hlm_sport .el-message-box__title {
  color: #48576a;
}
.hlm_sport .el-message-box__message{
  font-size: 18px;
  color: #000;
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