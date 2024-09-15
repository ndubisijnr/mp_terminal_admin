<script setup lang="ts">
import { ref, onMounted, reactive, computed } from "vue";
import { useToast, useWait } from 'maz-ui'
import StoreUtils from "@/util/storeUtils.ts";
import MazFullscreenLoader from 'maz-ui/components/MazFullscreenLoader'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { FilterMatchMode } from 'primevue/api';
import { router } from "@/router";
import Menu from 'primevue/menu';
import BaseButton from "@/components/button/BaseButton.vue";
import Dialog from 'primevue/dialog';
import MazDialogPromise, {
  useMazDialogPromise
} from 'maz-ui/components/MazDialogPromise'
import UpdateTerminal from "@/components/modal/terminal/UpdateTerminal.vue";
import TerminalRequest from "@/models/request/terminal/TerminalRequest";
import AddInstitutionCharges from "@/components/modal/charges/AddInstitutionCharges.vue";
import AssignTerminal from '@/components/modal/terminal/AssignTerminal.vue';
import UpdateInstitutionCharges from "@/components/modal/charges/UpdateInstitutionCharges.vue";
import Breadcrumb from 'primevue/breadcrumb';
import BaseCard from "@/components/cards/BaseCard.vue";
import ChargesRequest from "@/models/request/charges/ChargesRequest";
import Chart from "primevue/chart";
import { RouteConstantUtil } from "@/util/constant/RouteConstantUtil";
import getResponse from "@/util/helper/globalResponse.ts";

const chartData = ref();

const chartOptions = ref();

const setChartData = () => {
  const documentStyle = getComputedStyle(document.documentElement);

  return {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Dataset 1',
        fill: false,
        borderColor: documentStyle.getPropertyValue('--cyan-500'),
        yAxisID: 'y',
        tension: 0.4,
        data: [65, 59, 80, 81, 56, 55, 10]
      },
      {
        label: 'Dataset 2',
        fill: false,
        borderColor: documentStyle.getPropertyValue('--gray-500'),
        yAxisID: 'y1',
        tension: 0.4,
        data: [28, 48, 40, 19, 86, 27, 90]
      }
    ]
  };
};

const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue('--text-color');
  const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
  const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

  return {
    stacked: false,
    maintainAspectRatio: false,
    aspectRatio: 0.6,
    plugins: {
      legend: {
        labels: {
          color: textColor
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: textColorSecondary
        },
        grid: {
          color: surfaceBorder
        }
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        ticks: {
          color: textColorSecondary
        },
        grid: {
          color: surfaceBorder
        }
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        ticks: {
          color: textColorSecondary
        },
        grid: {
          drawOnChartArea: false,
          color: surfaceBorder
        }
      }
    }
  };
}

const toast = useToast()
const wait = useWait()
const { showDialogAndWaitChoice, data } = useMazDialogPromise()

function getFirstOfMonth() {
  // Create a new Date object for the current date
  const now = new Date();

  // Extract the current year and month
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0'); // getMonth() returns 0-based index, so add 1

  // Set the day to '01' to represent the first day of the current month
  const day = '01';

  // Format the date components into a readable string (First day of the current month)
  return `${year}-${month}-${day}`;
}

function getCurrentDate() {
  // Create a new Date object for the current date
  const now = new Date();

  // Extract the current year, month, and day
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0'); // getMonth() returns 0-based index, so add 1
  const day = now.getDate().toString().padStart(2, '0'); // getDate() returns the day of the month

  // Format the date components into a readable string (Current date)
  return `${year}-${month}-${day}`;
}


const rangeValues = ref({
  start: '',
  end: '',
})

data.value = {
  title: 'Delete',
  message: `Are you sure you want to delete charge`
}

const metaKey = ref(true);

const metaKey2 = ref(true);

const menu = ref();

const menu2 = ref();

const menu3 = ref();



data.value = {
  title: 'Reversal',
  message: `Are you sure you want to reverse this transaction`
}

async function askToUser(transactionId:any) {
  try {
    const responseOne = await showDialogAndWaitChoice('two')

    if (responseOne === 'accept') {
      reversal(transactionId)

    } else {
      console.log(responseOne)
    }

  } catch (error: any) {
    console.log(error)
  }
}

const reversal = (id:any) => {
  let reversalRequest:{} = {
    transactionId: id
  }
  StoreUtils.getter()?.fundTransfer.doManualReversal(toast, reversalRequest)
}


const addInstituteCharge = ref();


const item = ref([
    { label: 'Institutions', route:'/institutions'}, 
    { label: 'Overview' }, 
    { label: 'Filter Statitics' }
]);

