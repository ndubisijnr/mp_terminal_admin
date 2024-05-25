<script setup lang="ts">
import {computed} from "vue";
import {router} from "@/router/index";
import {SidebarTopUtils, SidebarBottomUtils} from "@/util/constant/SidebarUtils.ts";

const getCurrentRoute = computed(() => {
  return router.currentRoute.value.name

})

</script>

<template>
  <div class="sidebar-wrapper" :class="{'no-sidebar':getCurrentRoute === 'Login'}">
    <div class="sidebar-wrapper-header">
      <img class="logo" src="@/assets/image/user_logo.svg" alt="">
    </div>
    <div class="search-wrapper">
      <input class="search-input" type="text" placeholder="Search..." autocomplete="off" />
    </div>

    <div>
      <div class="sidebar-top-nav">
        <div v-for="(i, index) in SidebarTopUtils" :key="index" class="nav-item-base">
          <img :src="i.icon" alt=""/>
          <p>{{i.name}}</p>
        </div>
      </div>
      <div class="sidebar-bottom-nav">
        <div v-for="(i, index) in SidebarBottomUtils" :key="index">
          <img />
          <p>{{i.name}}</p>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>
.sidebar-wrapper{
  width: 15%;
  height: 100vh;
  background-color: var(--bizgem_primary);
  display: block;
  position: relative;
  transition: ease-in 0.3s;
}

.nav-item-base{
  /* _Nav item base */

  /* Auto layout */
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8.4px 12.6px;
  gap: 110.25px;

  width: 100%;
  height: 42px;

  /* Bizgem primary */
  background: #3F88C5;
  border-radius: 6.3px;
  border:solid red;

}

.no-sidebar{
  width: 0;
  opacity:0;
  background-color: #fff;
}

@media (max-width: 1024px) {
  .sidebar-wrapper{
    width: 0;
    transition: ease-out 0.3s;
    height: 100vh;

  }

}
</style>