<template>
  <div class="form-container mx-auto">
    <h1 class="font-[800] text-[37px] font-inter-Medium">Login</h1>
    <p class="text-[16px] leading-[25px]" >Welcome back! Please fill in the correct details.</p>
    <form class="" @submit.prevent="toDashboard">
      <base-input placeholder="Enter your email"  label="Email"/>
      <base-input  placeholder="....." label="Password"/>
      <div class="forgot-password-container">
        <base-checkbox label="Remember for 30 days" />
        <p class="sign-up cursor-pointer"><a>Forgot password</a></p>
      </div>

      <base-button>Sign in</base-button>

      <p class="text-[14px] leading-[21px] text-gray_1 text-center">Don’t have an account? <span class="sign-up">Sign up</span></p>
    </form>
  </div>
</template>
<script setup>

import BaseInput from "@/components/input/BaseInput.vue";
import BaseCheckbox from "@/components/checkbox/BaseCheckbox.vue";
import BaseButton from "@/components/button/BaseButton.vue";
import {router} from "@/router/index";

function toDashboard() {
  router.push({path:'/dashboard'});
}
</script>

<style scoped >
  .form-container{
    width: 60%;
    height: 80%;
    margin-top: auto;
    display: block;
  }
  form{
    @apply pt-5
  }
  .forgot-password-container{
    display: flex;
    justify-content: space-between;
    align-items: center;
    @apply mt-10
  }

  .sign-up{
    color: var(--light_primary);
  }
</style>