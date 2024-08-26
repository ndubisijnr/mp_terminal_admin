<script lang="ts" setup>
import { ref, reactive } from 'vue';
import ContentHeader from '@/components/dashboardHeader/ContentHeader.vue';
import DataTable from "primevue/datatable";
import InputText from "primevue/inputtext";
import Column from "primevue/column";
import {FilterMatchMode} from "primevue/api";
import BaseButton from "@/components/button/BaseButton.vue";
import AddInterChange from "@/components/modal/interchangandrouting/AddInterChange.vue";

const reactiveData=reactive({
   showAddInterChange:false,
})
const tabs = [
  { label: 'Profile', disabled: false },
  { label: 'Interchange/Routing', disabled: false },
]
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  userFirstName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  // representative: { value: null, matchMode: FilterMatchMode.IN },
  userLastName: { value: null, matchMode: FilterMatchMode.EQUALS },
});

const activeTab = ref('Interchange/Routing')

const interchange = ref([
  {
    "interchangeId": 100,
    "interchangeName": "Coralpay",
    "interchangeDescription": "Interchange for Coralpay Postbridge",
    "interchangeType": "Postbridge",
    "interchangePinTranslationRequired": "YES",
    "interchangeEncryptedInterchangeKey": "MGNkODE4NGQyMThiNDIyNTpzK0VKaUNpd21pbGlyR09jYUZ4Y1BtNDR4Z29hVnhZSDZJcXk4ek4xeDFOYnZuVWt4N2d4VEQrZVdmWU8zc2ZB",
    "interchangeEncryptedSinkZpk": "YjhiNGI3OWJlNTllNGFkMTpEeVdMRC93dUY5Y0xUcGlOTHJRR0FKNUZGMzVXWmFPRzBvR3hjbVZIWXRYSFVUbnVibnpPVWxsSi9uNUNUN2Rj",
    "interchangeSinkHost": "172.24.2.80",
    "interchangeSinkPort": "35555",
    "interchangeMcc": "6013",
    "interchangeTransferDestinationAccount": "0123456789",
    "interchangePayee": "Providus",
    "interchangeReceivingInstitutionId": "666101",
    "interchangeExtendedTransactionType": "6008",
    "interchangeForwardingInstitutionId": "12345678",
    "interchangeStatus": "ACTIVE",
    "interchangeCreatedAt": "2024-06-18 22:25:18.230",
    "interchangeUpdatedAt": "2024-08-25 17:25:01.200"
  },
  {
    "interchangeId": 100,
    "interchangeName": "Interswitch",
    "interchangeDescription": "Interchange for Interswitch Postbridge",
    "interchangeType": "Postbridge",
    "interchangePinTranslationRequired": "YES",
    "interchangeEncryptedInterchangeKey": "MGNkODE4NGQyMThiNDIyNTpzK0VKaUNpd21pbGlyR09jYUZ4Y1BtNDR4Z29hVnhZSDZJcXk4ek4xeDFOYnZuVWt4N2d4VEQrZVdmWU8zc2ZB",
    "interchangeEncryptedSinkZpk": "YjhiNGI3OWJlNTllNGFkMTpEeVdMRC93dUY5Y0xUcGlOTHJRR0FKNUZGMzVXWmFPRzBvR3hjbVZIWXRYSFVUbnVibnpPVWxsSi9uNUNUN2Rj",
    "interchangeSinkHost": "172.24.2.80",
    "interchangeSinkPort": "35555",
    "interchangeMcc": "6013",
    "interchangeTransferDestinationAccount": "0123456789",
    "interchangePayee": "Providus",
    "interchangeReceivingInstitutionId": "666101",
    "interchangeExtendedTransactionType": "6008",
    "interchangeForwardingInstitutionId": "12345678",
    "interchangeStatus": "ACTIVE",
    "interchangeCreatedAt": "2024-06-18 22:25:18.230",
    "interchangeUpdatedAt": "2024-08-25 17:25:01.200"
  },
  {
    "interchangeId": 100,
    "interchangeName": "NIBSS Test",
    "interchangeDescription": "Interchange for NIBSS Postbridge",
    "interchangeType": "Postbridge",
    "interchangePinTranslationRequired": "YES",
    "interchangeEncryptedInterchangeKey": "MGNkODE4NGQyMThiNDIyNTpzK0VKaUNpd21pbGlyR09jYUZ4Y1BtNDR4Z29hVnhZSDZJcXk4ek4xeDFOYnZuVWt4N2d4VEQrZVdmWU8zc2ZB",
    "interchangeEncryptedSinkZpk": "YjhiNGI3OWJlNTllNGFkMTpEeVdMRC93dUY5Y0xUcGlOTHJRR0FKNUZGMzVXWmFPRzBvR3hjbVZIWXRYSFVUbnVibnpPVWxsSi9uNUNUN2Rj",
    "interchangeSinkHost": "172.24.2.80",
    "interchangeSinkPort": "35555",
    "interchangeMcc": "6013",
    "interchangeTransferDestinationAccount": "0123456789",
    "interchangePayee": "Providus",
    "interchangeReceivingInstitutionId": "666101",
    "interchangeExtendedTransactionType": "6008",
    "interchangeForwardingInstitutionId": "12345678",
    "interchangeStatus": "ACTIVE",
    "interchangeCreatedAt": "2024-06-18 22:25:18.230",
    "interchangeUpdatedAt": "2024-08-25 17:25:01.200"
  },
  {
    "interchangeId": 100,
    "interchangeName": "UP",
    "interchangeDescription": "Interchange for UP Postbridge",
    "interchangeType": "Postbridge",
    "interchangePinTranslationRequired": "YES",
    "interchangeEncryptedInterchangeKey": "MGNkODE4NGQyMThiNDIyNTpzK0VKaUNpd21pbGlyR09jYUZ4Y1BtNDR4Z29hVnhZSDZJcXk4ek4xeDFOYnZuVWt4N2d4VEQrZVdmWU8zc2ZB",
    "interchangeEncryptedSinkZpk": "YjhiNGI3OWJlNTllNGFkMTpEeVdMRC93dUY5Y0xUcGlOTHJRR0FKNUZGMzVXWmFPRzBvR3hjbVZIWXRYSFVUbnVibnpPVWxsSi9uNUNUN2Rj",
    "interchangeSinkHost": "172.24.2.80",
    "interchangeSinkPort": "35555",
    "interchangeMcc": "6013",
    "interchangeTransferDestinationAccount": "0123456789",
    "interchangePayee": "Providus",
    "interchangeReceivingInstitutionId": "666101",
    "interchangeExtendedTransactionType": "6008",
    "interchangeForwardingInstitutionId": "12345678",
    "interchangeStatus": "ACTIVE",
    "interchangeCreatedAt": "2024-06-18 22:25:18.230",
    "interchangeUpdatedAt": "2024-08-25 17:25:01.200"
  }
])

