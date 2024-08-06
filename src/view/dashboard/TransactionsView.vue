<script setup lang="ts">
import BaseCard from "../../components/cards/BaseCard.vue";
import { onMounted, ref, reactive } from "vue";
import {useWait } from 'maz-ui'
import StoreUtils from "@/util/storeUtils";
import ContentHeader from "@/components/dashboardHeader/ContentHeader.vue";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { FilterMatchMode } from 'primevue/api';
import InputText from 'primevue/inputtext';
import Menu from 'primevue/menu';
import Dialog from 'primevue/dialog';
import { computed } from "vue";
import MazSpinner from "maz-ui/components/MazSpinner";
import Receipt from "@/components/modal/Receipt.vue";

const wait = useWait()

const reactiveData = reactive({

  visible: false,
  selectedRow: null,
  showReceipt:false
})



const transactionsHeaders = [
  { label: 'Terminal ID', key: 'transactionTerminalId' },
  { label: 'Merchant Name', key: 'transactionOrganisationName' },
  { label: 'Amount', key: 'transactionRequestAmount' },
  { label: 'Stan', key: 'transactionStan' },
  { label: 'MaskedPan', key: 'transactionMaskedPan' },
  { label: 'AppLabel', key: 'transactionAppLabel'},
  { label: 'Created At', key: 'transactionCreatedAt'},
{label:'Response Status', key:'transactionResponseCode'}]


// function generateDummyData(numEntries) {
//   const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
//   const getRandomString = (length) => Math.random().toString(36).substring(2, 2 + length);

//   const dummyData = [];

//   for (let i = 0; i < numEntries; i++) {
//     dummyData.push({
//       transactionRequestAmount: getRandomString(12), // Random amount between 100 and 10000
//       transactionStatus: `TID${getRandomNumber(1000, 9999)}`, // Random terminal ID ['Pending', 'Completed', 'Failed'][getRandomNumber(0, 2)], // Random status
//       transactionTerminalId: `TID${getRandomNumber(1000, 9999)}`, // Random terminal ID
//       transactionTransactionTime: new Date().toISOString(), // Current timestamp
//       transactionToAccountType: ['23', '00', '00'][getRandomNumber(0, 1)], // Random string for account type
//       transactionToAccountIdentification: getRandomString(12) // Random string for account identification
//     });
//   }

//   return dummyData;
// }

const transactions =computed(() => {
  return StoreUtils.getter().transactions.getTransactions
}) 


const onRowSelect = (event: any) => {
  reactiveData.selectedRow = event.data
  console.log(event)
}

const getSeverity = (status: string) => {
  if(status === '00') return 'success'
  else return 'danger'
  
};


const menu = ref()

// const getSeverity = (status: string) => {
//   switch (status) {
//     case 'Declined':
//       return 'danger';

//     case 'ACTIVE':
//       return 'sucess';

//     case 'Pending':
//       return 'warning';
//   }
// };

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  transactionTerminalId: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  // representative: { value: null, matchMode: FilterMatchMode.IN },
  transactionStatus: { value: null, matchMode: FilterMatchMode.EQUALS },
});

const toggle = (event: any) => {
  menu.value.toggle(event);
}

const items = ref([
  {
    label: 'Options',
    items: [
      {
        label: 'View',
        icon: 'pi pi-refresh',
        command: () => {
          reactiveData.visible = !reactiveData.visible
        }
      },
      {
        label: 'Reciept',
        icon: 'pi pi-refresh',
        command: () => {
          reactiveData.showReceipt = !reactiveData.showReceipt
        }
      },
      // {
      //     label: 'Edit',
      //     icon: 'pi pi-upload',
      //     command:() => {
      //       reactiveData.showUpdateTerminal = !reactiveData.showUpdateTerminal
      //     }
      // },
      // {
      //     label: 'Delete',
      //     icon: 'pi pi-upload',
      //     command:() => {
      //       askToUser()
      //     }
      // }
    ]
  }
]);

function handleClose(payload: any) {
  reactiveData.showReceipt = payload;
 
}
const metaKey = ref(true);

//
// onMounted(async () => {
//   if (!user) {
//     wait.start()
//     await StoreUtils?.getter()?.auth?.userDetails(toast)
//     wait.stop()
//   }
//   if (!transactions) {
//     wait.start()
//     await StoreUtils?.getter()?.transactions?.readCustomerOrganisationTransactions()
//     wait.stop()
//   }
// });

const adminStats = computed(() => {
  return StoreUtils.getter().organisation.getAdminStats
})


onMounted(async () => {
  wait.start('READ_TRANSACTION')
  await StoreUtils.getter().transactions.readCustomerOrganisationTransactions(1, 100)
  wait.stop('READ_TRANSACTION')
})


</script>

