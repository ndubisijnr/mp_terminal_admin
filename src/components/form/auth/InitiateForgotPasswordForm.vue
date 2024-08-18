<template>
  <div class="flex justify-center h-screen items-center">

    <div v-if="passwordResetStage === '1'" class="w-3/12 min-w-fit">
      <div class="flex items-center justify-center">
        <img class="logo" src="@/assets/image/coresteplogo.png" alt="">
        <p class="text-lg font-semibold">TMS PORTAL</p>
      </div>
      <h1 class="font-[800] text-[37px] font-inter-Medium text-center">Forgot Password</h1>
      <p class="text-[14px] leading-[25px] text-center text-gray-500">Let's help you fix it</p>
      <code>
            <p class="text-[14px] leading-[25px] text-center text-primary">{{ AuthRequest?.InitiateEnrollmentRequest?.userEmail }}</p>
        </code>
      <form class="" @submit.prevent="initiateForgotPassword">
        <base-input type="email" v-model="AuthRequest.InitiatePasswordResetRequest.adminEmail"
          placeholder="Enter your email" label="Enter your email" />

        <!--//TODO: OTP Feature-->
        <!-- <p class="text-[14px] leading-[25px] text-center text-gray-500">We can resend OTP in: <code>11:00</code></p>
          <base-button type="button" outline loadingColor="white" :loading="wait.isLoading('DATA_SUBMITTING')">Resend OTP</base-button> -->

        <div style="padding-top: 1rem;">
          <base-button type="submit" loadingColor="white" :loading="wait.isLoading('DATA_SUBMITTING')">Request Otp</base-button>
        </div>

        <p class="text-[14px] leading-[21px] text-gray_1 text-center cursor-pointer py-4" @click="toLogin">I have an
          account? <span class="sign-up">Log in</span></p>

      </form>
    </div>
    <div v-else class="w-3/12 min-w-fit">
      <div class="flex items-center justify-center">
        <img class="logo" src="@/assets/image/coresteplogo.png" alt="">
        <p class="text-lg font-semibold">TMS PORTAL</p>
      </div>
      <h1 class="font-[800] text-[37px] font-inter-Medium text-center">Forgot Password</h1>
      <p class="text-[14px] leading-[25px] text-center text-gray-500">OTP was sent to
        <code><span class="text-primary">{{ AuthRequest.InitiatePasswordResetRequest.adminEmail }}</span></code>
      </p>

      <form class="" @submit.prevent="completeForgotPassword">
        <div>
          <base-input type="tel" v-model="AuthRequest.CompletePasswordResetRequest.otp" placeholder="Enter OTP"
            label="Enter OTP" />
<!--          <div v-if="reactive1.timer > 0" class="w-100 flex justify-start">We can resend OTP in: {{ reactive1.timer }}</div>-->
          <button  @click="resendotp" :class="{'disabled':notYet}" class="flex items-center text-right rounded-md underline cursor-pointer" :disabled="wait.isLoading('RESENDING') || notYet">
            <maz-spinner v-if="wait.isLoading('RESENDING')"></maz-spinner> Resend OTP
          </button>
        </div>
        <div style="margin-bottom: 1rem;">

        <base-input type="password" v-model="AuthRequest.CompletePasswordResetRequest.adminPassword"
          placeholder="New Password" label="New Password" />
        </div>


<!--        <base-input type="password" v-model="confirmPassword" placeholder="Confirm Password" label="Confirm Password" />-->

          <base-button type="submit" loadingColor="white" :loading="wait.isLoading('DATA_SUBMITTING')">Change
            Password</base-button>

        <p v-if="passwordResetStage === '1'" class="text-[14px] leading-[21px] text-gray_1 text-center cursor-pointer py-4" @click="toLogin">I have an
          account? <span class="sign-up">Log in</span></p>

      </form>
    </div>
  </div>
</template>
<script setup>


import BaseInput from "@/components/input/BaseInput.vue";
import BaseCheckbox from "@/components/checkbox/BaseCheckbox.vue";
import BaseButton from "@/components/button/BaseButton.vue";
import { router } from "@/router/index";
import AuthRequest from "@/models/request/auth/AuthRequest"
import StoreUtiils from "@/util/storeUtils.ts"
import { useToast, useWait } from 'maz-ui'
import {computed, onMounted, reactive, ref} from "vue";
import MazSpinner from 'maz-ui/components/MazSpinner'
import StoreUtils from "@/util/storeUtils.ts";

const toast = useToast()
const wait = useWait()
const notYet = ref(false)


// const reactive1 = reactive({
//   timer:30,
//   timerInterval:null
// })

const otpRequest = reactive({
  adminEmail:null
})

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


function toLogin() {
  router.push({ path: '/' });
}

async function initiateForgotPassword() {

  await StoreUtiils.getter()?.auth.initiatePasswordReset(AuthRequest.InitiatePasswordResetRequest, wait, toast)

}

async function completeForgotPassword() {
  AuthRequest.CompletePasswordResetRequest.adminEmail = AuthRequest.InitiatePasswordResetRequest.adminEmail
  wait.start('DATA_SUBMITTING')
  await StoreUtiils.getter()?.auth.completePasswordReset(AuthRequest.CompletePasswordResetRequest, toast)
  wait.stop('DATA_SUBMITTING')
}

// function toSignUp() {
//   router.push({ path: '/sign-up' })
// }

// async  function startTimer() {
//   reactive1.timerInterval = setInterval(() => {
//      --reactive1.timer
//   },1000)
//
// }



const passwordResetStage = computed(() => { return StoreUtiils.getter()?.auth.getPasswordResetStage })

onMounted(() => {
   // clearInterval(reactive1.timerInterval)

})
</script>

<style scoped>
.logo {
  /* @apply bg-primary; */
  width: 150px;
  /* height: 57px; */
  padding: 10px;
  border-top-left-radius: 2rem;
}

.outlineBtn {
  background-color: transparent;
}

/* form{
      @apply pt-5
    } */
.forgot-password-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* @apply mt-10 */
}

.sign-up {
  color: var(--light_primary);
}

.disabled{
  padding: 1rem;
  background-color: aliceblue;
  color: black;
  cursor: not-allowed;
}
</style>