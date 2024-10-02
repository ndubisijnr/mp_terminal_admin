<script lang="ts" setup>
import BaseLayout from '../BaseLayout.vue';
import BaseButton from '@/components/button/BaseButton.vue';
import {defineEmits, ref} from 'vue';
import StoreUtils from '@/util/storeUtils';
import BaseInput from '@/components/input/BaseInput.vue';
import { useToast, useWait } from 'maz-ui';
import Dropdown from "primevue/dropdown";


const toast = useToast()
const wait = useWait()

const emit = defineEmits<{
  (e: 'close', value: boolean): void;
}>();

function close() {
  emit('close', false)
}

const props = defineProps({
  data:{} as any
})

const InterchangeConstant = [
  {name:"ISO POSTILION", code:"ISO_POSTILION"},
  {name:"ISO 8583", code:"ISO_8583"},
  {name:"TRANSFER REST", code:"TRANSFER_REST"},
]

const InterchangeConstantSSL = [
  {key:"YES", value:"YES"},
  {key:"NO", value:"NO"},
]

const interchangeConfigStatus= [
  {key:"ACTIVE", value:"ACTIVE"},
  {key:"INACTIVE", value:"INACTIVE"},
  {key:"DELETED", value:"DELETED"},
]


const interChangeConfigRequest = ref({
  interchangeConfigId:null,
  interchangeConfigApiHeader: null,
  interchangeConfigDescription: null,
  interchangeConfigEncryptedComponent1: null,
  interchangeConfigEncryptedComponent2: null,
  interchangeConfigEncryptedComponent3: null,
  interchangeConfigExtendedTransactionType: null,
  interchangeConfigForwardingInstitutionId: null,
  interchangeConfigKeyCheckValue: null,
  interchangeConfigMcc: null,
  interchangeConfigName: null,
  interchangeConfigPayee: null,
  interchangeConfigReceivingInstitutionId: null,
  interchangeConfigSinkHost: null,
  interchangeConfigSinkPort: null,
  interchangeConfigStatus: null,
  interchangeConfigTransferDestinationAccount: null,
  interchangeConfigType: null,
  interchangeConfigUseSsl: null
})

async function createNewConfig() {
  console.log(interChangeConfigRequest.value)
  interChangeConfigRequest.value.interchangeConfigId = props.data.interchangeConfigId
  wait.start('CREATING_CONFIG')
  await StoreUtils.getter()?.charges.updateInterChange(interChangeConfigRequest.value, toast)
  wait.stop('CREATING_CONFIG')
  close()
}

</script>

