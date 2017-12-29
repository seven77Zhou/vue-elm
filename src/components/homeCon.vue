<template>
	<div class="animated">
		<div class="headertop">
			<header-con :headerLeft = "headerLeft" :title="pageTitle"></header-con>
		</div>
		<nav class="nav">
			<swiper :options="swiperOption" ref="mySwiper">
			  <!-- 幻灯内容 -->
			  
			    <swiper-slide v-for = "(item,index) in foodNavs" :key = "index">
			    	<router-link v-for="(itemFood,indexFood) in item" :to="{path:'/food',query:{title:itemFood.title,id:getCategoryId(itemFood.link)}}" :key="indexFood">
			    		<figure>
			    			<img :src="imgBaseUrl+itemFood.image_url"/>
			    			<figcaption>{{itemFood.title}} </figcaption>			    			
			    		</figure>
			    		
			    	</router-link>
			    </swiper-slide>
			    <!-- 以下控件元素均为可选 -->
			    <div class="swiper-pagination"  slot="pagination"></div>
			</swiper>
		</nav>
		<router-view></router-view>
		<div class="bg_space"></div>
		<div class="shops">
			<h3>附近商家</h3>
			<div class="main-body" :style="{'-webkit-overflow-scrolling': scrollMode}">  
    			<v-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">  
					<ul>
						<router-link :to="{path:'/shop'}" tag="li" v-for="(item,index) in shopListArr" :key="index" class="shopList">
							<figure>
								<img :src="item.image_path | getImgUrl"/>
							</figure>
							<div class="shopCon">
								<div class="title">
									<h6 class="ellipsis">{{item.name}}</h6>
									<div>
										<span class="supports" v-for = "(item,index) in item.supports">{{item.icon_name}}</span>
									</div>
								</div>
								<div class="ratingOrder">
									<div class="rating ellipsis">
										<stars :star = "item.rating" :starwidth = "14"></stars>
										<span class="ratingNum">{{item.rating}}</span>
										<span class="orderNum">月售{{item.recent_order_num ? item.recent_order_num : 0}}单</span>
									</div>
									<div class="rating_order_num_right ellipsis" v-if="item.delivery_mode">
										<span class="delivery_style delivery_left">{{item.delivery_mode.text}}</span>
										<span class="delivery_style delivery_right">准时达</span>
									</div>
								</div>
								<div class="priceDistance">
									<div class="price">
										&yen;{{item.float_minimum_order_amount}}起送  <span>/</span> {{item.piecewise_agent_fee.tips}}
									</div>
									<div class="distance">
										<span>{{item.distance > 1000 ? (item.distance/1000).toFixed(2)+'km':item.distance+'m' }}</span>
										<span>/</span>
										<span class="order_time">{{item.order_lead_time}}分钟</span>
									</div>
								</div>
							</div>
						</router-link>
					</ul>
				</v-loadmore>  
  			</div>  	
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
	.nav{		
		margin-top: 1.95rem;
		background: #fff;
		@include borderBottom(1px,#ccc);		
		.swiper-container{
			padding: .55rem 0;
			a{
				float: left;
				width: 25%;
				text-align: center;
				img{
					width: 1.8rem;
					vertical-align: middle;
				}
				figcaption{
					color: #666;
					@include font(0.4rem,1.6rem)
				}
			}
		}
		
	}

	.shops{
		width: 100%;
		/*overflow-x: hidden;*/
		background: #fff;
		@include borderTop(1px,#ccc);
		h3{
			padding: 0 .5rem;
			@include font(.5rem,1.6rem);
			font-weight: normal;
		}
		
		.shopList{
			@include flex();
			@include borderBottom(1px,#ccc);
			padding: .5rem;
			img{
				@include wh(2.7rem,2.7rem);
				margin-right: .4rem;
				vertical-align: middle;
			}
			.shopCon{
				-webkit-box-flex: 1;
				-ms-flex: auto;
				-webkit-flex: auto;
				flex: auto;
				overflow: hidden;
				.title{
					@include flex();
					-webkit-box-pack: justify;
				    -webkit-justify-content: space-between;
				    -ms-flex-pack: justify;
				    justify-content: space-between;
					h6{
						width: 8.5rem;
						@include font(.63rem,.7rem);
						color: #333;
						font-weight: bold;
					}
					div{
						@include flex();
						.supports{
							border: 1px solid #eee;
							@include wh(.76rem,.76rem);
							@include font(.1rem,.7rem);
							@include borderRadius(2px)
							margin-left: .1rem;
							color: #999;
							text-align: center;
						}
					}
					
				}
				.ratingOrder{
					@include flex();
					-webkit-box-pack: justify;
				    -webkit-justify-content: space-between;
				    -ms-flex-pack: justify;
				    justify-content: space-between;
					.rating{
						min-width: 6.7rem;
						@include flex();
						line-height: 1.2rem;
						height: 1.2rem;
					}
					.ratingNum{
						font-size: .5rem;
						color: #f63;
						line-height: 1.5rem;
						margin-left: .2rem;
					}
					.orderNum{
						font-size: .4rem;
						line-height: 1.5rem;
						margin-left: .3rem;
						font-weight: bold;
					}
					.rating_order_num_right{
						font-size: .5rem;
						line-height: 1.5rem;
						span{
							border: 1px solid #eee;
							padding: 1px 2px;
							@include borderRadius(2px)
						}
					}
				}
				.priceDistance{
					@include flex();
					-webkit-box-pack: justify;
				    -webkit-justify-content: space-between;
				    -ms-flex-pack: justify;
				    justify-content: space-between;
					font-size: .4rem;
					line-height: 1rem;
					.order_time{
						color: $blue;
						font-weight: bold;
					}
				}
			}
		}
	}
</style>
<script>
	import headerCon from './header';
	import footerCon from './footer'
	import {swiper, swiperSlide} from 'vue-awesome-swiper'
	import {imgBaseUrl} from '../assets/js/env'
	import {homeAdress,homeFoodNav,shopList} from '../assets/data/getData'
	import stars from './star/star.vue'
	import {Loadmore} from 'mint-ui'; 
	import 'mint-ui/lib/loadmore/style.css'

	export default{
		data(){
			return {
				active:'home',
				pageTitle:this.$route.query.name,
				headerLeft:'search',
				hasGetHash:false,
				geohash:'',
				foodNavs:[],
				imgBaseUrl,
				swiperOption: {
                    // 所有配置均为可选（同Swiper配置）  
                    notNextTick: true,
                    loop:true,
                    pagination : '.swiper-pagination',
            	},
            	shopListArr:[],
            	searchCondition:{  //分页属性  
		          pageNo:"1",  
		          pageSize:"10"  
		        },  
		        allLoaded: false, //是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了  
		        scrollMode:"auto", //移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动  
		        ifloadTop:false//是否下拉刷新
			}
		},
		// babel基础包不包含此ES6语法，有警告，使用transform-runtime转化器可以解决此类问题
		async beforeMount(){
			//不加async没事
			//通过搜素框提交的geohash是unndifined，会异步调取数据值
			this.geohash = this.$route.query.geohash;
			if(!this.geohash){
				homeAdress(this.geohash).then(res=>{					
					this.pageTitle = res.name
				})
			}
			this.hasGetHash = true
		},
	    computed: {
	        swiper() {
	          return this.$refs.mySwiper.swiper
	        }
	    },
	    mounted() {
	        
	        this.foodTypes();
	        //this.getShopList();
	        this.loadPageList();
	    },
		components:{
			headerCon,
			footerCon,
			swiper,
			swiperSlide,
			stars,
			'v-loadmore':Loadmore
		},
		methods:{
			foodTypes(){
				homeFoodNav().then(res => {
					//数据返回res为16个元素的数组，而nav需要2页每页8个，所以需要对返回的数据进行加工
					let dataNavLength = res.length;
					let dataNav = res.concat([]);
					for(var i=0,j=0; i < dataNavLength; j++, i+=8){
						this.foodNavs[j] = dataNav.splice(0,8);//该方法会改变原始数组,index,被删数量
					}
					//console.log(this.foodNavs)
				}).then(()=>{
					//有数据之后再进行一次初始化
					this.swiperOption={
						notNextTick: true,
						loop:true,
	                    pagination : '.swiper-pagination'
					}
					this.swiper.slideTo(1, 0, false); 
				})
			},
			loadTop:function() { //组件提供的下拉触发方法  
		        //下拉加载  
		        this.ifloadTop = true;
		        this.loadPageList();  
		        this.$refs.loadmore.onTopLoaded();// 固定方法，查询完要调用一次，用于重新定位  
		    },  
		    loadBottom:function() {  
		        // 上拉加载  
		        this.ifloadTop = false;
		        this.more();// 上拉触发的分页查询  
		        this.$refs.loadmore.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位  
		    },  
		    loadPageList:function (){  
		          // 查询数据  
		        shopList().then(res =>{  
		          // 是否还有下一页，加个方法判断，没有下一页要禁止上拉  		          
		          //console.log(res)
		         // this.isHaveMore(data.result.haveMore);  
		          this.isHaveMore(true); 
		          this.ifloadTop ? this.shopListArr = res :this.shopListArr = this.shopListArr.concat(res);
		          this.$nextTick(function () {  
		            // 原意是DOM更新循环结束时调用延迟回调函数，大意就是DOM元素在因为某些原因要进行修改就在这里写，要在修改某些数据后才能写，  
		            // 这里之所以加是因为有个坑，iphone在使用-webkit-overflow-scrolling属性，就是移动端弹性滚动效果时会屏蔽loadmore的上拉加载效果，  
		            // 花了好久才解决这个问题，就是用这个函数，意思就是先设置属性为auto，正常滑动，加载完数据后改成弹性滑动，安卓没有这个问题，移动端弹性滑动体验会更好  
		            this.scrollMode = "touch";  
		          });  
		        });  
		    },  
		    more:function (){  
		          // 分页查询  
		        this.searchCondition.pageNo = parseInt(this.searchCondition.pageNo) + 1;  
		         shopList().then(res=>{  
		          this.ifloadTop ? this.shopListArr = data :this.shopListArr = this.shopListArr.concat(res);
		          //this.isHaveMore(data.result.haveMore);  
		          this.isHaveMore(true)
		        });  
		    },  
		    isHaveMore:function(isHaveMore){  
		        // 是否还有下一页，如果没有就禁止上拉刷新  
		        this.allLoaded = true; //true是禁止上拉加载  
		        if(isHaveMore){  
		          this.allLoaded = false;  
		        }  
		    },
		    getCategoryId(url){
		    	let urlData = decodeURIComponent(url.split('=')[1].replace('&target_name',''));
	    		if (/restaurant_category_id/gi.test(urlData)) {
	    			return JSON.parse(urlData).restaurant_category_id.id
	    		}else{
	    			return ''
	    		}
		    }
		}
	}
</script>