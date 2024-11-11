<script lang="ts" setup>
import {ref, reactive, onMounted, computed} from 'vue';
import ContentHeader from '@/components/dashboardHeader/ContentHeader.vue';
import DataTable from "primevue/datatable";
import InputText from "primevue/inputtext";
import Column from "primevue/column";
import {FilterMatchMode} from "primevue/api";
import BaseButton from "@/components/button/BaseButton.vue";
import AddInterChange from "@/components/modal/interchangandrouting/AddInterChange.vue";
import AddRouting from "@/components/modal/interchangandrouting/AddRouting.vue";
import Menu from "primevue/menu";
import Dialog from "primevue/dialog";
import StoreUtils from "@/util/storeUtils.ts";
import {useToast, useWait} from "maz-ui";
import EditRouting from "@/components/modal/interchangandrouting/EditRouting.vue";
import Tag from "primevue/tag";
import EditInterChangeComponent from "@/components/modal/interchangandrouting/EditInterChangeComponent.vue";
import EditInterChange from "@/components/modal/interchangandrouting/EditInterChange.vue";
import Dropdown from "primevue/dropdown";
// import getResponse from "@/util/helper/globalResponse.ts";
// import MazPicker from "maz-ui/components/MazPicker";
// import MazSpinner from "maz-ui/components/MazSpinner";


const reactiveData=reactive({
   showAddInterChange:false,
   visible:false,
   testIsVisible:false,
   showUpdateInterchange:false,
   selectedRow:null as any,
   showAddRouting:false,
   showEditRouting:false,
   showEditInterChangeComponent:false,
   showEditInterChange:false,
})

const toast = useToast()

const wait = useWait()

const tabs = [
  { label: 'Profile', disabled: false },
  { label: 'Interchange/Routing', disabled: false },
]

const testTypeOptions = computed(() => {
  return StoreUtils.getter().charges.getTestDataType
})

const testData = computed(() => {
  return StoreUtils.getter().charges.getTestDataResult
})

const testRequest = computed(() => {
  return StoreUtils.getter().charges.getTestRequest
})

const testResponse = computed(() => {
  return StoreUtils.getter().charges.getTestResponse
})

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
          reactiveData.showEditInterChange = !reactiveData.showEditInterChange
        }
      },
      {
        label: 'Update Component',
        icon: 'pi pi-upload',
        command:() => {
          reactiveData.showEditInterChangeComponent = !reactiveData.showEditInterChangeComponent
        }
      },
      {
        label: 'Test',
        icon: 'pi pi-upload',
        command:() => {
          reactiveData.testIsVisible = !reactiveData.testIsVisible
        }
      },
      {
        label: 'Delete',
        icon: 'pi pi-upload',
        command:() => {
          // reactiveData.showUpdateInterchange = !reactiveData.showUpdateInterchange
        }
      },
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
        command:( ) => {
          reactiveData.visible = !reactiveData.visible
        }
      },
      {
        label: 'Edit',
        icon: 'pi pi-upload',
        command:() => {
          reactiveData.showEditRouting = !reactiveData.showEditRouting
        }
      },
      {
        label: 'Delete',
        icon: 'pi pi-upload',
        command:() => {
          // reactiveData.showEditRouting = !reactiveData.showEditRouting
        }
      },
    ]
  }
]);

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

const menu = ref()

const menu2 = ref()

const toggle = (event:any) => {
  menu.value.toggle(event);
}

const toggle2 = (event:any) => {
  menu2.value.toggle(event);
}

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  userFirstName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  // representative: { value: null, matchMode: FilterMatchMode.IN },
  userLastName: { value: null, matchMode: FilterMatchMode.EQUALS },
});

const activeTab = ref('Interchange/Routing')

const interchangeheader = [
  {label:"interchangeConfigId", key: "interchangeConfigId"},
    {label:"interchangeName",key: "interchangeConfigName"},
    {label:"interchangeDescription",key: "interchangeConfigDescription"},
    {label:"interchangeType",key: "interchangeConfigType"},
    // {label:"interchangePTR",key: "interchangeConfigPinTranslationRequired"},
    // {label:"interchangeEncryptedInterchangeKey",key: "interchangeEncryptedInterchangeKey"},
    // {label:"interchangeEncryptedSinkZpk",key: "interchangeEncryptedSinkZpk"},
    // {label:"interchangeSinkHost",key: "interchangeSinkHost"},
    {label:"interchangeSinkPort",key: "interchangeConfigSinkHost"},
    // {label:"interchangeMcc",key: "interchangeMcc"},
    // {label:"interchangeTransferDestinationAccount",key: "interchangeTransferDestinationAccount"},
    {label:"interchangePayee",key: "interchangeConfigPayee"},
    // {label:"interchangeReceivingInstitutionId",key: "interchangeReceivingInstitutionId"},
    // {label:"interchangeExtendedTransactionType",key: "interchangeExtendedTransactionType"},
    // {label:"interchangeForwardingInstitutionId",key: "interchangeForwardingInstitutionId"},
    // {label:"interchangeStatus",key: "interchangeConfigStatus"},
    {label:"interchangeCreatedAt",key: "interchangeConfigCreatedAt"},
    // {label:"interchangeUpdatedAt",key: "interchangeUpdatedAt"}
]

