<template>
	<div class="login">
		<div class="headertop">
			<header-con :headerLeft = "headerLeft" :title="pageTitle"></header-con>
		</div>
		<div class="loginBox">
			<form >
				<input type="text" v-model="phoneNumber" placeholder="手机号"/>
				<input type="text" v-model="password" placeholder="密码"/>
				<p class="wrongTips" v-show="wrongTip"><b>!</b>{{wrongTipCon}}</p>
				<p class="tips">温馨提示：未注册饿了么账号的手机号，登陆时将自动注册，且代表您已同意<router-link to="xieyi">《用户服务协议》</router-link></p>
				<input class="submit" type="button" value="登录" @click.prevent="login" />
			</form>
		</div>
	</div>
</template>
<style lang="scss" scoped="scoped">
	.loginBox{
		margin: .5rem 0;		
		input{
			width: 100%;
			padding: .5rem;
			background: #fff;
			color: #666;
			font-size: .7rem;
			box-sizing: border-box;
		}
		input+input{
			border-top: 1px solid #eee;
		}
		.tips{			
			padding: .4rem .6rem;
			font-size: .5rem;
			color: #999;
			line-height: .7rem;			
			a{
				color: #f63;
			}
		}
		.wrongTips{
			padding: .5rem;
			color: #f11;
			font-size: .5rem;
			b{
				display: inline-block;
				margin-right: .3rem;
				width: .7rem;
				height: .7rem;
				text-align: center;
				border: 1px solid #f11;
				border-radius: 50%;
				line-height: .6rem;
				color: #f11;
				font-size: .4rem;
			}
		}
		.submit{
			margin: .5rem;
			padding: .5rem 0;
			width: -webkit-calc(100% - 1rem);
			width: calc(100% - 1rem);
			background: #4cd964;
			color: #fff;
			border-radius: .2rem;			
		}
	}
</style>
<script type="text/javascript">
	import headerCon from './header';
	import {getUser} from '../assets/data/getData';
	import {setStorage,getStorage} from '../assets/data/storage'
	export default{
		data(){
			return {
				headerLeft:'arrow',
				pageTitle:'登录',
				phoneNumber:'',
				password:'',
				wrongTip:false,
				wrongTipCon:''
			}
		},
		methods:{
			login(){
				if(this.phoneNumber == '' || this.password == ''){
					this.wrongTipCon = '手机号/密码不允许为空';
					this.wrongTip = true;
					setTimeout(()=>{
						this.wrongTip = false;
					},2000)
				}else if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.phoneNumber))){
					this.wrongTipCon = '请检查手机号是否填写正确';
					this.wrongTip = true;
					setTimeout(()=>{
						this.wrongTip = false;
					},2000)
				}else if(this.password.length < 6 ){
					this.wrongTipCon = '密码需要6位或6位以上';
					this.wrongTip = true;
					setTimeout(()=>{
						this.wrongTip = false;
					},2000)
				}else{
					getUser().then(res => {
						let newUser = JSON.stringify(res);
						newUser = JSON.parse(newUser);
						newUser.mobile = this.phoneNumber ;
						setStorage('user',newUser);
						this.$router.push('/home/my')
					})
				}
			}
		},
		components:{
			headerCon
		}
	}
</script>