<template>


  <Dialog header="Transaction Overview" v-model:visible="reactiveData.visible" modal :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <div v-for="(i, key, index) in reactiveData.selectedRow" :key="index" class="flex justify-between">
      <p class="text-lg leading-relaxed text-gray-800 mb-4">{{ key }}:</p>
      <p class="text-lg leading-relaxed text-gray-800 mb-4">{{ i }}</p>
    </div>
  </Dialog>


  <ContentHeader />
  <Receipt :transactionData="reactiveData.selectedRow" @close="handleClose" v-if="reactiveData.showReceipt"></Receipt>
  <div class="content">
    <div class="content-card-section">
      <base-card text="Count" :amount="adminStats?.transactionCount" :analytics="true"></base-card> 
        <base-card text="Successful Count" :amount="adminStats?.transactionSuccessfulCount" :analytics="true"></base-card>
        <base-card text="Failed Count" :amount="adminStats?.transactionFailedCount" :analytics="true"></base-card>
        <base-card text="Volume" :currency="true" :amount="adminStats?.transactionVolume" :analytics="true"></base-card>
        <base-card text="Successful Volume" :currency="true" :amount="adminStats?.transactionSuccessfulVolume" :analytics="true"></base-card>
        <base-card text="Failed Volume" :currency="true" :amount="adminStats?.transactionFailedVolume" :analytics="true"></base-card>
  
    </div>




    <div class="content-table-section">
      <div style="display: flex; align-items: center; justify-content: start;gap:20px;margin:25px 0">
        <p class="text-xl text-black">Recent Transaction</p>
        <img src="../../assets/icon/alert-circle.svg" />
      </div>
      <div class="overflow-auto rounded-lg shadow">

        <!-- <BaseTable pagination="true" search="true" :bodies="transactions" :headers="transactionsHeaders"></BaseTable> -->
        <DataTable :loading="wait.isLoading('READ_TRANSACTION')"  v-model:filters="filters" :value="transactions" :metaKeySelection="metaKey" selectionMode="single"
          paginator :rows="10" :rowsPerPageOptions="[5, 10, 20, 50]" stripedRows tableStyle="min-width: 50rem"
          paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
          currentPageReportTemplate="{first} to {last} of {totalRecords}" dataKey="id" filterDisplay="row"
          :globalFilterFields="['transactionStatus', 'transactionTerminalId']" @rowSelect="onRowSelect">

          <template #header>
            <div class="flex justify-end">
              <span class="relative">
                <i class="pi pi-search absolute top-2/4 -mt-2 left-3 text-surface-400 dark:text-surface-600" />
                <InputText v-model="filters['global'].value" placeholder="Keyword Search"
                  class="pl-10 font-normal terminal_search" />
              </span>
            </div>
          </template>

          <template #empty>
            <div class="text-center">
              No Transactions found.
            </div>
          </template>
          <template #loading> 
            <MazSpinner v-if="wait.isLoading('READ_TRANSACTION')"  color="secondary"></MazSpinner>
          </template>

          <Column v-for="col of transactionsHeaders" :key="col.key" :field="col.key" :header="col.label"></Column>
          <!--terminal status-->
          <!-- <Column field="transactionResponseCode" header="transactionResponseCode">
                  <template #body="slotProps">
                        
                        <div v-if="slotProps.data.transactionResponseCode">
                          <Tag :value="slotProps.data.transactionResponseCode" :severity="getSeverity(slotProps.data.transactionResponseCode)" />
                        </div>
                          
                        </template>
                </Column> -->
          <Column header="actions">

            <template #body="">
              <div class="flex">

                <img src="../../assets/icon/Dropdown.svg" @click="toggle" />

                <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
              </div>
            </template>
          </Column>


        </DataTable>
      </div>
    </div>
  </div>

</template>

<style scoped>
.content {
  background-color: white;
}

.circle-sm {
  /* Ellipse 18 */
  width: 14px;
  height: 14px;
  left: 0;
  top: 4.24px;
  border-radius: 50%;

  background: #10A711;

}

.pending {
  background: #FF8A00;

}

.terminal_search {
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

.failed {
  background: #FF0000;

}

.date-picker {
  /* BTN */

  /* Auto layout */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 14.8291px 16.9476px;
  gap: 8.47px;

  width: 280.32px;
  height: 50.84px;

  background: #F6F6F8;
  border-radius: 4.23689px;

  /* Inside auto layout */
  flex: none;
  order: 1;
  flex-grow: 0;
  cursor: pointer;

}

.content-card-section {
  display: flex;
  padding: 2rem;
  gap: 25px;
  overflow-x: scroll;
  justify-content: space-between;
}

.content-card-section::-webkit-scrollbar {
  display: none;
}

.content-table-section {
  padding: 2rem;
}

.content-chart-section {
  padding: 2rem;
}
</style>
