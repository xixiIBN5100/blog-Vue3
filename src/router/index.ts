import { createRouter, createWebHistory } from 'vue-router'
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Home from "@/views/Home/Home.vue";
import Setting from "@/views/Home/Setting.vue";
import Ground from "@/views/Home/Ground.vue";
import PostBlog from "@/views/Home/PostBlog.vue";
import MyBlog from "@/views/Home/MyBlog.vue";
import Detail from "@/views/Home/Detail.vue";
import User from "@/views/Home/User.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
    },
    {
      path: '/detail',
      name: 'Detail',
      component: Detail
    },
    {
      path: "/home",
      name: "Home",
      component: Home,
      children: [
        {
          path: '/setting',
          name: 'Setting',
          component: Setting
        },
        {
          path: '/ground',
          name: 'Ground',
          component: Ground
        },        {
          path: '/postBlog',
          name: 'PostBlog',
          component: PostBlog
        },
        {
          path: '/myBlog',
          name: 'MyBlog',
          component: MyBlog
        },
        {
          path: "/user",
          name: "User",
          component: User
        }
      ]
    }
  ],
})

export default router
