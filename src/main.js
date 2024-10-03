import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from './services/api'

const token = localStorage.getItem('token')
if (token) {
    console.log('Токен найден при загрузке приложения:', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    store.dispatch('auth/fetchUser').catch(error => {
        console.error('Ошибка при проверке токена:', error);
        store.dispatch('auth/logout')
    })
} else {
    console.log('Токен не найден при загрузке приложения');
}

const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')
