<template>
  <v-content :className="'page-with-headOnly '+animation">
    <div class="contact-header" style="margin-top:8px">
        <div class="wx-group">
            <ul class="wx-person">
                <li class="wx-item">
                    <div class="wx-icon cut-img" id="wx_icon">
                        <img :src="serviceImagePath+person.photo" style="width:60px;height:60px"> 
                    </div>
                    <div class="wx-name">
                        {{person.name}} 
                        <i v-if="isMan" class="icon WeStar_iconfont" style="font-size:12px">&#xe625;</i> 
                        <i v-if="!isMan" class="icon WeStar_iconfont" style="font-size:12px">&#xe625;</i>
                    </div> 
                </li>
            </ul>
        </div>
    </div>
    <div class="list-block" style="margin-top:16px">
        <div class="list-group">
          <ul>
            <li v-if="hasMobile">
              <a :href="'tel:'+person.mobile" class="item-link item-content external">
                <div class="item-media">
                  <i class="icon WeStar_iconfont">&#xe604;</i>
                </div>
                <div class="item-inner">
                  <div class="item-title">{{person.mobile}}</div>
                </div>
              </a>
            </li>
              <li v-if="hasMobile">
                <a :href="'sms:'+ person.mobile" class="item-link item-content external">
                  <div class="item-media">
                    <i class="icon WeStar_iconfont">&#xe61c;</i>
                  </div>
                  <div class="item-inner">
                    <div class="item-title">{{person.mobile}}</div>
                  </div>
                </a>
              </li>
              <li v-if="hasEmail">
                <a :href="'mailto:'+person.email" class="item-link item-content external">
                  <div class="item-media">
                    <i class="icon WeStar_iconfont">&#xe608;</i>
                  </div>
                  <div class="item-inner">
                    <div class="item-title">{{person.email}}</div>
                  </div>
                </a>
              </li>
          </ul>
        </div>

        <div class="list-group" style="margin-top:16px" v-if="hasOrg">
          <ul> 
              <li>
                  <a class=" item-content">
                      <div class="item-media">
                          <i class="icon WeStar_iconfont">&#xe602;</i>
                      </div>
                      <div class="item-inner">
                          <div class="item-title" style="color:rgb(125,125,125)">{{person.organization}}</div>
                      </div>
                  </a>
              </li>
              <li v-if="hasPost">
                <a class=" item-content">
                  <div class="item-media">
                    <i class="icon WeStar_iconfont">&#xe616;</i>
                  </div>
                  <div class="item-inner">
                    <div class="item-title" style="color:rgb(125,125,125)">{{person.post}}</div>
                  </div>
                </a>
              </li>
              <li v-if="hasSupervisor">
                <a class="item-content item-link supervisor-item"  @click="gotoNextPerson">
                  <div class="item-media">
                    <i class="icon WeStar_iconfont">&#xe620;</i>
                  </div>
                  <div class="item-inner">
                    <div class="item-title" style="color:rgb(125,125,125)">主管</div>
                    <div class="item-after">{{person.supervisor.name}}</div>
                  </div>
                </a>
              </li>
              <router-link tag="li" v-if="hasSubordinate" :to="{path:'/contact/subordinate',query: {id:person.id,origin : hasOrigin?origin : null}}">
                <a class="item-content item-link subordinate-item">
                  <div class="item-media">
                    <i class="icon WeStar_iconfont">&#xe620;</i>
                  </div>
                  <div class="item-inner">
                    <div class="item-title" style="color:rgb(125,125,125)">下属</div>
                    <div class="item-after">{{person.subordinate_no}}</div>
                  </div>
                </a>
              </router-link>
          </ul>
        </div>
        <div class="list-group" style="margin-top:16px">
            <ul>
                <li>
                    <div class="item-content">
                        <div class="item-media">
                            <i class="icon WeStar_iconfont">&#xe627;</i>
                        </div>
                        <div class="item-inner">
                            <div class="item-title">收藏</div>
                            <div class="item-after" id="myContact_contactDetail_checkbox">
                                <label class="label-switch" @click.prevent="setFavor"> 
                                    <input type="checkbox" checked v-if="isFavor"/>
                                    <input type="checkbox" v-if="!isFavor"/>
                                    <div class="checkbox"></div>
                                </label>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
    <div v-if="hasOrigin" class="back-previous back-color-imp" @click="gotoOrigin">
      <span>
          <i class="icon WeStar_iconfont back-icon-spec" style="color:white!important">&#xe632;</i>
      </span>
      <span>{{origin.name}}</span>
    </div>
  </v-content>
