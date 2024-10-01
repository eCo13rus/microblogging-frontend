<template>
  <div>
    <h2>Посты</h2>
    <ul>
      <li v-for="post in posts" :key="post.id">
        {{ post.content }}
      </li>
    </ul>
  </div>
</template>

<script>
import api from '../services/api';

export default {
  name: 'PostList',
  data() {
    return {
      posts: []
    }
  },
  async mounted() {
    try {
      const response = await api.get('/posts');
      this.posts = response.data;
    } catch (error) {
      console.error('Ошибка при загрузке постов:', error);
    }
  }
}
</script>
