<script lang="ts" setup>
import { computed, reactive, ref, onMounted } from 'vue';
import ContentHeader from '@/components/dashboardHeader/ContentHeader.vue';
import StoreUtils from "@/util/storeUtils.ts";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag';
import { FilterMatchMode } from 'primevue/api';
import InputText from 'primevue/inputtext';
import {useToast, useWait} from 'maz-ui';
import MazSpinner from 'maz-ui/components/MazSpinner';
import BaseButton from "@/components/button/BaseButton.vue";
import Menu from "primevue/menu";
import CreateTerminalMapping from "@/components/modal/terminal/CreateTerminalMapping.vue";
import UpdateTerminalMapping from "@/components/modal/terminal/UpdateTerminalMapping.vue";
import Dialog from "primevue/dialog";
import CreateTerminalBulkMapping from "@/components/modal/terminal/CreateTerminalBulkMapping.vue";

const wait = useWait()
const menu2 = ref();
const toast = useToast()


const reactiveData = reactive({
  showUserModal: false,
  showTerminalMapping: false,
  showTerminalBulkMapping: false,
  showUpdateTerminalMapping: false,
  visible: false,
  selectedRow: null
})

const mappedTerminals = computed(() => {
  return StoreUtils.getter()?.terminal.getTerminalMapping
})



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
          reactiveData.showUpdateTerminalMapping = true
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

const toggle2 = (event: any) => {
  menu2.value.toggle(event);
}

const mappedTerminalHeaders = [
  { label: 'terminalMappingCreatedAt', key: 'terminalMappingCreatedAt' },
  { label: 'terminalMappingId', key: 'terminalMappingId' },
  { label: 'terminalMappingInterchangeId', key: 'terminalMappingInterchangeId' },
  { label: 'terminalMappingInterchangeTerminalId', key: 'terminalMappingInterchangeTerminalId' },
  { label: 'terminalMappingTerminalId', key: 'terminalMappingTerminalId' },
]

function handleClose(payload: any) {
  reactiveData.showUserModal = payload;
  reactiveData.showTerminalMapping = payload
  reactiveData.showTerminalBulkMapping = payload
  reactiveData.showUpdateTerminalMapping = payload
}

// function addUser() {
//   reactiveData.showUserModal = !reactiveData.showUserModal
//
// }


const onRowSelect = (event: any) => {
  reactiveData.selectedRow = event.data
  console.log(event)
}


// const menu = ref()

const getSeverity = (status: string) => {
  switch (status) {
    case 'DECLINED':
      return 'danger';

    case 'ACTIVE':
      return 'sucess';

    case 'PENDING':
      return 'warning';
  }
};

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  userFirstName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  // representative: { value: null, matchMode: FilterMatchMode.IN },
  userLastName: { value: null, matchMode: FilterMatchMode.EQUALS },
});

const filters2 = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  terminalMappingInterchangeTerminalId: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  // representative: { value: null, matchMode: FilterMatchMode.IN },
  terminalMappingTerminalId: { value: null, matchMode: FilterMatchMode.EQUALS },
});


const metaKey2 = ref(true);


onMounted(async () => {
  wait.start('LOADING_TERMINAL')
  await StoreUtils.getter()?.terminal.readTerminalMapping()
  await StoreUtils.getter().charges.readInterChange(toast)
  await StoreUtils.getter().terminal.getOrganisationTerminal()


  wait.stop('LOADING_TERMINAL')
})


</script>

<template>
  <Dialog header="Terminal Mapping Overview" v-model:visible="reactiveData.visible" modal :style="{ width: '50rem' }"
          :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <div v-for="(i, key, index) in reactiveData.selectedRow" :key="index" class="flex justify-between">
      <p class="text-lg leading-relaxed text-gray-800 mb-4">{{ key }}:</p>
      <p class="text-lg leading-relaxed text-gray-800 mb-4">{{ i }}</p>
    </div>
  </Dialog>
  <CreateTerminalMapping v-if="reactiveData.showTerminalMapping"  @close="handleClose"/>
  <CreateTerminalBulkMapping v-if="reactiveData.showTerminalBulkMapping"  @close="handleClose"/>
  <UpdateTerminalMapping :data="reactiveData.selectedRow" v-if="reactiveData.showUpdateTerminalMapping"  @close="handleClose"/>
  <ContentHeader />
  <div class="content-table-section">
    <div style="display: flex; align-items: center; justify-content: space-between;gap:20px;margin:25px 0">

      <div style="display: flex; align-items: center; justify-content: center;gap:20px">
        <p class="text-xl text-black">Mapped Terminals</p>
        <img src="../../assets/icon/alert-circle.svg" alt="lslsls"/>


      </div>
      <div style="display: flex; align-items: center; justify-content: center;gap:20px;">
        <BaseButton  bg-color="transparent" bg-border="#D0D5DD" style="width:16rem" @click="reactiveData.showTerminalMapping=true">
          <div style="display: flex;align-items: center;gap: 5px;">
            <img src="../../assets/icon/Folder Add 2.svg" alt="t"/>
            Create Mapping
          </div>
        </BaseButton>
        <BaseButton  bg-color="transparent" bg-border="#D0D5DD" style="width:16rem" @click="reactiveData.showTerminalBulkMapping=true">
          <div style="display: flex;align-items: center;gap: 5px;">
            <img src="../../assets/icon/Folder Add 2.svg" alt="t"/>
            Bulk Mapping
          </div>
        </BaseButton>
      </div>
    </div>



    <div class="overflow-auto rounded-lg shadow">
      <DataTable :loading="wait.isLoading('LOADING_TERMINAL')" v-model:filters="filters2" :value="mappedTerminals" :metaKeySelection="metaKey2" selectionMode="single" paginator
                 :rows="10" :rowsPerPageOptions="[5, 10, 20, 50]" stripedRows tableStyle="min-width: 50rem"
                 paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                 currentPageReportTemplate="{first} to {last} of {totalRecords}" dataKey="id" filterDisplay="row"
                 :globalFilterFields="['adminFirstName', 'adminEmail', 'adminLastName']" @rowSelect="onRowSelect">

        <template #header>
          <div class="flex justify-end">
              <span class="relative">
                <i class="pi pi-search absolute top-2/4 -mt-2 left-3 text-surface-400 dark:text-surface-600" />
                <InputText v-model="filters2['global'].value" placeholder="Keyword Search"
                           class="pl-10 font-normal terminal_search" />
              </span>
          </div>
        </template>

        <template #empty>
          <div class="text-center">
            No Terminal Mapping found.
          </div>
        </template>

        <template #loading> <MazSpinner v-if="wait.isLoading('LOADING_USERS')" color="secondary"></MazSpinner> </template>

        <Column v-for="col of mappedTerminalHeaders" :key="col.key" :field="col.key" :header="col.label"></Column>

        <Column field="terminalMappingStatus" header="Status">
          <template #body="slotProps">

            <div v-if="slotProps.data.terminalMappingStatus">
              <Tag :value="slotProps.data.terminalMappingStatus" :severity="getSeverity(slotProps.data.terminalMappingStatus)" />
            </div>

          </template>
        </Column>

        <Column header="actions">

          <template #body="">
            <div class="flex">

              <img src="../../assets/icon/Dropdown.svg" @click="toggle2" />

              <Menu ref="menu2" id="overlay_menu2" :model="items" :popup="true" />
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