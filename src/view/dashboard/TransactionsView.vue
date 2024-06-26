<script setup lang="ts">
import BaseCard from "../../components/cards/BaseCard.vue";
import BaseTable from "@/components/table/BaseTable.vue";
import {Motion} from "motion/vue";
import { onMounted, computed, ref } from "vue";
import { useToast, useWait} from 'maz-ui'
import StoreUtils from "@/util/storeUtils";
import MazFullscreenLoader from 'maz-ui/components/MazFullscreenLoader'
import ContentHeader from "@/components/dashboardHeader/ContentHeader.vue";


const toast = useToast()

const wait = useWait()

const user = StoreUtils.getter()?.auth.user

const transactions = StoreUtils.getter()?.transactions.transactions

const headers = ['amount','terminalId','date','time','status']

const data = ref([
  {
    amount: 'N2000',
    terminalId: 'BIZ1234567A',
    paymentType: 'Transfer',
    transactionId: '12344586998BIZ',
    date: '05-11-2023',
    time: '10:42:10am',
    status: 'Pending',
  },
  {
    amount: 'N2000',
    terminalId: 'BIZ1234567A',
    paymentType: 'Transfer',
    transactionId: '12344586998BIZ',
    date: '05-11-2023',
    time: '10:42:10am',
    status: 'Declined',
  },
  {
    amount: 'N2000',
    terminalId: 'BIZ1234567A',
    paymentType: 'Transfer',
    transactionId: '12344586998BIZ',
    date: '05-11-2023',
    time: '10:42:10am',
    status: 'Approved',
  },
]);

onMounted(async () => {
  if(!user){
    wait.start()
    await StoreUtils?.getter()?.auth?.userDetails(toast)
    wait.stop()
  }
  if(!transactions){
    wait.start()
    await StoreUtils?.getter()?.transactions?.readCustomerOrganisationTransactions()
    wait.stop()
  }
});



</script>

<template>
  <MazFullscreenLoader style="position: fixed;z-index: 9999;" v-if="wait.isLoading()">
      <p>
        Loading...
      </p>
    </MazFullscreenLoader>


  <Motion :initial="{opacity: 0, x: -100}" :animate="{opacity: 1, x: 0}" :transition="{duration: 0.5}">  
     <ContentHeader  />
    <div class="content">
      <div class="content-card-section">
        <base-card text="Total Transaction" amount="2,420"></base-card>
        <base-card text="Successfull Transaction" amount="1198"></base-card>
        <base-card text="Pending Transaction" amount="502"></base-card>
        <base-card text="Failed Transaction" amount="32"></base-card>
      </div>




      <div class="content-table-section">
        <div style="display: flex; align-items: center; justify-content: start;gap:20px;margin:25px 0">
          <p class="text-xl text-black">Recent Transaction</p>
          <img src="../../assets/icon/alert-circle.svg" />
        </div>
        <BaseTable :data="transactions" :headers="headers"></BaseTable>
      </div>
    </div>
  </Motion> 
  
</template>

<style scoped>

.content{
  background-color: white;
}

.circle-sm{
  /* Ellipse 18 */
  width: 14px;
  height: 14px;
  left: 0;
  top: 4.24px;
  border-radius: 50%;

  background: #10A711;

}

.pending{
  background: #FF8A00;

}

.failed{
  background: #FF0000;

}

.date-picker{
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
  cursor:pointer;

}

.content-card-section{
  display: flex;
  padding: 2rem;
  gap: 25px;
  overflow-x: scroll;
  justify-content: space-between;
}

.content-card-section::-webkit-scrollbar {
  display: none;
}

.content-table-section{
  padding: 2rem;
}

.content-chart-section{
  padding: 2rem;
}
</style>

