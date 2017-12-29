<template>
	<div class="myInfoPage" :style="'min-height:'+winHeight+'px'">
		<div class="headertop">
			<header-con :headerLeft = "headerLeft" :title="pageTitle"></header-con>
		</div>
		<div class="myinfos">
			<ul>
				<li>
					<span class="title">用户名</span>
					<input type="text" v-model="username" data-type="name" v-on:focus="focus($event)"/>
				</li>
				<li>
					<span class="title">手机</span>
					<input type="text" v-model="phone" data-type="phone" />
				</li>
				<router-link to="address" tag="li">
					<span class="title">收货地址</span>
				</router-link>
			</ul>
			<p class="tip" v-show = "tipShow">用户名或手机不允许为空</p>
			
			<div class="passwordSet">
				<p class="modelTitle">安全设置</p>
				<ul>
					<router-link to="address" tag="li">
						<span class="title">登录密码</span>
						<span class="edit">修改</span>
					</router-link>
				</ul>
			</div>
		</div>
		
		<div class="btns">
			<span class="editBtn" @click="confirmEdit">确认修改</span>
			<span class="leaveBtn" @click="leaveLogin">退出登录</span>
		</div>
	</div>
</template>
<style lang="scss" scoped="scoped">
	.myInfoPage{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 2000;
		background: #f1f1f1;
		.myinfos{
			ul{
				margin-top: .5rem;
				background: #fff;
				border-bottom: 1px solid #ccc;
			}			
			li{
				padding: .3rem .5rem;
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
				border-top: 1px solid #ccc;
				.title{
					font-size: .6rem;
					line-height: 1.4rem;
					color: #333;
				}
				input{
					font-size: .7rem;
					line-height: 1.4rem;
					color: #666;
					text-align: right;
				}
				.edit{
					display: block;
					font-size: .7rem;
					line-height: 1.4rem;
					color: #999;
					text-align: right;
				}
			}
			.passwordSet{
				margin-top: .6rem;
				p{
					padding: 0 .5rem;
					font-size: .5rem;
					color: #666;
				}
			}
			.modelTitle{
				font-size: .7rem;
			}
			.tip{
				font-size: .5rem;
				color: #f10;
				padding: .5rem;
			}
		}
		.btns{
			padding: 1rem;
			span{
				display: block;
				margin-bottom: .8rem;
				line-height: 1.7rem;
				text-align: center;
				border-radius: .3rem;
				font-size: .7rem;
				color: #fff;
				background: #56D176;
			}
			.leaveBtn{
				background: #d8584a;
			}
		}
	}
</style>
<script>
	import headerCon from './header';
	import {setStorage,getStorage,removeStorage} from '../assets/data/storage'
	export default{
		data(){
			return {
				headerLeft:'arrow',
				pageTitle:'账户信息',
				username:'',
				phone:'',
				tipShow:false
			}
		},
		mounted(){
			let userInfo = JSON.parse(getStorage('user'));
			this.username = userInfo.username;
			this.phone = userInfo.mobile;
		},
		computed: {
            winHeight(){
            	return window.innerHeight
            }
        },
        components:{
        	headerCon
        },
        methods:{
        	confirmEdit(){
        		let newUserInfo = JSON.parse(getStorage('user'));
        		if(this.username == '' || this.phone==''){
        			this.tipShow = true;
        			setTimeout(()=>{
        				this.tipShow = false
        			},2000)
        			return;
        		}
        		newUserInfo.username = this.username;
        		newUserInfo.mobile = this.phone;
        		setStorage('user',newUserInfo);
        		this.$router.push('/home/my')
        	},
        	leaveLogin(){
        		removeStorage('user');
        		this.$router.push('/home/my')
        	},
        	focus(el){
        		let elAttribute = el.target.getAttribute('data-type');
        		if(elAttribute == 'name'){
        			this.username = ''
        		}else{
        			this.phone = ''
        		}
        	}
        }
	}
</script>