const metaKey = ref()


const interChangeResponse = computed(() => {
  return StoreUtils.getter().charges.getInterChanges
})

const routingRuleResponse = computed(() => {
  return StoreUtils.getter().charges.getRouting
})

const routeHeader = [
  {key:"routingRuleId", label: "routeId"},
  {key:"routingRuleMaxAmount", label: "routeAmount"},
  {key:"routingRuleCardBrand", label: "routingRuleCardBrand"},
  {key:"routingRuleInterchangeId", label: "routeInterchangeId"},
  {key:"routingRuleStatus", label: "routeStatus"},
  {key:"routingRuleCreatedAt", label: "routeCreatedAt"}]
  // {key:"routeUpdatedAt", label: "routeUpdatedAt"}]

const callReadInterChange = () => {
  StoreUtils.getter().charges.readInterChange(toast)
}

const callReadRoutingRule = () => {
  StoreUtils.getter().charges.readRoutingRule(toast)
}



const onRowSelect = (event:any) => {
  reactiveData.selectedRow = event.data
  console.log(event.data)
}

function handleClose(payload: any) {
  reactiveData.showAddInterChange = payload;
  reactiveData.showAddRouting = payload;
  reactiveData.showEditRouting = payload;
  reactiveData.showEditInterChangeComponent = payload;
  reactiveData.showEditInterChange = payload;
}

const testDataRequest = ref({
  input: null as null,
  interchangeConfigId: null as null,
  testType: null as null
})


const callTest = async () => {
  wait.start("TESTING_INTERCHANGE")
  testDataRequest.value.interchangeConfigId = reactiveData?.selectedRow.interchangeConfigId;
  await StoreUtils.getter().charges.testInterChange(testDataRequest.value, toast)
  wait.stop("TESTING_INTERCHANGE")

}




onMounted(() => {
  callReadInterChange()
  callReadRoutingRule()
  StoreUtils.getter().charges.readInterChangeTestDataType(toast)
  StoreUtils.getter().charges.readInterChangeTestData(toast)
  StoreUtils.getter().charges.readInterChangePackagers()
})


</script>

<template>

  <ContentHeader />
  <Dialog v-model:visible="reactiveData.visible" modal :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <div v-for="(i, key, index) in reactiveData.selectedRow" :key="index" class="flex justify-between">
      <p class="text-lg leading-relaxed text-gray-800 mb-4">{{ key }}:</p>
      <p class="text-lg leading-relaxed text-gray-800 mb-4">{{ i }}</p>
    </div>
  </Dialog>

  <Dialog v-model:visible="reactiveData.testIsVisible" maximizable modal :header="reactiveData?.selectedRow?.interchangeConfigName" :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <div class="m-0 relative">
      <div>
        <label class="bold pr-4">Test Type</label>
        <Dropdown class="select_div" filter
                  :optionLabel="'key'"
                  :optionValue="'value'"
                  v-model="testDataRequest.testType"
                  :options="testTypeOptions"
                  placeholder="Test Type">
        </Dropdown>

        <div class="mb-5 mt-5">
          <span class="text-lg">Input(optional)</span><br />
          <textarea class="custom_test_area" v-model="testDataRequest.input"></textarea>
        </div>


        <base-button @click="callTest" style="width:30%" :disabled="wait.isLoading('TESTING_INTERCHANGE')" :loading="wait.isLoading('TESTING_INTERCHANGE')">Execute</base-button>

      </div>

      <div class="flex  flex-col md:flex-row justify-between mt-5 flex-wrap gap-5">
        <div class="flex flex-col gap-5 w-full">
          <div class="w-full">
            <div class="flex  flex-col gap-5 w-full md:w-1/2">
              <span class="text-lg font-bold">Request</span>
              <div class="w-full bg-gray-100 p-4 rounded-md shadow-md">
                <code class="block whitespace-pre-wrap bg-gray-900 text-white p-2 rounded-md mt-2">
                  {{testRequest}}
                </code>
              </div>
            </div>
          </div>
          <div class="w-full">
