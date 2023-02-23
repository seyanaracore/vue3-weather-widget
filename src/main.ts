import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/styles/index.scss'
import App from './App.vue'

createApp(App).use(createPinia()).mount('weather-widget')
