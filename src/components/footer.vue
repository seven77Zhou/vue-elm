<template>
	<div class="footer">
		<ul>
			<router-link to="/home" tag="li">
				<i class="footer_icon footer_icon_home"></i>
				<p>首页</p>
			</router-link>
			<router-link to="/home/search" tag="li" >
				<i class="footer_icon footer_icon_search"></i>
				<p>搜索</p>
			</router-link>
			<router-link to="/home/order" tag="li">
				<i class="footer_icon footer_icon_order"></i>
				<p>订单</p>
			</router-link>
			<router-link to="/home/my" tag="li">
				<i class="footer_icon footer_icon_my"></i>
				<p>我的</p>
			</router-link>
		</ul>
	</div>
</template>
<style lang="scss" scoped="scoped">
	@import "../assets/style/mixin";
	.footer{
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 1000;
		@include wh(100%,1.95rem);		
		background: #fff;
		box-shadow: 0 -0.02667rem 0.05333rem rgba(0, 0, 0, 0.1);
		ul{
		    @include flex;
		}
		li{
			-webkit-box-flex: 1;
		    -webkit-flex: 1;
		    -ms-flex: 1;
		    flex: 1;
		    text-align: center;
		    @include font(.5rem,.8rem);
		    padding-top: .2rem;
		    .footer_icon{
		    	display: inline-block;
		    	vertical-align: middle;
		    	@include wh(.7rem,.7rem);	
		    	background: url(../assets/img/footer_home.png);
		    	background-size:cover
		    }
		    .footer_icon_search{
		    	background-image: url(../assets/img/footer_search.png);
		    }
		    .footer_icon_order{
		    	background-image: url(../assets/img/footer_order.png);
		    }
		    .footer_icon_my{
		    	background-image: url(../assets/img/footer_my.png);
		    }
		}
		.router-link-exact-active{
			.footer_icon_home{
				background-image: url(../assets/img/footer_home_active.png);
			}
			.footer_icon_search{
				background-image: url(../assets/img/footer_search_active.png);
			}
			.footer_icon_order{
				background-image: url(../assets/img/footer_order_active.png);
			}
			.footer_icon_my{
				background-image: url(../assets/img/footer_my_active.png);
			}
			p{
				color: $blue;
			}
			
		}
	}
</style>
<script>
	export default{
		data(){
			return{
				
			}
		},
		props:['active']
	}
</script>