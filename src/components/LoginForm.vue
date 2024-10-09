<template>
  <div class="login-form">
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="email">Email</label>
        <input
            type="email"
            id="email"
            v-model="email"
            required
            placeholder="Введите ваш email"
        >
      </div>
      <div class="form-group">
        <label for="password">Пароль</label>
        <input
            type="password"
            id="password"
            v-model="password"
            required
            placeholder="Введите ваш пароль"
        >
      </div>
      <button type="submit" :disabled="isLoading">
        {{ isLoading ? 'Вход...' : 'Войти' }}
      </button>
    </form>
    <p v-if="error" class="error-message">{{ error }}</p>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'LoginForm',
  setup() {
    const store = useStore()
    const router = useRouter()

    const email = ref('')
    const password = ref('')
    const isLoading = ref(false)
    const error = ref('')

    const login = async () => {
      if (email.value && password.value) {
        isLoading.value = true
        error.value = ''
        try {
          await store.dispatch('auth/login', {
            email: email.value,
            password: password.value
          })
          router.push('/')
        } catch (err) {
          error.value = 'Неверный email или пароль'
        } finally {
          isLoading.value = false
        }
      }
    }

    return {
      email,
      password,
      isLoading,
      error,
      login
    }
  }
}
</script>
