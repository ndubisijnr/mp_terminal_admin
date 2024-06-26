<script lang="ts" setup>
 import MazAvatar from 'maz-ui/components/MazAvatar';
 import MazDropdown from 'maz-ui/components/MazDropdown';
 import MazSelect from 'maz-ui/components/MazSelect';
 import MazDialog from 'maz-ui/components/MazDialog';
 import MazBtn from 'maz-ui/components/MazBtn';
 import MazLoadingBar from 'maz-ui/components/MazLoadingBar'
import {computed, onMounted, ref, reactive} from "vue";
import {router} from "@/router/index";
import StoreUtils from "@/util/storeUtils";
import { useWait } from 'maz-ui';

const wait = useWait()

// const isOpen = ref(false)

const data = reactive({
  isOpen:false
})

const user = computed(() => {
  return StoreUtils.getter()?.auth.getUser
})

const organisation = computed(() => {
  return StoreUtils.getter()?.organisation.getOrganisation
})

const userFullName = computed(() => {
  return StoreUtils.getter()?.auth.getUser?.userFirstName + ' ' +  StoreUtils.getter()?.auth.getUser?.userLastName
})


async function getCustomerOrganisation(){
  data.isOpen = true 
  console.log(user)
  wait.start('READ_ORGANISATION')
  await StoreUtils.getter()?.organisation.readCustomerOrganisation(user?.value.userId)
  wait.stop('READ_ORGANISATION')


}



const getCurrentRoute:any = computed(() => {
  return router.currentRoute.value.name

})







const getCurrentRouteSubTitle = computed(() => {
  return router.currentRoute.value?.meta.sub_title

})

onMounted(() => {
  console.log(user)
})
</script>

<template>
      <div class="content-header">
        <div>
          <h3 class="text-4xl text-black mb-0.5">{{getCurrentRoute}}</h3>
          <p class="text-sm">{{getCurrentRouteSubTitle}}</p>
        </div>
        <div class="content-inner-container-right">
          <MazDropdown @click="getCustomerOrganisation">
            <MazAvatar
              :caption="userFullName"
              size="1rem"
            />
            <p>{{ userFullName}}</p>

          <template #dropdown>
            <div class="maz-grid maz-grid-cols-3 maz-gap-2">
              
            </div>
          </template>
        </MazDropdown>

       
        <MazDialog v-model="data.isOpen">
          <template #title>
            Change Organization
          </template>

          <template  #default>
            <MazLoadingBar v-if="wait.isLoading('READ_ORGANISATION')" />

           
            <div v-else>
            <p class="maz-py-4">
                  Current Organization
                </p>
                
                <MazSelect
                  style="width: 100%;padding-top: 1rem;"
                  :model-value="1"
                  :options="[
                    { value: 1, label: 'Current Organization A' },
                    { value: 2, label: 'Current Organization B' }
                  ]"
                />
              </div>
            </template> 


            <template #footer>
              <MazBtn>
                Confirm
              </MazBtn>
              
              </template>
            
        </MazDialog>
                
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