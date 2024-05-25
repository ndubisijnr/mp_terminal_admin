<template>

    <BaseLayout>
      <template v-slot:children>
        <router-view></router-view>
      </template>
    </BaseLayout>

</template>

<script setup>

import BaseLayout from "@/components/layout/BaseLayout.vue";

</script>

<style scoped>

</style>


