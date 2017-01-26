import 'babel-polyfill';
import Vue from 'vue';
import VueResource from 'vue-resource';
import {sync} from 'vuex-router-sync';
import store from './vuex/store';
import App from './App';
import AwesomeSwiper from 'vue-awesome-swiper';
import router from './router';
import Framework7Vue from 'framework7-vue';

sync(store, router);
Vue.use(VueResource);
Vue.use(AwesomeSwiper);
Vue.use(Framework7Vue)
// 创建 Vue 实例
let star = new Vue({
	el: '#app',
	framework7: {
        root: 'body'
    },
	router,
	store,
	render: h => h(App)
})

star.$router.push('/login');