const reactiveData = reactive({
  selectedRow: null as any,
  startDate: new Date(),
  showManageCharges: false,
  visible: false,
  showUpdateCharges: false,
  showUpdateTerminal: false,
  showAssignTerminal:false
})


const toggle = (event: any) => {
  menu.value.toggle(event);
}

const toggle2 = (event: any) => {
  menu2.value.toggle(event);
}

const toggle3 = (event: any) => {
  menu3.value.toggle(event);
}

const organisationID = computed(() => {
  return String(router.currentRoute.value.query.organisationID)
})


const organisationName = computed(() => {
  return router.currentRoute.value.query.organisationName
})

const organisationCharges = computed(() => {
  return StoreUtils.getter().organisation.getOrganisationPricing
})

const organisationStats = computed(() => {
  return StoreUtils.getter().organisation.getOrganisationStats
})


const organisationTerminal = computed(() => {
  return StoreUtils.getter().terminal.getOrganisationTerminals
})

const organisationTransaction = computed(() => {
  return StoreUtils.getter().organisation.getOrganisationTransaction
})


function addNewCharges(){
  addInstituteCharge.value = {
    organisationId:organisationID,
    organisationName:organisationName
  }
  reactiveData.showManageCharges = true
}

// function getFormattedDate() {
//   const today = new Date();
//   const day = String(today.getDate()).padStart(2, '0');
//   const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
//   const year = today.getFullYear();
//
//   return `${day}-${month}-${year}`;
// }

const chargesHeaders = [
  { label: 'pricingAmount', key: 'organisationPricingAmount' },
  { label: 'pricingAmountType', key: 'organisationPricingAmountType' },
  { label: 'pricingCode', key: 'organisationPricingCode' },
  { label: 'pricingDescription', key: 'organisationPricingDescription'},
  { label: 'pricingType', key: 'organisationPricingType' },
  { label: 'pricingMinAmount', key: 'organisationPricingMinAmount' },
  { label: 'pricingMaxAmount', key: 'organisationPricingMaxAmount' }
]


const transactionsHeaders = [
  { label: 'Terminal ID', key: 'transactionTerminalId' },
  { label: 'Merchant Name', key: 'transactionOrganisationName' },
  { label: 'Amount', key: 'transactionRequestAmount' },
  { label: 'Narration', key: 'journalNarration' },

  // { label: 'Stan', key: 'transactionStan' },
  // { label: 'MaskedPan', key: 'transactionMaskedPan' },
  // { label: 'AppLabel', key: 'transactionAppLabel'},
  { label: 'Created At', key: 'transactionCreatedAt'},
// {label:'Response Status', key:'transactionResponseCode'}
  ]


const onRowSelect = (event: any) => {
  reactiveData.selectedRow = event.data
  console.log(event)
}

const deleteTerminal = () => {
  TerminalRequest.deleteTerminal.terminalId = reactiveData?.selectedRow?.terminalId
  StoreUtils.getter()?.terminal.deleteTerminal(TerminalRequest.deleteTerminal, toast)
}

const deleteOrgTerminal = () => {
  ChargesRequest.deleteOrgCharges.organisationPricingPricingId = reactiveData?.selectedRow?.organisationPricingPricingId
  StoreUtils.getter()?.charges.deleteOrgCharges(ChargesRequest.deleteOrgCharges, toast)
}


const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  transactionTerminalId: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  // representative: { value: null, matchMode: FilterMatchMode.IN },
  transactionStatus: { value: null, matchMode: FilterMatchMode.EQUALS },
});

const filters2 = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  transactionTerminalId: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  // representative: { value: null, matchMode: FilterMatchMode.IN },
  transactionStatus: { value: null, matchMode: FilterMatchMode.EQUALS },
});


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
        label: 'Edit',
        icon: 'pi pi-upload',
        command: () => {
          reactiveData.showUpdateCharges = !reactiveData.showUpdateCharges
        }
      },
      {
        label: 'Delete',
        icon: 'pi pi-upload',
        command: () => {
          askToUser1()
        }
      }
    ]
  }
]);

function handleClose(payload: any) {
  reactiveData.showManageCharges = payload;
  reactiveData.showUpdateCharges = payload
  reactiveData.showUpdateTerminal = payload
  reactiveData.showAssignTerminal = payload
}

async function askToUser1() {
  try {
    const responseOne = await showDialogAndWaitChoice('one')

    if (responseOne === 'accept') {
          deleteOrgTerminal() 
          wait.start('DELETE_LOAD')
          await StoreUtils.getter()?.organisation.readOrganisationPricing(organisationID?.value)
          wait.stop('DELETE_LOAD')

    } else {
      console.log(responseOne)
    }

  } catch (error: any) {
    toast.error(error.message ?? error, {
      position: 'top-right'
    })
  }
}

