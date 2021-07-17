import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import EditClient from './views/EditClient.vue'
import ViewClient from './views/ViewClient.vue'
import CreateClient from './views/CreateClient.vue'

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/edit-client',
      component: EditClient
    },
    {
      path: '/view-client',
      component: ViewClient
    },
    {
      path: '/create-client',
      component: CreateClient
    }
  ]
});

router.beforeEach((to, from, next) => {
    const publicPages = ['/login'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('token');
  
    if (authRequired && !loggedIn) {
      next('/login');
    } else {
      next();
    }
  });