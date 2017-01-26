import Vue from 'vue';
import Vuex from 'vuex';
import VueResource from 'vue-resource';
import {servicePath} from '../config';

Vue.use(Vuex);
Vue.use(VueResource);

const moduleContact = {
  state: {
    favorList : []
  },

  /* eslint-disable no-param-reassign*/
  mutations: {

    setFavorList(state, list){
      state.favorList = list;
    }

  },

  actions : {
     getFavorList({ commit }) {
      let apiUrl = servicePath + '/humanresource/HumanResourceWebsvcService/getFavorAddressList/';
      return Vue.http.jsonp(apiUrl,{
          params : {
            format : 'jsonp'
          }
        }).then((response) => {
          if(response.body.status === 1){
            commit('setFavorList',response.body.data);
            return { status : true ,data : response.body.data};
          }else{
            return { status : false , message : response.body.message };
          }
        },(error)=>{
          return error;
        });
    },

    getSearchList({commit},{key}){
      let apiUrl = servicePath + '/humanresource/HumanResourceWebsvcService/getSearchAddressList/';
      return Vue.http.jsonp(apiUrl,{
          params : {
            format : 'jsonp',
            argsJson : JSON.stringify({
              id: null,
              text: key
            })
          }
        })
    },

    getSpecContact({commit},{id}){
      let apiUrl = servicePath + '/humanresource/HumanResourceWebsvcService/getAddressDetail/';
      return Vue.http.jsonp(apiUrl,{
          params : {
            format : 'jsonp',
            argsJson : JSON.stringify({
              id: id
            })
          }
        });
    },

    getMySubordinate({commit},{id}){
      let apiUrl = servicePath + '/ess/SubordinateService/GetSubordinateByEmpId/';
      return Vue.http.jsonp(apiUrl,{
          params : {
            format : 'jsonp',
            argsJson : JSON.stringify({
              id: id
            })
          }
        });
    },

    setFavor({commit},{id,flag}){
      let apiUrl = servicePath + '/humanresource/HumanResourceWebsvcService/changeFavor/';
      return Vue.http.jsonp(apiUrl,{
          params : {
            format : 'jsonp',
            argsJson : JSON.stringify({
              id: id,
              isFavor: flag ? 1:0
            })
          }
        });
    }

  }

};

export default moduleContact;

