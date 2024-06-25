<template>
    <BaseLayout>
      <template v-slot:children>

        <router-view></router-view>
      </template>
    </BaseLayout>
</template>

<script setup>

import BaseLayout from "@/view/layout/BaseLayout.vue";
import { onMounted } from "vue";


onMounted(() => {
  
  document.body.classList.toggle('biz')
 
})

</script>

<style scoped>

</style>


