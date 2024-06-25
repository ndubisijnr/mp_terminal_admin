<template>
  <motion
    :hover="{scale: 1.04, opacity: 0.9}"
    :press="{scale: 0.8}"
  >
    <button type="submit" class="container" :style="{backgroundColor:props?.bgColor, border:`solid ${props?.bgBorder}`}">
      <slot></slot>
    </button>
  </motion>
</template>

<script setup>
import {Motion} from "motion/vue";

const props = defineProps({
  bgColor:String,
  bgBorder:String
})

</script>
<style scoped>
  .container{
    height: 47px;
    /* @apply bg-primary my-6; */
    width: 100%;
    border-radius: 8px;
    background-color: var(--light_primary);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 10px;

  }
  button {
    font-size: 16px;
    line-height: 24px;
    color: var(--light_color);
    margin: 20px 0;
  }
</style>