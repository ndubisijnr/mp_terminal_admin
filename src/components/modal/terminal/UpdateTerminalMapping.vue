<script lang="ts" setup>
import BaseLayout from '../BaseLayout.vue';
import BaseButton from '@/components/button/BaseButton.vue';
import {computed, defineEmits, ref, onMounted} from 'vue';
import BaseInput from '@/components/input/BaseInput.vue';
import StoreUtils from '@/util/storeUtils';
import TerminalRequest from '@/models/request/terminal/TerminalRequest';
import { useToast,useWait } from 'maz-ui';
import Dropdown from "primevue/dropdown";

const emit = defineEmits<{
  (e: 'close', value: boolean): void;
}>();

const toast = useToast()
const wait = useWait()

const props = defineProps({
  data:Object
})

const terminalMappingRequest=ref({
  terminalMappingInterchangeId: null,
  terminalMappingInterchangeTerminalId: String as any ,
  terminalMappingTerminalId: null,
  terminalMappingId: null,
  terminalMappingStatus: null,
})

const interChangeResponse = computed(() => {
  return StoreUtils.getter().charges.getInterChanges
})

const terminalOrganizations = computed(() => StoreUtils.getter()?.terminal?.getTerminalOrganisations)


const terminalMappingStatus= [
  {key:"ACTIVE", value:"ACTIVE"},
  {key:"INACTIVE", value:"INACTIVE"},
  {key:"DELETED", value:"DELETED"},
]

// const currentOrganisation:any = computed(() => {
//     return StoreUtils.getter().organisation.getCurrentOrganisation
// })


// const organisation:any = computed(() => {
//   return StoreUtils.getter()?.organisation.getOrganisation
// })



// const data = reactive({
//     showConfirmAgain:true,
//     isRequestSent:false

// })

async function createTerminalMapping(){
  wait.start('CREATE_TERMINAL_MAPPING')
  terminalMappingRequest.value.terminalMappingId = props?.data?.terminalMappingId
  await StoreUtils.getter().terminal.updateTerminalMapping(terminalMappingRequest.value,toast)
  wait.stop('CREATE_TERMINAL_MAPPING')
  close()
}


function close(){
  emit('close', false)
}

onMounted(()=>{

})




</script>

<template>
  <BaseLayout>
    <template v-slot:child>
      <div  class="modal-child-wrapper">
        <div class="modal-child-header">
          <p class="req-term">Update Terminal Mapping</p>
          <img src="../../../assets/icon/Frame.svg"  @click="close"/>
        </div>
        <div class="modal-child-content">
          <div class="flex justify-between gap-10 mt-3">
            <div>
              <label>terminalMappingInterchangeId</label>
              <Dropdown class="select_div" filter
                        :optionLabel="'interchangeConfigName'"
                        :optionValue="'interchangeConfigId'"
                        v-model="terminalMappingRequest.terminalMappingInterchangeId"
                        :options="interChangeResponse"
                        :placeholder="props?.data?.terminalMappingInterchangeId">
              </Dropdown>
            </div>

            <div>
              <label>terminalMappingTerminalId</label>

              <Dropdown class="select_div" filter
                        :optionLabel="'terminalId'"
                        :optionValue="'terminalId'"
                        v-model="terminalMappingRequest.terminalMappingTerminalId"
                        :options="terminalOrganizations"
                        :placeholder="props?.data?.terminalMappingTerminalId">
              </Dropdown>
            </div>

          </div>
          <div class="flex justify-between gap-10 mt-3">
            <div style="width:100%;">
            <label>terminalMappingStatus</label>
            <Dropdown class="select_div" filter
                      :optionLabel="'key'"
                      :optionValue="'value'"
                      v-model="terminalMappingRequest.terminalMappingStatus"
                      :options="terminalMappingStatus"
                      placeholder="terminalMappingStatus">
            </Dropdown>
            </div>
            <base-input type="text" v-model="terminalMappingRequest.terminalMappingInterchangeTerminalId"
                        label="terminalMappingInterchangeTerminalId" :placeholder="props?.data?.terminalMappingInterchangeTerminalId"/>
