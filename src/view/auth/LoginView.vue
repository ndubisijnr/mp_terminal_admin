<template>

    <div class="container">
      <div class="min-container">
        <div class="flex items-center mb-8">
          <img class="logo" src="../../assets/image/terraswitch.jpeg" alt="">
          <p class="text-lg font-semibold">TMS PORTAL</p>
        </div>        
        <login-form />

      </div>
      <div class="min-container bg-image"></div>
    </div>
</template>

<script setup lang="ts">
import LoginForm from "@/components/form/auth/LoginForm.vue";
</script>

<style scoped>
.logo{
  /* @apply bg-primary; */
  width: 150px;
  /* height: 57px; */
  padding: 10px;
  border-top-left-radius: 2rem;
}


  .container{
    min-width: 100%;
    min-height: 100vh;
    display: flex;
    /* background-color: var(--light-bgcolor); */
  }
  .min-container{
    width: 100%;
    min-height: 100%;
    /* background-color: var(--light-bgcolor); */
  }

  .bg-image{
    background-image: url('../../assets/image/section-terminal.png');
    background-repeat: no-repeat;
    background-size: cover;
  }
  .img-container{
    width: 100%;
    height: 100%;
  }

  @media (max-width:1080px) {
    .bg-image{
      display: none;
    }
    
  }
</style>