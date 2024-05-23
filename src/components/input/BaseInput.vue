<template>
  <div class="input-component">
    <h1>{{props.label}}</h1>
    <input v-bind="$attrs"  :style="inputStyle" />
  </div>
</template>

<script setup lang="ts">
  import {ref} from "vue";
  import {ThemeUtil} from "@/util/ThemeUtil.ts";

  const props = defineProps<{
    label: string
  }>()

  const inputStyle = ref({
    borderColor: ThemeUtil.color.gray_2,
  })

</script>

<style scoped>
  .input-component{
    height: 70px;
    width: 100%;
    @apply my-5
  }
  input{
    border-radius: 8px;
    min-width: 100%;
    height: 47px;
    margin-top: 10px;
    @apply  focus:ring-0
  }

</style>