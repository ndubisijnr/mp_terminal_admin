<script lang="ts" setup>
import { computed, reactive, ref, onMounted } from 'vue';
import ContentHeader from '@/components/dashboardHeader/ContentHeader.vue';
import StoreUtils from "@/util/storeUtils.ts";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
// import Tag from 'primevue/tag';
import { FilterMatchMode } from 'primevue/api';
import InputText from 'primevue/inputtext';
import Menu from 'primevue/menu';
import Dialog from 'primevue/dialog';
// import { DialogCustomButton } from 'maz-ui/types/components/MazDialogPromise/use-maz-dialog-promise.js';
import { useWait } from 'maz-ui';
import Breadcrumb from 'primevue/breadcrumb';
import { router } from '@/router';
import Receipt from "@/components/modal/Receipt.vue";


const wait = useWait()

const reactiveData = reactive({
  showRequestTerminal: false,
  showAssignTerminal: false,
  visible: false,
  selectedRow: {} as any,
  showUpdateTerminal: false,
  readTerminalTransactions:false,
  showReceipt:false

})



const onRowSelect = (event: any) => {
  reactiveData.selectedRow = event.data
  console.log(event)
}

// const buttons: DialogCustomButton[] = [
//   {
//     text: 'Cancel',
//     type: 'reject',
//     color: 'danger',
//     response: new Error('cancel'),
//     size: 'sm',
//   },
//   {
//     text: 'Delete!',
//     type: 'resolve',
//     color: 'success',
//     response: 'delete',
//     size: 'lg',
//   },
// ]


const menu = ref();


const transactionsHeaders = [
  { label: 'Terminal ID', key: 'transactionTerminalId' },
  { label: 'Merchant Name', key: 'transactionOrganisationName' },
  { label: 'Amount', key: 'transactionRequestAmount' },
  {label:'Response Status', key:'transactionResponseCode'},
  { label: 'RRN', key: 'transactionRetrievalReferenceNumber' },
  { label: 'MaskedPan', key: 'transactionMaskedPan' },
  { label: 'AppLabel', key: 'transactionAppLabel'},
  { label: 'Created At', key: 'transactionCreatedAt'},
]

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
  terminalStatus: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  // representative: { value: null, matchMode: FilterMatchMode.IN },
  terminalSerialNumber: { value: null, matchMode: FilterMatchMode.EQUALS },
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
    ]
  }
]);

const metaKey = ref(true);

const terminalID = computed(() => {
    return router.currentRoute.value.query.terminalID
})

const redirectTo = computed(() => {
    return router.currentRoute.value.query.redirect
})

const terminalTransactions = computed(() => {
  return StoreUtils.getter().terminal?.getTerminalOrganisationTransactions
})

function handleClose(payload: any) {
  reactiveData.showReceipt = payload;
 
}
const item = ref([
    { label: `${redirectTo.value ? 'Organisations' : 'Terminals'}`, route:`${redirectTo.value ? redirectTo.value : '/terminals'}` },
    { label: 'Transactions' }, 
]);


const readTerminalTransactions = async () => {
    wait.start('READ_TERMINAL_TRANSACTIONS')
    await StoreUtils.getter()?.terminal.readTerminalTransactionByTerminalId(terminalID.value);
    wait.stop('READ_TERMINAL_TRANSACTIONS')

}

onMounted(() => {
    readTerminalTransactions()
})

</script>

<template>
  <Dialog v-model:visible="reactiveData.visible" modal :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <div v-for="(i, key, index) in reactiveData.selectedRow" :key="index" class="flex justify-between">
      <p class="text-lg leading-relaxed text-gray-800 mb-4">{{ key }}:</p>
      <p class="text-lg leading-relaxed text-gray-800 mb-4">{{ i }}</p>
    </div>
  </Dialog>

    <Receipt :transactionData="reactiveData.selectedRow" @close="handleClose" v-if="reactiveData.showReceipt"></Receipt>


    <ContentHeader />

    <div class="content-table-section">
        <Breadcrumb :model="item">
        <template #item="{ item, props }">
                    <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                        <a :href="href" v-bind="props.action" @click="navigate">
                            <span :class="[item.icon, 'text-color']" />
                            <span class="text-primary font-semibold">{{ item.label }}</span>
                        </a>
                    </router-link>
                    <a v-else :href="item.url" :target="item.target" v-bind="props.action">
                        <span class="text-surface-700 dark:text-surface-0/80">{{ item.label }}</span>
                    </a>
                </template>
        </Breadcrumb>
      <div style="display: flex; align-items: center; justify-content: space-between;gap:20px;margin:25px 0">

        <div style="display: flex; align-items: center; justify-content: center;gap:20px">
          <p class="text-xl text-black">{{`${terminalID} Transactions`}}</p>

        </div>
       
      </div>

      <div class="overflow-auto rounded-lg shadow">
        <DataTable :loading="wait.isLoading('READ_TERMINAL_TRANSACTIONS')" v-model:filters="filters" :value="terminalTransactions" :metaKeySelection="metaKey" selectionMode="single"
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
              <div class="text-center text-white text-xxl">
               Please Wait, fetching records.
              </div>
            </template>

            <Column v-for="col of transactionsHeaders" :key="col.key" :field="col.key" :header="col.label"></Column>
            <!--terminal status-->
            <!-- <Column field="terminalStatus" header="terminalStatus">
                  <template #body="slotProps">
                        
                        <div v-if="slotProps.data.terminalStatus">
                          <Tag :value="slotProps.data.terminalStatus" :severity="getSeverity(slotProps.data.terminalStatus)" />
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
</template>

<style scoped>
.content-table-section {
  padding: 2rem;
}

.bnt-trans-text {
  color: var(--dark_color);
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
</style>