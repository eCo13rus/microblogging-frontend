<template>
  <div class="home">
    <h1>Микроблог</h1>
    <NewPost v-if="isAuthenticated" @post-created="handlePostCreated" />
    <PostList :posts="posts" />
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
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
    const posts = computed(() => store.getters['posts/allPosts'])
    const isAuthenticated = computed(() => store.getters['auth/isAuthenticated'])

    const fetchPosts = async () => {
      try {
        await store.dispatch('posts/fetchPosts')
      } catch (error) {
        console.error('Ошибка при загрузке постов:', error)
      }
    }

    const handlePostCreated = (newPost) => {
      console.log('Новый пост создан:', newPost)
    }

    onMounted(fetchPosts)

    return {
      posts,
      isAuthenticated,
      handlePostCreated
    }
  }
}
</script>
