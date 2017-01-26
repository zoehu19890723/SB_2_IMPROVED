<template>
	<div class="toolbar" style="position:fixed">
      	<div class="toolbar-inner" style="justify-content: center;" v-if="btnNumber === 1" @click="_clickCancel">
        	<a href="#" class="cancel-link-actions">撤销</a>
      	</div>
      	<div class="toolbar-inner" v-if="btnNumber === 2">
        	<a href="#" class="approve-link-actions status-3" @click="_clickRefuse"><i class="WeStar_iconfont action-button-icon">&#xe603;</i>拒绝</a>
        	<a href="#" class="approve-link-actions" @click="_clickAgree"><i class="WeStar_iconfont action-button-icon">&#xe600;</i>同意</a>
      	</div>
	</div>
</template>
<script>
  export default {
    name: 'Toolbar',

    props: {
    	btnArray : {
    		type:Array,
    		default : []
    	}
    },

    computed : {
    	btnNumber(){
    		return this.btnArray.length
    	}
    },

    methods: {
      _clickCancel(e){
      	if(this.btnNumber === 1){
      		this.btnArray[0].action.call(e);
      	}
      },
      _clickRefuse(e){
      	if(this.btnNumber === 2){
      		this.btnArray[0].action.call(e);
      	}
      },
      _clickAgree(e){
      	if(this.btnNumber === 2){
      		this.btnArray[1].action.call(e);
      	}
      }
    }
  }
</script>
<style scoped>
</style>