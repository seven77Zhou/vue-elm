<template>
  <div id="app">
  	<transition enter-active-class="fadeIn" leave-active-class="fadeOut" mode="out-in">
    	<router-view></router-view>
   </transition>
  </div>
</template>

<script>
export default {
  data () {
    return {
      
    }
  }
  
}
</script>

<style lang="scss">
	@import './assets/style/common';
	.animated{
		-webkit-animation-duration: 0.3s;
 		animation-duration: 0.3s;
 		position: absolute;
 		top: 0;
 		left: 0;
 		width: 100%;

	}
</style>
