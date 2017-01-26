<template>
  <v-content className="page-with-headOnly">
    <div class="wx-group">
      <ul class="wx-contacts seeDetail">
        <router-link v-for="item in items" :to="{path:'/contact/detail',query: {id:item.id,origin : origin}}" tag="li"  class="wx-item my-sub-item common-layout-center">
          <span class="wx-icon cut-img">
            <img :src="serviceImagePath + item.photo" style="width:36px;height:36px"/>
          </span>
          <div class="wx-name">{{item.fullname}}</div>
        </router-link>
      </ul>
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
      let origin = this.$route.query.origin;
      if(origin !== undefined && origin !== null){
        this.origin = origin;
      }
      this.$store.dispatch('getMySubordinate',{
        id : id
      }).then(
        (response)=>{
          let data = response.body.data;
          this.items = data;
        },
        (reject)=>{

        }
      )
    },
    destroyed:function(){

    },
    data() {
      return {
        head:{
          backShow:true,
          rightShow:true,
          rightInfo:'',
          show:true,
          title:'选择下属'
        },
        serviceImagePath : serviceImagePath,
        items : [],
        origin : undefined
      }
    },
    components: {
      VContent
    }
  }

</script>
