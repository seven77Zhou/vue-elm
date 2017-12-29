<template>
	<div class="page">
		<div class="headertop">
			<header-con :headerLeft = "headerLeft" :title="pageTitle"></header-con>
		</div>
		<div class="searchBox">
			<input class="searchInput" type="text" placeholder="请输入商家或美食名称" v-model = "searchText" @input="checkInput"/>
			<input class="subminBtn" type="button" value="确定" @click = "confirmSearchData()" />
		</div>
		<p class="tips" v-show = "ifSearchEmpty"><b>!</b> 请输入搜索关键词</p>
		
		<!--搜索历史-->
		<div class="searchHistory" v-show="oldStorage.length>0 && searchText==''">
			<h6>搜索历史</h6>
			<ul class="searchHistoryList">
				<li v-for="(item,index) in oldStorage" :key="index">
					{{item}}
					<span class="del" @click = "delHistory(item)">X</span>
				</li>
			</ul>
			<p class="delAll" @click = "delHistoryAll()">清空历史记录</p>
		</div>
		
		<!--//搜索产品列表-->
		<div class="foodList" v-show = "searchConfirm">
			<h6>商家</h6>
			<ul class="foodListCon">
				<li v-for="(item,index) in searchFoodData" :key="index">
					<img :src="imgBaseUrl+item.image_path"/>
					<div class="foodListConRight">
						<div class="foodListConInfor">
							<p>{{item.name}}</p>
							<p>月售 {{item.month_sales}} 单</p>
	                        <p>{{item.delivery_fee}} 元起送 / 距离{{item.distance}}</p>
						</div>
						<ul class="foodListConActivity">
							<li v-for="activity in item.restaurant_activity" >
								<i :style="{backgroundColor: '#' + activity.icon_color}"  class="icon">{{activity.icon_name}}</i>
								<span>{{activity.name}}</span>
								<span class="phone">(手机客户端专享)</span>
							</li>
						</ul>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>
<style  lang="scss" scoped="">
	@import "../assets/style/mixin";
	.searchBox{
		padding: .5rem;
		background: #fff;		
		.searchInput{
			@include wh(78%,1.5rem);
			@include font(.65rem,1.5rem);
			border: 1px solid #e4e4e4;
			padding-left: .3rem;
			box-sizing:border-box;
			vertical-align: middle;
		}
		.subminBtn{
			float: right;
			@include wh(20%,1.5rem);
			background: $blue;
			color:#fff;
			@include font(.65rem,1.5rem);
			border-radius:.2rem
		}
	}
	.tips{
		padding:0 .5rem;
		@include font(.65rem,1.5rem);
		color:#f36;
		b{
			color:#f36;
		}
	}
	.foodList{
		padding-bottom: 1.9rem;
		h6{
			padding: .5rem;
			color: #666;
		}
		.foodListCon{
			background: #fff;
			>li{
				@include borderBottom(1px,#ddd);
				padding: .5rem;
				img{
					float: left;
					@include wh(1.7rem,1.7rem);
				}
				.foodListConRight{
					margin-left: 2rem;
					@include font(.55rem,1rem);
					.foodListConInfor{
						padding-bottom: .3rem;
						@include borderBottom(1px,#eee);
					}
					.foodListConActivity{
						padding-top: .3rem;
						font-size: .5rem;
						.icon{
							color: #fff;
							padding: .05rem .15rem;
							border-radius: .2rem;
						}
						.phone{
							color: #f60;
						}
					}
				}
			}
		}
	}
	.searchHistory{
		padding-bottom: 1.9rem;
		h6{
			padding: .5rem;
			color: #666;
		}
		.searchHistoryList{
			background: #fff;
			li{
				padding: .5rem;
				@include font(.7rem,1.5rem);
				@include borderBottom(1px,#eee);
				.del{
					float: right;
					padding: 0 .5rem;
					@include font(.7rem,1.5rem);
					font-weight: bold;
				}
			}
		}
		.delAll{
			background: #fff;
			padding: .2rem;
			@include font(.7rem,1.5rem);
			color: $blue;
			text-align: center;
		}
	}
</style>
<script>
	import headerCon from './header';
	import {searchFood} from '../assets/data/getData';
	import {imgBaseUrl} from '../assets/js/env'
	import {setStorage,getStorage,removeStorage} from '../assets/data/storage'
	export default{
		data(){
			return {
				headerLeft:'arrow',
				pageTitle:'搜索',
				searchFoodData:[],
				imgBaseUrl,
				searchConfirm:false,
				searchText:'',
				ifSearchEmpty:false,
				oldStorage:[]
			}
		},
		mounted(){
			if(getStorage('searchHistory')){
				this.oldStorage = JSON.parse(getStorage('searchHistory'))
			}
		},
		methods:{
			getSearchFood(){
				searchFood().then(res => {
					this.searchFoodData = res;
				})
			},
			confirmSearchData(){
				if(this.searchText != ''){
					this.searchConfirm = true;
					this.getSearchFood();
					if(this.oldStorage.indexOf(this.searchText) == -1){
						this.oldStorage.push(this.searchText)
						setStorage('searchHistory',this.oldStorage)
					}
					
				}else{
					this.ifSearchEmpty = true;
					setTimeout(()=>{
						this.ifSearchEmpty = false
					},2000)
				}
			},
			checkInput(){
				if(this.searchText == ''){
					this.searchConfirm = false;
					this.searchFoodData = [];
				}
			},
			delHistory(item){
				this.oldStorage.splice(this.oldStorage.indexOf(item),1)
				setStorage('searchHistory',this.oldStorage);
			},
			delHistoryAll(){
				this.oldStorage=[];
				removeStorage('searchHistory')
			}
		},
		components:{
			headerCon
		}
	}
</script>