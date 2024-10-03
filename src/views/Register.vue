<template>
  <div class="register">
    <h1>Регистрация</h1>
    <RegisterForm />
  </div>
</template>

<script>
import RegisterForm from '../components/RegisterForm.vue'

export default {
  name: 'RegisterPage',
  components: {
    RegisterForm
  }
}
</script>
