<script lang="ts" setup>
import { computed, reactive, ref, onMounted } from 'vue';
import ContentHeader from '@/components/dashboardHeader/ContentHeader.vue';
import StoreUtils from "@/util/storeUtils.ts";
import AddUser from "@/components/modal/user/AddUser.vue";
import AddRole from "@/components/modal/user/AddRole.vue"
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag';
import { FilterMatchMode } from 'primevue/api';
import InputText from 'primevue/inputtext';
import { useWait } from 'maz-ui';
import MazSpinner from 'maz-ui/components/MazSpinner';
import BaseButton from "@/components/button/BaseButton.vue";
const wait = useWait()

const reactiveData = reactive({
  showUserModal: false,
  showRoleModal: false,
  visible: false,
  selectedRow: null
})

const user = computed(() => {
  return StoreUtils.getter()?.user.getUsers
})

const adminUser = computed(() => {
  return StoreUtils.getter()?.user.getAdminUsers
})



const headers = [
  { label: 'userEmail', key: 'userEmail' },
  { label: 'userFirstName', key: 'userFirstName' },
  { label: 'userLastName', key: 'userLastName' },
  // {label:'userMiddleName',key:'userMiddleName'},

  { label: 'userPhone', key: 'userPhone' }, { label: 'userCreatedAt', key: 'userCreatedAt' }]


const adminHeaders = [
  { label: 'adminEmail', key: 'adminEmail' },
  { label: 'adminFirstName', key: 'adminFirstName' },
  { label: 'adminLastName', key: 'adminLastName' },
  { label: 'adminPhone', key: 'adminPhoneNumber' }, { label: 'adminCreatedAt', key: 'adminCreatedAt' }]




function handleClose(payload: any) {
  reactiveData.showUserModal = payload;
  reactiveData.showRoleModal = payload
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
  adminFirstName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  // representative: { value: null, matchMode: FilterMatchMode.IN },
  adminLastName: { value: null, matchMode: FilterMatchMode.EQUALS },
});

// const toggle = (event) => {
//   menu.value.toggle(event);
// }



// const items = ref([
//   {
//     label: 'Options',
//     items: [
//       {
//         label: 'View',
//         icon: 'pi pi-refresh',
//         command: () => {
//           reactiveData.visible = !reactiveData.visible
//         }
//       },
//       // {
//       //     label: 'Edit',
//       //     icon: 'pi pi-upload',
//       //     command:() => {
//       //       reactiveData.showUpdateTerminal = !reactiveData.showUpdateTerminal
//       //     }
//       // },
//       // {
//       //     label: 'Delete',
//       //     icon: 'pi pi-upload',
//       //     command:() => {
//       //       askToUser()
//       //     }
//       // }
//     ]
//   }
// ]);


const metaKey = ref(true);

const metaKey2 = ref(true);


onMounted(async () => {
  wait.start('LOADING_USERS')
  await StoreUtils.getter()?.user.readUsers()
  await StoreUtils.getter()?.user.readAdminUsers(1)
  wait.stop('LOADING_USERS')
})


</script>

<template>
  <AddUser v-if="reactiveData.showUserModal" @close="handleClose" />
  <AddRole v-if="reactiveData.showRoleModal" @close="handleClose" />
  <ContentHeader />
  <div class="content-table-section">
    <div style="display: flex; align-items: center; justify-content: space-between;gap:20px;margin:25px 0">

      <div style="display: flex; align-items: center; justify-content: center;gap:20px">
        <p class="text-xl text-black">Admin User List</p>
        <img src="../../assets/icon/alert-circle.svg" alt="lslsls"/>


      </div>
      <div style="display: flex; align-items: center; justify-content: center;gap:20px;">
         <BaseButton  bg-color="transparent" bg-border="#D0D5DD" @click="reactiveData.showUserModal=true">
          <div style="display: flex;align-items: center;gap: 5px;">
              <img src="../../assets/icon/Folder Add 2.svg" alt="t"/>
              Add Admin User
          </div>
        </BaseButton>
      </div>
    </div>



    <div class="overflow-auto rounded-lg shadow">
      <DataTable :loading="wait.isLoading('LOADING_USERS')" v-model:filters="filters2" :value="adminUser" :metaKeySelection="metaKey2" selectionMode="single" paginator
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
            No Users found.
          </div>
        </template>

        <template #loading> <MazSpinner v-if="wait.isLoading('LOADING_USERS')" color="secondary"></MazSpinner> </template>

        <Column v-for="col of adminHeaders" :key="col.key" :field="col.key" :header="col.label"></Column>

      </DataTable>
    </div>

  </div>
  <div class="content-table-section">
      <div style="display: flex; align-items: center; justify-content: space-between;gap:20px;margin:25px 0">

        <div style="display: flex; align-items: center; justify-content: center;gap:20px">
          <p class="text-xl text-black">Merchant User List</p>
          <img src="../../assets/icon/alert-circle.svg" />


        </div>
        <div style="display: flex; align-items: center; justify-content: center;gap:20px;">
          <!-- <BaseButton  bg-color="transparent" bg-border="#D0D5DD">
            <div style="display: flex;align-items: center;gap: 5px;">
                <img src="../../assets/icon/Folder Add 2.svg" />
                Add Role
            </div>
          </BaseButton> -->
          <!-- <BaseButton @click="addUser">
            <div style="display: flex;align-items: center;gap: 5px;">
              <img src="../../assets/icon/Folder Add 2.svg" />
              Add User
            </div>

          </BaseButton> -->
        </div>
      </div>



      <div class="overflow-auto rounded-lg shadow">

        <DataTable :loading="wait.isLoading('LOADING_USERS')" v-model:filters="filters" :value="user" :metaKeySelection="metaKey" selectionMode="single" paginator
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
              No Users found.
            </div>
          </template>
          <template #loading> <MazSpinner v-if="wait.isLoading('LOADING_USERS')" color="secondary"></MazSpinner> </template>

          <Column field="userStatus" header="userStatus">
            <template #body="slotProps">

              <div v-if="slotProps.data.userStatus">
                <Tag :value="slotProps.data.userStatus" :severity="getSeverity(slotProps.data.userStatus)" />
              </div>

            </template>
          </Column>

          <Column v-for="col of headers" :key="col.key" :field="col.key" :header="col.label"></Column>

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