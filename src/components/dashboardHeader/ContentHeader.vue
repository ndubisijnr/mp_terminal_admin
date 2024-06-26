<script lang="ts" setup>
import MazDropdown from "maz-ui/components/MazDropdown";
import MazAvatar from "maz-ui/components/MazAvatar";
// import StoreUtils from "@/util/storeUtils";
import {computed} from "vue";
import {router} from "@/router/index";

const getCurrentRoute:any = computed(() => {
  return router.currentRoute.value.name

})


const getCurrentRouteSubTitle = computed(() => {
  return router.currentRoute.value?.meta.sub_title

})
</script>

<template>
      <div class="content-header">
        <div>
          <h3 class="text-4xl text-black mb-0.5">{{getCurrentRoute}}</h3>
          <p class="text-sm">{{getCurrentRouteSubTitle}}</p>
        </div>
        <div class="content-inner-container-right">
          <MazDropdown>
            <MazAvatar
              caption="Clark Kent"
              size="1rem"
            />
            <code></code>

          <template #dropdown>
            <div class="maz-grid maz-grid-cols-3 maz-gap-2">
              
            </div>
          </template>
        </MazDropdown>
        
        </div>
    </div>
        
</template>

<style scoped>
  .content-header{
  display: flex;
  justify-content: space-between;
  padding: 2rem;
  background-color: #fff;
}

.content-inner-container-right{
  display: flex;
  align-items: center;
}

</style>