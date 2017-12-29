import * as citys from './datas/citys'
import * as searchPlace from './datas/searchPlace'
import * as home from './datas/home'
import * as food from './datas/food'
import * as search from './datas/search'
import * as order from './datas/order'
import * as login from './datas/login'

const getdata = (data) => new Promise((resolve, reject)=>{resolve(data)})
//等同于
//const getdata = (data) => {
//	return new Promise((resolve, reject)=>{resolve(data)})
//}
console.log(login)
export const getguesscitys = () =>  getdata(citys.guesscity)
export const gethotcitys = () =>  getdata(citys.hotcity)
export const getallcitys = () =>  getdata(citys.groupcity)
export const getsearchplace = () =>  getdata(searchPlace.searchdata)
export const homeAdress = () =>  getdata(home.msiteAdress)
export const homeFoodNav = () =>  getdata(home.foodTypes)
export const shopList = () =>  getdata(home.shopList)
export const foodCateGory = () =>  getdata(food.category)
export const foodDelivery = () =>  getdata(food.delivery)
export const foodactivity = () =>  getdata(food.activity)
export const searchFood = () =>  getdata(search.searchData)
export const orderList = () =>  getdata(order.orderList)
export const orderDetailData = () =>  getdata(order.orderDetail)
export const getUser = () =>  getdata(login.userInfo)