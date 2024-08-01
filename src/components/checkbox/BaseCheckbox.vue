<template>
  <div class="container">
    <input v-bind="$attrs" type="checkbox" >
    <h1 class="input-label" :style="label">{{props.label}}</h1>
  </div>
</template>

<script setup lang="ts">
  import {ref} from "vue";
  import {ThemeUtil} from "@/util/ThemeUtil.ts";

  const props = defineProps<{
    label?: string
  }>()

  const label = ref({
    fontColor: ThemeUtil.color.gray_3
  })
</script>

<style scoped>
  .container{
     display: flex;
    align-items: center;
    gap: 5px;
    width: 50%;
  }
  .input-label{
    font-size: 14px;
    line-height: 20px;
  }
  input{
    border-radius: 4px;
    @apply focus:ring-0
  }
</style>