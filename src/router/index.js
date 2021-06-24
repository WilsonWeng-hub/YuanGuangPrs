import Vue from 'vue'
import VueRouter from 'vue-router'

const Blogs =  ()=> import ('../views/Blogs.vue')
const BlogDetail =  ()=> import ('../views/BlogDetail.vue')
const BlogEdit =  ()=> import ('../views/BlogEdit.vue')
const Login =  ()=> import ('../views/Login.vue')


Vue.use(VueRouter)
 const routes =  [
    {
      path: '/',
      name: 'Index',
      redirect: {name:"Blogs"}
    },
    {
      path: '/blogs',
      name: 'Blogs',
      component: Blogs
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/blog/add',
      name: 'BlogEdit',
      component: BlogEdit
    },
    {
      path: '/blog/:blogId',
      name: 'BlogDetail',
      component: BlogDetail
    },
    {
      path: '/blog/:blogId/edit',
      name: 'BlogEdit',
      component: BlogEdit
    }
  ]


const router = new VueRouter({
  mode: 'history',
  routes
})

export default router;
