import { createApp } from 'vue'
import {router} from "./router";
import {store} from "./store";
import "./assets/css/base-style.css"
import "./assets/css/index.css"
import App from './App.vue'



const app = createApp(App)
app.use(router)
app.use(store)
app.mount("#app")

