import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import store from './store'
import * as ElIcons from "@element-plus/icons-vue"
import 'normalize.css/normalize.css'
const app = createApp(App)
for (const name in ElIcons) {
    app.component(name,ElIcons[name])
}
app.use(router).use(store).mount('#app')
