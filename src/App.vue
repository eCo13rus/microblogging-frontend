<template>
  <div id="app">
    <h1>Микроблог</h1>
    <NewPost @post-added="loadPosts" />
    <PostList ref="postList" />
  </div>
</template>

<script>
import PostList from './components/PostList.vue'
import NewPost from './components/NewPost.vue'

export default {
  name: 'App',
  components: {
    PostList,
    NewPost
  },
  methods: {
    loadPosts() {
      this.$refs.postList.mounted();
    }
  }
}
</script>

<style>
body {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  margin: 0;
  padding: 20px;
  background-color: #f4f4f4;
}

#app {
  max-width: 800px;
  margin: 0 auto;
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

h1, h2 {
  color: #333;
}

input, button {
  margin-top: 10px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  background-color: #f8f8f8;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 3px;
}
</style>