<template>
  <BaseLayout>
    <template v-slot:child>
      <div class="modal-child-wrapper">
        <div class="modal-child-header">
          <p class="req-term">Update InterChange</p>
          <img src="../../../assets/icon/Frame.svg" @click="close" />
        </div>
        <div>
          <div class="modal-child-content">
            <div class="flex justify-between gap-10">
              <div class="input-component flex flex-col justify-end">
                <p class="mb-2">InterChangeId</p>
                <Dropdown  optionLabel="name" v-model="interChangeConfigRequest.interchangeConfigType" optionValue="code" :placeholder="props.data.interchangeConfigType" :options="InterchangeConstant" class="select-drowdown"></Dropdown>
              </div>
              <div class="input-component flex flex-col justify-end">
                <p class="mb-2">interchangeConfigStatus</p>
                <Dropdown  optionLabel="key" v-model="interChangeConfigRequest.interchangeConfigUseSsl" optionValue="value" placeholder="interchangeConfigStatus" :options="interchangeConfigStatus" class="select-drowdown"></Dropdown>
              </div>
            </div>

            <div class="flex justify-between gap-10">
              <div class="input-component flex flex-col justify-end">
                <p class="mb-2">interchangeConfigUseSsl</p>
                <Dropdown  optionLabel="key" v-model="interChangeConfigRequest.interchangeConfigUseSsl" optionValue="value" placeholder="interchangeConfigUseSsl" :options="InterchangeConstantSSL" class="select-drowdown"></Dropdown>
              </div>


              <base-input type="text" v-model="interChangeConfigRequest.interchangeConfigTransferDestinationAccount"
                          label="interchangeConfigTransferDestinationAccount" />

            </div>
            <div class="flex justify-between gap-10">
              <base-input type="text" v-model="interChangeConfigRequest.interchangeConfigEncryptedComponent1"
                          label="interchangeConfigEncryptedComponent1" :placeholder="props.data.interchangeConfigEncryptedComponent1"/>
              <base-input type="text" v-model="interChangeConfigRequest.interchangeConfigEncryptedComponent2"
                          label="interchangeConfigEncryptedComponent2" :placeholder="props.data.interchangeConfigEncryptedComponent2"/>
            </div>
            <div class="flex justify-between gap-10">
              <base-input type="text" v-model="interChangeConfigRequest.interchangeConfigEncryptedComponent3"
                          label="interchangeConfigEncryptedComponent3" :placeholder="props.data.interchangeConfigEncryptedComponent3"/>
              <base-input type="text" v-model="interChangeConfigRequest.interchangeConfigExtendedTransactionType"
                          label="interchangeConfigExtendedTransactionType" :placeholder="props.data.interchangeConfigExtendedTransactionType"/>
            </div>
            <div class="flex justify-between gap-10">
              <base-input type="text" v-model="interChangeConfigRequest.interchangeConfigForwardingInstitutionId"
                          label="interchangeConfigForwardingInstitutionId" :placeholder="props.data.interchangeConfigForwardingInstitutionId"/>
              <base-input type="text" v-model="interChangeConfigRequest.interchangeConfigKeyCheckValue"
                          label="interchangeConfigKeyCheckValue" :placeholder="props.data.interchangeConfigKeyCheckValue"/>
            </div>
            <div class="flex justify-between gap-10">
              <base-input type="text" v-model="interChangeConfigRequest.interchangeConfigMcc"
                          label="interchangeConfigMcc" :placeholder="props.data.interchangeConfigMcc"/>
              <base-input type="text" v-model="interChangeConfigRequest.interchangeConfigName"
                          label="interchangeConfigName" :placeholder="props.data.interchangeConfigName"/>
            </div>
            <div class="flex justify-between gap-10">
              <base-input type="text" v-model="interChangeConfigRequest.interchangeConfigPayee"
                          label="interchangeConfigPayee" :placeholder="props.data.interchangeConfigPayee"/>

              <base-input type="text" v-model="interChangeConfigRequest.interchangeConfigReceivingInstitutionId"
                          label="interchangeConfigReceivingInstitutionId" :placeholder="props.data.interchangeConfigReceivingInstitutionId"/>

            </div>
            <div class="flex justify-between gap-10">
              <base-input type="text" v-model="interChangeConfigRequest.interchangeConfigSinkHost"
                          label="interchangeConfigSinkHost" :placeholder="props.data.interchangeConfigSinkHost"/>

              <base-input type="text" v-model="interChangeConfigRequest.interchangeConfigSinkPort"
                          label="interchangeConfigSinkPort" :placeholder="props.data.interchangeConfigSinkPort"/>

            </div>
            <div class="flex justify-between gap-10">
              <base-input type="text" v-model="interChangeConfigRequest.interchangeConfigDescription"
                          label="interchangeConfigDescription" :placeholder="props.data.interchangeConfigDescription"/>

              <base-input type="text" v-model="interChangeConfigRequest.interchangeConfigApiHeader"
                          label="interchangeConfigApiHeader" :placeholder="props.data.interchangeConfigApiHeader" />
            </div>

          </div>

          <div class="modal-child-footer">
            <BaseButton  :loading="wait.isLoading('CREATING_CONFIG')" @click="createNewConfig">Send Request</BaseButton>
          </div>
        </div>


      </div>
    </template>
  </BaseLayout>
</template>

<style scoped>
.confirm-request-subtitle {
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

.confirm-request-title {
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

.select-drowdown {
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

.req-term {
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

.bnt-trans-text {
  color: var(--dark_color);
}

.divider {
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


.modal-child-wrapper {
  /* Assign Terminal Form */
  padding: 0px;
  height:890px;
  width: 702px;
  overflow-y:scroll;
  /* White */
  background: #FFFFFF;
  /* Shadow/sm */
  box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06);
  border-radius: 8px;
  margin: 10px auto;



}

.modal-child-header {
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

.modal-child-content {
  /* Content */
  padding: 24px;
  overflow-y: scroll;
  /* White */
  background: #FFFFFF;
  border-bottom: 1px solid #E6E6E6;

}

.modal-child-footer {
  /* Footer */

  /* Auto layout */
  display: flex;
  align-items: center;
  padding: 24px;
  justify-content: end;
  width: 702px;
  gap: 12px;


}

.modal-confirm-div {
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


.modal-confirm-inner-div {
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

.modal-confirm-inner-div-footer {
  display: flex;

  align-items: center;
  padding: 0 24px;
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
