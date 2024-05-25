<template>
  <div class="dashboard-wrapper-layout">
    <BaseSideBar />
    <div class="dashboard-main" :class="{'authView': getCurrentRoute === 'Login'}">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>

import BaseSideBar from "@/components/sidebar/BaseSideBar.vue";
import {router} from "@/router/index";
import {computed} from "vue";

const getCurrentRoute = computed(() => {
  return router.currentRoute.value.name

})

</script>

<style scoped>
.dashboard-wrapper-layout{
  width: 100%;
  height: 100vh;
  background-color: #fff !important;
  display: flex;
}
.dashboard-main{
  width: 85%;
  min-height: 100%;
  position: relative;
}

.authView{
  width: 100% !important;
}

@media (max-width: 1024px) {
  .dashboard-main{
    width: 100%;
    min-height: 100%;
    border: solid black;
  }

}
</style>


