<script lang="ts" setup>
import BaseLayout from '../BaseLayout.vue';
import BaseButton from '@/components/button/BaseButton.vue';
import { defineEmits, ref, reactive, onMounted } from 'vue';
import StoreUtils from '@/util/storeUtils';
import TerminalRequest from '@/models/request/terminal/TerminalRequest';
import BaseInput from '@/components/input/BaseInput.vue';
import { useToast, useWait } from 'maz-ui';
import MazAccordion from 'maz-ui/components/MazAccordion'
import MazCheckbox from 'maz-ui/components/MazCheckbox'


const doneAddingTerminalSerial = ref(false)

const toast = useToast()
const wait = useWait()

const model: any = ref(TerminalRequest.uploadTerminalSerial)

const emit = defineEmits<{
    (e: 'close', value: boolean): void;
}>();

// const organisations = computed(() => {
//     return StoreUtils.getter()?.organisation.getCurrentOrganisation
// })




const bulkTerminal = reactive({
    terminal:[] as any
})

// function shallowEqual(obj1:any, obj2:any) {
//     const keys1 = Object.keys(obj1);
//     const keys2 = Object.keys(obj2);
//
//     if (keys1.length !== keys2.length) {
//         return false;
//     }
//
//     for (let key of keys1) {
//         if (obj1[key] !== obj2[key]) {
//             return false;
//         }
//     }
//
//     return true;
// }

// function isObjectInArray(array, obj) {
//     return array.some(item => shallowEqual(item, obj));
// }

function hasDuplicate(array:any, key:any, value:any) {
    return array.some((item:any) => item[key] === value);
}

function addObjectIfUnique(array:any, obj:any, key:any) {
    if (!hasDuplicate(array, key, obj[key])) {
        array.push({...obj});
        sessionStorage.bulkTermial = JSON.stringify(bulkTerminal.terminal)
        toast.success(`Added`, { position: 'bottom-right', timeout: 1000 });
    } else {
        toast.info(`Duplicate value for key "${key}": ${obj[key]}`, { position: 'bottom-right', timeout: 3000 });
        console.log(`Duplicate value for key "${key}": ${obj[key]}`);
    }
}

function addMoreTerminalSerial() {
    console.log('hello');
    let allFilled = true;

    // Iterate over the keys of model.value
    Object.keys(model.value).forEach((key) => {
        if (model.value[key] === null) {
            // Show a toast notification if a value is null
            toast.info(`Fill ${key}`, { position: 'bottom-right', timeout: 3000 });
            allFilled = false; // Set flag to false if any value is null
        }
    });

    // If all fields are filled, push the model value to the terminal array
    if (allFilled) {
        addObjectIfUnique(bulkTerminal.terminal, model.value, 'terminalSerialNumber')
    }
}

function close() {
    emit('close', false)
}

function remove(terminalSerialNumber:string){
    console.log(terminalSerialNumber)
    bulkTerminal.terminal = bulkTerminal.terminal.filter((it:any) => {
        return it.terminalSerialNumber !== terminalSerialNumber
    })
}

function clearAll() {
    bulkTerminal.terminal = []
    sessionStorage.removeItem('bulkTermial')
    Object.keys(model.value).forEach((key) => {
       return model.value[key] === null
    });
}


async function createTerminal() {
    wait.start('CREATING_TERMINAL')

    if(bulkTerminal.terminal.length) await StoreUtils.getter()?.terminal.uploadBulkTerminalSerial(bulkTerminal.terminal, toast);
    else await StoreUtils.getter()?.terminal.uploadNewTerminalSerial(model.value, toast)
    wait.stop('CREATING_TERMINAL')
    close()
    clearAll()

}

onMounted(() => {
    if(sessionStorage.bulkTermial) bulkTerminal.terminal = JSON?.parse(sessionStorage.bulkTermial)
})


</script>

<template>
    <BaseLayout>
        <template v-slot:child>
            <div class="modal-child-wrapper">
                <div class="modal-child-header">
                    <p class="req-term">Add Terminal Serial</p>
                    <img src="../../../assets/icon/Frame.svg" @click="close" alt="frame" />
                </div>

                <div class="modal-child-content">
                    <BaseButton :disabled="doneAddingTerminalSerial" @click="addMoreTerminalSerial" style="width: 100px;">Add More
                    </BaseButton>
                    <div class="flex justify-between gap-10">
                        <base-input type="text" v-model="model.terminalSerialNumber"
                            placeholder="Terminal Serial Number" label="TerminalSerialNumber" />
                        <base-input type="text" v-model="model.terminalPin" placeholder="Terminal Pin"
                            label="TerminalPin" />
                    </div>
                    <div class="flex justify-between gap-10">
                        <base-input type="text" v-model="model.terminalSerialName" placeholder="Terminal Serial Name"
                            label="Terminal Serial Name" />
                        <base-input type="text" v-model="model.terminalSerialVersion" placeholder="Terminal Serial Version"
                            label="Terminal Serial Version" />
                    </div>

                   <div class="mt-5" :style="bulkTerminal.terminal.length ? {'max-height':'200px','overflow-y':'scroll'} : {}" v-if="bulkTerminal?.terminal?.length">
                       
                        <MazAccordion>
                            <template #title-1>
                                <h3 class="text-muted text-xl">Terminal Serial Added</h3>
                            </template>
                            <template #content-1>
                           <div v-for="(i, index) in bulkTerminal.terminal" :key="index">
                                <div class="flex justify-between">
                                    <p>{{ i.terminalSerialNumber }}</p>
                                    <p class="text-sm text-red-500 underline cursor-pointer hover:text-muted" @click="remove(i.terminalSerialNumber)">remove</p>
                                </div>
                           </div>
                            </template>
                        </MazAccordion>
                   </div>
                   <button v-if="bulkTerminal?.terminal?.length" class="p-2 mt-4 bg-gray-300 rounded-md" @click="clearAll">Clear All</button>


                   <MazCheckbox v-if="bulkTerminal?.terminal?.length" class="mt-4 ml-4"v-model="doneAddingTerminalSerial" label="Done Adding Terminal" />


                </div>


                <!-- <div class="divider"></div> -->


                <div class="modal-child-footer">

                    <BaseButton :disabled="!doneAddingTerminalSerial" :loading="wait.isLoading('CREATING_TERMINAL')" @click="createTerminal">Send Request
                    </BaseButton>

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
    width: 702px;
    /* White */
    background: #FFFFFF;
    /* Shadow/sm */
    box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06);
    border-radius: 8px;
    margin: 100px auto;
    /* height: 100%; */


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

    /* White */
    background: #FFFFFF;
    border-bottom: 1px solid #E6E6E6;
}

.terminalAdded{
    overflow-y: scroll;
    height: 200px;
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