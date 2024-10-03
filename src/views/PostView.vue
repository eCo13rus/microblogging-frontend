<template>
  <div class="post-view" v-if="post">
    <h1>{{ post.title }}</h1>
    <p>{{ post.content }}</p>
    <p>Автор: {{ post.author }}</p>
    <p>Дата создания: {{ formatDate(post.created_at) }}</p>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

export default {
  name: 'PostView',
  setup() {
    const store = useStore()
    const route = useRoute()
    const post = ref(null)

    const fetchPost = async () => {
      try {
        post.value = await store.dispatch('posts/fetchPost', route.params.id)
      } catch (error) {
        console.error('Ошибка при загрузке поста:', error)
      }
    }

    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }
      return new Date(dateString).toLocaleDateString('ru-RU', options)
    }

    onMounted(fetchPost)

    return {
      post,
      formatDate
    }
  }
}
</script>
