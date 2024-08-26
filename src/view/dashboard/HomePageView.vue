<script setup lang="ts">
import BaseCard from "../../components/cards/BaseCard.vue";
import { ref, onMounted, reactive, computed, watch } from "vue";
import { useToast, useWait } from 'maz-ui'
import StoreUtils from "@/util/storeUtils.ts";
import ContentHeader from "@/components/dashboardHeader/ContentHeader.vue";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
// import { FilterMatchMode } from 'primevue/api';
import { useAuthStore } from "@/store/module/auth";
import MazSpinner from 'maz-ui/components/MazSpinner'
import Chart from "primevue/chart";
import Receipt from "@/components/modal/Receipt.vue";
import MazPicker from 'maz-ui/components/MazPicker'
import getResponse from "@/util/helper/globalResponse.ts";
// import MazFullscreenLoader from "maz-ui/components/MazFullscreenLoader";


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

const minMaxDates = ref({
  min: '2024-01-01',
  max: '2024-12-31',
})

const toast = useToast()
const wait = useWait()
const metaKey = ref(true);

const readTerminalTransactionLoading = computed(() => {
  return StoreUtils.getter().transactions.getLoading
})

const chartData = ref();

const chartOptions = ref();

const user = useAuthStore()

const transactions = computed(() => {
  return StoreUtils.getter().transactions.getTransactions
})

const reactiveData = reactive({
  selectedRow: null as any,
  showReceipt: false

})

function handleClose(payload: any) {
  reactiveData.showReceipt = payload;

}

watch(rangeValues, async (newVal, oldVal) => {
  console.log(oldVal)
  if(newVal){
    wait.start('LOADING_STATS')
    await StoreUtils.getter().organisation.readAdminStats(rangeValues.value.start, rangeValues.value.end)
    wait.stop('LOADING_STATS')  }
})

const onRowSelect = (event: any) => {
  reactiveData.selectedRow = event.data
  console.log(event)
}

// const filters = ref({
//   global: { value: null, matchMode: FilterMatchMode.CONTAINS },
//   transactionTerminalId: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
//   // representative: { value: null, matchMode: FilterMatchMode.IN },
//   transactionStatus: { value: null, matchMode: FilterMatchMode.EQUALS },
// });

// const filters2 = ref({
//   global: { value: null, matchMode: FilterMatchMode.CONTAINS },
//   transactionTerminalId: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
//   // representative: { value: null, matchMode: FilterMatchMode.IN },
//   transactionStatus: { value: null, matchMode: FilterMatchMode.EQUALS },
// });

// function extractMonthsInWords(dates) {
//   const monthNames = [
//     "January", "February", "March", "April", "May", "June",
//     "July", "August", "September", "October", "November", "December"
//   ];
//
//     const months = dates.map(date => {
//     const d = new Date(date); // Convert the date string to a Date object
//     const month = d.getMonth(); // Get the month (0 = January, 11 = December)
//     return monthNames[month]; // Return the corresponding month name
//   });
//
//   // Use a Set to remove duplicates
//   const uniqueMonths = [...new Set(months)];
//
//   return uniqueMonths;
// }


const setChartData = () => {
  const documentStyle = getComputedStyle(document.documentElement);

  return {
    labels: [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ],
    datasets: [
      {
        label: 'Dataset 1',
        fill: false,
        borderColor: documentStyle.getPropertyValue('--cyan-500'),
        yAxisID: 'y',
        tension: 0.4,
        data: [7000]
      },

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
      // y: {
      //   type: 'linear',
      //   display: true,
      //   position: 'left',
      //   ticks: {
      //     color: textColorSecondary
      //   },
      //   grid: {
      //     color: surfaceBorder
      //   }
      // },
      // y1: {
      //   type: 'linear',
      //   display: true,
      //   position: 'right',
      //   ticks: {
      //     color: textColorSecondary
      //   },
      //   grid: {
      //     drawOnChartArea: false,
      //     color: surfaceBorder
      //   }
      // }
    }
  };
}

const adminStats = computed(() => {
  return StoreUtils.getter().organisation.getAdminStats
})

const transactionsHeaders = [
  { label: 'Terminal ID', key: 'transactionTerminalId' },
  { label: 'Merchant Name', key: 'transactionOrganisationName' },
  { label: 'Amount', key: 'transactionRequestAmount' },
  { label: 'RRN', key: 'transactionRetrievalReferenceNumber' },
  { label: 'MaskedPan', key: 'transactionMaskedPan' },
  { label: 'AppLabel', key: 'transactionAppLabel' },
  { label: 'Created At', key: 'transactionCreatedAt' },

]