async function askToUser2() {
  try {
    const responseOne = await showDialogAndWaitChoice('one')

    if (responseOne === 'accept') {
      deleteTerminal()
      await StoreUtils.getter()?.terminal.readOrganisationTerminalOrganisationId(organisationID?.value)

    } else {
      console.log(responseOne)
    }

  } catch (error: any) {
    toast.error(error.message ?? error, {
      position: 'top-right'
    })
  }
}

const items2 = ref([
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
        label: 'Terminal Transactions',
        icon: 'pi pi-upload',
        command: () => {
          router.push({ name: RouteConstantUtil.dashboard.terminalTransactions, query: { terminalID: reactiveData?.selectedRow?.terminalId, redirect:`${router?.currentRoute.value.path}?organisationID=${organisationID.value}?organisationName=${organisationName.value}` }})
        }
      },
     
      {
        label: 'Delete',
        icon: 'pi pi-upload',
        command: () => {
          askToUser2()
        }
      }
    ]
  }
]);

const items3 = ref([
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
        label: 'Reverse Transaction',
        icon: 'pi pi-upload',
        command:() => {
          askToUser(reactiveData.selectedRow.transactionId)
        }
      },
      
    ]
  }
])

const terminalHeaders = [
  { label: 'terminalId', key: 'terminalId' },
  { label: 'terminalSerialNumber', key: 'terminalSerialNumber' },
  { label: 'terminalMerchantNameLocation', key: 'terminalMerchantNameLocation' },
  { label: 'terminalBalance', key: 'terminalBalance' },
  { label: 'terminalCreatedAt', key: 'terminalCreatedAt' }]

onMounted(async () => {
  rangeValues.value.start = getFirstOfMonth()
  rangeValues.value.end = getCurrentDate()
  // chartData.value = setChartData();
  chartOptions.value = setChartOptions();
  wait.start("LOADING_STATS")
  await StoreUtils.getter().organisation.readOrganisationStats( organisationID?.value, rangeValues.value.start, rangeValues.value.end)
  await StoreUtils.getter()?.organisation.readOrganisationPricing(organisationID?.value)
  await StoreUtils.getter()?.terminal.readOrganisationTerminalOrganisationId(organisationID?.value)
  await StoreUtils.getter()?.organisation.readOrganisationTransactionsByOrganisationId(organisationID?.value,rangeValues.value.start, rangeValues.value.end)
  wait.stop("LOADING_STATS")
});

</script>

