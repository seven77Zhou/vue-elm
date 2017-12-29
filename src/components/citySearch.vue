<template>
	<div class="animated">
		<div id="headerTop" >
			<headerCon :headerLeft="headerLeft" :title="$route.params.name? $route.params.name:pageTitle"></headerCon>
		</div>
		<div class="searchCon">
			<div class="bg_space"></div>
			<div class="searchbox">
				<form>
					<input type="text" id="" placeholder="输入学校、商务楼、地址" v-model="searchTxt"/>
					<span class="tips" v-show = "showtips">请输入搜索关键词</span>
					<input type="submit" value="提交" @click.prevent = "submit" />
				</form>
			</div>
			<div class="bg_space"></div>
			<div class="searchList">
				<ul>
					<li v-for = "(item,index) in searchPlaceData" @click = "store(index,item.geohash)">
						<router-link :to="'/home'+'?name='+item.name+'&geohash='+item.geohash" >
							<h6 class="ellipsis">{{item.name}}</h6>
							<p class="ellipsis">{{item.address}}</p>
						</router-link>
					</li>
				</ul>
			</div>
			<!--历史搜索记录，无输入时显示-->
			<div class="storage" v-show = "showStorage">
				<h5 >历史搜索</h5>
				<ul>
					<li v-for = "(item,index) in historyArr" @click = "store(index,item.geohash)">
						<router-link :to="'/home'+'?name='+item.name+'&geohash='+item.geohash" >
							<h6 class="ellipsis">{{item.name}}</h6>
							<p class="ellipsis">{{item.address}}</p>
						</router-link>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<style lang="scss" scoped="scoped">
	@import '../assets/style/mixin';
	#headerTop{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
	}
	.searchCon{
		padding-top: 1.95rem;
		.searchbox{
			background: #fff;
			padding: .5rem;
			@include borderTop(1px,#ccc);
			@include borderBottom(1px,#ccc);
			input[type = "text"]{
				@include wh(100%,1.6rem);
				padding: 0 .5rem;
				border: 1px solid #ddd;
				box-sizing: border-box;
				@include font(0.6rem,1.6rem)
			}
			input[type = "submit"]{
				@include wh(100%,1.5rem);
				margin-top: .5rem;
				padding: 0 .5rem;
				box-sizing: border-box;
				@include borderRadius(0.2rem);
				@include font(0.6rem,1.5rem);
				background: $blue;
				color: #fff;
			}
			.tips{
				font-size: .5rem;
				color: #f36;
			}
			
		}
		.searchList{
			background: #fff;			
			li{
				padding: .5rem;
				@include borderBottom(1px,#ccc);
				h6{
					font-size: .65rem;
				}
				p{
					padding-top: .3rem;
					font-size: .45rem;
				}
			}
			li:first-child{
				@include borderTop(1px,#ccc);
			}
		}
		.storage{
			background: #fff;
			h5{
				padding: .5rem;
				font-size: .6rem;
				@include borderBottom(1px,#ccc);
				background: #f2f2f2;
			}
			li{
				padding: .5rem;
				@include borderBottom(1px,#ccc);
				h6{
					font-size: .65rem;
				}
				p{
					padding-top: .3rem;
					font-size: .45rem;
				}
			}
		}
	}
</style>
<script type="text/javascript">
	import headerCon from './header';
	import {getsearchplace} from '../assets/data/getData';//值与getData中的值要一致
	import {setStorage,getStorage,removeStorage} from '../assets/data/storage'
	export default{
		data(){
			return {
				pageTitle:'上海',
				headerLeft:'arrow',
				searchName:'人民广场',
				searchTxt:'',
				searchPlaceData:[],
				historyArr:[],
				showStorage:true,
				showtips:false,
				geohash:''
			}
		},
		mounted(){
			this.loadPlace()
			this.loadStore()
		},
		methods:{
			loadPlace(){
				//如果搜索值为空，则不会调用数据
				if(!this.searchTxt||this.searchTxt.length==0){
					return
				}else{
					getsearchplace().then(res => {
						this.searchPlaceData = res;	
						this.showStorage = false;
					})
				}				
			},
			store(index,geohash){
				let checkrepeat = false;
				let placeHistory = getStorage('placeHistory');
				let newPlaceData = this.searchPlaceData[index];
				if(placeHistory){
					this.historyArr= JSON.parse(placeHistory);
					//console.log(this.historyArr)
					//遍历存储的geohash与当前选择的geohash是否相同，并且要全部不相同才可以添加新的storage
					this.historyArr.forEach(item => {
						//console.log(item.geohash)
						if(item.geohash == geohash){
							checkrepeat = true;							
						}
					})
					if(!checkrepeat){
						this.historyArr.push(newPlaceData);
						setStorage('placeHistory',this.historyArr)
					}
				}else{
					//首次添加本地存储
					this.historyArr.push(newPlaceData);
					setStorage('placeHistory',this.historyArr)
				}
				//setStorage('placeHistory',this.searchPlaceData[index])
			},
			loadStore(){
				//初始加载，本地存储检测
				let placeHistory = getStorage('placeHistory');
				this.historyArr= JSON.parse(placeHistory);
				if(!this.historyArr){
					this.historyArr=[];
					this.showStorage = false;
				}
			},
			submit(){
				if(!this.searchTxt||this.searchTxt.length ==0){
					this.showtips = true;
					setTimeout(()=>{this.showtips = false;},2000);
					return false;
				}else{
					this.$router.push({path:'/home'+'?name='+this.searchTxt})
				}
			}
		},
		watch:{
			//监听输入值的变化
			'searchTxt':function(){//这时候不能用箭头函数，this比较坑，会绑定上下文				
				if(this.searchTxt){
					this.loadPlace();
					this.showStorage = false;
				}else{
					this.searchPlaceData = [];
					this.showStorage = true;
				}
			}
		},
		components:{
			headerCon
		}
	}
</script>