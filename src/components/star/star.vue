<template>
	<div>
		<span v-for ="(item,index) in stars">
			<img :src="'src/components/star/img/'+item+'.png'" :width="starwidth"/>
		</span>
	</div>
</template>
<style lang="scss" scoped="scoped">
	img{
		vertical-align: middle;
	}
</style>
<script>
	export default{
		data(){
			return {
			}
		},
		props:['star','starwidth'],
		computed:{
			stars(){
				let rateNum = parseFloat(this.star);
				let starArr = [];
				for(var i = 1; i<6; i++){
					if(i <= rateNum){
						starArr[i-1] = 'fullStar'
					}else if(rateNum > i-1 && rateNum< i){
						starArr[i-1] = 'halfStar'
					}else{
						starArr[i-1] = 'emptyStar'
					}
				}
				//console.log(starArr)
				return starArr
			}
		}
	}
</script>