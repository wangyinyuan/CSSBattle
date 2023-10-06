<script setup lang="ts">
import { useUserStore } from '@/stores/userStore'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
//表单信息
const username = ref('')
const password = ref('')
const router = useRouter()
//获取用户信息
const userStore = useUserStore()
const login = async () => {
  await userStore.getUserInfo({ username: username.value, password: password.value })
  const userName = userStore.userInfo.name
  if (!userName) return
  ElMessage({
    message: `Welcome <strong>${userName}</strong>!`,
    type: 'success',
    duration: 2000,
    dangerouslyUseHTMLString: true
  })
  router.push('/')
}
</script>

<template>
  <div class="login-container">
    <h2 class="login-header">Sign up / Sign in</h2>
    <div class="login-form">
      <div class="login-body">
        <form @submit.prevent="login">
          <div class="account">
            <label for="username">Username:</label>
            <input v-model="username" id="username" required />
          </div>
          <div class="password">
            <label for="password">Password:</label>
            <input type="password" v-model="password" id="password" required />
          </div>
          <p>If you are a new user, we will automatically register you</p>
          <button type="submit">Login / Sign Up</button>
        </form>
      </div>
      <div class="login-footer">
        <p>
          By using CSSBattle, you agree to our
          <a>Privacy Policy and Terms of Service</a>
        </p>
      </div>
    </div>
    <div class="bottom-img"></div>
  </div>
</template>

<style scoped lang="scss">
@import '../../styles/mixins.scss';
.login-container {
  padding-left: 21rem;
  padding-top: 12rem;
  padding-right: 6rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 4rem;
  position: relative;
  height: calc(100vh - 55px);
  @include text-color($dark-text);

  .login-header {
    letter-spacing: 0px;
    font-size: 2.5rem;
    font-weight: 600;
    text-align: center;
    font-style: normal;
  }
  .login-form {
    width: 40rem;
    font-size: 1.5rem;
    .login-body {
      margin: 0 auto;
      padding: 2rem;
      position: relative;
      height: auto;
      width: 40rem;
      overflow: hidden;
      border-radius: 1rem;
      @include login-body-bg;
      font-weight: 600;
      div {
        display: flex;
        margin: 1rem 0;
        gap: 0.5rem;
        align-items: center;
        justify-content: space-around;
        input {
          border-radius: 50px;
          width: 60%;
          min-height: 3rem;
          padding: 0.5rem 1rem;
          @include input-bg;
          @include sidebar-text;
          font-size: 1.2rem;
        }
      }
      p {
        margin: 2rem 0;
        @include sidebar-text;
        font-size: 1.3rem;
        text-align: center;
      }
      button {
        display: block;
        margin: 0 auto;
        border: 0;
        border-radius: 40px;
        box-shadow: inset 1px 1px 2px hsla(0, 0%, 100%, 0.1);
        background-color: $common-button-bg;
        color: $dark-text;
        cursor: pointer;
        line-height: 1.2;
        transition:
          transform 0.2s ease-in-out,
          background-color 0.2s ease-in-out;
        font-weight: 600;
        letter-spacing: 0.2px;
        text-align: center;
        &:hover {
          transform: translate(0, -3px);
          background-color: $common-button-bg-hover;
        }
        height: 48px;
        width: 12rem;
      }
    }
    .login-footer {
      @include login-footer;
      font-weight: 500;
      font-size: 1.1rem;
      margin: 0 4rem;
      padding: 1rem 2rem;
      border-radius: 0 0 10px 10px;
      text-align: center;
      a {
        &:hover {
          text-decoration: underline;
        }
        @include text-color($dark-text);
      }
    }
  }

  .bottom-img {
    &::after {
      content: '';
      position: absolute;
      left: 17rem;
      bottom: 0;
      right: 0;
      height: 120px;
      background-image: url('https://cssbattle.dev/images/login-bottom.png');
      background-repeat: repeat-x;
      background-size: contain;
      background-blend-mode: screen;
      opacity: 0.5;
    }
  }
}
</style>
