import {imgBaseUrl} from '../assets/js/env'
export const getImgUrl = (val)=>{
	let url = '',suffix = '';
	if(!val){
		url = 'http://test.fe.ptdev.cn/elm/elmlogo.jpeg';
	}else{
		val.indexOf('jpeg') == -1? suffix = '.png' : suffix = '.jpeg';
		url = imgBaseUrl + '/' + val.substr(0,1)+ '/'+val.substr(1,2)+'/'+val.substr(3)+suffix 
	}
	return url
}