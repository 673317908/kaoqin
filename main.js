import Vue from 'vue'
import App from './App'
import "./font/iconfont.css"
import "./styles/main.css"
import myAxios from "./utils/request.js"
Vue.config.productionTip = false
Vue.prototype.myAxios = myAxios

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
