import Vue from 'vue';
import Vuex from 'vuex';
import VueResource from 'vue-resource';
import {servicePath} from '../config';
import _ from 'underscore';

Vue.use(Vuex);
Vue.use(VueResource);

const moduleApply = {
  state: {
    vacationType : [],
    attendanceTime : {}
  },

  mutations: {
    setVacationType(state, list){
      state.vacationType = list;
    },
    setAttendanceTime(state, obj){
      state.attendanceTime = obj;
    }
  },

  getters: {
    vacationType: state => state.vacationType,
    attendanceTime: state => state.attendanceTime,
  },

  actions : {
    getLeaveTypes({commit}){
      let apiUrl = servicePath + '/ess/ELeave/GetLeaveType/';
      Vue.http.jsonp(apiUrl,{
        params : {
          format : 'jsonp'
        }
      }).then(
      (response)=>{
        if(response.body.status === 1){
          let result = response.body.data;
          let attendanceTime = {};
          if (result !== undefined && result.leave_type !== undefined && result.leave_type.length > 0) {
            result.leave_type.forEach(
              (item)=>{
                item.value = item.leave_code;
                item.display = item.name
              });
            attendanceTime = result.attendance_time;
        }
        commit('setVacationType',result.leave_type || []);
        commit('setAttendanceTime',attendanceTime);
      }
    })
    },
    getMyLeaveQuota({commit,state}){
      let apiUrl = servicePath + '/attendance/AttendanceAnnualLeave/getLeaveQuota/';
      return Vue.http.jsonp(apiUrl,{
        params : {
          format : 'jsonp'
        }
      })
    },

    getMyLeaveInfo({commit,state}){
      let apiUrl = servicePath + '/ess/ELeave/getMyLeaveInfo/';
      return Vue.http.jsonp(apiUrl,{
        params : {
          format : 'jsonp'
        }
      })
    },

    getMyLeaveApprove({commit,state}){
      let apiUrl = servicePath + '/ess/ELeave/getMyLeaveApproveInfo/';
      return Vue.http.jsonp(apiUrl,{
        params : {
          format : 'jsonp'
        }
      })
    },

    getLeaveDetailInfo({commit,state},{id}){
      let apiUrl = servicePath + '/ess/ELeave/getleaveDetailInfo/';
      return Vue.http.jsonp(apiUrl,{
        params : {
          format : 'jsonp',
          argsJson : JSON.stringify({
              id: id
            })
        }
      })
    },

    cancelLeaveApply({commit},{id,reson}){
      let apiUrl = servicePath + '/ess/ELeave/CancelAttendanceApply/';
      return Vue.http.jsonp(apiUrl,{
        params : {
          format : 'jsonp',
          argsJson: JSON.stringify({
                id: id,
                workflowType: "LEAVE",
                cancelReason: reson
            })
        }
      })
    },

    approveLeaveApply({commit},{id,code,reson}){
      let apiUrl = servicePath + '/ess/ELeave/ApproveLeaveItem/';
      return Vue.http.jsonp(apiUrl,{
        params : {
          format : 'jsonp',
          argsJson: JSON.stringify({
            id: id,
            resultCode: code,
            msg: reson
          })
        }
      })
    },



    getMyOTInfo({commit,state}){
      let apiUrl = servicePath + '/ess/EOT/getMyOverTimeInfo/';
      return Vue.http.jsonp(apiUrl,{
        params : {
          format : 'jsonp'
        }
      })
    },

    getMyOTApprove({commit,state}){
      let apiUrl = servicePath + '/ess/EOT/getMyOverTimeApproveInfo/';
      return Vue.http.jsonp(apiUrl,{
        params : {
          format : 'jsonp'
        }
      })
    },

    getOTDetailInfo({commit,state},{id}){
      let apiUrl = servicePath + '/ess/EOT/getOverTimeDetailInfo/';
      return Vue.http.jsonp(apiUrl,{
        params : {
          format : 'jsonp',
          argsJson : JSON.stringify({
              id: id
            })
        }
      })
    },

    cancelOTApply({commit},{id,reson}){
      let apiUrl = servicePath + '/ess/ELeave/CancelAttendanceApply/';
      return Vue.http.jsonp(apiUrl,{
        params : {
          format : 'jsonp',
          argsJson: JSON.stringify({
                id: id,
                workflowType: "OT",
                cancelReason: reson
            })
        }
      })
    },

    approveOTApply({commit},{id,code,reson}){
      let apiUrl = servicePath + '/ess/EOT/ApproveOverTimeItem/';
      return Vue.http.jsonp(apiUrl,{
        params : {
          format : 'jsonp',
          argsJson: JSON.stringify({
            id: id,
            resultCode: code,
            msg: reson
          })
        }
      })
    },

    getMyApprove({commit,state}){
      let apiUrl = servicePath + '/ess/MyApprovalService/getMyApproveInfo/';
      return Vue.http.jsonp(apiUrl,{
        params : {
          format : 'jsonp',
        }
      })
    },

    getTransferDetailInfo({commit,state},{id}){
      let apiUrl = servicePath + '/humanresource/HumanResourceRelocationWebsvcService/getTransferDetailInfo/';
      return Vue.http.jsonp(apiUrl,{
        params : {
          format : 'jsonp',
          argsJson : JSON.stringify({
              id: id
            })
        }
      })
    },

    approveTransferApply({commit,state},{id}){
      let apiUrl = servicePath + '/humanresource/HumanResourceRelocationWebsvcService/ApproveTransfer/';
      return Vue.http.jsonp(apiUrl,{
        params : {
          format : 'jsonp',
          argsJson : JSON.stringify({
              id: id
            })
        }
      })
    },

  }

};

export default moduleApply;

