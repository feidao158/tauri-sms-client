import { createApp } from "vue";
import App from "./App.vue";
import 'ant-design-vue/dist/reset.css';
import router from './router'
import {createPinia} from "pinia";

const pinia = createPinia()

createApp(App).use(router).use(pinia).mount("#app");
