import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import routes from './routerConfig'
import VueResource from 'vue-resource'
//这个版本是2.5.4版本，先下载3.版本小圆点不出来，回退的
import VueAwesomeSwiper from 'vue-awesome-swiper'
import filters from './filters/index'
import store from './vuexjs'



import './assets/js/rem'
//与下面引用效果一样，import '../node_modules/animate.css/animate.css'
import 'animate.css/animate.css'
// require styles
import 'swiper/dist/css/swiper.css'
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(VueAwesomeSwiper)

console.log(filters)
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]));


const router = new VueRouter({
	routes
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
