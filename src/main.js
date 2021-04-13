import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false
    //非父子间的通信，使用事件总线的 发送事件的组件this.$bus.$emit('事件',参数) 接受组件的this.$bus.on('事件名',回调函数)
Vue.prototype.$bus = new Vue()

new Vue({
    render: h => h(App),
    router
}).$mount('#app')