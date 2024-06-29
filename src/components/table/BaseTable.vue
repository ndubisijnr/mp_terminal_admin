<script setup lang="ts">
import MazTable from 'maz-ui/components/MazTable'
import MazBadge from 'maz-ui/components/MazBadge'
import MazDialog from 'maz-ui/components/MazDialog'
import { ref, reactive } from 'vue'
import MazBtn from 'maz-ui/components/MazBtn';
import Menu from 'primevue/menu';
import Button from 'primevue/button';
import { useToast } from 'maz-ui';
import MazBottomSheet from 'maz-ui/components/MazBottomSheet'




const isOpen = ref(false)

const toast = useToast()

const searchQuery = ref()
const page = ref()
const pageSize = ref()


const menu = ref();
const items = ref([
    {
        label: 'Options',
        items: [
            {
                label: 'View',
                icon: 'pi pi-refresh',
                command:( ) => {
                  reactiveData.scollableOpened = !reactiveData.scollableOpened
                }
            },
            {
                label: 'Edit',
                icon: 'pi pi-upload'
            },
            {
                label: 'Delete',
                icon: 'pi pi-upload'
            }
        ]
    }
]);


const reactiveData = reactive({
  scollableOpened:false,
  modelValue:null
})

const toggle = (event) => {
    menu.value.toggle(event);
};


// const lazyLoading = ref(false);
// const loadLazyTimeout = ref();


// const loadCarsLazy = (event) => {
//     !lazyLoading.value && (lazyLoading.value = true);

//     if (loadLazyTimeout.value) {
//         clearTimeout(loadLazyTimeout.value);
//     }

//     //simulate remote connection with a timeout
//     loadLazyTimeout.value = setTimeout(() => {
//         let _virtualCars = [...props.data];
//         let { first, last } = event;

//         //load data of required page
//         const loadedCars = cars.value.slice(first, last);

//         //populate page of virtual cars
//         Array.prototype.splice.apply(_virtualCars, [...[first, last - first], ...loadedCars]);

//         virtualCars.value = _virtualCars;
//         lazyLoading.value = false;
//     }, Math.random() * 1000 + 250);
// };

const getSeverity = (status:string) => {
    switch (status) {
        case 'Declined':
            return 'danger';

        case 'ACTIVE':
            return 'sucess';

        case 'Pending':
            return 'warning';
    }
};



const props = defineProps<{
  resultsSize: string,
  totalPages:string,
  activeColor: 'primary',
  headers: string[],
  bodies: {items: string[], action: {}}[],
  pagination:Boolean,
  search:Boolean

}>()
</script>

<!-- v-model="selectedIds"
    v-model:search-query="searchQuery"
    v-model:page="page"
    v-model:page-size="pageSize" -->

<template>
   <MazBottomSheet v-model="isOpen">
    <h3 class="maz-text-center maz-mb-4">
      Your content
    </h3>
    <div class="maz-flex maz-flex-center">
      <MazBtn
        outline
        @click="isOpen = false"
      >
        Close Bottom Sheet
      </MazBtn>
    </div>
  </MazBottomSheet>

 
   <div class="overflow-auto rounded-lg shadow">
    <!-- <MazTable
    size="md"
    v-model:model-value="reactiveData.modelValue"
    v-model:search-query="searchQuery"
    v-model:page="page"
    v-model:page-size="pageSize"
    :tableStyle="{position:'relative'}"
    :search="props.search"
    :pagination="props.pagination"
    selectable
    color="black"
    sortable
    hoverable
    background-even
    :headers="props.headers"
    :rows="props.bodies"
  >
  <template #cell-terminalStatus="{ value }">
      <MazBadge :color="getSeverity(value)">{{value}}</MazBadge>
    </template>

    
      <template #cell-terminalActions>

        <div class="flex">
          
          <img src="../../assets/icon/Dropdown.svg" @click="toggle"/>

          <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
        </div>
        
      </template>

  </MazTable> -->
    <DataTable :value="props.bodies" selectionMode="single" paginator :rows="10" :rowsPerPageOptions="[5, 10, 20, 50]" stripedRows tableStyle="min-width: 50rem">
            <Column v-for="col of props.headers" :key="col.key" :field="col.key" :header="col.label">
            
              
            </Column>

            <!--terminal status-->
            <Column v-if="props.headers.includes('terminalStatus')" field="terminalStatus" header="terminalStatus">
              <template #body="slotProps">
                    
                    <div v-if="slotProps.data.terminalStatus">
                      <Tag :value="slotProps.data.terminalStatus" :severity="getSeverity(slotProps.data.terminalStatus)" />
                    </div>
                       
                    </template>
            </Column>
           
            
    </DataTable>
      <!-- <table class="w-full">
      <thead class="bg-white-50 border-white-200">
      <tr class="bg-white">
        <th class="p-3 text-sm font-semibold, capitalize tracking-wide text-left" v-for="(header, number) in props.headers"  :key="number">{{ header }}</th>
      </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        <tr class="bg-gray" v-for="(body, number) in props.bodies"  :key="number">
          <td class="whitespace-nowrap capitalize p-3 text-sm text-gray-700" v-for="(item, number) in body"  :key="number">{{ item }}</td>

        </tr>
      </tbody>

      </table>
    <div class="py-5">
      <Paginator :rows="10" :totalRecords="120" :rowsPerPageOptions="[10, 20, 30]"></Paginator>
    </div> -->
  </div>
 <!-- <div class="overflow-auto rounded-lg shadow">
    <table class="w-full border-b-2">
      <thead class="bg-white-50 border-white-200">
        <tr class="bg-white">
          <th v-for="header in props.headers" :key="header" class="p-3 capitalize text-sm font-semibold tracking-wide text-left ">
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody v-if="props.data?.length" class="divide-y divide-gray-200">
        <tr v-for="(item, index) in props.data" :key="index" :class="index % 2 === 0 ? 'bg-gray' : 'bg-white'">
          <td v-for="header in props.headers" :key="header" class="whitespace-nowrap p-3 text-sm text-gray-700">
            {{ item[header] }}
          </td>
        </tr>
      </tbody>
      <div v-else class="p-3  text-sm text-gray-700 py-5 text-center">No data available.</div>

    </table>
  </div> -->
</template>

<style scoped>
.m-dropdown .menu.--top:not(.--right,.--left){
  bottom:0 !important;
  background-color: red;
}
</style>