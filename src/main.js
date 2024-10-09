import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from './services/api'

const token = localStorage.getItem('token')
if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    store.commit('auth/SET_TOKEN', token)

    // Загружаем данные пользователя при наличии токена
    store.dispatch('auth/getUserData').catch(error => {
        console.error('Ошибка при получении данных пользователя:', error)
        store.dispatch('auth/logout')
    })
}

const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')