</template>

<script>
  import VContent from '../../components/Content';
  import {serviceImagePath} from '../../config';

  export default {
    created:function(){
      this.$store.commit('setHead',this.head);
      this.$store.commit('hideFooter');

      let id = this.$route.query.id;
      this.origin = this.$route.query.origin;
      if(this.origin === undefined){
        this.showOrigin = false;
      }else{
        this.showOrigin = true;
      }
      this.$store.dispatch('getSpecContact',{
        id : id
      }).then(
        (response)=>{
          let data = response.body.data;
          this.person = data;
          if(this.origin === undefined){
            this.origin = {
              id : data.id,
              name : data.name
            }
          }
        },
        (reject)=>{

        }
      )
    },

    computed :{
      hasMobile(){
        return this.person.mobile ? true : false;
      },
      hasEmail(){
        return this.person.email ? true : false;
      },
      hasOrg(){
        return this.person.organization ? true : false;
      },
      hasPost(){
        return this.person.post ? true : false;
      },
      hasSupervisor(){
        let supervisor = this.person.supervisor;
        if(supervisor !== undefined && supervisor.name !== undefined && supervisor.name !== null && supervisor.id !== undefined && supervisor.id !== null){
          return true;
        }else{
          return false;
        }
      },
      hasSubordinate(){
        let no = this.person.subordinate_no;
        if(no === undefined || no === null || parseInt(no) === 0){
          return false;
        }else{
          return true;
        }
      },
      isMan(){
        let gender = this.person.gender;
        if(gender === undefined){
          return false;
        }else{
          return parseInt(gender) === 0 ? true : false;
        }
      },
      isFavor(){
        let isFavor = this.person.isFavor;
        if(isFavor === undefined){
          return false
        }else{
          return parseInt(isFavor) === 1 ? true : false;
        }
      },
      hasOrigin(){
        if(this.showOrigin === true && this.origin !== undefined && this.origin.name !== undefined && this.origin.name !== null && this.origin.id !== undefined && this.origin.id !== null){
          return true;
        }else{
          return false;
        }
      }
    },
    
    data() {
      return {
        head:{
          backShow:true,
          rightShow:true,
          rightInfo:'',
          show:true,
          title:'联系人',
          backToPoint : '/contact'
        },
        person : {},
        serviceImagePath : serviceImagePath,
        animation : '',
        origin : {},
        showOrigin : false,
      }
    },

    methods: {
      gotoNextPerson(){
        let id = this.person.supervisor.id;
        this.$store.dispatch('getSpecContact',{
          id : id
        }).then(
          (response)=>{
            let me = this;
            let data = response.body.data;
            if(this.animation === 'fromRight'){
              me.animation = '';
              setTimeout(function(){
                me.person = data;
                me.animation = 'fromRight';
              },200);
            }else{
              me.person = data;
              me.animation = 'fromRight';
            }
            this.showOrigin = true;
          },
          (reject)=>{

          }
        )
      },

      gotoOrigin(){
        let id = this.origin.id;
        this.$store.dispatch('getSpecContact',{
          id : id
        }).then(
          (response)=>{
            let data = response.body.data;
            this.person = data;
            this.animation = 'fromLeft';
            this.showOrigin = false;
          },
          (reject)=>{

          }
        )
      },

      setFavor(){
        let flag = true;
        if(this.isFavor === true){
          flag = false;
        }
        this.$store.dispatch('setFavor',{
          id : this.person.id,
          flag : flag
        }).then(
        (response)=>{
          let message = '收藏成功';
          if(flag === false){
            message = '取消收藏成功'
          }
          f7.alert('',message);
          this.person.isFavor = flag ? 1 : 0;
          }
        ).catch((error)=>{
          console.log(error);
        })
      },
    },

    components: {
      VContent
    }
  }

</script>
