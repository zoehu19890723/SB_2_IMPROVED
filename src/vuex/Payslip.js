import Vue from 'vue';
import Vuex from 'vuex';
import VueResource from 'vue-resource';
import {servicePath} from '../config';
import _ from 'underscore';

Vue.use(Vuex);
Vue.use(VueResource);

const modulePayslip = {
  state: {
    payList : [],
    currentTime : ''
  },

  /* eslint-disable no-param-reassign*/
  mutations: {

    setPayList(state, list){
      state.payList = list;
    },
    setCurrentTime(state, time){
       state.currentTime = time;
    }

  },

  actions : {
    getMyPayList({commit,state}){
      let apiUrl = servicePath + '/payroll/PayrollConfigWebService/getEmployeePayslip/';
      return Vue.http.jsonp(apiUrl,{
          params : {
            format : 'jsonp'
          }
        }).then((response) => {
          if(response.body.status === 1){
            let groupArray = response.body.data;
            commit('setPayList',groupArray);
            if(state.currentTime === '' && groupArray.length > 0){
              commit('setCurrentTime',groupArray[0].date);
            }
            let selectedGroup = _.find(state.payList,{
              date : state.currentTime
            });
            let monthArray = _.pluck(state.payList,'date')
            return { 
              status : true ,
              data : selectedGroup,
              monthArray : monthArray
            };
          }else{
            return { status : false , message : response.body.message };
          }
        },(error)=>{
          return error;
        });
    },

    setNewDate({commit,state},{newDate}){
      commit('setCurrentTime',newDate);
      let selectedGroup = _.find(state.payList,{
        date : state.currentTime
      });
      return selectedGroup;
    }
  }

};

export default modulePayslip;

