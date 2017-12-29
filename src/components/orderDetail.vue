<template>
	<div class="orderDetail" :style="'min-height:'+winHeight+'px' ">
		<div class="headertop">
			<header-con :headerLeft = "headerLeft" :title="pageTitle"></header-con>
		</div>
		<div class="orderDetailCon">
			<div class="orderDetailConTitle">
				<img :src="orderDetail.restaurant_image_url">
				<div class="orderDetailStatus">
					<p class="orderStatus">{{orderDetail.status_bar.title}}</p>
                	<p class="orderStatusBeca">{{orderDetail.timeline_node.description}}</p>
				</div>
				<router-link :to="{path: '/shop', query: { id: orderDetail.restaurant_id}}" tag="div" class="orderAgain">
                    <span>再来一单</span>
                </router-link>
			</div>
			<div class="orderDetailConList">
				<router-link :to="{path: '/shop', query: {id: orderDetail.restaurant_id}}">
					<h6 class="orderDetailShopName"><img :src="orderDetail.restaurant_image_url">{{orderDetail.restaurant_name}}</h6>
				</router-link>
				<ul class="orderDetailFoodList">
					<li v-for="(item,index) in orderDetail.basket.group[0]">
						<p class="food_name ellipsis">{{item.name}}</p>
                        <div class="quantity_price">
                            <span>X{{item.quantity}}</span>
                            <span>&yen;{{item.price}}</span>
                        </div>
					</li>
				</ul>
				<div class="deliverFee">
                    <span>配送费</span>
                    <span>{{orderDetail.basket.deliver_fee.price}}</span>   
                </div>
                <div class="payMent">实付{{orderDetail.total_amount.toFixed(2)}}</div>
			</div>
			<div class="orderDetailDispatch">
				<h6>配送信息</h6>
				<div class="orderDetailDispatchTime">
					<span>送达时间：</span>
					<span>{{orderDetailInfoData.deliver_time}}</span>
				</div>
				<div class="orderDetailDispatchPlace">
					<div>
						<span>送货地址：</span>
						<p>
							<span>{{orderDetailInfoData.consignee}}</span>
							<span>{{orderDetailInfoData.phone}}</span>
							<span>{{orderDetailInfoData.address}}</span>
						</p>
					</div>
				</div>
				<div class="orderDetailDispatchType">
					<span>配送方式：</span>
					<span>蜂鸟专送</span>
				</div>
			</div>
			<div class="orderInfo">
				<h6>订单信息</h6>
				<div class="orderInfoList">
					<span>订单号：</span>
					<span>{{orderDetail.id}}</span>
				</div>
				<div class="orderInfoList">
					<span>支付方式：</span>
					<span>在线支付</span>
				</div>
				<div class="orderInfoList">
					<span>下单时间：</span>
					<span>{{orderDetail.formatted_created_at}}</span>
				</div>
			</div>
		</div>
	</div>
