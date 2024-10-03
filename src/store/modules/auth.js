import api from '../../services/api'

const state = {
    token: localStorage.getItem('token') || null,
    user: null
}

const getters = {
    isAuthenticated: state => !!state.token
}

const actions = {
    async login({ commit, dispatch }, credentials) {
        try {
            console.log('Попытка входа с данными:', credentials);
            const response = await api.post('/auth/login', credentials)
            const token = response.data.token
            if (!token) {
                throw new Error('Токен не получен от сервера')
            }
            console.log('Получен токен:', token);
            localStorage.setItem('token', token)
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`
            commit('SET_TOKEN', token)
            await dispatch('fetchUser')
            return response
        } catch (error) {
            console.error('Ошибка входа:', error.response ? error.response.data : error.message)
            throw error
        }
    },

    async fetchUser({ commit }) {
        try {
            console.log('Запрос данных пользователя');
            const response = await api.get('/users/me')
            console.log('Получены данные пользователя:', response.data);
            commit('SET_USER', response.data)
            return response.data
        } catch (error) {
            console.error('Ошибка при получении данных пользователя:', error.response ? error.response.data : error.message)
            throw error
        }
    },

    logout({ commit }) {
        console.log('Выполняется выход');
        localStorage.removeItem('token')
        delete api.defaults.headers.common['Authorization']
        commit('SET_TOKEN', null)
        commit('SET_USER', null)
    }
}

const mutations = {
    SET_TOKEN(state, token) {
        state.token = token
    },
    SET_USER(state, user) {
        state.user = user
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