<!--            <div>-->
<!--     -->
<!--            </div>-->



          </div>

<!--          <div class="flex justify-between gap-10">-->
<!--            &lt;!&ndash; <base-input type="text"  v-model="TerminalRequest.createTerminal.terminalSerialNumber"  placeholder="Terminal Serial Number"  label="TerminalSerialNumber" /> &ndash;&gt;-->
<!--            <base-input type="text"  placeholder="Terminal Pin" v-model="TerminalRequest.changeTerminalPin.terminalPin"  label="TerminalPin" />-->
<!--          </div>-->

        </div>



        <!-- <div class="divider"></div> -->


        <div class="modal-child-footer">

          <BaseButton :loading="wait.isLoading('CREATE_TERMINAL_MAPPING')" @click="createTerminalMapping">Send Request</BaseButton>

        </div>

      </div>



    </template>
  </BaseLayout>
</template>

<style scoped>
.confirm-request-subtitle{
  /* Supporting text */

  /* width: 424px;
  height: 20px; */

  /* Text sm/Regular */
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  /* identical to box height, or 143% */

  /* Gray/500 */
  color: #667085;


  /* Inside auto layout */
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;

}

.confirm-request-title{
  /* Text */

  /* Text lg/Semibold */
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 28px;
  /* identical to box height, or 156% */

  /* Gray/900 */
  color: #101828;


}
.select-drowdown{
  /* Input */

  box-sizing: border-box;

  /* Auto layout */
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;

  width: 315px;
  height: 41px;

  /* White */
  background: #FFFFFF;
  /* Gray/300 */
  border: 1px solid #D0D5DD;
  /* Shadow/xs */
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 8px;

  /* Inside auto layout */
  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;

}
.select_div {
  height: 47px;
  width: 100%;
  padding:.5rem;
  margin-top: 1rem;
  border: solid rgba(175, 175, 175, 0.291);
}
.req-term{
  /* Assign Terminal */

  height: 20px;

  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 20px;
  /* identical to box height, or 100% */

  /* Text */
  color: #222222;


}
.bnt-trans-text{
  color: var(--dark_color);
}
.divider{
  /* Divider */

  width: 702px;
  height: 1px;

  /* Gray/200 */
  background: #EAECF0 !important;

  /* Inside auto layout */
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;

}


.modal-child-wrapper{
  /* Assign Terminal Form */
  padding: 0px;
  width: 702px;
  /* White */
  background: #FFFFFF;
  /* Shadow/sm */
  box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06);
  border-radius: 8px;
  margin: 100px auto;


}

.modal-child-header{
  /* New registration header */

  box-sizing: border-box;
  cursor: pointer;

  /* Auto layout */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  gap: 10px;

  background: #FFFFFF;
  border-bottom: 1px solid #E6E6E6;
  border-radius: 16px 16px 0px 0px;

}

.modal-child-content{
  /* Content */
  padding: 24px;

  /* White */
  background: #FFFFFF;
  border-bottom: 1px solid #E6E6E6;



}

.modal-child-footer{
  /* Footer */

  /* Auto layout */
  display: flex;
  align-items: center;
  padding:24px;
  justify-content: end;
  width: 702px;
  gap: 12px;


}

.modal-confirm-div{
  /* Request Terminal Confirm */

  /* Auto layout */
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 24px;
  gap: 24px;

  position: relative;
  width: 544px;
  height: 180px;

  /* White */
  background: #FFFFFF;
  /* Shadow/xl */
  box-shadow: 0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03);
  border-radius: 12px;
  margin: 100px auto;


}


.modal-confirm-inner-div{
  /* Content */

  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;

  width: 424px;
  height: 132px;


  /* Inside auto layout */
  flex: none;
  order: 1;
  flex-grow: 1;


}

.modal-confirm-inner-div-footer{
  display: flex;

  align-items: center;
  padding:0 24px;
  justify-content: end;
  gap: 12px;
  width: 100%;
  /* Inside auto layout */
  flex: none;
  order: 2;
  align-self: stretch;
  flex-grow: 0;
}
</style>