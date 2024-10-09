import api from '../../services/api'

const state = {
    posts: []
}

const getters = {
    allPosts: state => state.posts
}

const actions = {
    async fetchPosts({ commit }) {
        const response = await api.get('/posts')
        commit('SET_POSTS', response.data)
    },

    async createPost({ commit }, postData) {
        try {
            const response = await api.post('/posts', postData)
            const newPost = response.data
            commit('ADD_POST', newPost)
            return newPost
        } catch (error) {
            console.error('Ошибка при создании поста:', error)
            throw error
        }
    },

    async updatePost({ commit }, { id, postData }) {
        const response = await api.put(`/posts/${id}`, postData)
        commit('UPDATE_POST', response.data)
    },

    async deletePost({ commit }, id) {
        await api.delete(`/posts/${id}`)
        commit('REMOVE_POST', id)
    },

    async likePost({ commit }, id) {
        const response = await api.post(`/posts/${id}/likes`)
        commit('UPDATE_POST', response.data)
    },
    async fetchPost( _, id) {
        const response = await api.get(`/posts/${id}`)
        return response.data
    }
}

const mutations = {
    SET_POSTS(state, posts) {
        state.posts = posts
    },
    ADD_POST(state, post) {
        state.posts.unshift(post)
    },
    UPDATE_POST(state, updatedPost) {
        const index = state.posts.findIndex(post => post.id === updatedPost.id)
        if (index !== -1) {
            state.posts.splice(index, 1, updatedPost)
        }
    },
    REMOVE_POST(state, id) {
        state.posts = state.posts.filter(post => post.id !== id)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
