<template>

    <BaseLayout v-slot:children>
        <router-view></router-view>
    </BaseLayout>

</template>

<script setup>
import BaseLayout from "./view/layout/BaseLayout.vue";
import { onMounted } from "vue";


onMounted(() => {
  
  document.body.classList.toggle('maintms')
 
})

</script>

<style scoped>

</style>


