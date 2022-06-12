<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{ isLogin ? "Sign in" : "Sign up" }}</h1>
          <p class="text-xs-center">
            <a href="">Have an account?</a>
            <nuxt-link v-if="isLogin" to="/register"
              >Need an account?</nuxt-link
            >
            <nuxt-link v-else to="/login">Have an account?</nuxt-link>
          </p>

          <ul class="error-messages">
            <!-- 遍历接口返回的错误信息 -->
            <template v-for="(msgs, field) in errMsg">
              <li v-for="msg in msgs" :key="msg">{{ field }} {{ msg }}</li>
            </template>
          </ul>

          <form @submit.prevent="onSubmit">
            <fieldset class="form-group" v-if="!isLogin">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
                v-model="user.username"
                required
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="email"
                placeholder="Email"
                v-model="user.email"
                required
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                v-model="user.password"
                required
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              {{ isLogin ? "Sign in" : "Sign up" }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login, register } from "@/api/login";
// 导入 js-cookie， process.client 为 Nuxt 提供的变量，标识是否运行在客户端
const Cookie = process.client ? require("js-cookie") : undefined;
export default {
  middleware: "notAuthenticated",
  name: "Login",
  computed: {
    isLogin() {
      return this.$route.name === "login";
    },
  },
  data() {
    return {
      user: {
        username: "",
        email: "",
        password: "",
      },
      errMsg: {},
    };
  },
  methods: {
    async onSubmit() {
      const requestMethod = this.isLogin ? login : register;
      try {
        const data = await requestMethod({
          user: this.user,
        });
        // 保存登录用户信息
        this.$store.commit("setUser", data.user);

        // 将登录信息存入 cookie
        Cookie.set("user", JSON.stringify(data.user));
        // 跳转首页
        this.$router.push("/");
      } catch (error) {
        const { response } = error;
        // 捕获错误对象
        this.errMsg = response.data.errors;
      }
    },
  },
};
</script>

<style>
</style>