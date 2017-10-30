import Home from '@/components/Home.vue'
import Login from '@/components/Login.vue'
import ForgetPwd from '@/components/ForgetPwd.vue'

const Routes = [
  {
    path: '/login/:fromId',
    name: 'login',
    component: Login
  },
  {
    path: '/forget',
    name: 'forget',
    component: ForgetPwd
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '*',
    redirect: '/home'
  }
]

export default Routes