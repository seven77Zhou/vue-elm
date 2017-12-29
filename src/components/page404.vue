<template>
	<div class="pageError">
		<img src="../assets/img/404.png"/>
		<p>该页面不存在/暂时未上线!<span>emm: 小编马上杀个程序猿来祭天XX</span></p>
		<div class="link">
			<router-link to="/home">
				点这里返回首页
			</router-link>
		</div>
		
	</div>
</template>
<style lang="scss" scoped="scoped">
	.pageError{
		padding: 2rem 1rem;
		text-align: center;
		img{
			width:50%
		}
		p{
			padding-top: .8rem;
			span{
				display: block;
				padding-top: .6rem;
				font-size: .6rem;
			}
		}
		.link{
			margin-top: 1rem;
			padding-top: .5rem;
			a{
				font-size: 1rem;
				color: #f63;
			}
			
		}
	}
</style>