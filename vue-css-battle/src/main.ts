//导入全局样式
import '@/styles/common.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from '@/router'

import App from './App.vue'

//导入element-plus组件
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// //全局注册codemirror组件
// import { basicSetup } from 'codemirror'
// import VueCodemirror from 'vue-codemirror'

const app = createApp(App)

app.use(ElementPlus)
app.use(createPinia())
app.use(router)

app.mount('#app')
