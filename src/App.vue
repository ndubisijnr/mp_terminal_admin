<template>

    <BaseLayout>
      <template v-slot:children>
        <router-view></router-view>
      </template>
    </BaseLayout>

</template>

<script setup>

import BaseLayout from "@/components/layout/BaseLayout.vue";
import { onMounted } from "vue";

onMounted(() => {
  document.body.classList.toggle('purple')
})

</script>

<style scoped>

</style>


