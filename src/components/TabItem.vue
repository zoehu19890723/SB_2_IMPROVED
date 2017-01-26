<template>
  <div style="height: -webkit-calc(100% - 5px);">
    <div class="content-block  tab-myleave">
      <div class="buttons-row ">
        <a href="#tab1" class="tab-link active button"><i class="WeStar_iconfont">&#xe626;</i>待审批</a>
        <a href="#tab2" class="tab-link button"><i class="WeStar_iconfont">&#xe601;</i>已审批</a>
      </div>
    </div>
    <div class="tabs-animated-wrap tab-content">
      <div class="tabs">
        <div id="tab1" class="tab tab-overflow-auto active">
          <slot name="tab1"></slot>
        </div>
        <div id="tab2" class="tab tab-overflow-auto">
          <slot name="tab2"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    
  },
  computed: {
   
  }
}
</script>
