<script setup lang="ts">
import BaseCard from "../../components/cards/BaseCard.vue";
import { ref, onMounted, reactive, computed } from "vue";
import { useToast, useWait } from 'maz-ui'
import StoreUtils from "@/util/storeUtils.ts";
import MazFullscreenLoader from 'maz-ui/components/MazFullscreenLoader'
import ContentHeader from "@/components/dashboardHeader/ContentHeader.vue";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { FilterMatchMode } from 'primevue/api';
import { useAuthStore } from "@/store/module/auth";
import { router } from "@/router";
import Menu from 'primevue/menu';
import { RouteConstantUtil } from "@/util/constant/RouteConstantUtil";

const toast = useToast()
const wait = useWait()
const metaKey = ref(true);

const metaKey2 = ref(true);

const menu = ref();

const menu2 = ref();


const user = useAuthStore()


const reactiveData = reactive({
  selectedRow: null,
  startDate:new Date(),
  showManageCharges:false,
  visible:false,
  showUpdateCharges:false,
  showUpdateTerminal:false

})

const toggle = (event:any) => {
    menu.value.toggle(event);
}

const toggle2 = (event:any) => {
    menu2.value.toggle(event);
}



const organisationID = computed(() => {
    return router.currentRoute.value.query.organisationID
})

const organisationCharges = computed(() => {
    return StoreUtils.getter().organisation.getOrganisationPricing
})

const organisationTerminal = computed(() => {
    return StoreUtils.getter().terminal.getOrganisationTerminals
})

const organisationTerminalTransaction = computed(() => {
    return StoreUtils.getter().transactions.getTerminalTransactions
})

function getFormattedDate() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = today.getFullYear();
    
    return `${day}-${month}-${year}`;
}

const chargesHeaders = [
  {label:'pricingAmount',key:'organisationPricingAmount'}, 
  {label:'pricingAmountType',key:'organisationPricingAmountType'},
  {label:'pricingCode',key:'organisationPricingCode'},
  {label:'pricingDescription',key:'organisationPricingDescription'},
  {label:'pricingType',key:'organisationPricingType'},
  {label:'pricingMinAmount',key:'organisationPricingMinAmount'},
  {label:'pricingMaxAmount',key:'organisationPricingMaxAmount'},]


const onRowSelect = (event: any) => {
  reactiveData.selectedRow = event.data
  console.log(event)
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
                command:( ) => {
                  reactiveData.visible = !reactiveData.visible
                }
            },
            {
                label: 'Edit',
                icon: 'pi pi-upload',
                command:() => {
                  reactiveData.showUpdateCharges = !reactiveData.showUpdateCharges
                }
            },
            {
                label: 'Delete',
                icon: 'pi pi-upload',
                command:() => {
                 
                }
            }
        ]
    }
]);

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
        icon: 'pi pi-refresh',
        command: () => {
          router.push({name:RouteConstantUtil.dashboard.terminalTransactions, query:{terminalID:reactiveData?.selectedRow?.terminalId}})
        }
      },
      {
        label: 'Edit',
        icon: 'pi pi-upload',
        command: () => {
          reactiveData.showUpdateTerminal = !reactiveData.showUpdateTerminal
        }
      },
      {
        label: 'Delete',
        icon: 'pi pi-upload',
        command: () => {
          askToUser()
        }
      }
    ]
  }
]);

  const terminalHeaders = [
  { label: 'terminalId', key: 'terminalId' },
  { label: 'terminalSerialNumber', key: 'terminalSerialNumber' },
  { label: 'terminalMerchantNameLocation', key: 'terminalMerchantNameLocation' },
  { label: 'terminalBalance', key: 'terminalBalance' },
  { label: 'terminalCreatedAt', key: 'terminalCreatedAt' }]

onMounted(async () => {
  StoreUtils.getter().organisation.readOrganisationStats(organisationID?.value, getFormattedDate(),getFormattedDate())
  if (!user.userInfo) await StoreUtils?.getter()?.auth?.userDetails(toast)

});

</script>

<template>
  <MazFullscreenLoader style="position: fixed;z-index: 9999;" v-if="wait.isLoading()">
    <p>
      Loading...
    </p>
  </MazFullscreenLoader>


    <ContentHeader />
    <div class="content">
      <div class="content-card-section">
        <base-card text="Number of Businesses" amount="12" :analytics="true"></base-card>
        <base-card text="Successfull Transaction" amount="1,198" :analytics="true"></base-card>
        <base-card text="Pending Transaction" amount="2" :analytics="true"></base-card>
        <base-card text="Failed Transaction" amount="32" :analytics="true"></base-card>
      </div>

      <div class="content-table-section">
        <div style="display: flex; align-items: center; justify-content: start;gap:20px;margin:25px 0">
          <p class="text-xl text-black">Institution Charges</p>
          <img src="../../assets/icon/alert-circle.svg" />
        </div>
        <div class="overflow-auto rounded-lg shadow">

          <!-- <BaseTable :headers="headers" :bodies="data"></BaseTable>
        <div class="overflow-auto rounded-lg shadow"> -->


          <!-- <BaseTable pagination="true" search="true" :bodies="transactions" :headers="transactionsHeaders"></BaseTable> -->
          <DataTable v-model:filters="filters" :value="organisationCharges" :metaKeySelection="metaKey" selectionMode="single"
            :rows="3" stripedRows tableStyle="min-width: 50rem"
            paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
            currentPageReportTemplate="{first} to {last} of {totalRecords}" dataKey="id" filterDisplay="row"
            :globalFilterFields="['transactionStatus', 'transactionTerminalId']" @rowSelect="onRowSelect">

            <template #header>
              <div class="flex justify-end">

              </div>
            </template>

            <template #empty>
              <div class="text-center">
                No Resent Transactions found.
              </div>
            </template>
            <template #loading> Loading customers data. Please wait. </template>

            <Column v-for="col of chargesHeaders" :key="col.key" :field="col.key" :header="col.label"></Column>

            <Column header="actions">
                  
                  <template #body="">
                    <div class="flex">
              
                      <img src="../../assets/icon/Dropdown.svg" @click="toggle"/>

                      <Menu ref="menu" id="org_pricing_menu" :model="items" :popup="true" ></Menu>
                    </div>
                  </template>
                </Column>
              

          </DataTable>
        </div>

      </div>

      <div class="content-table-section">
        <div style="display: flex; align-items: center; justify-content: start;gap:20px;margin:25px 0">
          <p class="text-xl text-black">Institution Terminals</p>
          <img src="../../assets/icon/alert-circle.svg" />
        </div>

        <div class="overflow-auto rounded-lg shadow">
          <DataTable v-model:filters="filters2" :value="organisationTerminal" :metaKeySelection="metaKey2"
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
                No Resent Terminal found.
              </div>
            </template>
            <template #loading> Loading customers data. Please wait. </template>

            <Column v-for="col of terminalHeaders" :key="col.key" :field="col.key" :header="col.label"></Column>
            <Column header="actions">
                  
                  <template #body="">
                    <div class="flex">
              
                      <img src="../../assets/icon/Dropdown.svg" @click="toggle2"/>

                      <Menu ref="menu2" id="terminal_menu" :model="items2" :popup="true" ></Menu>
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
  gap: 25px;
  overflow-x: scroll;
  justify-content: space-between;
}

@media (max-width:1080px) {
  .content-card-section{
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
