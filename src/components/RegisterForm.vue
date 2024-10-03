<template>
  <div class="register-form">
    <form @submit.prevent="register">
      <div class="form-group">
        <label for="username">Имя пользователя</label>
        <input
            type="text"
            id="username"
            v-model="username"
            required
            placeholder="Введите имя пользователя"
        >
      </div>
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
            placeholder="Введите пароль"
        >
      </div>
      <div class="form-group">
        <label for="confirmPassword">Подтверждение пароля</label>
        <input
            type="password"
            id="confirmPassword"
            v-model="confirmPassword"
            required
            placeholder="Подтвердите пароль"
        >
      </div>
      <button type="submit" :disabled="isLoading">
        {{ isLoading ? 'Регистрация...' : 'Зарегистрироваться' }}
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
  name: 'RegisterForm',
  setup() {
    const store = useStore()
    const router = useRouter()

    const username = ref('')
    const email = ref('')
    const password = ref('')
    const confirmPassword = ref('')
    const isLoading = ref(false)
    const error = ref('')

    const register = async () => {
      if (password.value !== confirmPassword.value) {
        error.value = 'Пароли не совпадают';
        return;
      }

      if (username.value && email.value && password.value) {
        isLoading.value = true;
        error.value = '';
        try {
          console.log('Отправка данных регистрации:', { username: username.value, email: email.value });
          await store.dispatch('auth/register', {
            username: username.value,
            email: email.value,
            password: password.value
          });
          console.log('Регистрация успешна');
          router.push('/login');
        } catch (err) {
          console.error('Ошибка при регистрации:', err);
          error.value = `Ошибка при регистрации: ${err.message}`;
        } finally {
          isLoading.value = false;
        }
      }
    };

    return {
      username,
      email,
      password,
      confirmPassword,
      isLoading,
      error,
      register
    }
  }
}
</script>

<style scoped>
.register-form {
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
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.5rem;
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

.error-message {
  color: #dc3545;
  margin-top: 1rem;
}
</style>
