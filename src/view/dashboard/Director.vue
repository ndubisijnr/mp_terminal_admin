<script setup lang="ts">
import DataTable from "primevue/datatable";
import Tag from "primevue/tag";
import MazSpinner from "maz-ui/components/MazSpinner";
import Column from "primevue/column";
import Menu from "primevue/menu";
import BaseButton from "@/components/button/BaseButton.vue";
import InputText from "primevue/inputtext";
import {computed, onMounted, reactive, ref} from "vue";
import {useWait} from "maz-ui";
import StoreUtils from "@/util/storeUtils.ts";
import Dialog from "primevue/dialog";
import {FilterMatchMode} from "primevue/api";
import ContentHeader from "@/components/dashboardHeader/ContentHeader.vue";
import AddDirector from "@/components/modal/Director/AddDirector.vue";
const reactiveData = reactive({
  visible: false,
  selectedRow: {} as any,
  showDirectorModal:false
})

function handleClose(){
  reactiveData.showDirectorModal = false
}


const wait = useWait()
const metaKey = ref()
const filters2 = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  // representative: { value: null, matchMode: FilterMatchMode.IN },
  // terminalSerialNumber: { value: null, matchMode: FilterMatchMode.EQUALS },
})

const onRowSelect = (event: any) => {
  reactiveData.selectedRow = event.data
  console.log(event)
}

const allDirectors = computed(() => {
  return StoreUtils.getter()?.director?.getDirectors()
})

onMounted(async () => {
  wait.start("LOADING_DIRECTORS")
  await StoreUtils.getter().director.readDirectors()
  wait.stop("LOADING_DIRECTORS")

})
</script>

<template>
  <ContentHeader></ContentHeader>
  <AddDirector v-if="reactiveData.showDirectorModal" @close="handleClose"></AddDirector>
  <Dialog header="Director Overview" v-model:visible="reactiveData.visible" modal :style="{ width: '50rem' }"
          :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <div v-for="(i, key, index) in reactiveData.selectedRow" :key="index" class="flex justify-between">
      <p class="text-lg leading-relaxed text-gray-800 mb-4">{{ key }}:</p>
      <p class="text-lg leading-relaxed text-gray-800 mb-4">{{ i }}</p>
    </div>
  </Dialog>
  <div class="content-table-section">

    <div style="display: flex; align-items: center; justify-content: space-between;gap:20px;margin:10px 0">
      <div style="display: flex; align-items: center; justify-content: center;gap:20px">
        <p class="text-xl text-black"> Directors List</p>
        <img src="../../assets/icon/alert-circle.svg" />
      </div>
      <div style="display: flex; align-items: center; justify-content: center;gap:20px;">
        <BaseButton style="width:18rem" @click="reactiveData.showDirectorModal = true">
          <div style="display: flex;align-items: center;gap: 5px;">
            <img src="../../assets/icon/Folder Add 2.svg" alt="" />
           Add Director
          </div>

        </BaseButton>
      </div>
    </div>

    <div class="overflow-auto rounded-lg shadow">


      <DataTable :loading="wait.isLoading('LOADING_DIRECTORS')" v-model:filters="filters2"
                 :value="allDirectors" :metaKeySelection="metaKey" selectionMode="single" paginator :rows="10"
                 :rowsPerPageOptions="[5, 10, 20, 50]" stripedRows tableStyle="min-width: 50rem"
                 paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                 currentPageReportTemplate="{first} to {last} of {totalRecords}" dataKey="id" filterDisplay="row"
                 :globalFilterFields="['terminalStatus', 'terminalSerialNumber']" @rowSelect="onRowSelect">

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
            No Director found.
          </div>
        </template>
        <template #loading>
          <MazSpinner v-if="wait.isLoading('LOADING_TERMINALS')" color="secondary" />
        </template>

<!--        <Column v-for="col of terminalSerialsHeaders" :key="col.key" :field="col.key" :header="col.label"></Column>-->
<!--        &lt;!&ndash; terminal status&ndash;&gt;-->
<!--        <Column field="terminalStatus" header="terminalSerialStatus">-->
<!--          <template #body="slotProps">-->

<!--            <div v-if="slotProps.data.terminalSerialStatus">-->
<!--              <Tag :value="slotProps.data.terminalSerialStatus"-->
<!--                   :severity="getSeverity(slotProps.data.terminalSerialStatus)" />-->
<!--            </div>-->

<!--          </template>-->
<!--        </Column>-->
<!--        <Column header="actions">-->

<!--          <template #body="">-->
<!--            <div class="flex">-->

<!--              <img src="../../assets/icon/Dropdown.svg" @click="toggle2" />-->

<!--              <Menu ref="menu2" id="overlay_menu2" :model="items2" :popup="true" />-->
<!--            </div>-->
<!--          </template>-->
<!--        </Column>-->


      </DataTable>

    </div>

  </div>

</template>

<style scoped>
.content-table-section {
  padding: 2rem;
}
</style>