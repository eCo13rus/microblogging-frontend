<template>
  <div>
    <h2>Новый пост</h2>
    <form @submit.prevent="addPost">
      <input v-model="newPost" placeholder="Введите текст поста">
      <button type="submit">Добавить</button>
    </form>
  </div>
</template>

<script>
import api from '../services/api';

export default {
  name: 'NewPost',
  data() {
    return {
      newPost: ''
    }
  },
  methods: {
    async addPost() {
      if (this.newPost.trim()) {
        try {
          await api.post('/posts', { content: this.newPost });
          this.$emit('post-added');
          this.newPost = '';
        } catch (error) {
          console.error('Ошибка при добавлении поста:', error);
        }
      }
    }
  }
}
</script>
