<script lang="ts" setup>
import BaseLayout from '../BaseLayout.vue';
import BaseButton from '@/components/button/BaseButton.vue';
import {defineEmits, ref} from 'vue';
import StoreUtils from '@/util/storeUtils';
import {useToast, useWait} from 'maz-ui';
import Dropdown from "primevue/dropdown";
import * as XLSX from 'xlsx';

const excelData = ref([]);
const emit = defineEmits<{
  (e: 'close', value: boolean): void;
}>();

const toast = useToast()
const wait = useWait()

const actionType = ref('download')
const uploadedFilename:any =ref(null)


// const terminalMappingRequest=ref({
//   terminalMappingInterchangeId: null,
//   terminalMappingInterchangeTerminalId: String as any ,
//   terminalMappingTerminalId: null
// })

// const interChangeResponse = computed(() => {
//   return StoreUtils.getter().charges.getInterChanges
// })

// const terminalOrganizations = computed(() => StoreUtils.getter()?.terminal?.getTerminalOrganisations)


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

// Function to export JSON to Excel
function exportToExcelTemplate() {
  // Step 1: Create a new workbook
  const wb = XLSX.utils.book_new();

  // Step 2: Define headers (for your template)
  const headers = [["terminalMappingInterchangeId", "terminalMappingInterchangeTerminalId", "terminalMappingTerminalId"]];  // These will act as the template's headers

  // Step 3: Create a new worksheet with only headers
  const ws = XLSX.utils.aoa_to_sheet(headers);

  // Optional: Adjust column width to fit content
  const wscols = [
    { wch: 15 }, // "Name" column width
    { wch: 5 },  // "Age" column width
    { wch: 20 }  // "City" column width
  ];
  ws['!cols'] = wscols;

  // Optional: Add some simple styling (bold header)
  const headerStyle = {
    font: { bold: true },
    alignment: { horizontal: "center" }
  };

  // Apply style to each header cell
  ws['A1'].s = headerStyle; // Apply style to "Name"
  ws['B1'].s = headerStyle; // Apply style to "Age"
  ws['C1'].s = headerStyle; // Apply style to "City"

  // Step 4: Append the worksheet to the workbook
  XLSX.utils.book_append_sheet(wb, ws, "Template Sheet");

  // Step 5: Generate Excel file and download it
  XLSX.writeFile(wb, "terminal_bulk_upload_template.xlsx");
}

async function createTerminalMapping(){
  if(!excelData.value.length){
    alert(`upload file`)
    return;
  }
  wait.start('CREATE_TERMINAL_MAPPING')
  await StoreUtils.getter().terminal.createBulkTerminalMapping(excelData.value,toast)
  wait.stop('CREATE_TERMINAL_MAPPING')
  close()
}


function close(){
  emit('close', false)
}

// const downloadFile = () => {
//   // Reference the file directly in the public folder
//   const fileUrl = 'src/terminal_mapping_template.xlsx';
//
//   // Create an anchor element and set the href attribute to the file URL
//   const link = document.createElement('a');
//   link.href = fileUrl;
//
//   // Set the download attribute with the desired file name
//   link.setAttribute('download', 'terminal_mapping_template.xlsx'); // Optional: Specify a file name for download
//
//   // Append the anchor to the document, trigger the click event, and then remove it
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
// };

function handleUpload() {
  const uploadModal = document.getElementById('upload_logo')
  if (uploadModal) {
    uploadModal.click()
  }
}


async function handleFile(e:any) {
  const file = e.target.files[0];
  const reader = new FileReader();
  uploadedFilename.value = file.name
  // if(fileName.length >= 12){
  //   let splitName = fileName.split('.');
  //   uploadedFilename.value = splitName[0].substring(0, 13) + "... ." + splitName[1];
  // }else{
  //
  // }
  try {
    reader.onload = async e => {
      if(e){
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        console.log(workbook)

        // Assuming you want to read the first sheet
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        // Convert the sheet to JSON format
        excelData.value = XLSX.utils.sheet_to_json(worksheet);

        if(!excelData.value.length) alert(`${uploadedFilename.value} is empty, please add data to file`)

        console.log(excelData.value)
      }
    };
    reader.readAsArrayBuffer(file);
  } catch (e) {

    console.log('err', e)
  }
}


