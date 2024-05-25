<template>
  <Motion
    :initial="{opacity: 0, x: -100}"
    :animate="{opacity: 1, x: 0}"
    :transition="{duration: 0.5}"
  >
    <div class="container">
      <div class="min-container p-10">
        <div class="w-full h-[20%]">
          <img src="@/assets/icon/logo.svg" alt="logo" >
        </div>
        <login-form />
      </div>
      <div class="min-container ">
        <img class="img-container" src="@/assets/image/authLayout.jpg" alt="logo">
      </div>
    </div>
  </Motion>
</template>

<script setup lang="ts">
import documentTitle from "@/util/helper/documentTitle.ts";
import getEnv from "@/util/helper/getEnv.ts";
import LoginForm from "@/components/form/auth/LoginForm.vue";
import { Motion } from "motion/vue"

documentTitle(`Login | ${getEnv("VITE_APP_NAME")}`)
</script>

<style scoped>
  .container{
    min-width: 100%;
    height: 100vh;
    display: flex;
    overflow: hidden;
  }
  .min-container{
    width: 100%;
    height: 100%;
    background-color: #ffffff;
  }
  .img-container{
    width: 100%;
    height: 100%;
    transform: scale(1);
  }
</style>