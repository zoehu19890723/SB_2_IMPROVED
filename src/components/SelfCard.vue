<template>
  <div class="card">
    <div class="wx-group">
      <ul class="wx-person">
        <li class="wx-item">
          <div class="wx-time" ></div>
          <span class="wx-icon edit-head-photo cut-img">  
            <img :src="personCard.photo" style="width:60px;height:60px"/>
          </span>
          <div class="wx-name">{{personCard.name}}</div>
          <span class="wx-pos back-color-imp">{{personCard.post || '未知'}}</span>
          <div class="wx-content">{{personCard.action}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    name : 'selfCard',
    data(){
      return {
        baseURL:''
      }
    },
    computed:{
      ...mapGetters(['personCard'])
    },
    methods:{
    }
  }
</script>

<style scoped>
</style>
