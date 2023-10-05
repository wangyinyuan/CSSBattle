//导入全局样式
import '@/styles/common.scss'

import router from '@/router'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createApp } from 'vue'

import App from './App.vue'

//导入element-plus组件
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// //全局注册codemirror组件
// import { basicSetup } from 'codemirror'
// import VueCodemirror from 'vue-codemirror'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(ElementPlus)
app.use(pinia)
app.use(router)

app.mount('#app')
