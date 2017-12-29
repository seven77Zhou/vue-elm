import citys from './components/citys'
import page404 from './components/page404'
import citySearch from './components/citySearch'
import home from './components/home'
import homeCon from './components/homeCon'
import shop from './components/shop'
import search from './components/search'
import orderBox from './components/orderBox'
import order from './components/order'
import orderDetail from './components/orderDetail'
import my from './components/my'
import myBox from './components/myBox'
import food from './components/food'
import myInfo from './components/myInfo'

import login from './components/login'
const routes = [
	{
		path:'/city',
		component:citys
	},
	{
		path:'/citysearch/:id/:name',
		component:citySearch
	},
	{
		path:'/home',
		component:home,
		children:[
			{path:'',component:homeCon},
			{path:'search',component:search},
			{
				path:'order',
				component:orderBox,
				children: [
					{
	                    path: '',
	                    component: order
	               },
	               {
	                    path: 'orderdetail',
	                    component: orderDetail
	                }
				]
			},
//			{ path: 'orderdetail',component: orderDetail}
//			,
			{
				path:'my',
				component:myBox,
				children: [
					{
	                    path: '',
	                    component: my
	               },
					{
	                    path: 'myinfo',
	                    component: myInfo
	                }
				]
			}
			
		]
	},
	{
		path:'/food',
		component:food
	},
	{
		path:'/shop',
		component:shop
	},
	{
		path:'/login',
		component:login
	},
	{
		path:'/',
		redirect:'/city'
	},
	{
		path:'*',
		component:page404
	}
]
export default routes