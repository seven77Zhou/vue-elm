<template>
	<div class="citys animated">
		<div id="headerTop" >
			<headerCon :headerLeft="headerLeft" :title="pageTitle"></headerCon>
		</div>
		
		<div class="loading" v-if="loading" >
			loading...
		</div>
		
		<div class="nowCity">
			<p>
				当前定位城市：
				<span class="right">
					<b>定位不准时，请在城市列表中选择</b>
				</span>
			</p>
			<p class="cityname">
				<router-link :to="'/citysearch/' + nowCityid +'/'+ nowCity">{{nowCity}}</router-link>				
			</p>
		</div>
		<div class="bg_space"></div>
		<div class="hotCity cityCon">
			<h5>热门城市</h5>
			<ul class="clear">
				<li v-for = "(item,index) in hotCity">
					<router-link :to="'/citysearch/'  +item.id + '/'+ item.name">{{item.name}}</router-link>	
				</li>
			</ul>
		</div>
		
		<div class="bg_space"></div>
		<div class="allCity cityCon">
			<div class="allCityItem"  v-for = "(value, key, index) in allCityData"  :key="key">
				<h5>{{key}}</h5>
				<ul class="clear">
					<li class="ellipsis" v-for = "(item2,index2) in value">
						<router-link :to="'/citysearch/' +item2.id + '/'+ item2.name">{{item2.name}}</router-link>	
					</li>
				</ul>
				<div class="bg_space"></div>
			</div>
		</div>
	</div>
</template>
<style lang="scss" scoped="scoped">
	@import '../assets/style/mixin';
	
	.loading{height: 200px; line-height: 200px; color: #f36;}
	#headerTop{
	    position: fixed;
	    z-index: 100;
	    left: 0;
	    top: 0;
	    width: 100%;
	    height: 1.95rem;
	}
	.nowCity{
		padding-top: 1.95rem;
		p{
			height: 1.5rem;
			line-height: 1.5rem;
			padding: 0 .5rem;
			@include borderBottom(1px,#ccc);
			@include sc(.55rem, #666);
			background: #fff;
		}
	}
	.cityname a{
		color: $blue;
		font-size: 0.65rem;
	}
	.cityCon{
		background: #fff;
		@include borderTop(1px,#ccc);
		h5{
			padding: 0 .5rem;
			height: 1.5rem;
			line-height: 1.5rem;
			@include sc(.55rem, #666);
			font-weight: normal;
			@include borderBottom(1px,#ccc);
		}
		li{
			float: left;
			text-align: center;
			background: #fff;
			@include wh(25%, 1.75rem);
			@include font(0.6rem,1.75rem);
			@include borderBottom(1px,#ccc);
			@include borderRight(1px,#ccc);
			a{
				color: $blue;
			}
		}
		li:nth-of-type(4n){
			border-right: none;
		}
	}
	.allCity{
		border-top: none;
		h5{
			@include borderTop(1px,#ccc);
		}
		li{
			a{
				color: #666;
			}
		}
	}
</style>
<script type="text/javascript">
	import headerCon from './header';
	import {getguesscitys,gethotcitys,getallcitys} from '../assets/data/getData'
	export default{
		data(){
			return{
				headerLeft:'logo',
				pageTitle:'选择城市',
				nowCity:'上海',
				nowCityid:1,
				hotCity:[],
				allCity:{},
				loading:true
			}
		},
		mounted(){
			this.loadData()
		},
		computed:{
			allCityData(){
				var allcitydata = {} ,allcityname = [], allcity = this.allCity;
				for(var i in allcity){					
					allcityname.push(i)
				}
				allcityname = allcityname.sort();
				//遍历排序好的数组，将相应的键值对重新赋予allcitydata
				for(var i = 0; i < allcityname.length; i++){
					allcitydata[allcityname[i]] = allcity[allcityname[i]]
				}
				//console.log(allcitydata)
				return allcitydata
			}
		},
		methods:{
			loadData(){
				//console.log('methods'),先打印methods再打印console.log('computed')，这边先执行，所以在computed里面allCity是有数据的
				//直接是load不进来的，异步，需要用到promise,console.log(citys)
				//console.log(getguesscitys())
				getguesscitys().then( res=> {
					this.loading = false;
					this.nowCity = res.name;
					this.nowCityid = res.id;
				})
				gethotcitys().then(res => {
					this.hotCity = res
				})
				getallcitys().then(res => {					
					this.allCity = res
				})
			}
		},
		
		components:{
			headerCon
		}
	}
</script>