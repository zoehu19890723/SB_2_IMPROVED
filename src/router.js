import Vue from 'vue';
import VueRouter from 'vue-router';
import home from './views/home';
import self from './views/self';
import contact from './views/contact';
import homeParent from './views/homeParent';
import login from './views/login';
import main from './views/main';
import profile from './views/profile';

Vue.use(VueRouter)
// export default routes
const route = new VueRouter({
  mode: 'history',

  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  },

  base: __dirname,

  routes: [
    {
      path: '/',
      redirect: '/main'
    }, {
      path: '/login',
      component: login
    }, {
      path: '/main',
      component: main,
      children: [
        {
          path: '/home',
          component: homeParent,
          children: [
            { 
              path: '', 
              component: home
            },{
              path : 'profile',
              component: profile
            }
          ]
        },
        {
          path: '/self', 
          component: self
        },
        {
          path: '/contact', 
          component: contact
        },
        {
          path: 'index.html', 
          component: login
        }
      ]
    }
  ],
})

export default route;
