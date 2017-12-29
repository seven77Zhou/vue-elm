<template>
	<div class="orderPage">
		<div class="headertop">
			<header-con :headerLeft = "headerLeft" :title="pageTitle"></header-con>
		</div>
		<div class="orderList">
			<ul>
				<li class="orderListItem" v-for="(item,index) in orderListData">
					<div @click="saveOrder(item)">
						<img :src="item.restaurant_image_url"/>
						<div class="orderListItemCon">
							<div class="orderTitle">
								<h6 ><p class="ellipsis">{{item.restaurant_name}}</p> <span class="orderStatus">{{item.status_bar.title}}</span></h6>
								<p class="orderTime">{{item.formatted_created_at}}</p>
							</div>
							<div class="orderBasket">
								<p class="left ellipsis">{{item.basket.group[0][0].name}} {{item.basket.group[0].length>1?'等'+item.basket.group[0].length+'件商品':''}}</p>
								<span>¥{{item.total_amount.toFixed(2)}}</span>
							</div>
						</div>						
					</div>
					<div class="clear">
						<router-link class="orderMoreBtn" to="/shop">
							<span>再来一单</span>
						</router-link>
					</div>					
				</li>				
			</ul>
		</div>
	</div>
</template>
<style lang="scss" scoped="scoped">
	@import "../assets/style/mixin";
	.headertop{
		position: fixed;
		width: 100%;
		top: 0;
		left: 0;
		z-index: 1000;
	}
	.orderList{
		padding: 1.95rem 0;
	}
	.orderListItem{
		padding: .5rem;
		margin-bottom: .5rem;
		background: #fff;		
		img{
			float: left;
			width: 2rem;
			height: 2rem;
		}
		.orderListItemCon{
			margin-left: 2.3rem;
			.orderTitle{
				@include borderBottom(1px,#eee)
				h6{				
					overflow: hidden;
					p{
						float: left;
						width: 9rem;
						line-height: 1rem;
						font-size: .75rem;
						color: #333;
					}
					.orderStatus{
						float: right;
						font-size: .5rem;
						line-height: 1rem;
						font-weight: normal;
					}
				}
				.orderTime{
					font-size: .3rem;
					line-height: 1rem;
					color: #999;
				}
			}	
			.orderBasket{
				padding: .5rem 0;
				font-size: .6rem;
				line-height: 1rem;
				overflow: hidden;
				@include borderBottom(1px,#eee)
				p{
					width: 10rem;
				}
				span{
					float: right;
					color: #f63;
				}
			}
		}
		.orderMoreBtn{
			float: right;
			margin-top: .5rem;
			padding: 0 .2rem;
			font-size: .6rem;
			line-height: 1rem;			
			border: 1px solid $blue;
			border-radius: .2rem;
			span{
				color: $blue;
			}
		}
	}
</style>
<script>
	import headerCon from './header';
	import {orderList} from '../assets/data/getData'
	//vue-router跳转的路由组件间如何传递数据？ ： 使用vuex将一些页面之间共享的信息放在state中，相当于全局的变量，每个页面都能通过store来访问他。
	import {mapState, mapMutations} from 'vuex'
	export default{
		data(){
			return {
				headerLeft:'arrow',
				pageTitle:'订单列表',
				orderListData:[]
			}
		},
		mounted(){
			this.getOrderList()
		},
		methods:{
			...mapMutations([
               'SAVE_ORDER'
            ]),
			getOrderList(){
				orderList().then(res => {
					this.orderListData = res
				})
			},
			//SAVE_ORDER保存当前页面的信息到vuex的state.orderDetail，mutations.js文件
			saveOrder(item){
				this.SAVE_ORDER(item);
				this.$router.push('order/orderdetail')
			}
		},
		components:{
			headerCon
		}
	}
</script>