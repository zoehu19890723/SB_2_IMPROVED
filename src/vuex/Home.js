/**
 * @author Zoe
 * @version 2016/12/7
 * @description 首页 {最新职位，新进员工}
 */
import Vue from 'vue';
import Vuex from 'vuex';
import VueResource from 'vue-resource';
import {compactDetail,compactGroupDetail} from '../commonUtil';
import {servicePath,serviceImagePath} from '../config';
import _ from 'underscore';

Vue.use(Vuex);
Vue.use(VueResource);


const moduleHome = {
    state: {
      personCard: {},
      profileList: {},
      profileStruct: {},
      profileDetailData: {}
    },

    getters: {
      personCard: state => state.personCard,
      profileList: state => state.profileList,
      profileStruct: state => state.profileStruct,
      profileDetailData: state => state.profileDetailData
    },

    /* eslint-disable no-param-reassign*/
    mutations: {
      setPersonCard(state, data) {
        state.personCard = data;
      },
      setProfileList(state, data) {
        state.profileList = data;
      },
      setProfileStruct(state, data) {
        state.profileStruct = data;
      },
      setProfileDetailData(state, data) {
        state.profileDetailData = data;
      }
    },

    actions: {
      getPersonCard({commit,state}, {id}) {
        let apiUrl = servicePath + '/humanresource/HumanResourceWebsvcService/getEmployeeProfile/';
        Vue.http.jsonp(apiUrl, {
          params: {
            argsJson: JSON.stringify({
              id: id,
            }),
            format: 'jsonp'
          }
        }).then((response) => {
          let obj = response.body;
          if (obj.status === 1) {
            let photo = response.body.data.profile.photo;
            if (photo && '' !== photo && photo.indexOf(serviceImagePath) < 0) {
              photo = serviceImagePath + photo.replace(/\s/g, '%20');
            }
            let dest = {
              photo: photo,
              name: obj.data.profile.name,
              action: obj.data.profile.action,
              post: obj.data.profile.post
            }
            let list = _.omit(obj.data, "profile");
            commit('setPersonCard', dest);
            commit('setProfileList', list);
          } else {
            commit('setPersonCard', {});
          }
        }, (error) => {
          return error;
        });
      },

      getProfileDetail({commit,state}, {id,groupID}) {
        let apiUrl = servicePath + '/humanresource/HumanResourceWebsvcService/getEmployeeProfileDetail/';
        let currentStruct = state.profileStruct[groupID];
        let withStruct = false;
        if (currentStruct === undefined || currentStruct === null) {
          withStruct = true;
        }
        let argsParam = {
          group_id: groupID,
          withStructure: withStruct
        }
        if(id !== undefined && id !== null){
          argsParam.id = id;
        }
        Vue.http.jsonp(apiUrl, {
          params: {
            argsJson: JSON.stringify(argsParam),
            format: 'jsonp'
          }
        }).then((response) => {
          let obj = response.body;
          if (obj.status === 1) {
            let data = obj.data;
            let struct = null;
            let data_ = null;
            if (data.structure !== undefined && data.structure !== null) {
              let desObj = state.profileStruct;
              desObj[groupID] = data.structure;
              commit('setProfileStruct', desObj);
              struct = data.structure;
            } else {
              struct = currentStruct;
            }
            if(data.isGroup === false){
              data_ = compactDetail(data.data, struct, false, id);
            }else{
              data_ = compactGroupDetail(data.data, struct, id);
            }
            let dataobj = {
              data: data_,
              isGroup: data.isGroup,
              permission_code: data.permission_code || 0
            };
            
            commit('setProfileDetailData', dataobj);
          } else {
            //TODO
          }
        }, (error) => {
          return error;
        });
      },

      updateField({commit,state},{field_code,groupId,value}){
        let apiUrl = servicePath + '/humanresource/HumanResourceWebsvcService/updateEmployeeProfileDetail/';
        return Vue.http.jsonp(apiUrl, {
          params: {
            argsJson: JSON.stringify({
              group_type : groupId,
              field_code: field_code,
              isGroup : false,
              value : value 
            }),
            format: 'jsonp'
          }
        });
      },

      updateForm({commit,state},{dataId,groupId,value}){
        let apiUrl = servicePath + '/humanresource/HumanResourceWebsvcService/updateEmployeeProfileDetail/';
        return Vue.http.jsonp(apiUrl, {
          params: {
            argsJson: JSON.stringify({
              group_type : groupId,
              id: dataId,
              isGroup : true,
              value : value 
            }),
            format: 'jsonp'
          }
        });
      },
      deleteForm({commit,state},{dataId,groupId}){
        let apiUrl = servicePath + '/humanresource/HumanResourceWebsvcService/deleteEmployeeProfileDetail/';
        return Vue.http.jsonp(apiUrl, {
          params: {
            argsJson: JSON.stringify({
              group_type : groupId,
              id: dataId,
              isGroup : true,
            }),
            format: 'jsonp'
          }
        });
      },
    }
  }

  export default moduleHome;