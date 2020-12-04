import Vue from 'vue'
import App from './App'
import "./font/iconfont.css"
import "./styles/main.css"
import rq from "./utils/request.js"
Vue.config.productionTip = false
Vue.prototype.$rq=rq

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
