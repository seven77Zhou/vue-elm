<template>
	<div class="myPage">
		<div class="headertop">
			<header-con :headerLeft = "headerLeft" :title="pageTitle"></header-con>
		</div>
		<div class="userInfoTop">
			<router-link :to="getUserInfo? 'my/myinfo':'/login'">
				<img :src="avatar | getImgUrl" class="privateImage" v-if="this.avatar">
				<span class="privateImage" v-else><img width="100%" src="../assets/img/user.png"/> </span>
				<div class="userInfoTopCon">
					<h5>{{username}}</h5>
					<p>{{userPhone}}</p>
				</div>
			</router-link>
		</div>
		<div class="userInfoAccount">
			<ul>
				<li>
					<p><b>{{balance}}</b>元</p>
					<p>我的余额</p>
				</li>
				<li>
					<p><b>{{count}}</b>个</p>
					<p>我的优惠</p>
				</li>
				<li>
					<p><b>{{pointNumber}}</b>分</p>
					<p>我的积分</p>
				</li>
			</ul>
		</div>
		<div class="userInfoList">
			<ul>
				<router-link tag="li" to="order">
					我的订单 <i class="arrowRight"></i>
				</router-link>
				<router-link tag="li" to="count">
					积分商城 <i class="arrowRight"></i>
				</router-link>
				<router-link tag="li" to="vipcard">
					饿了么会员卡 <i class="arrowRight"></i>
				</router-link>
			</ul>
		</div>
		<div class="elmService">
			<ul>
				<router-link tag="li" to="service">
					服务中心 <i class="arrowRight"></i>
				</router-link>
				<router-link tag="li" to="download">
					下载饿了么 <i class="arrowRight"></i>
				</router-link>
			</ul>
		</div>
	</div>
</template>
<style lang="scss" scoped="scoped">
	@import "../assets/style/mixin";
	.userInfoTop{
		padding: .5rem .6rem .7rem;
		background: $blue;
		.privateImage{
			float: left;
			width: 2.5rem;
			height: 2.5rem;
			border-radius: 50%;
			background:#ccc;
		}
		.userInfoTopCon{
			margin-left: 3rem;
			h5{
				color: #fff;
				font-size: .8rem;
				line-height: 1.4rem;
			}
			p{
				color: #fff;
				font-size: .6rem;
				line-height: 1rem;
			}
		}
	}
	.userInfoAccount{
		margin-bottom: .5rem;
		background: #fff;
		overflow: hidden;
		li{
			float: left;
			width: 33.3333%;
			padding: .8rem 0;
			p{
				padding: .2rem;
				text-align: center;
				font-size: .6rem;
				color: #666;
				b{
					line-height: 1rem;
					color: #f90;
					font-size: 1.2rem;
				}
			}
		}
		li:first-child{
			border-right: 1px solid #eee;
			b{
				color: #ff5f3e;
			}
		}
		li:last-child{
			border-left: 1px solid #eee;
			b{
				color: #6ac20b;
			}
		}
	}
	.userInfoList{
		background: #fff;
		padding-left: .6rem;
		li{
			padding: .5rem 0;
			border-bottom: 1px solid #eee;
			font-size: .7rem;
			.arrowRight{
				float: right;
				width: .5rem;
				height: .5rem;
				margin-top: .2rem;
				margin-right: .5rem;
				border-bottom: 1px solid #ddd;
				border-right: 1px solid #ddd;
				transform: rotate(-45deg);
			}
		}
		li:last-child{
			border-bottom: none;
		}
	}
	.elmService{
		margin-top: .5rem;
		background: #fff;
		padding-left: .6rem;
		li{
			padding: .5rem 0;
			border-bottom: 1px solid #eee;
			font-size: .7rem;
			.arrowRight{
				float: right;
				width: .5rem;
				height: .5rem;
				margin-top: .2rem;
				margin-right: .5rem;
				border-bottom: 1px solid #ddd;
				border-right: 1px solid #ddd;
				transform: rotate(-45deg);
			}
		}
		li:last-child{
			border-bottom: none;
		}
	}
</style>
<script>
	import headerCon from './header';
	import {setStorage,getStorage} from '../assets/data/storage'
//	import {mapState, mapMutations} from 'vuex'
	export default{
		data(){
			return {
				headerLeft:'arrow',
				pageTitle:'我的',
				getUserInfo:null,
				imgpath:'',
				avatar:'',
				username:'登录/注册',
				userPhone:'登陆后享受更多特权',
				balance:0,
				count:0,
				pointNumber:0
			}
		},
		mounted(){		
			let userInfo = getStorage('user');
			this.getUserInfo = JSON.parse(userInfo);
			if(this.getUserInfo){
				this.avatar = this.getUserInfo.avatar;
				this.username = this.getUserInfo.username;
				this.userPhone = this.getUserInfo.mobile;
				this.balance = this.getUserInfo.balance;
			}
		},
		computed:{
		},
		components:{
			headerCon
		}
	}
</script>