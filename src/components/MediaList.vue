<template>
  <div class="list-block media-list">
    <ul>
      <li>
        <div class="item-content">
          <div class="item-inner">{{propTitle}}</div>
        </div>
      </li>
      <li v-for="item in items">
        <a :href="item.link" class="item-content item-link">
          <div class="item-media">
            <img class="img-circle img-size-50px" :src="item.img">
          </div>
          <div class="item-inner">
            <div class="item-subtitle">{{item.subtitle}}</div>
            <div class="item-text">{{item.text}}</div>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>
<style>
  .img-circle {
    border-radius: 50%;
  }
  .img-size-50px {
    width: 50px;
    height: auto;
  }
</style>
<script>
  export default {
    name: 'MediaList',

    /**
    * @type {string} propTitle
    * @type {{img: string, subtitle: string, text: string, link: string}[]} propItems
    */
    props: ['propTitle', 'propItems'],

    data() {
      return {
        title: this.propTitle,
      };
    },

    computed: {
      items() {
        return this.propItems;
      },
    },

  };
</script>
