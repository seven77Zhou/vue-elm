<template>
	<header class="header">
		<router-link to="/home/search"><span v-if = "headerLeft == 'search'" class="search"><i></i></span></router-link>		
		<span v-if = "headerLeft == 'arrow'" class="arrow" @click="$router.go(-1)"><i></i></span>
		<h1 v-if = "headerLeft == 'logo'"><img class="logo" src="../assets/img/elmlogo.jpg"/></h1>
		<h2 class="ellipsis">{{title}}</h2>
	</header>
</template>
<style lang="scss" scoped="scoped">
	@import '../assets/style/mixin';
	.header{
		position: relative;
		padding: 0 .5rem;
		background: $blue;
		@include wh(100%,1.95rem);
		@include font(0.7rem,1.95rem);
		h1{
			float: left;
			@include font(0.7rem,1.95rem);
			img{
				@include wh(1.4rem,1.4rem);
				vertical-align: middle;
			}	
		}
		h2{
			margin-left: 2rem;
			padding-right: 2rem;
			text-align: center;
			@include font(0.7rem,1.95rem);
			color:#fafafa
		}
		.arrow{
			float: left;
			margin-top: 0.47rem;
			text-align: center;
			@include wh(1rem,1rem);
			@include font(0.7rem,1rem);
			i{
				display: inline-block;
				@include wh(0.5rem,0.5rem);
				border-left: 2px solid #fafafa;
				border-bottom: 2px solid #fafafa;
				@include rotate(45deg)
			}
			
		}
		.search{
			float: left;
			margin-top: 0.47rem;
			text-align: center;
			@include wh(1rem,1rem);
			@include font(0.7rem,1rem);
			i{
				display: inline-block;
				@include wh(0.7rem,0.7rem);
				margin-top: 0.15rem;
				background: url(../assets/img/search.png);
				background-size:cover
			}
		}
	}
</style>
<script type="text/javascript">
	export default{
		data(){
			return{
				
			}
		},
		props:['headerLeft','title']
	}
</script>