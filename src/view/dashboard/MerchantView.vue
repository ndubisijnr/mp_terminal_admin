<script lang="ts" setup>
import BaseButton from '@/components/button/BaseButton.vue';
import { reactive, onMounted, computed, ref } from 'vue';
import ContentHeader from '@/components/dashboardHeader/ContentHeader.vue';
import AddOrganisation from '@/components/modal/organisation/AddOrganisation.vue'
import { useWait } from 'maz-ui';
import StoreUtils from '@/util/storeUtils';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { FilterMatchMode } from 'primevue/api';
import InputText from 'primevue/inputtext';
import Menu from 'primevue/menu';
import Dialog from 'primevue/dialog';
import UpdateOrganisation from '@/components/modal/organisation/UpdateOrganisation.vue';
import AssignTerminal from '@/components/modal/terminal/AssignTerminal.vue';

const wait = useWait()

const reactiveData = reactive({
  showAddOrganisation:false,
  selectedRow:null,
  visible:false,
  showUpdateOganisation:false,
  showAssignTerminal:false
})

const mid:any = computed(() => {
  return StoreUtils.getter()?.auth.getCurrentMid
})


const onRowSelect = (event:any) => {
  reactiveData.selectedRow = event.data
  console.log(event)
}


const menu = ref()

// const getSeverity = (status:string) => {
//     switch (status) {
//         case 'Declined':
//             return 'danger';

//         case 'ACTIVE':
//             return 'sucess';

//         case 'Pending':
//             return 'warning';
//     }
// };

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    terminalStatus: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    // representative: { value: null, matchMode: FilterMatchMode.IN },
    terminalSerialNumber: { value: null, matchMode: FilterMatchMode.EQUALS },
});

const toggle = (event:any) => {
    menu.value.toggle(event);
}

const metaKey = ref(true);


const organsationHeaders = [
{label:'Name',key:'organisationName'},
{label:'AccountNumber',key:'organisationAccountNumber'},
{label:'Email',key:'organisationEmail'},
{label:'Contact Phone',key:'organisationPhone'},
{label:'NumberOfTerminals',key:'OrgNumberOfTerminals'},
{label:'PricingCode',key:'OrgPricingCode'},
]


// function generateDummyData(numEntries) {
//   const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
//   const getRandomString = (length) => Math.random().toString(36).substring(2, 2 + length);
//   const getRandomEmail = () => `${getRandomString(5)}@example.com`;
//   const getRandomPhone = () => `+1${getRandomNumber(1000000000, 9999999999)}`;
//   const dummyData = [];

//   for (let i = 0; i < numEntries; i++) {
//     dummyData.push({
//       organisationName: getRandomNumber(100, 10000), // Random amount between 100 and 10000
//       organisationAccountNumber:getRandomNumber(100, 10000), // Random status
//       OrgNumberOfTerminals: `TID${getRandomNumber(1000, 9999)}`, // Random terminal ID
//       OrgPricingCode: `PC${getRandomNumber(100, 999)}`, // Random pricing code
//       organisationEmail: getRandomEmail(), // Random email
//       organisationPhone: getRandomPhone(), // Random phone number
//       organisationRegistrationDate: new Date().toISOString(), // Current timestamp
//     });
//   }

//   return dummyData;
// }

// const organisation = generateDummyData(2)

const organisation = computed(() => {
  return StoreUtils.getter()?.organisation.getOrganisation
})


function handleClose(payload:any) {
  reactiveData.showAddOrganisation = payload;
  reactiveData.showUpdateOganisation = payload;
  reactiveData.showAssignTerminal = payload
}

function addOrganisation(){
  reactiveData.showAddOrganisation = !reactiveData.showAddOrganisation

}

async function getCustomerOrganisation(){
  console.log(mid)
  wait.start('READ_ORGANISATION')
  await StoreUtils.getter()?.organisation.readCustomerOrganisation()
  wait.stop('READ_ORGANISATION')
}

const items = ref([
    {
        label: 'Options',
        items: [
            {
                label: 'View',
                icon: 'pi pi-refresh',
                command:( ) => {
                  reactiveData.visible = !reactiveData.visible
                }
            },
            {
                label: 'Edit',
                icon: 'pi pi-upload',
                command:() => {
                  reactiveData.showUpdateOganisation = !reactiveData.showUpdateOganisation
                }
            },
            {
                label: 'Assign Terminal',
                icon: 'pi pi-upload',
                command:() => {
                  reactiveData.showAssignTerminal = true
                }
            }
        ]
    }
]);