const interchangeheader = [
  // {label:"interchangeId", key: "interchangeId"},
  // {label:"interchangeName",key: "interchangeName"},
    {label:"interchangeName",key: "interchangeName"},
    {label:"interchangeType",key: "interchangeType"},
    {label:"interchangePinTranslationRequired",key: "interchangePinTranslationRequired"},
    // {label:"interchangeEncryptedInterchangeKey",key: "interchangeEncryptedInterchangeKey"},
    // {label:"interchangeEncryptedSinkZpk",key: "interchangeEncryptedSinkZpk"},
    {label:"interchangeSinkHost",key: "interchangeSinkHost"},
    {label:"interchangeSinkPort",key: "interchangeSinkPort"},
    // {label:"interchangeMcc",key: "interchangeMcc"},
    // {label:"interchangeTransferDestinationAccount",key: "interchangeTransferDestinationAccount"},
    {label:"interchangePayee",key: "interchangePayee"},
    // {label:"interchangeReceivingInstitutionId",key: "interchangeReceivingInstitutionId"},
    // {label:"interchangeExtendedTransactionType",key: "interchangeExtendedTransactionType"},
    // {label:"interchangeForwardingInstitutionId",key: "interchangeForwardingInstitutionId"},
    {label:"interchangeStatus",key: "interchangeStatus"},
    {label:"interchangeCreatedAt",key: "interchangeCreatedAt"},
    // {label:"interchangeUpdatedAt",key: "interchangeUpdatedAt"}
]

const metaKey = ref()

const route = ref([
  {
    "routeId": 100,
    "routeAmount": "200.00",
    "routeInterchangeId": 100,
    "routeStatus": "ACTIVE",
    "routeCreatedAt": "2024-06-18 22:25:18.230",
    "routeUpdatedAt": "2024-08-25 17:25:01.200"
  },
  {
    "routeId": 101,
    "routeAmount": "200.00",
    "routeInterchangeId": 101,
    "routeStatus": "ACTIVE",
    "routeCreatedAt": "2024-06-18 22:25:18.230",
    "routeUpdatedAt": "2024-08-25 17:25:01.200"
  },
  {
    "routeId": 100,
    "routeAmount": "200.00",
    "routeInterchangeId": 101,
    "routeStatus": "ACTIVE",
    "routeCreatedAt": "2024-06-18 22:25:18.230",
    "routeUpdatedAt": "2024-08-25 17:25:01.200"
  }
])

