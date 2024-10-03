<template>
  <div class="new-post-page">
    <h1>Создать новый пост</h1>
    <NewPost />
  </div>
</template>

<script>
import NewPost from '../components/NewPost.vue'

export default {
  name: 'NewPostPage',
  components: {
    NewPost
  }
}
</script>
