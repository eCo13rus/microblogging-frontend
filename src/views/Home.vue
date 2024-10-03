<template>
  <div class="home">
    <h1>Микроблог</h1>
    <NewPost v-if="isAuthenticated" @post-created="fetchPosts" />
    <PostList :posts="posts" />
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import NewPost from '../components/NewPost.vue'
import PostList from '../components/PostList.vue'

export default {
  name: 'HomePage',
  components: {
    NewPost,
    PostList
  },
  setup() {
    const store = useStore()
    const posts = ref([])
    const isAuthenticated = computed(() => store.getters['auth/isAuthenticated'])

    const fetchPosts = async () => {
      try {
        await store.dispatch('posts/fetchPosts')
        posts.value = store.getters['posts/allPosts']
      } catch (error) {
        console.error('Ошибка при загрузке постов:', error)
      }
    }

    onMounted(fetchPosts)

    return {
      posts,
      isAuthenticated,
      fetchPosts
    }
  }
}
</script>