<!--            <span class="text-lg font-bold"></span> <br />-->
            <div class="flex flex-col gap-5 w-full md:w-1/2">
              <span class="text-lg font-bold">Response</span>
              <div class="w-full bg-gray-100 p-4 rounded-md shadow-md">
                <code class="block whitespace-pre-wrap bg-gray-900 text-white p-2 rounded-md mt-2">
                  {{testResponse}}
                </code>
              </div>
            </div>
          </div>
        </div>

        <div class="flex lg:absolute md:absolute top-0 right-0 lg:pl-5 md:pl-5 flex-col gap-5 w-full md:w-1/2">
          <span class="text-lg font-bold">Test Data</span>
          <div class="w-full bg-gray-100 p-4 rounded-md shadow-md" v-for="(i, index) in testData" :key="index">
            <span class="text-lg">{{ i.key }}</span>
            <code class="block whitespace-pre-wrap bg-gray-900 text-white p-2 rounded-md mt-2">
              {{i.value}}
            </code>
          </div>
        </div>
      </div>
    </div>
  </Dialog>

  <AddInterChange v-if="reactiveData.showAddInterChange" @close="handleClose(false)" />

  <AddRouting v-if="reactiveData.showAddRouting" @close="handleClose(false)" />

  <EditRouting v-if="reactiveData.showEditRouting" :data="reactiveData.selectedRow" @close="handleClose(false)" />

  <EditInterChange v-if="reactiveData.showEditInterChange" :data="reactiveData.selectedRow" @close="handleClose(false)"></EditInterChange>

  <EditInterChangeComponent v-if="reactiveData.showEditInterChangeComponent" :data="reactiveData.selectedRow" @close="handleClose(false)"></EditInterChangeComponent>

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

              <DataTable  v-model:filters="filters" :value="interChangeResponse" :metaKeySelection="metaKey" selectionMode="single" paginator
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
                <Column field="interchangeConfigStatus" header="interchangeStatus">
                  <template #body="slotProps">

                    <div v-if="slotProps.data.interchangeConfigStatus">
                      <Tag :value="slotProps.data.interchangeConfigStatus" :severity="getSeverity(slotProps.data.interchangeConfigStatus)" />
                    </div>

                  </template>
                </Column>

                <!--                 <Column field="sinkHost" header="sinkHost">-->
<!--                 <template #body="slotProps">-->
<!--                   <p>{{slotProps.data.interchangeConfigSpecificData.sinkHost}}</p>-->
<!--&lt;!&ndash;                  <Tag :value="slotProps.data.organisationStatus" :severity="getSeverity(slotProps.data.organisationStatus)" />&ndash;&gt;-->

<!--                  </template>-->
<!--            </Column>-->
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
        </div>

      <div class="content-table-section p-5">
          <div style="display: flex; align-items: center; justify-content: space-between;gap:20px;margin:25px 0">

            <div style="display: flex; align-items: center; justify-content: center;gap:20px">
              <p class="text-xl text-black">Routing List</p>
              <img src="../../assets/icon/alert-circle.svg" alt="lslsls"/>


            </div>
            <div style="display: flex; align-items: center; justify-content: center;gap:20px;">
              <BaseButton  bg-color="transparent" bg-border="#D0D5DD" @click="reactiveData.showAddRouting=true">
                <div style="display: flex;align-items: center;gap: 5px;">
                  <img src="../../assets/icon/Folder Add 2.svg" alt="t"/>
                  Add Routing
                </div>
              </BaseButton>
            </div>
          </div>

          <div>
            <div class="overflow-scroll rounded-lg shadow">

              <DataTable  v-model:filters="filters" :value="routingRuleResponse" :metaKeySelection="metaKey" selectionMode="single" paginator
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
                    No Routing found.
                  </div>
                </template>


                <Column v-for="col of routeHeader" :key="col.key" :field="col.key" :header="col.label"></Column>

                <Column header="actions">

                  <template #body="">
                    <div class="flex">

                      <img src="../../assets/icon/Dropdown.svg" @click="toggle2"/>

                      <Menu ref="menu2" id="overlay_menu2" :model="items2" :popup="true" />
                    </div>
                  </template>
                </Column>


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
.custom_test_area{
  width: 50%;
  height: 80px;
  margin: 0 auto;
  border:solid grey 1px;
  border-radius: 5px;
  outline:none;
}
</style>