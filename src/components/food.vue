<template>
	<div class="food">
		<div class="headertop">
			<header-con :headerLeft = "headerLeft" :title="pageTitle"></header-con>
		</div>
		<section class="filterList">
			<div class="filterListItem">
				<div class="title" @click="chooseType('food')">
					<span>分类<i class="arrowBottom" :class="{arrowTop:sortBy=='food'}"></i></span>
				</div>
				<transition name="showlist">
					<div class="types"  v-show="sortBy =='food'">
						<ul class="typeTitle">
							<li v-for="(item,index) in foodCateGory" :key="index" :class="item.id == nowRestaurantId?'active':''" @click="changeType(item.id,index)">
								<div class="left">
									<img class="category_icon" v-if="item.image_url" :src="item.image_url | getImgUrl"/>
									<span>{{item.name}}</span>
								</div>
								<div class="right">
									<span class="nums">{{item.count}}</span>
									<i class="arrowRight"></i>
								</div>
							</li>
						</ul>
						<div class="typeCon">
							<ul v-for="(item,index) in categoryDetail" :key="index" @click="getNewCategory(item.id,$event)">
								<li :class="index==typeIndex? 'active':''" :data-index = "index">
									<span>{{item.name}}</span>
									<span class="right">{{item.count}}</span>
								</li>
							</ul>
						</div>
					</div>
				</transition>
			</div>
			<div class="filterListItem">
				<div class="title" @click="chooseType('sort')">
					<span>排序<i class="arrowBottom"></i></span>
				</div>
				<transition name="showlist">
					<div class="sortListContainer" v-show="sortBy == 'sort'">
						<ul @click="sortList($event)">
							<li data="0" :class="{active:sortTypeIndex==0}">
								智能排序
							</li>
							<li data="1" :class="{active:sortTypeIndex==1}">
								距离最近
							</li>
							<li data="2" :class="{active:sortTypeIndex==2}">
								销量最高
							</li>
							<li data="3" :class="{active:sortTypeIndex==3}">
								起送价最低
							</li>
							<li data="4" :class="{active:sortTypeIndex==4}">
								配送速度最快
							</li>
						</ul>
					</div>
				</transition>
			</div>
			<div class="filterListItem">
				<div class="title" @click="chooseType('filter')">
					<span>筛选<i class="arrowBottom"></i></span>
				</div>
				<transition name="showlist">
					<div class="dispatchCon" v-show="sortBy == 'filter'">
						<div class="dispatchType">
							<p class="dispatchTitle">配送方式</p>
							<ul class="clear">
								<li v-for="(item,index) in deliveryType" @click="dispatchTypeChoose(item.id)" :class="{active:dispatchId==item.id}">
									<span>{{item.text}}</span>
								</li>
							</ul>
						</div>
						<div class="dispatchType">
							<p class="dispatchTitle">商家属性（可以多选）</p>
							<ul class="clear">
								<li v-for="(item,index) in aboutShop" @click="aboutShopChoose(item.id)" :class="{active:aboutShopId.indexOf(item.id) != -1}">
									<span>{{item.name}}</span>
								</li>
							</ul>
						</div>
						<div class="dispatchBtns">
							<span class="cancle" @click="cancleFilter()">清空</span>
							<span class="confirm" @click="confirmFilter()">确定{{filtersNum==0?'':'('+filtersNum+')'}}</span>
						</div>
					</div>
				</transition>
			</div>
		</section>
		<div class="filterShops">
			<div class="bg_grey" v-show="sortBy != ''"></div>
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
	.filterList{	
		position: fixed;
		top:1.95rem;
		left:0;
		z-index:900;
		background: #fff;
		box-sizing: border-box;
		@include wh(100%,1.6rem);
		@include flex;
		.filterListItem{
			/*-webkit-box-flex: 1;
		    -webkit-flex: 1;
		    -ms-flex: 1;
		    flex: 1;*/
		    width:33.33%;
		    .title{
		    	text-align: center;
		    	padding: .3rem 0;
		    	position: relative;		    	
		    	z-index: 900;
		    	background: #fff;
		    	@include borderBottom(1px,#ccc);
		    	span{
		    		display: block;
		    		height:1rem;
		    		
		    		@include font(.6rem,1rem);
		    		@include borderRight(1px,#ccc);
		    		.arrowBottom{
						display: inline-block;
						vertical-align: middle;
						@include wh(.3rem,.3rem);
						@include borderRight(1px,#666);
						@include borderBottom(1px,#666);
						-webkit-transform:rotate(45deg);
						transform:rotate(45deg);				
						margin-top: -.15rem;
						margin-left: .2rem;
					}
					.arrowTop{
						display: inline-block;
						vertical-align: middle;
						@include wh(.3rem,.3rem);
						@include borderRight(1px,#666);
						@include borderBottom(1px,#666);
						-webkit-transform:rotate(-135deg);
						transform:rotate(-135deg);
					}
		    	}
		    }
		    .showlist-enter-active, .showlist-leave-active {
				transition: all .3s;
				transform: translateY(0);
			}
			.showlist-enter, .showlist-leave-active {
				opacity: 0;
				transform: translateY(-100%);
			}
		    .types{
		    	width:100%;
		    	position: absolute;
		    	z-index: 800;
		    	@include font(.52rem,.8rem);
		    	@include flex
		    	.typeTitle{
		    		background: #f1f1f1;
		    		width:50%;
		    		height: 16rem;
		    		overflow-y: auto;
		    		li{
		    			padding: 0 .5rem;
		    			height:1.8rem;
		    			line-height: 1.8rem;
		    			.category_icon{
		    				@include wh(.8rem,.8rem);
		    				vertical-align: middle;
		    				margin-right: .2rem;
		    			}
		    			.nums{
		    				background: #ccc;
		    				color:#fff;
		    				padding: .05rem .1rem;
		    				@include borderRadius(.2rem)
		    			}
		    			.arrowRight{
		    				display: inline-block;
							vertical-align: middle;
							@include wh(.3rem,.3rem);
							@include borderRight(1px,#666);
							@include borderBottom(1px,#666);
							-webkit-transform:rotate(-45deg);
							transform:rotate(-45deg);
		    			}
		    		}
		    		li:first-child{
		    			.arrowRight{
		    				display: none;
		    			}
		    		}
		    		li.active{
		    			
		    			background: #fff;
		    		}
		    	}
		    	.typeCon{
		    		background: #fff;
		    		width:50%;
		    		height: 16rem;
		    		overflow-y: auto;
		    		box-sizing: border-box;
		    		padding-left: .5rem;
		    		li{
		    			padding: 0 .5rem;
		    			height:1.8rem;
		    			line-height: 1.8rem;
		    			@include borderBottom(1px,#eee);
		    		}
		    		.active{
		    			span{
		    				font-size: .6rem;
		    				color: $blue;
		    			}		    			
		    		}
		    	}
		    }
		    .sortListContainer{
		    	position: absolute;
		    	left: 0;
		    	z-index: 800;
		    	width: 100%;		    	
		    	@include font(.7rem,2rem);
		    	background: #fff;
		    	@include flex;
		    	ul{
		    		width: 100%;
		    		li{
		    			padding-left: .5rem;
			    		@include borderBottom(1px,#ccc)
			    	}
			    	li:last-child{
			    		border-bottom: none;
			    	}
			    	.active{
			    		color: $blue;
			    		font-weight: bold;
			    	}
		    	}
		    		    	
		    }
		    .dispatchCon{
		    	position: absolute;
		    	left: 0;
		    	z-index: 800;
		    	width: 100%;				    	   	
		    	background: #fff;
		    	.dispatchType{
		    		@include font(.6rem,1rem);
		    		padding: .5rem; 
		    		.dispatchTitle{
	    				margin-top: .3rem;
	    			}
		    		li{
		    			float: left;
		    			margin-top: .3rem;
		    			
		    			span{
		    				float: left;
		    				border: 1px solid #ccc;
		    				@include wh(4.7rem,1.4rem);
		    				@include font(.5rem,1.4rem);
		    				text-align: center;
		    				border-radius: .2rem;
		    				margin-right: .3rem;
		    			}
		    		}
		    		li.active{
		    			span{
		    				color: $blue;
		    				font-weight: bold;
		    			}
		    		}
		    	}
		    	.dispatchBtns{
		    		background: #f1f1f1;
		    		padding: .3rem .2rem;
		    		overflow: hidden;
		    		span{
		    			float: left;
		    			width: 48%;
		    			height: 1.8rem;
		    			line-height: 1.8rem;
		    			font-size: .8rem;
		    			border-radius: .2rem;
		    			text-align: center;
		    			background: #fff;
		    		}
		    		.confirm{
		    			background: #56d176;
		    			color: #fff;
		    			margin-left: 2%;
		    		}
		    	}
		    }
		}
		.filterListItem:last-child{
			.title{
				span{
					border-right: none;
					
				}
				
			}
		}
	}
.filterShops{
	padding-top: 3.55rem;
	position: relative;
	.bg_grey{
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 300;
		background: rgba(0,0,0,.5);
	}
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
</style>
<script>
	import headerCon from './header';
	import {foodCateGory,foodDelivery,foodactivity} from '../assets/data/getData';
	import {imgBaseUrl} from '../assets/js/env';
	import {shopList} from '../assets/data/getData'
	import stars from './star/star.vue'
	import {Loadmore} from 'mint-ui'; 
	import 'mint-ui/lib/loadmore/style.css'
	export default{
		data(){
			return{
				pageTitle:this.$route.query.title,
				headerLeft:'arrow',
				foodCateGory:[],//分类列表
				imgBaseUrl,
				categoryDetail:[],//分类列表右边详细列表
				nowRestaurantId:this.$route.query.id,//当前选择的种类，美食、甜点。。。
				sortBy:'',//下拉框是否出现
				deliveryType:[],
				aboutShop:[],
				filtersNum:0,//筛选条件数量
				dispatchId:null,
				aboutShopId:[],//存放已选择的商家
				sortTypeIndex:0,
				typeIndex:0,//分类里面当前选择的数据index值
				
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
		components:{
			headerCon,
			stars,
			'v-loadmore':Loadmore
		},
		mounted(){
			this.getfoodCateGory();
			this.getfoodDelivery();
			this.getfoodActivity();
			this.loadPageList();
		},
		methods:{
			getfoodCateGory(){
				foodCateGory().then(res=>{
					this.foodCateGory = res;
					this.foodCateGory.forEach(item => {
						if(item.id == this.nowRestaurantId){
							this.categoryDetail = item.sub_categories
						}
					})
				})
				
			},
			//初始化配送方式
			getfoodDelivery(){
				foodDelivery().then(res => {					
					this.deliveryType = res;
				})
			},
			//初始化商家属性
			getfoodActivity(){
				foodactivity().then(res=>{
					this.aboutShop = res;
				})
			},
			//改变分类
			changeType(id,index){				
				if(index==0) return;
				this.typeIndex=0
				this.foodCateGory.forEach(item => {
					if(item.id == id){
						this.categoryDetail = item.sub_categories;
						this.nowRestaurantId = id
					}
				})
			},
			//tab栏选择某个选项
			chooseType(type){
				if(this.sortBy != type){
					this.sortBy = type;
				}else{
					this.sortBy=''
				}
			},
			//点击筛选新数据
			getNewCategory(id,event){
				if(event.target.getAttribute('data-index')){
					this.typeIndex = event.target.getAttribute('data-index');
				}else{
					this.typeIndex=0
				}
				this.sortBy='';
				this.ifloadTop=true;
				this.loadPageList();
			},
			//选择配送方式，只能选一个，不能多选
			dispatchTypeChoose(id){				
				if(this.dispatchId == null){
					this.dispatchId = id
					this.filtersNum++
				}else if(this.dispatchId == id){
					this.dispatchId = null
					this.filtersNum--
				}else{
					this.dispatchId =id;
				}
				
			},
			//选择商家属性，多选
			aboutShopChoose(id){
				let filtersnum = this.filtersNum;
				if(this.aboutShopId.indexOf(id) != -1){
					this.aboutShopId.splice(this.aboutShopId.indexOf(id),1);
					filtersnum--;
				}else{
					this.aboutShopId.push(id);
					filtersnum++
				}
				this.filtersNum = filtersnum < 0 ? filtersnum=0:filtersnum;
			},
			//清空
			cancleFilter(){
				this.filtersNum = 0;
				this.aboutShopId=[];
				this.dispatchId =null
			},
			//排序
			sortList(event){
				this.sortTypeIndex = parseInt(event.target.getAttribute('data'));
				this.sortBy='';
				this.ifloadTop = true;
				
				this.loadPageList();
				
			},
			//确定筛选
			confirmFilter(){
				this.sortBy='';
				this.ifloadTop = true;
				this.loadPageList();
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
		          this.ifloadTop ?window.scrollTo(0,0):'';
		          
		          
		          this.$nextTick(function () {  
		            // 原意是DOM更新循环结束时调用延迟回调函数，大意就是DOM元素在因为某些原因要进行修改就在这里写，要在修改某些数据后才能写，  
		            // 这里之所以加是因为有个坑，iphone在使用-webkit-overflow-scrolling属性，就是移动端弹性滚动效果时会屏蔽loadmore的上拉加载效果，  
		            // 花了好久才解决这个问题，就是用这个函数，意思就是先设置属性为auto，正常滑动，加载完数据后改成弹性滑动，安卓没有这个问题，移动端弹性滑动体验会更好  
		            this.scrollMode = "touch";  
		          }); 
		          console.log(this.shopListArr)
		          return this.shopListArr
		        }).then(res => {		        	
		        	//按距离排序--开始
		        		//距离最近
					  if(this.sortTypeIndex ==1){
					  	//先转成字符串，再转回数组，直接赋值数组，改变会变动原数据，指针类型，转值类型进行挪移
					  	let arrStr = JSON.stringify(res);
					  	let arr = JSON.parse(arrStr);
						arr.sort(function(a,b){
							return a.distance-b.distance
						})
						this.shopListArr = arr;			
						//销量最高
					 }else if(this.sortTypeIndex == 2){
					 	//先转成字符串，再转回数组，直接赋值数组，改变会变动原数据，指针类型，转值类型进行挪移
					  	let arrStr = JSON.stringify(res);
					  	let arr = JSON.parse(arrStr);
					 	arr.sort(function(a,b){
							return b.recent_order_num-a.recent_order_num;
						})
						this.shopListArr = arr;					 						  	
					  }else{
					  	//其他暂不处理，以原数据显示
					  	this.shopListArr = res
					  }
		          //按距离排序--结束
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