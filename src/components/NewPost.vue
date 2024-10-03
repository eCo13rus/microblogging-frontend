<template>
  <div class="new-post">
    <h2>Создать новый пост</h2>
    <form @submit.prevent="createPost">
      <div class="form-group">
        <label for="title">Заголовок</label>
        <input
            type="text"
            id="title"
            v-model="title"
            required
            placeholder="Введите заголовок"
        >
      </div>
      <div class="form-group">
        <label for="content">Содержание</label>
        <textarea
            id="content"
            v-model="content"
            required
            placeholder="Введите текст поста"
        ></textarea>
      </div>
      <button type="submit" :disabled="isLoading">
        {{ isLoading ? 'Создание...' : 'Создать пост' }}
      </button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'NewPost',
  setup() {
    const store = useStore()
    const router = useRouter()

    const title = ref('')
    const content = ref('')
    const isLoading = ref(false)

    const createPost = async () => {
      if (title.value.trim() && content.value.trim()) {
        isLoading.value = true
        try {
          const newPost = await store.dispatch('posts/createPost', {
            title: title.value,
            content: content.value
          })
          console.log('Новый пост:', newPost) // для отладки
          if (newPost && newPost.id) {
            router.push({ name: 'PostView', params: { id: newPost.id.toString() } })
          } else {
            throw new Error('Не удалось получить ID нового поста')
          }
        } catch (error) {
          console.error('Ошибка при создании поста:', error)
          // Здесь можно добавить отображение ошибки пользователю
        } finally {
          isLoading.value = false
        }
      }
    }

    return {
      title,
      content,
      isLoading,
      createPost
    }
  }
}
</script>

<style scoped>
.new-post {
  max-width: 500px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
}

input[type="text"],
textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
}

textarea {
  height: 150px;
  resize: vertical;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover:not(:disabled) {
  background-color: #0056b3;
}

button:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}
</style>