// fileInput.onchange = ({target})=>{
//   let file = target.files[0];
//   if(file){
//     let fileName = file.name;
//     if(fileName.length >= 12){
//       let splitName = fileName.split('.');
//       fileName = splitName[0].substring(0, 13) + "... ." + splitName[1];
//     }
//     uploadFile(fileName);
//   }
// }





</script>

<template>
  <BaseLayout>
    <template v-slot:child>
      <div  class="modal-child-wrapper">
        <div class="modal-child-header">
          <p class="req-term">Create Terminal Bulk Mapping</p>
          <img src="../../../assets/icon/Frame.svg"  @click="close"/>
        </div>
        <div class="modal-child-content">
<!--          <div>-->
<!--            <p @click="downloadFile">Download Upload Template</p>-->
<!--            <p>Upload Template</p>-->
<!--          </div>-->
          <div>
            <label>Select Action</label>
            <Dropdown class="select_div"
                      optionLabel="label"
                      optionValue="key"
                      v-model="actionType"
                      :options="[{label:'Download Excel format', key:'download'},{label:'Upload Excel File', key:'upload'}]"
                      placeholder="action Type">
            </Dropdown>
          </div>
          <div class="flex justify-between">

            <div v-if="actionType === 'upload'" class="wrapper" id="upload">
<!--              <header>File Uploader JavaScript</header>-->
              <div class="form" v-if="!excelData.length">
                <input class="file-input" type="file" accept=".xlsx, .xls" @change="handleFile" name="file" id="upload_logo" hidden>
                <i class="fas fa-cloud-upload-alt"></i>
                <p @click="handleUpload">Browse File to Upload</p>
              </div>

              <div class="form" v-else>
                <img src="../../../assets/image/xlicon.png" width="50" alt="img_icon" />
                <p>{{uploadedFilename}}</p>
                <span @click="excelData = []" class="text-red-500 underline cursor-pointer">remove</span>
              </div>


            </div>
            <div v-if="actionType === 'download'" class="wrapper" id="download">
              <div class="form" >
                <input class="file-input" type="file" accept=".xlxs" @change="handleFile" name="file" id="upload_logo" hidden>
                <i class="fas fa-cloud-upload-alt"></i>
                <p @click="exportToExcelTemplate">Click here to download</p>
              </div>


            </div>
          </div>

        </div>


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



/*--------*/
::selection{
  color: #fff;
  background: #000000;
}
.wrapper{
  width: 100%;
  background: #fff;
  border-radius: 5px;
  padding: 10px;
  /*box-shadow: 7px 7px 12px rgba(0,0,0,0.05);*/
}
.wrapper header{
  color: #000000;
  font-size: 27px;
  font-weight: 600;
  text-align: center;
}
.wrapper .form{
  height: 167px;
  display: flex;
  cursor: pointer;
  margin: 30px 0;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 5px;
  border: 2px dashed #000000;
}
.form :where(i, p){
  color: #000000;
}
.form i{
  font-size: 50px;
}
.form p{
  margin-top: 15px;
  font-size: 16px;
}

section .row{
  margin-bottom: 10px;
  background: #E9F0FF;
  list-style: none;
  padding: 15px 20px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
section .row i{
  color: #6990F2;
  font-size: 30px;
}
section .details span{
  font-size: 14px;
}
.progress-area .row .content{
  width: 100%;
  margin-left: 15px;
}
.progress-area .details{
  display: flex;
  align-items: center;
  margin-bottom: 7px;
  justify-content: space-between;
}
.progress-area .content .progress-bar{
  height: 6px;
  width: 100%;
  margin-bottom: 4px;
  background: #fff;
  border-radius: 30px;
}
.content .progress-bar .progress{
  height: 100%;
  width: 0%;
  background: #6990F2;
  border-radius: inherit;
}
.uploaded-area{
  max-height: 232px;
  overflow-y: scroll;
}
.uploaded-area.onprogress{
  max-height: 150px;
}
.uploaded-area::-webkit-scrollbar{
  width: 0px;
}
.uploaded-area .row .content{
  display: flex;
  align-items: center;
}
.uploaded-area .row .details{
  display: flex;
  margin-left: 15px;
  flex-direction: column;
}
.uploaded-area .row .details .size{
  color: #404040;
  font-size: 11px;
}
.uploaded-area i.fa-check{
  font-size: 16px;
}
</style>