onMounted(() => {
  getCustomerOrganisation()
})


</script>

<template>
    <AssignTerminal v-if="reactiveData.showAssignTerminal" @close="handleClose"></AssignTerminal>
    <AddOrganisation v-if="reactiveData.showAddOrganisation" @close="handleClose"/>
    <UpdateOrganisation v-if="reactiveData.showUpdateOganisation" @close="handleClose" :data="reactiveData.selectedRow"></UpdateOrganisation>
  
    <ContentHeader />
    <Dialog v-model:visible="reactiveData.visible" modal :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
          <div v-for="(i, key, index) in reactiveData.selectedRow" :key="index" class="flex justify-between">
              <p class="text-lg leading-relaxed text-gray-800 mb-4">{{ key }}:</p>
              <p class="text-lg leading-relaxed text-gray-800 mb-4">{{ i }}</p>
          </div>
      </Dialog>

    <div class="content-table-section">
        <div style="display: flex; align-items: center; justify-content: space-between;gap:20px;margin:25px 0">

        <div style="display: flex; align-items: center; justify-content: center;gap:20px">
          <p class="text-xl text-black">Organisation List</p>
          <img src="../../assets/icon/alert-circle.svg" />
          <!-- <div>
            <input class="terminal_search"  placeholder="Search"/>
          </div> -->
        
        </div>
        <div style="display: flex; align-items: center; justify-content: center;gap:20px;">
          <!-- <BaseButton bg-color="transparent" bg-border="#D0D5DD" @click="assignTerminal">
            <img src="../../assets/icon/Group 2.svg" />
            <p class="bnt-trans-text">Assgin Terminal</p>
           
          </BaseButton> -->
          <BaseButton @click="addOrganisation">
            <div style="display: flex;align-items: center;gap: 5px;">
            <img src="../../assets/icon/Folder Add 2.svg" />
            Add Organisation
          </div>
          
        </BaseButton>
        </div>
        </div>
     
        <!-- <BaseTable pagination="true" search="true" :headers="organsationHeaders" :bodies="organisation"></BaseTable> -->

        {{organisation}}
        <div class="overflow-auto rounded-lg shadow">
        <DataTable v-model:filters="filters" :value="organisation" :metaKeySelection="metaKey" selectionMode="single" paginator :rows="10" :rowsPerPageOptions="[5, 10, 20, 50]" stripedRows tableStyle="min-width: 50rem"
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
            currentPageReportTemplate="{first} to {last} of {totalRecords}" dataKey="id" filterDisplay="row"
            :globalFilterFields="['organisationName']" @rowSelect="onRowSelect">

            <template #header>
                    <div class="flex justify-end">
                        <span class="relative">
                            <i class="pi pi-search absolute top-2/4 -mt-2 left-3 text-surface-400 dark:text-surface-600" />
                            <InputText v-model="filters['global'].value" placeholder="Keyword Search"  class="pl-10 font-normal terminal_search"/>
                        </span>
                    </div>
                </template>

                <template #empty> 
                  <div class="text-center">
                    No Organisation found. 
                    </div>
                  </template>
                <template #loading> Loading customers data. Please wait. </template>
          
                <Column v-for="col of organsationHeaders"  :key="col.key" :field="col.key" :header="col.label"></Column>
                <!-- terminal status-->
                <!-- <Column field="organisationStatus" header="orgStatus">
                 <template #body="slotProps">
                  <Tag :value="slotProps.data.organisationStatus" :severity="getSeverity(slotProps.data.organisationStatus)" />

                  </template>
            </Column>  -->
                <Column header="actions">
                  
                  <template #body="">
                    <div class="flex">
              
                      <img src="../../assets/icon/Dropdown.svg" @click="toggle"/>

                      <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
                    </div>
                  </template>
                </Column>
              
                
        </DataTable>
      </div>
    </div>
</template>

<style scoped>
.content-table-section{
  padding: 2rem;
}

.bnt-trans-text{
    color: var(--dark_color);
}

.terminal_search{
    /* _Input dropdown base */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 6px;

height: 44px;
left: 0px;
right: 0px;
top: 0px;

/* Input */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 10px 14px;
gap: 8px;

width: 100%;
height: 44px;

/* White */
background: #FFFFFF;
/* Gray/300 */
border: 1px solid #D0D5DD;
/* Shadow/xs */
box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
border-radius: 8px;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;



}
</style>