</template>
<style lang="scss" scoped="scoped">
	.orderDetail{
		position: relative;
		z-index: 2000;
		background: #f1f1f1;
	}
	.orderDetailCon{
		.orderDetailConTitle{
			padding: 1rem;
			background: #fff;
			text-align: center;
			margin-bottom: .5rem;
			img{
				width: 3rem;
				height: 3rem;
				border-radius: 50%;
				border: .4rem solid #f5f5f5;
				vertical-align: middle;
			}
			.orderDetailStatus{
				width: 10rem;
				margin: 0 auto;
				font-size: .55rem;
				line-height: .8rem;							
				p{
					text-align: center;
					color: #999;
				}
				.orderStatus{
					margin: .5rem 0;
					font-size: .9rem;
					color: #333;			
				}
			}
			.orderAgain{
				margin-top: .5rem;
                span{
                    border: 0.025rem solid #3190e8;
                    padding: .15rem .3rem;
                    border-radius: .15rem;
                    font-size: .7rem;;
                    color: #3190e8;
                }
			}
			
		}
		.orderDetailConList{
			background: #fff;
			.orderDetailShopName{
				padding: .3rem .5rem;
				border-bottom: 1px solid #eee;
				img{
					width: 1.2rem;
					height: 1.2rem;
					vertical-align: middle;
					margin-right: .3rem;
				}
				
			}
			.orderDetailFoodList{
				li{
					display: -webkit-box;
				    display: -webkit-flex;
				    display: -ms-flexbox;
				    display: flex;
				    -webkit-box-pack: justify;
				    -webkit-justify-content: space-between;
				    -ms-flex-pack: justify;
				    justify-content: space-between;
				    -webkit-box-align: center;
				    -webkit-align-items: center;
				    -ms-flex-align: center;
				    align-items: center;
				    padding: 0 .5rem;
				    line-height: 2rem;
				    .food_name{
				    	font-size: 0.6rem;
					    color: #666;
					    -webkit-box-flex: 4;
					    -webkit-flex: 4;
					    -ms-flex: 4;
					    flex: 4;
				    }
				    .quantity_price{
				    	-webkit-box-flex: 1;
					    -webkit-flex: 1;
					    -ms-flex: 1;
					    flex: 1;
					    display: -webkit-box;
					    display: -webkit-flex;
					    display: -ms-flexbox;
					    display: flex;
					    -webkit-box-pack: justify;
					    -webkit-justify-content: flex-end;
					    -ms-flex-pack: justify;
					    justify-content: flex-end;
					    -webkit-box-align: center;
					    -webkit-align-items: center;
					    -ms-flex-align: center;
					    align-items: center;
					    span{
					    	font-size: .6rem;
					    	color: #ccc;
					    	margin-left: .3rem;
					    }
				    }
				}
				
			}
			.deliverFee{
				display: -webkit-box;
			    display: -webkit-flex;
			    display: -ms-flexbox;
			    display: flex;
			    -webkit-box-pack: justify;
			    -webkit-justify-content: space-between;
			    -ms-flex-pack: justify;
			    justify-content: space-between;
			    -webkit-box-align: center;
			    -webkit-align-items: center;
			    -ms-flex-align: center;
			    align-items: center;
			    padding: 0 .5rem;
			    line-height: 2rem;
			    border-top: 1px solid #eee;
			    span{
			    	font-size: .6rem;
			    	color: #666;
			    }
			}
			.payMent{
				text-align: right;
				font-size: .6rem;
				color: #f63;
				font-weight: bold;
				padding: .5rem;
				border-top: 1px solid #eee;
			}
		}
		.orderDetailDispatch{
			margin-top: .5rem;
			padding-bottom: .3rem;
			background: #fff;
			h6{
				padding: .4rem .5rem;
				font-size: .75rem;
				color: #333;
				border-bottom: 1px solid #eee;
				font-weight: normal;
			}
			.orderDetailDispatchTime{
				padding: .2rem .5rem;
				span{
					font-size: .65rem;
					color: #666;
					line-height: 1rem;
				}
			}
			.orderDetailDispatchPlace{
				padding: .2rem .5rem;
				margin-top: .3rem;
				span{
					font-size: .65rem;
					color: #666;
					line-height: 1rem;
					vertical-align: top;
				}
				p{
					display: inline-block;
					span{
						display: block;
					}
				}
			}
			.orderDetailDispatchType{
				padding: .2rem .5rem;
				margin-top: .3rem;
				span{
					font-size: .65rem;
					color: #666;
					line-height: 1rem;
				}
			}
		}
		.orderInfo{
			margin-top: .5rem;
			background: #fff;
			padding-bottom: .3rem;
			h6{
				padding: .4rem .5rem;
				font-weight: normal;
				font-size: .75rem;
				color: #333;
				border-bottom: 1px solid #eee;
			}
			.orderInfoList{
				padding: .2rem .5rem;
				margin-top: .3rem;
				span{
					font-size: .65rem;
					color: #666;
					line-height: 1rem;
				}
			}
		}
		
	}
</style>
<script>
	import headerCon from './header';
	import {orderDetailData} from '../assets/data/getData'
	//vue-router跳转的路由组件间如何传递数据？ ： 推荐使用vuex，我自己用的就是这个。将一些页面之间共享的信息放在state中，相当于全局的变量，每个页面都能通过store来访问他。
	import {mapState, mapMutations} from 'vuex'
	
	export default{
		data(){
			return {
				headerLeft:'arrow',
				pageTitle:'订单详情',
				orderDetailInfoData:[]
			}
		},
		computed: {
            ...mapState([
                'orderDetail'
            ]),
            winHeight(){
            	return window.innerHeight
            }
        },
		mounted(){
			this.getorderDetail();
			console.log(this.orderDetail)
		},
		methods:{
			getorderDetail(){
				orderDetailData().then(res => {
					this.orderDetailInfoData = res;
				})
			}
			
		},
		components:{
			headerCon
		}
	}
</script>