// const sortedItems:any = transactions?.value?.sort((a:any, b:any) => {
//   return new Date(b.transactionCreatedAt).getTime() - new Date(a.transactionCreatedAt).getTime();
// });


onMounted(async () => {
  rangeValues.value.start = getFirstOfMonth()
  rangeValues.value.end = getCurrentDate()
  chartData.value = setChartData();
  chartOptions.value = setChartOptions();
  if (!user.userInfo) await StoreUtils?.getter()?.auth?.userDetails(toast)
  wait.start('DASHBOARD')
  await StoreUtils.getter().organisation.readAdminStats(rangeValues.value.start, rangeValues.value.end)
  await StoreUtils.getter().transactions.readCustomerOrganisationTransactions(1, 100, rangeValues.value.end, rangeValues.value.start)
  wait.stop('DASHBOARD')

})
</script>

<template>
<!--  <MazFullscreenLoader v-if="wait.isLoading('DASHBOARD')">-->
<!--    <p class="text-2xl text-white-900">-->
<!--      Loading...-->
<!--    </p>-->
<!--  </MazFullscreenLoader>-->
  <Receipt :transactionData="reactiveData.selectedRow" @close="handleClose" v-if="reactiveData.showReceipt"></Receipt>

  <ContentHeader />
  <div class="content">

    <div class="content-card-section">
      <base-card text="Count" :amount="adminStats?.transactionCount" :analytics="true"></base-card>
      <base-card text="Successful Count" :amount="adminStats?.transactionSuccessfulCount" :analytics="true"></base-card>
      <base-card text="Failed Count" :amount="adminStats?.transactionFailedCount" :analytics="true"></base-card>
      <base-card text="Volume" :currency="true" :amount="adminStats?.transactionVolume" :analytics="true"></base-card>
      <base-card text="Successful Volume" :currency="true" :amount="adminStats?.transactionSuccessfulVolume"
        :analytics="true"></base-card>
      <base-card text="Failed Volume" :currency="true" :amount="adminStats?.transactionFailedVolume"
        :analytics="true"></base-card>
    </div>
    <div class="content-chart-section">

      <div class="flex justify-between relative">
        <div class="flex items-center gap-5">
          <span>Filter Statistics:</span>
          <MazPicker
              autoClose
              v-model="rangeValues"
              label=""
              color="white"
              :min-date="minMaxDates.min"
              :max-date="minMaxDates.max"
              double
          />

          <!--            <div class="date-picker" style="display: flex; align-items: center; justify-content: center;">-->
          <!--              <img src="../../assets/icon/Ic.svg" alt="">-->
          <!--              <p>July 12, 2021 - August 10, 2021</p>-->

          <!--            </div>-->
        </div>

        <div style="display: flex; align-items: center; justify-content: center;gap:20px">
          <p class="text-xl text-black">Statistics</p>
          <img src="../../assets/icon/alert-circle.svg" />
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
      </div>

      <Chart type="line" :data="chartData" :options="chartOptions" class="h-100rem" />

    </div>


    <div class="content-table-section">
      <div style="display: flex; align-items: center; justify-content: start;gap:20px;margin:25px 0">
        <p class="text-xl text-black">Recent Transaction</p>
        <img src="../../assets/icon/alert-circle.svg" />
      </div>
      <div class="overflow-auto rounded-lg shadow">

        <!-- <BaseTable :headers="headers" :bodies="data"></BaseTable>
        <div class="overflow-auto rounded-lg shadow"> -->

        <!-- <BaseTable pagination="true" search="true" :bodies="transactions" :headers="transactionsHeaders"></BaseTable> -->
        <DataTable :loading="readTerminalTransactionLoading" :value="transactions" :metaKeySelection="metaKey"
          selectionMode="single" :rows="10" paginator stripedRows tableStyle="min-width: 50rem" dataKey="id"
          filterDisplay="row" @rowSelect="onRowSelect">

          <template #header>
            <div class="flex justify-end">

            </div>
          </template>

          <template #empty>
            <div class="text-center">
              No Resent Transactions found.
            </div>
          </template>
          <template #loading>
            <MazSpinner v-if="readTerminalTransactionLoading" color="secondary" />

          </template>

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

                <p @click="reactiveData.showReceipt = !reactiveData.showReceipt"
                  class="bg-gray-100 shadow p-1 rounded-md text-sm hover:bg-green-600 hover:text-white">Reciept</p>

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
  justify-content: space-between;
  width: 100%;
  overflow: scroll
}

@media (max-width:1080px) {
  .content-card-section {
    width: 100%;
    flex-direction: column;
  }

  .content-chart-section {
    padding: .5rem;
  }

  .filter-reverse {
    display: flex;
    flex-direction: column-reverse;
    gap: 15px;

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
