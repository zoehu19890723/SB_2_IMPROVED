import Vue from 'vue';
import VueRouter from 'vue-router';
import main from './views/main';

import login from './views/login/login';
import forgetPwd from './views/login/forgetPwd';

import homeParent from './views/home/homeParent';
import home from './views/home/home';

import contactParent from './views/contact/contactParent';
import contact from './views/contact/contact';
import contactDetail from './views/contact/contactDetail';
import contactLeader from './views/contact/contactLeader';

import selfParent from './views/self/selfParent';
import self from './views/self/self';
import setting from './views/self/setting';
import themeSetting from './views/self/themeSetting';
import about from './views/self/about';
import resetPwd from './views/self/resetPwd';

import profile from './views/profile/profile';
import profileSub from './views/profile/profileSub';
import profileEditInput from './views/profile/profileEditInput';
import profileEditForm from './views/profile/profileEditForm';

import payslip from './views/payslip/payslip';

import leave from './views/leave/leave';
import leaveQuota from './views/leave/leaveQuota';
import leaveInfo from './views/leave/leaveInfo';
import leaveApply from './views/leave/leaveApply';
import leaveApprove from './views/leave/leaveApprove';
import leaveDetail from './views/leave/leaveDetail';

import overtime from './views/overtime/overtime';
import overtimeInfo from './views/overtime/overtimeInfo';
import overtimeApply from './views/overtime/overtimeApply';
import overtimeApprove from './views/overtime/overtimeApprove';
import overtimeDetail from './views/overtime/overtimeDetail';

import approve from './views/approve/approve';
import approveDetail from './views/approve/approveDetail';

import attend from './views/attend/attend';
import team from './views/team/team';

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
              path : 'profile',//个人信息主页面
              component: profile
            },{
              path : 'profile1',//个人信息详情页面
              component : profileSub
            },{
              path : 'profile2',//编辑文本页面
              component : profileEditInput
            },{
              path : 'profile3',//编辑组页面
              component : profileEditForm
            },{
              path : 'payslip',//薪资单页面
              component : payslip
            },{
              path : 'leave',//休假主页面
              component : leave
            },{
              path : 'leave1',//年假配额页面
              component : leaveQuota
            },{
              path : 'leave2',//休假信息页面
              component : leaveInfo
            },{
              path : 'leave3',//休假申请页面
              component : leaveApply
            },{
              path : 'leave4',//休假审批页面
              component : leaveApprove
            },{
              path : 'leave5',//详情查看页面
              component : leaveDetail
            },{
              path : 'overtime',//加班主页面
              component : overtime
            },{
              path : 'overtime1',//加班信息页面
              component : overtimeInfo
            },{
              path : 'overtime2',//加班申请页面
              component : overtimeApply
            },{
              path : 'overtime3',//加班审批页面
              component : overtimeApprove
            },{
              path : 'overtime4',//加班详情页面
              component : overtimeDetail
            },{
              path : 'approve',//审批页面
              component : approve
            },{
              path : 'approve1',//异动审批详情页面
              component : approveDetail
            },{
              path : 'attend',
              component : attend
            },{
              path : 'team',
              component : team
            }
          ]
        },{
          path: '',
          component: login,
        },{
          path: '/login',
          component: login,
        }, {
          path: '/forgetPwd',
          component: forgetPwd
        },{
          path: '/self',
          component: selfParent,
          children: [
            {
              path : '',
              component: self
            },{
              path : 'setting',
              component: setting
            },{
              path : 'themeSetting',
              component: themeSetting
            },{
              path : 'about',
              component: about
            },{
              path : 'resetPwd',
              component: resetPwd
            }
          ]
        },{
          path: '/contact',
          component: contactParent,
          children: [
            {
              path : '',
              component: contact
            },
            {
              path : 'detail',
              component: contactDetail
            },{
              path : 'subordinate',
              component: contactLeader
            }
          ]
        },{
          path: 'index.html',
          component: login
        }
      ]
    }
  ],
})

export default route;