function onRowSelect(){}
function handleClose(payload: any) {
  reactiveData.showAddInterChange = payload;
}
</script>

<template>


  
    <ContentHeader />
  <AddInterChange v-if="reactiveData.showAddInterChange" @close="handleClose(false)" />

  <div class="w-full container content-table-section">
    <div class="shadow-sm flex h-16 items-center justify-center p-10 gap-5 cursor-pointer">
      <p v-for="i in tabs" class="text-md p-3 rounded-md text-bold" :class="{'bg-gray-300':activeTab===i.label}" @click="activeTab = i.label">{{ i.label }}</p>
    </div>

    <div v-if="activeTab === 'Interchange/Routing'">

      <div class="content-table-section p-5">
          <div style="display: flex; align-items: center; justify-content: space-between;gap:20px;margin:25px 0">

            <div style="display: flex; align-items: center; justify-content: center;gap:20px">
              <p class="text-xl text-black">InterChange List</p>
              <img src="../../assets/icon/alert-circle.svg" alt="lslsls"/>


            </div>
            <div style="display: flex; align-items: center; justify-content: center;gap:20px;">
              <BaseButton  bg-color="transparent" bg-border="#D0D5DD" @click="reactiveData.showAddInterChange=true">
                <div style="display: flex;align-items: center;gap: 5px;">
                  <img src="../../assets/icon/Folder Add 2.svg" alt="t"/>
                  Add InterChange
                </div>
              </BaseButton>
            </div>
          </div>

          <div>
            <div class="overflow-scroll rounded-lg shadow">

              <DataTable  v-model:filters="filters" :value="interchange" :metaKeySelection="metaKey" selectionMode="single" paginator
                          :rows="10" :rowsPerPageOptions="[5, 10, 20, 50]" stripedRows tableStyle="min-width: 50rem"
                          paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                          currentPageReportTemplate="{first} to {last} of {totalRecords}" dataKey="id" filterDisplay="row"
                          :globalFilterFields="['userFirstName', 'userEmail', 'userLastName']" @rowSelect="onRowSelect">

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
                    No InterChange found.
                  </div>
                </template>


                <Column v-for="col of interchangeheader" :key="col.key" :field="col.key" :header="col.label"></Column>

              </DataTable>
            </div>

          </div>
        </div>

      <div class="content-table-section p-5">
          <div style="display: flex; align-items: center; justify-content: space-between;gap:20px;margin:25px 0">

            <div style="display: flex; align-items: center; justify-content: center;gap:20px">
              <p class="text-xl text-black">Routing List</p>
              <img src="../../assets/icon/alert-circle.svg" alt="lslsls"/>


            </div>
            <div style="display: flex; align-items: center; justify-content: center;gap:20px;">
              <BaseButton  bg-color="transparent" bg-border="#D0D5DD" @click="reactiveData.showAddInterChange=true">
                <div style="display: flex;align-items: center;gap: 5px;">
                  <img src="../../assets/icon/Folder Add 2.svg" alt="t"/>
                  Add Routing
                </div>
              </BaseButton>
            </div>
          </div>

          <div>
            <div class="overflow-scroll rounded-lg shadow">

              <DataTable  v-model:filters="filters" :value="interchange" :metaKeySelection="metaKey" selectionMode="single" paginator
                          :rows="10" :rowsPerPageOptions="[5, 10, 20, 50]" stripedRows tableStyle="min-width: 50rem"
                          paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                          currentPageReportTemplate="{first} to {last} of {totalRecords}" dataKey="id" filterDisplay="row"
                          :globalFilterFields="['userFirstName', 'userEmail', 'userLastName']" @rowSelect="onRowSelect">

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
                    No InterChange found.
                  </div>
                </template>


                <Column v-for="col of interchangeheader" :key="col.key" :field="col.key" :header="col.label"></Column>

              </DataTable>
            </div>

          </div>
        </div>

    </div>

    <div v-else class="flex w-full justify-center">
      <div class="w-full flex items-center flex-col">
        <img alt="settings" src="../../assets/image/undraw_launch_day_4e04.png" class="mt-16 w-3/12" />
        <p class="text-2xl text-muted text-center py-5">COMING SOON.</p>
      </div>
    </div>


  </div>


</template>

<style scoped>

</style>