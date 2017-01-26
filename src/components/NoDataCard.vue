<template>
  <div style="text-align:center;font-size:18px">{{title}}</div>
</template>
<script>
  export default {
    props: {
      title : {
        type : String,
        default : '没有数据'
      },
    }
  }
</script>