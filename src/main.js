import Vue from 'vue'
import VueRouter from 'vue-router'
import AMap from 'vue-amap'
import axios from 'axios'
import rt from './assets/js/router.config.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import store from './store/index.js'
import Vuex from 'vuex'
import App from './App.vue'
import VueQuillEditor from 'vue-quill-editor'

// 引入vueQuill
Vue.use(VueQuillEditor)
// 引入element-ui
Vue.use(ElementUI)

// 引入高德地图
Vue.use(AMap)

// 引入vuex
Vue.use(Vuex)
// 引入vue-router
Vue.use(VueRouter)

AMap.initAMapApiLoader({
  key: 'your amap key',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor']
})

const routes = rt
const router = new VueRouter({
  mode:'history',
  base: 'trains',
  scrollBehavior (to, from, savedPosition) {
      // return 期望滚动到哪个的位置
      if(savedPosition){
        return savedPosition
      }else{
        return { x:0,y:0 }
      }
  },
  routes
})

import { Loading } from 'element-ui'
import { Message } from 'element-ui'


// 响应时间
axios.defaults.timeout = 5000;
// 配置请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
// 配置接口地址
// 正式网接口地址
axios.defaults.baseURL = 'http://120.77.43.178:8088/api/'

// let loadingInstance = Loading.service({ fullscreen: true })

// var loadingInstance;

// 添加一个请求拦截器
axios.interceptors.request.use(function(config){
  //在请求发出之前进行一些操作
  return config
},function(err){
  //loadingInstance.close()
  // Indicator.close()
  // Toast('系统繁忙，请稍后重试')
  // Do something with request error
  Message.error({
    message: '系统繁忙，请稍后重试'
  })
  return Promise.reject(err)
});

//添加一个响应拦截器
axios.interceptors.response.use(function(res){
  //在这里对返回的数据进行处理
  //loadingInstance.close()
  return res
},function(err){

  // loadingInstance.close()
  Message.error({
    message: err.response.data.message
  })
  //Do something with response error
  return Promise.reject(err)
})

// 引入公共样式css 或 js文件
import './assets/css/common.css'

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
