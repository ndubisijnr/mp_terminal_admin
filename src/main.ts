import { createApp } from 'vue'
import {router} from "./router";
import {store} from "./store";
import "./assets/css/base-style.css"
import "./assets/css/index.css"
import App from './App.vue'
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/aura-light-green/theme.css'



const app = createApp(App)
app.use(router)
app.use(store)
app.use(PrimeVue)
app.mount("#app")

