<script setup lang="ts">
import { computed, onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import sideBar from "../../components/sidebar/sideBar.vue"

const authRoutes = ['Login', 'Register', 'InitiateForgotPassword'];

const router = useRouter();

const data = reactive({
  mounting: true
});

const getCurrentRoute:any = computed(() => router.currentRoute.value.name);


const isAuthRoute = computed(() => authRoutes.includes(getCurrentRoute.value));

onMounted(() => {
  setTimeout(() => {
    data.mounting = false;
     
  }, 500);
});
</script>

<template>
      <div class="loading-wrapper" v-if="data.mounting"></div>
      <div class="dashboard-wrapper-layout" v-else v-cloak>
        <sideBar />
        <div class="dashboard-main" :class="{ 'authView': isAuthRoute }">
         
         <slot name="children"></slot>
        </div>
      </div>
  
</template>

<style scoped>
[v-cloak] {
    display: none;
  }



  .hideShow{
    display: none;
  }




  .loading-wrapper{
    width: 100%;
    min-height: 100vh;
    background-color: #fff;
  }
.dashboard-wrapper-layout{
  width: 100%;
  background-color: #fafafa !important;
  display: flex;
  height: 100vh;

}

.dashboard-main{
  width: calc(100% - 250px);
  height: 100vh;
  overflow: auto;
  background-color: #fafafa
}

.authView{
  width: 100% !important;
}


@media (max-width: 1024px) {
  .dashboard-main{
    width: 100%;
    min-height: 100%;
  }

}

@media (max-width: 700px) {
  .dashboard-wrapper-layout{
    display: flex;
  }
}
</style>