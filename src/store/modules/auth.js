import api from '../../services/api'

const state = {
    token: localStorage.getItem('token') || null,
    user: null
}

const getters = {
    isAuthenticated: state => !!state.token,
    currentUser: state => state.user
}

const actions = {
    async login({ commit }, credentials) {
        try {
            const response = await api.post('/auth/login', credentials)
            const { token, user } = response.data
            if (!token) {
                throw new Error('Токен не получен от сервера')
            }
            localStorage.setItem('token', token)
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`
            commit('SET_TOKEN', token)
            commit('SET_USER', user)
            return user
        } catch (error) {
            console.error('Ошибка входа:', error.response ? error.response.data : error.message)
            throw error
        }
    },
    async getUserData({ commit }) {
        try {
            const response = await api.get('/users/me')
            commit('SET_USER', response.data)
        } catch (error) {
            console.error('Ошибка при получении данных пользователя:', error)
            throw error
        }
    },

    logout({ commit }) {
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
