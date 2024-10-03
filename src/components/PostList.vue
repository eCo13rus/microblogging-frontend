<template>
  <div class="post-list">
    <h2>Посты</h2>
    <transition-group name="post-list" tag="ul">
      <li v-for="post in posts" :key="post.id" class="post-item">
        <h3>{{ post.title }}</h3>
        <p>{{ post.content }}</p>
        <div class="post-actions">
          <button @click="likePost(post.id)" :class="{ liked: post.liked }">
            {{ post.likes }} Лайк{{ post.likes !== 1 ? 'ов' : '' }}
          </button>
          <button @click="showComments(post.id)">
            {{ post.comments.length }} Комментари{{ post.comments.length !== 1 ? 'ев' : 'й' }}
          </button>
        </div>
      </li>
    </transition-group>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'PostList',
  setup() {
    const store = useStore()
    const posts = ref([])

    const fetchPosts = async () => {
      try {
        const response = await store.dispatch('posts/fetchPosts')
        posts.value = response
      } catch (error) {
        console.error('Ошибка при загрузке постов:', error)
      }
    }

    const likePost = async (postId) => {
      try {
        await store.dispatch('posts/likePost', postId)
        await fetchPosts() // Обновляем список постов после лайка
      } catch (error) {
        console.error('Ошибка при лайке поста:', error)
      }
    }

    const showComments = () => {
      // Реализация показа комментариев (можно использовать модальное окно или раскрывающийся список)
    }

    onMounted(fetchPosts)

    return {
      posts,
      likePost,
      showComments
    }
  }
}
</script>

<style scoped>
.post-list {
  max-width: 600px;
  margin: 0 auto;
}

.post-item {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
}

.post-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.post-actions {
  display: flex;
  justify-content: space-around;
  margin-top: 1rem;
}

.post-actions button {
  background-color: #e9ecef;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.post-actions button:hover {
  background-color: #dee2e6;
}

.post-actions button.liked {
  background-color: #28a745;
  color: white;
}

.post-list-enter-active,
.post-list-leave-active {
  transition: all 0.5s ease;
}

.post-list-enter-from,
.post-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
