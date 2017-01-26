import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource';
import moduleLogin from './Login';
import moduleHome from './Home';
import moduleContact from './Contact';
import modulePayslip from './Payslip';
import moduleApply from './apply';

Vue.use(Vuex);
Vue.use(VueResource);

Vue.config.debug = true;

let epIndex = window.location.href.indexOf('index.html')
const debug = process.env.NODE_ENV !== 'production';
const epBaseURL = window.location.href.substring(0, epIndex != -1 ? epIndex : window.location.href.length)

export default new Vuex.Store({
  state: {
    config: {
      epBaseURL: epBaseURL
    },
    head: {
      backShow: Boolean,
      rightShow: Boolean,
      rightInfo: String,
      show: Boolean,
      title: String,
      backToPoint: String,
    },
    footer: {
      show: true
    },
    activeItem: 0
  },

  getters: {
    config: state => state.config,
    head: state => state.head,
    footer: state => state.footer,
    activeItem: state => state.activeItem
  },

  mutations: {
    setHead(state, head) {
      state.head.backShow = head.backShow;
      state.head.rightShow = head.rightShow;
      state.head.rightInfo = head.rightInfo;
      state.head.show = head.show;
      state.head.title = head.title;
      state.head.backToPoint = head.backToPoint;
    },

    showFooter(state) {
      state.footer.show = true;
    },

    hideFooter(state) {
      state.footer.show = false;
    },

    setActiveItem(state, index) {
      state.activeItem = index;
    },

    showHead(state){
      state.head.show = true;
    },

    hideHead(state){
      state.head.show = false;
    }

  },

  actions: {},

  modules: {
    moduleLogin,
    moduleHome,
    moduleContact,
    modulePayslip,
    moduleApply
  },

  strict: debug

})