<template>
  <div>
    <div class="leave-item-time">
      {{item.updateTime}}
    </div>
    <router-link tag="div" class="leave-item" :to="{path:path,query:{id : item.id,permissionCode:permissionCode}}">
      <div class = "status-img cut-img">
        <img :src="item.userInfo.image" style="width:40px;height:40px">
      </div>
      <div class="b_main">
        <div class="border border-color">
          <div class = "summary">
            <div class = "title back-color-imp">
              <span>{{item.title}}</span>
            </div>
            <div class = "contentTitle">
              <span>{{item.status.title}}:</span>
              <span class = "value">{{item.status.value}}</span>
            </div>
            <div class = "content" v-for="it in item.general">
              <span>{{it.title}}:</span>
              <span class = "value">{{it.value}}</span>
            </div>
            <div class="link-page">
              <div class="click-detail">查看详情</div>
              <i class="WeStar_iconfont ">&#xe624;</i>
            </div>
          </div>
        </div>
        <div class="out border-right-color">
          <div class="in border-right-color"></div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
  export default {
    name : 'applyInfoCard',
    created : function(){
    },

    props : {
      item : {},
      title : '',
      permissionCode : {
        type : Number,
        default :1
      }
    },

    computed:{
      path(){
        let id = this.item.id;
        console.log(this.item);
        let path = '/home/';
        if(this.item.id === undefined || this.item.id === null){
          return null;
        }else if(id.indexOf('E01') > -1 || id.indexOf('E02') > -1 || id.indexOf('ELEAVE') > -1 ){
          path += 'leave5';
        }else if(id.indexOf('E03') > -1 || id.indexOf('E04') > -1 || id.indexOf('EOT') > -1 ){
          path += 'overtime4';
        }else{
          path += 'approve1';
        }
        return path;
      }
    },
    methods:{
    }
  }
</script>

<style scoped>
</style>
