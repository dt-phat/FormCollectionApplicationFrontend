import { createApp } from 'vue'
import router from "./router"
import './assets/main.css';
import './style.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import App from './App.vue'

createApp(App).use(router).mount('#app')
