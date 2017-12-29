import {
	SAVE_ORDER,
} from './mutation-types.js'


export default {
	//进入订单详情页前保存该订单信息
	[SAVE_ORDER](state, orderDetail) {
//		console.log(orderDetail)
//		console.log(orderDetail)
		state.orderDetail = orderDetail;
	},
}