<script lang="ts" setup>
import ContentHeader from '@/components/dashboardHeader/ContentHeader.vue';
import MazAccordion from 'maz-ui/components/MazAccordion'


</script>

<template>


  
    <ContentHeader />

    <div class="flex w-full justify-center">
        <div class="mt-8">
            <p class="text-xl mt-4 mb-4">Contact Us</p>
            <img alt="support" src="../../assets/image/undraw_Contact_us_re_4qqt.png" class="h-80" />
            <MazAccordion style="width: 100%; margin: 30px 0">

                <template #title-1>
                   Chat Us
                </template>
                <template #content-1>
                  <a href="https://wa.me/2349155556906"> Chat with us on whatsapp</a>
                </template>

                <template #title-2>
                    Email Us
                </template>
                <template #content-2>
                  customercare@corestepmfb.com
                </template>

            
            </MazAccordion>
        </div>
    </div>

</template>

<style scoped>

</style>