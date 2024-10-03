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
          console.log('Попытка входа для email:', email.value);
          const response = await store.dispatch('auth/login', {
            email: email.value,
            password: password.value
          });
          console.log('Успешный вход, токен получен:', response.data.token);
          router.push('/') // Перенаправляем на главную страницу после успешного входа
        } catch (err) {
          error.value = 'Неверный email или пароль'
          console.error('Ошибка входа:', err)
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

<style scoped>
.login-form {
  max-width: 400px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
}

input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
}

button {
  width: 100%;
  background-color: #28a745;
  color: white;
  border: none;
  padding: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover:not(:disabled) {
  background-color: #218838;
}

button:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}

.error-message {
  color: #dc3545;
  margin-top: 1rem;
}
</style>
