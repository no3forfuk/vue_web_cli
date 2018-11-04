//引入vue
import Vue from 'vue';

import App from "./app.vue";
//路由配置
import VueRouter from 'vue-router';

Vue.use(VueRouter);
const routerConfig = require('./router/index');
const router = new VueRouter(routerConfig);
new Vue({
    el: '#app',
    router,
    render: c => c(App)
})