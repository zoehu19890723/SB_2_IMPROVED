<template>
  <v-content className="page-with-both">
      <div class="search-container">
          <div class="search-bar-panel" :style="{width:searhPanelWidth}">
              <i class="WeStar_iconfont">&#xe630</i>
              <form method="post" id="form" action="#" @submit.prevent>
                  <input class="input-box" type="search" @search="onSearch" placeholder="搜索姓名/职位/部门" @focus="onSearchFocus" v-model="searchValue"/>
              </form>
          </div>
          <span class="cancel_btn" @click="onSearchCancel">
              清除
          </span>
      </div>
      <div class="search-histroy-panel">
          <div class="wx-group">
              <ul class="wx-contacts"></ul>
          </div>
      </div>
      <div class="myFavor-list-panel" v-if="!doSearch">
          <div v-if="noFavor" class="nofavor-tip">没有收藏的联系人</div>
          <div v-if="!noFavor" class="wx-group">
            <ul class="wx-contacts seeDetail">
              <li class="wx-title group-title common-layout-center">收藏的联系人</li>
              <li v-for="item in favorList" class="wx-item">
                <router-link :to="{path:'/contact/detail',query:{id :item.id}}">
                  <span class="wx-icon cut-img">
                    <img @load="AutoResizeImage(36,this)" :src="baseImageUrl + item.photo" style="width:36px;height:36px"/>
                  </span>
                  <div class="wx-name">{{item.name}}</div>
                  <div class="wx-pos">
                    <span>{{item.organization}}</span>
                    <span v-if="item.position" class="position-detail">{{item.position}}</span>
                  </div>
                </router-link>
              </li>
            </ul>
          </div>
      </div>
      <div class="search-result-panel" v-if="doSearch">
        <div v-if="noResult" class="wx-title no-search-result">找不到符合条件的联系人</div>
        <div v-if="!noResult"  class="wx-group">
          <ul class="wx-contacts seeDetail">
            <li class="wx-title group-title common-layout-center">搜索结果</li>
            <li v-for="item in serachResult" class="wx-item">
              <router-link :to="{path:'/contact/detail',query:{id :item.id}}">
                <span class="wx-icon cut-img">
                  <img @load="AutoResizeImage(36,this)" :src="baseImageUrl + item.photo" style="width:36px;height:36px"/>
                </span>
                <div class="wx-name">{{item.name}}</div>
                <div class="wx-pos">
                  <span>{{item.organization}}</span>
                  <span v-if="item.position" class="position-detail">{{item.position}}</span>
                </div>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
  </v-content>
</template>

<script>
  import VContent from '../../components/Content';
  import {serviceImagePath} from '../../config';

  export default {
    created:function(){
      this.$store.commit('setHead',this.head);
      this.$store.commit('setActiveItem',1);
      this.$store.commit('showFooter');

      this.$store.dispatch('getFavorList').then(
        (result)=>{
          this.favorList = result.data;
        });
    },

    data() {
      return {
        head:{
          backShow:false,
          rightShow:true,
          rightInfo:'',
          show:true,
          title:'联系人'
        },
        favorList : [],
        serachResult : [],
        baseImageUrl : serviceImagePath,
        searhPanelWidth : 'calc(96% - 40px)',
        searchValue : '',
        doSearch : false,
      }},

    computed : {
      noFavor(){
        if(this.favorList.length === 0){
          return true;
        }else{
          return false;
        }
      },
      noResult(){
        if(this.serachResult.length === 0){
          return true;
        }else{
          return false;
        }
      }
    },

    methods: {
      AutoResizeImage(maxSize,objImg){
        let img = new Image();
        img.src = objImg.src;
        let hRatio;
        let wRatio;
        let Ratio = 1;
        let w = img.width;
        let h = img.height;
        wRatio = maxSize / w;
        hRatio = maxSize / h;
        if (wRatio < 1 || hRatio < 1) {
          Ratio = (wRatio > hRatio ? wRatio : hRatio);
        }
        if (Ratio < 1) {
          w = w * Ratio;
          h = h * Ratio;
        }
        objImg.height = h;
        objImg.width = w;
      },

      onSearchFocus() {
        this.searhPanelWidth = 'calc(96% - 100px)';
      },

      onSearchCancel() {
        this.searhPanelWidth = 'calc(96% - 40px)';
        this.searchValue = '';
        this.doSearch = false;
      },

      onSearch(){
        let key = this.searchValue;
        this.$store.dispatch('getSearchList',{
          key : key
        }).then(
          (response)=>{
            this.doSearch = true;
            let status = response.body.status;
            let result = response.body.data;
            if(parseInt(status) === 1){
              this.serachResult = result;
            }else{
              f7.alert(response.body.message);
            }
          },
          (reject) => {
            f7.alert('网络错误！');
          }
        )
      }
    },

    components: {
      VContent
    }
  }

</script>

<style>
.wx-pos{
  color : rgb(125,125,125);
}
</style>
