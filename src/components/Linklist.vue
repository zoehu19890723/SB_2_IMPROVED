<template>
  <div class="wx-group" style="margin: 5px 0;">
    <ul class="wx-settings">
      <router-link tag="li" v-for="item in items" class="wx-item we-star-person" :to="{path:item.path,query:item.query}">
        <span class="wx-content">  
            <i class="WeStar_iconfont ">&#xe624;</i>
        </span>
        <div class="wx-name">{{item.title}}</div>
      </router-link>
    </ul>
  </div>
</template>

<script>
  export default {
    props: {
      propList : {},
    },
    computed: {
      items() {
        return this.propList;
      }
    }
  }
</script>

<style>
</style>
