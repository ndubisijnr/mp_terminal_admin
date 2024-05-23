<template>
  <h1>No Page Found</h1>
</template>

<script setup lang="ts">
import documentTitle from "@/util/helper/documentTitle.ts";
import getEnv from "@/util/helper/getEnv.ts";

documentTitle(`Page Not Found | ${getEnv("VITE_APP_NAME")}`)
</script>