<template>
  <Dialog v-model:visible="reactiveData.visible" modal :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <div v-for="(i, key, index) in reactiveData.selectedRow" :key="index" class="flex justify-between">
      <p class="text-lg leading-relaxed text-gray-800 mb-4">{{ key }}:</p>
      <p class="text-lg leading-relaxed text-gray-800 mb-4">{{ i }}</p>
    </div>
  </Dialog>
  <MazFullscreenLoader v-if="wait.isLoading('LOADING_STATS')">
    <p class="text-2xl text-white-900">
      Loading...
    </p>
  </MazFullscreenLoader>

  <MazDialogPromise identifier="one" />
  <MazDialogPromise identifier="two" />

  <AddInstitutionCharges :data="addInstituteCharge" v-if="reactiveData.showManageCharges" @close="handleClose"></AddInstitutionCharges>
  <UpdateTerminal :data="reactiveData?.selectedRow" v-if="reactiveData.showUpdateTerminal" @close="handleClose" />
  <UpdateInstitutionCharges v-if="reactiveData.showUpdateCharges" :data="reactiveData.selectedRow" @close="handleClose"></UpdateInstitutionCharges>
  <AssignTerminal :organisationId="organisationID" v-if="reactiveData.showAssignTerminal" @close="handleClose"></AssignTerminal>

  <!-- <ContentHeader /> -->
  <div class="">
    <div class="">
      <div class="block">
        <p class="text-3xl ml-8 mt-8">{{ organisationName }} Overview</p>
      </div>
      <h6 class="ml-8 mt-6 text-xl text-black" style="margin-bottom: -20px;">Transaction Stats</h6>
      <div class="content-card-section">
        <base-card text="Count" :amount="organisationStats?.transactionCount" :analytics="true"></base-card> 
        <base-card text="Successful Count" :amount=" organisationStats?.transactionSuccessfulCount" :analytics="true"></base-card>
        <base-card text="Failed Count" :amount="organisationStats?.transactionFailedCount" :analytics="true"></base-card>
        <base-card text="Volume" :currency="true" :amount="organisationStats?.transactionVolume" :analytics="true"></base-card>
        <base-card text="Successful Volume" :currency="true" :amount="organisationStats?.transactionSuccessfulVolume" :analytics="true"></base-card>
        <base-card text="Failed Volume" :currency="true" :amount="organisationStats?.transactionFailedVolume" :analytics="true"></base-card>

      </div>
    </div>

    <Breadcrumb :model="item" class="ml-8 mt-4">
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

        <div class="content-chart-section">
        <div style="display: flex; align-items: center; justify-content: space-between;margin:25px 0">
          <div style="display: flex; align-items: center; justify-content: center;gap:20px">
            <p class="text-xl text-black">Statistics</p>
            <!-- <img src="../../assets/icon/alert-circle.svg" /> -->
            <div style="position:relative;display:flex;align-items:center;justify-content:center;gap:5px;">
              <p class="circle-sm"></p>
              <p>Success</p>
            </div>
            <div style="position:relative;display:flex;align-items:center;justify-content:center;gap:5px;">
              <p class="circle-sm pending"></p>
              <p>Pending</p>
            </div>
            <div style="position:relative;display:flex;align-items:center;justify-content:center;gap:5px;">
              <p class="circle-sm failed"></p>
              <p>Failed</p>
            </div>
          </div>
          <div style="display: flex; align-items: center; justify-content: center;gap:20px">
            <span>Filter by:</span>
            <div class="date-picker" style="display: flex; align-items: center; justify-content: center;">
              <img src="../../assets/icon/Ic.svg" alt="">
              <p>July 12, 2021 - August 10, 2021</p>

            </div>
          </div>
        </div>
        <Chart type="line" :data="chartData" :options="chartOptions" class="h-100rem" />

      </div>

    <div class="content-table-section">
      <div style="display: flex; align-items: center; justify-content: space-between;gap:20px;margin:10px 0">
        <div style="display: flex; align-items: center; justify-content: start;gap:20px;margin:10px 0">
          <p class="text-xl text-black">Institution Charges</p>
          <img src="../../assets/icon/alert-circle.svg" />
        </div>
        <div style="display: flex; align-items: center; justify-content: center;gap:20px;">
          <BaseButton @click="addNewCharges">
            <div style="display: flex;align-items: center;gap: 5px;">
              <img src="../../assets/icon/Folder Add 2.svg" />
              Add New Charges
            </div>

          </BaseButton>
        </div>
      </div>
      <div class="overflow-auto rounded-lg shadow">

        <!-- <BaseTable :headers="headers" :bodies="data"></BaseTable>
        <div class="overflow-auto rounded-lg shadow"> -->


        <!-- <BaseTable pagination="true" search="true" :bodies="transactions" :headers="transactionsHeaders"></BaseTable> -->
        <DataTable :loading="wait.isLoading('DELETE_LOAD')" v-model:filters="filters" :value="organisationCharges" :metaKeySelection="metaKey"
          selectionMode="single" :rows="3" stripedRows tableStyle="min-width: 50rem"
          paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
          currentPageReportTemplate="{first} to {last} of {totalRecords}" dataKey="id" filterDisplay="row"
          :globalFilterFields="['transactionStatus', 'transactionTerminalId']" @rowSelect="onRowSelect">

          <template #header>
            <div class="flex justify-end">

            </div>
          </template>

          <template #empty>
            <div class="text-center">
              No Resent Charges found.
            </div>
          </template>
          <template #loading> Loading customers data. Please wait. </template>

          <Column v-for="col of chargesHeaders" :key="col.key" :field="col.key" :header="col.label"></Column>

          <Column header="actions">

            <template #body="">
              <div class="flex">

                <img src="../../assets/icon/Dropdown.svg" @click="toggle" />

                <Menu ref="menu" id="org_pricing_menu" :model="items" :popup="true"></Menu>
              </div>
            </template>
          </Column>


        </DataTable>
      </div>

    </div>

    <div class="content-table-section">
      <div style="display: flex; align-items: center; justify-content: space-between;gap:20px;margin:10px 0">

        <div style="display: flex; align-items: center; justify-content: start;gap:20px;margin:10px 0">
          <p class="text-xl text-black">Institution Terminals</p>
          <img src="../../assets/icon/alert-circle.svg" />
        </div>
        <!-- <div style="display: flex; align-items: center; justify-content: center;gap:20px;">
          <BaseButton @click="reactiveData.showAssignTerminal = true">
            <div style="display: flex;align-items: center;gap: 5px;">
              <img src="../../assets/icon/Folder Add 2.svg" />
              Assign Terminals
            </div>

          </BaseButton>
        </div> -->
      </div>

      <div class="overflow-auto rounded-lg shadow">
        <DataTable v-model:filters="filters2" :value="organisationTerminal" :metaKeySelection="metaKey2"
          selectionMode="single"  paginator :rows="10" :rowsPerPageOptions="[5, 10, 20, 50]" stripedRows tableStyle="min-width: 50rem"
          paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
          currentPageReportTemplate="{first} to {last} of {totalRecords}" dataKey="id" filterDisplay="row"
          :globalFilterFields="['transactionStatus', 'transactionTerminalId']" @rowSelect="onRowSelect">

          <template #header>
            <div class="flex justify-end">

            </div>
          </template>

          <template #empty>
            <div class="text-center">
              No Resent Terminal found.
            </div>
          </template>
          <template #loading> Loading customers data. Please wait. </template>

          <Column v-for="col of terminalHeaders" :key="col.key" :field="col.key" :header="col.label"></Column>
          <Column header="actions">

            <template #body="">
              <div class="flex">

                <img src="../../assets/icon/Dropdown.svg" @click="toggle2" />

                <Menu ref="menu2" id="terminal_menu" :model="items2" :popup="true"></Menu>
              </div>
            </template>
          </Column>

        </DataTable>
      </div>
      <!-- <BaseTable :headers="terminalHeaders" :bodies="terminalDatas"></BaseTable> -->
    </div>

    <div class="content-table-section">
      <div style="display: flex; align-items: center; justify-content: space-between;gap:20px;margin:10px 0">

        <div style="display: flex; align-items: center; justify-content: start;gap:20px;margin:10px 0">
          <p class="text-xl text-black">Institution Transactions</p>
          <img src="../../assets/icon/alert-circle.svg" />
        </div>
        <!-- <div style="display: flex; align-items: center; justify-content: center;gap:20px;">
          <BaseButton @click="reactiveData.showAssignTerminal = true">
            <div style="display: flex;align-items: center;gap: 5px;">
              <img src="../../assets/icon/Folder Add 2.svg" />
              Assign Terminals
            </div>

          </BaseButton>
        </div> -->
      </div>

      <div class="overflow-auto rounded-lg shadow">
        <DataTable v-model:filters="filters2" :value="organisationTransaction" :metaKeySelection="metaKey2"
          selectionMode="single" paginator :rows="10" :rowsPerPageOptions="[5, 10, 20, 50]" stripedRows tableStyle="min-width: 50rem"
          paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
          currentPageReportTemplate="{first} to {last} of {totalRecords}" dataKey="id" filterDisplay="row"
          :globalFilterFields="['transactionStatus', 'transactionTerminalId']" @rowSelect="onRowSelect">

          <template #header>
            <div class="flex justify-end">

            </div>
          </template>

          <template #empty>
            <div class="text-center">
              No Transactions found.
            </div>
          </template>
          <template #loading> Loading customers data. Please wait. </template>
          <Column field="journalDrCr" header="DrCr">
            <template #body="slotProps">

              <div v-if="slotProps.data.journalDrCr">
                <p :style="slotProps.data.journalDrCr === 'DR' ? {color:'red'}:{color:'green'}">{{slotProps.data.journalDrCr}}</p>
              </div>

            </template>
          </Column>
          <Column v-for="col of transactionsHeaders" :key="col.key" :field="col.key" :header="col.label"></Column>
          <Column field="transactionResponseCode" header="transactionResponse">
            <template #body="slotProps">

              <div v-if="slotProps.data.transactionResponseCode">
                <p>{{getResponse(slotProps.data.transactionResponseCode)}}</p>
              </div>

            </template>
          </Column>
          <Column header="actions">

            <template #body="">
              <div class="flex">

                <img src="../../assets/icon/Dropdown.svg" @click="toggle3" />

                <Menu ref="menu3" id="trans" :model="items3" :popup="true"></Menu>
              </div>
            </template>
          </Column>

        </DataTable>
      </div>
      <!-- <BaseTable :headers="terminalHeaders" :bodies="terminalDatas"></BaseTable> -->
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
  gap: 5px;
  overflow-x: scroll;
  justify-content: space-between;
  width: 100%;
}

@media (max-width:1080px) {
  .content-card-section {
    width: 100%;
  }
}

.content-card-section::-webkit-scrollbar {
  display: none;
}

.content-table-section {
  padding: 2rem;
}

.content-chart-section {
  padding: 1rem;
}
</style>
