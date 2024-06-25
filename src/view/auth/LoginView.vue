<template>
  <Motion
    :initial="{opacity: 0, x: -100}"
    :animate="{opacity: 1, x: 0}"
    :transition="{duration: 0.5}"
  >
    <div class="container">
      <div class="min-container p-10">
        <div class="w-full h-[20%]">
          <img src="../../assets/icon/logo.svg" alt="logo" >
        </div>
        <login-form />

      </div>
      <div class="min-container bg-image"></div>
    </div>
  </Motion>
</template>

<script setup lang="ts">
import LoginForm from "@/components/form/auth/LoginForm.vue";
import { Motion } from "motion/vue"
// import documentTitle from "@/util/helper/documentTitle.ts";

// documentTitle(`Login | ${getEnv("VITE_APP_NAME")}`)
</script>

<style scoped>

  .container{
    min-width: 100%;
    min-height: 100vh;
    display: flex;
    background-color: var(--light-bgcolor);
  }
  .min-container{
    width: 100%;
    min-height: 100%;
    background-color: var(--light-bgcolor);
  }

  .bg-image{
    background-image: url('../../assets/image/section-terminal.png');
    background-repeat: no-repeat;
    background-size: cover;
  }
  .img-container{
    width: 100%;
    height: 100%;
  }
</style>