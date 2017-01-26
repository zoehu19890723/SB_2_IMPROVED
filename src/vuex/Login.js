import Vue from 'vue';
import Vuex from 'vuex';
import VueResource from 'vue-resource';
import {servicePath} from '../config';

Vue.use(Vuex);
Vue.use(VueResource);

const moduleLogin = {
  state: {
    name: '',
    password: '',
    loginState : false
  },

  /* eslint-disable no-param-reassign*/
  mutations: {

    setLoginState(state, {name,password,loginState,sessionid}){
      state.loginState = loginState;
      state.password = password;
      state.name = name;
      state.sessionid = sessionid;
    }

  },

  actions : {
     loginByMobile({ commit },{username,password}) {
      let apiUrl = servicePath + '/user/userService/loginByMobile/'
      return Vue.http.jsonp(apiUrl,{
          params : {
            format : 'jsonp',
            username: username,
            password : password,
            language : 'chinese',
          }
        }).then((response) => {
          if(response.body.status === 1){
            commit('setLoginState',{
              name : username,
              password : password,
              loginState : true,
              sessionid : response.body.data.sessionid
            });
            return { status : true };
          }else{
            return { status : false , message : response.body.message };
          }
        },(error)=>{
          return error;
        });
    },

    sendMobileCode({ commit },{mobile}) {
      let apiUrl = servicePath + '/user/userService/sendMobileValidationCode/';
      return Vue.http.jsonp(apiUrl,{
          params : {
            format : 'jsonp',
            mobile: mobile,
          }
        });
    },

    restPwd({ commit },{mobile,validation,pwd}) {
      let apiUrl = servicePath + '/user/userService/resetPwdByMobile/';
      return Vue.http.jsonp(apiUrl,{
          params : {
            format : 'jsonp',
            mobile: mobile,
            validation : validation,
            pwd : pwd
          }
        });
    },

    logout({ commit }) {
      let apiUrl = servicePath + '/user/userService/logout/';
      return Vue.http.jsonp(apiUrl,{
          params : {
            format : 'jsonp'
          }
        });
    },


  }

};

export default moduleLogin;
