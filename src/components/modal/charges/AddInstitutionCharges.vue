<script lang="ts" setup>
import BaseLayout from '../BaseLayout.vue';
import BaseButton from '@/components/button/BaseButton.vue';
import Dropdown from 'primevue/dropdown';
import { defineEmits, ref } from 'vue';
import BaseInput from '@/components/input/BaseInput.vue';
import ChargesRequest  from '@/models/request/charges/ChargesRequest';
import { useToast, useWait } from 'maz-ui';
import StoreUtils from '@/util/storeUtils';

const toast = useToast()
const wait = useWait()

const emit = defineEmits<{
  (e: 'close', value: boolean): void;
}>();


const props = defineProps({
    data:{} as any
})

const model = ref(ChargesRequest.organisationCreateChargesRequest)


// const data = reactive({
//     showConfirmAgain:true,
//     isRequestSent:false
//
// })


function close(){
   emit('close', false)
}


async function addCharges(){
    console.log(model)
    model.value.organisationPricingOrganisationId = props?.data?.organisationId
    if(model.value.organisationPricingAmountType === 'FLAT'){
        model.value.organisationPricingMaxAmount = model.value.organisationPricingAmount
        model.value.organisationPricingMinAmount = model.value.organisationPricingAmount
    }
    wait.start('CREATING_ORGANISATION_CHARGES')
    await StoreUtils.getter()?.organisation.organisationCreateCharges(model.value, toast)
    await StoreUtils.getter()?.organisation.readOrganisationPricing(props?.data?.organisationId)

    wait.stop('CREATING_ORGANISATION_CHARGES')
    close()
   
}






</script>

<template>
    <BaseLayout>
        <template v-slot:child>
                <div class="modal-child-wrapper">
                    <div class="modal-child-header">
                        <p class="req-term">Add New Charges For <span>"{{props.data?.organisationName}}"</span></p>
                        <img src="../../../assets/icon/Frame.svg"  @click="close"/>
                    </div>
                    <!-- pricingAmount -->
                    <form class="modal-child-content">
                        <div class="flex justify-between gap-10 mt-3">
                            <div>
                                <label>pricingAmountType</label>
                                <Dropdown  optionLabel="name" v-model="model.organisationPricingAmountType" optionValue="code" placeholder="pricingAmountType" :options="[{name:'FLAT', code:'FLAT'},{name:'PERCENT', code:'PERCENT'}]" class="select-drowdown"></Dropdown>
                            </div>
                            <div>
                                <label>pricingType</label>
                                <Dropdown optionLabel="name" v-model="model.organisationPricingType" optionValue="code" placeholder="pricingType" :options="[{name:'TRANSFER INWARD', code:'TRANSFER_INWARD'},{name:'TRANSFER INTERNAL', code:'TRANSFER_INTERNAL'},{name:'TRANSFER OUTWARD', code:'TRANSFER_OUTWARD'},{name:'CARD', code:'CARD'}]" class="select-drowdown"></Dropdown>
                            </div>
                        </div>

                        <div class="flex justify-between gap-10">
                            <base-input required type="text"  v-model="model.organisationPricingAmount" :placeholder="model.organisationPricingAmountType === 'PERCENT' ? 'pricingAmountPercentage' : 'pricingAmount'"  :label="model.organisationPricingAmountType === 'PERCENT' ? 'pricingAmountPercentage(%)' : 'pricingAmount'" />
                            <base-input required type="text" v-model="model.organisationPricingCode" placeholder="pricingCode"  label="pricingCode" />
                        </div>
                       
                        <div class="flex justify-between gap-10" v-if="model.organisationPricingAmountType && model.organisationPricingAmountType === 'PERCENT'">
                            <base-input :required="model.organisationPricingAmountType && model.organisationPricingAmountType === 'PERCENT'" type="text"  v-model="model.organisationPricingMinAmount" placeholder="pricingMinAmount"  label="pricingMinAmount" />
                            <base-input :required="model.organisationPricingAmountType && model.organisationPricingAmountType === 'PERCENT'" type="text"  v-model="model.organisationPricingMaxAmount" placeholder="pricingMaxAmount"  label="pricingMaxAmount" />
                        </div>

                        
                        <div class="flex justify-between gap-10">
                            <base-input required type="text" v-model="model.organisationPricingDescription" placeholder="pricingDescription"  label="pricingDescription" />
                        </div>
                    
                    </form>
                   
                

                    <!-- <div class="divider"></div> -->


                    <div class="modal-child-footer">
                    
                        <BaseButton type="sumbit" :loading="wait.isLoading('CREATING_ORGANISATION_CHARGES')" @click="addCharges">Add New Charges</BaseButton>

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