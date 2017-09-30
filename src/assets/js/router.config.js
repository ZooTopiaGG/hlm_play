import Home from '@/components/Home.vue'
import Login from '@/components/Login.vue'
// import QuillEditor from '@/components/QuillEditor.vue'

const Routes = [
  {
    path: '/trains/login',
    name: 'login',
    component: Login
  },
  {
    path: '/trains/home',
    name: 'home',
    component: Home
  },
  {
    path: '/',
    redirect: '/trains/home'
  },
  {
    path: '*',
    redirect: '/trains/home'
  }
]

export default Routes