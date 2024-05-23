<template>
  <motion
    :hover="{scale: 1.04, opacity: 0.9}"
    :press="{scale: 0.8}"
  >
    <button class="container">
      <slot></slot>
    </button>
  </motion>
</template>

<script setup>
import {Motion} from "motion/vue";
</script>
<style scoped>
  .container{
    height: 47px;
    @apply bg-primary my-6;
    width: 100%;
    border-radius: 8px;

  }
  button {
    color: #ffffff;
    font-size: 16px;
    line-height: 24px;
    @apply ring-0
  }
</style>