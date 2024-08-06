
<template>
  <div class="form-container mx-auto">
    <div v-if="sessionTimedOut?.query?.error">
          <p class="text-lg text-red-700 text-center">Session TimedOut, Please Login Again.</p>
    </div>
    <div v-if="auth.multiFactor">
      <h4 class="font-[800] text-[37px] font-inter-Medium">Two-Factor Authentication</h4>
      <p class="text-[16px] leading-[25px]" >Input the digits code sent to your email to continue</p>
      <form class="" @submit.prevent="completeLogin">
        <base-input type="text"  v-model="AuthRequest.LoginRequest.otp" placeholder="digit code"  label="OTP"/>
        
        <div style="padding-top: 1rem;">
          <base-button type="submit" loadingColor="white" :disabled="wait.isLoading('DATA_SUBMITTING')" :loading="wait.isLoading('DATA_SUBMITTING')">Sign in</base-button>
        </div>

                <!-- <p class="text-[14px] leading-[21px] text-gray_1 text-center cursor-pointer py-4" @click="toSignUp">Don’t have an account? <span class="sign-up">Sign up</span></p> -->

      </form>
      <button @click="resendotp" :class="{'disabled':notYet}" class="flex items-center text-right p-3 mt-4 rounded-md underline cursor-pointer" :disabled="wait.isLoading('RESENDING') || notYet">
        <maz-spinner v-if="wait.isLoading('RESENDING')"></maz-spinner> Resend OTP
      </button>



      
    </div>
    <div v-else>
      <h1 class="font-[800] text-[37px] font-inter-Medium">Login</h1>
      <p class="text-[16px] leading-[25px]" >Welcome back! Please fill in the correct details.</p>
      <form class="" @submit.prevent="login">
        <base-input type="email" v-model="AuthRequest.LoginRequest.adminEmail" placeholder="Enter your email"  label="Email"/>
        <base-input type="password" v-model="AuthRequest.LoginRequest.adminPassword" placeholder="....." label="Password"/>
        <div class="forgot-password-container py-4" @click="toForgetPassword">
          <!-- <base-checkbox label="Remember for 30 days" /> -->
          <p class="sign-up cursor-pointer text-right w-full"><a>Forgot password</a></p>
        </div>

        <base-button  type="submit" loadingColor="white" :loading="wait.isLoading('DATA_SUBMITTING')">Sign in</base-button>

        <!-- <p class="text-[14px] leading-[21px] text-gray_1 text-center cursor-pointer py-4" @click="toSignUp">Don’t have an account? <span class="sign-up">Sign up</span></p> -->
      </form>

      
    </div>
   
  </div>
</template>

<script setup>

import BaseInput from "@/components/input/BaseInput.vue";
import BaseButton from "@/components/button/BaseButton.vue";
import {router} from "@/router/index";
import AuthRequest from "@/models/request/auth/AuthRequest"
import StoreUtils from "@/util/storeUtils.ts"
import { useToast, useWait } from 'maz-ui'
import { watch, ref, reactive } from "vue";
import { useAuthStore } from "@/store/module/auth";
import MazSpinner from 'maz-ui/components/MazSpinner'

let sessionTimedOut = router.currentRoute._value

const toast = useToast()
const wait = useWait()
const auth = useAuthStore()

const otpRequest = reactive({
  adminEmail:null
})


function toForgetPassword() {
  router.push({path:'/initiate/forgetPassword'});
}

const notYet = ref(false)

async function resendotp(){
  otpRequest.adminEmail = AuthRequest.LoginRequest.adminEmail
  notYet.value = true
  wait.start('RESENDING')
  await StoreUtils.getter().auth.resendOtp(otpRequest, toast)
  wait.stop('RESENDING')
  setTimeout(() => {
    notYet.value = false
  },20000)

}

async function login(){
  console.log(AuthRequest.LoginRequest)
  sessionTimedOut = null
  await StoreUtils.getter()?.auth.login(AuthRequest.LoginRequest, toast, wait)
}

async function completeLogin(){
  await StoreUtils.getter()?.auth.login(AuthRequest.LoginRequest, toast, wait)
}

function toSignUp(){
    router.push({path:'/sign-up'})
  }
</script>
<style scoped >
.disabled{
  padding: 1rem;
  background-color: aliceblue;
  color: black;
  cursor: not-allowed;
}
  .form-container{
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center
  }
  /* form{
    @apply pt-5
  } */
  .forgot-password-container{
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* @apply mt-10 */
  }

  .sign-up{
    color: var(--light_primary);
  }
</style>