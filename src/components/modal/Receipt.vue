<template>

    <div class="custom_modal">
        <div @click.stop class="receipt_wrapper">
                 <!-- {{transactionData}} -->
            <!--      {{getExtraData}}-->
            <div class="relative pt-5">
                <img src="../../assets/image/coresteplogo.png" style="width:120px; height:50px;margin: 1rem" />
                <div @click="close" class="w-10 h-10 rounded-full bg-red-400 flex items-center justify-center absolute right-5 top-5 cursor-pointer">
                    <svg width="42px" height="42px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#fff"><path d="M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>

                </div>
            </div>
            <div style="margin:0 1rem">
                <div style="display: flex;justify-content: space-between;align-items: center;">
                    <h1 class="text-lg">Transaction Receipt</h1>
                    <button @click="printReceipt" class="receipt_print_button">Print Receipt</button>
                </div>
                <div>
                    <div class="amount">₦{{ formatAmount(transactionData?.transactionRequestAmount) }}</div>
                    <!-- <div class="transaction_type"
                        :style="transactionData?.trnDrCr === 'CR' ? { color: 'green' } : { color: 'red' }">
                        {{ transactionData?.trnDrCr === 'CR' ? 'Credit' : 'Debit' }}</div> -->
                    <div class="divKey">
                        <p class="key">DATE: </p>
                        <p class="value">{{ transactionData?.transactionCreatedAt }}</p>
                    </div>
                    <!-- v-if="transactionData?.trnService === 'CARD_COLLECTION'" -->
                    <div >
                        <div class="divKey">
                            <p class="key">CARD</p>
                            <p class="value">{{ transactionData?.transactionMaskedPan }}</p>
                        </div>
                        <div class="divKey">
                            <p class="key">NAME</p>
                            <p class="value">{{ transactionData?.transactionOrganisationName }}</p>
                        </div>
                        <div class="divKey">
                            <p class="key">STAN</p>
                            <p class="value">{{ transactionData?.transactionStan }}</p>
                        </div>
                        <div class="divKey">
                            <p class="key">RRN</p>
                            <p class="value">{{ transactionData?.transactionRetrievalReferenceNumber }}</p>
                        </div>
                        <div class="divKey">
                            <p class="key">APP LABEL</p>
                            <p class="value">{{ transactionData?.transactionAppLabel }}</p>
                        </div>
                    </div>
                    <!-- <div v-else>
                        <div class="divKey">
                            <p class="key">DEBIT ACCOUNT NUMBER</p>
                            <p class="value">{{ transactionData?.trnDrAccountNumber }}</p>
                        </div>
                        <div class="divKey">
                            <p class="key">DEBIT ACCOUNT NAME</p>
                            <p class="value">{{ transactionData?.trnDrAccountName }}</p>
                        </div>
                        <div class="divKey">
                            <p class="key">CREDIT ACCOUNT NUMBER</p>
                            <p class="value">{{ transactionData?.trnCrAccountNumber }}</p>
                        </div>
                        <div class="divKey">
                            <p class="key">CREDIT ACCOUNT NAME</p>
                            <p class="value">{{ transactionData?.trnCrAccountName }}</p>
                        </div>
                        <div class="divKey">
                            <p class="key">CREDIT ACCOUNT BANK</p>
                            <p class="value">{{ transactionData?.trnCrInstitutionName }}</p>
                        </div>
                    </div> -->

                    <div class="divKey">
                        <p class="key">TRANSACTION RESPONSE</p>
                        <!-- {{ transactionData?.transactionStatus === 'ACTIVE' ? 'APPROVED' :
                            transactionData?.transactionStatus === 'FAILED' ? 'DECLINED' : transactionData?.transactionStatus}} | -->
                        <p class="value">{{ getResponse(transactionData?.transactionResponseCode) }}</p>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
<script setup lang="ts">
import { defineEmits } from 'vue';
import getResponse from '@/util/helper/globalResponse';
import formatAmount from '@/util/helper/formatAmount';

defineProps({
    transactionData:Object
})

const emit = defineEmits<{
    (e: 'close', value: boolean): void;
}>();


function close() {
    emit('close', false)
}

function printReceipt(){
    window.print()
}
</script>

<style scoped>
.receipt_print_button {
    border: none;
    border-radius: .5rem;
    padding: .5rem;
    background: #413d52;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
    font-size: .9rem;
    cursor: pointer;
    color: #F7FAFE;
}

.divKey {
    display: flex;
    justify-content: space-between;
}

.amount {
    text-align: center;
    font-weight: bold;
    font-size: 2rem;
}

.value {
    font-weight: 600;
    margin: 10px 0;
}

.key {
    font-weight: 500;
    margin: 10px 0;
}

.transaction_type {
    text-align: center;
    font-size: 1.2rem;
}

.custom_modal {
    width: 100%;
    min-height: 100%;
    position: absolute;
    z-index: 999999999;
    left: 0;
    background-color: rgba(0, 0, 0, .5);
    top: 0;
}

.receipt_wrapper {
    margin: 50px auto;
    position: relative;
    background-color: #FEF0E0;
    /* margin: 0 23px 0 23px; */
    width: 40rem;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    border-radius: .3rem;
}
</style>