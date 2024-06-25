<template>
     <Motion
      :initial="{opacity: 0, x: -100}"
      :animate="{opacity: 1, x: 0}"
      :transition="{duration: 0.5}"
    >
<initiate-forgot-password-form />
</Motion>
</template>

<script setup>
import { Motion } from "motion/vue"
import InitiateForgotPasswordForm from "@/components/form/auth/InitiateForgotPasswordForm.vue";
</script>

<style scoped></style>