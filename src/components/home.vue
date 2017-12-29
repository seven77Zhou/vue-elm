<template>
	<div class="animated">
		<router-view></router-view>
		<footer-con></footer-con>
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
	import 'mint-ui/lib/loadmore/style.css';

	export default{
		data(){
			return {
				active:'home',
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
	    },
	    mounted() {
	   
	        //this.getShopList();
	        this.loadPageList();
	    },
		components:{
			headerCon,
			footerCon,
			stars,
			'v-loadmore':Loadmore
		},
		methods:{
			
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
		    }
		}
	}
</script>