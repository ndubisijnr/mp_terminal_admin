<script setup lang="ts">
 defineProps({
  text:String,
  amount:String,

 })
</script>

<template>
  <div class="base-card">
    <p class="base-card-title">{{ text }}</p>

    <p class="base-card-amount">{{ amount }}</p>
  </div>

</template>

<style scoped>
.base-card{
  /* Metric item */

  box-sizing: border-box;

  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 25px;
  gap: 25px;

  width: 25rem;
  height: 148px;

  /* White */
  background: #FFFFFF;
  /* Gray/200 */
  border: 1px solid #EAECF0;
  box-shadow: 0 1px 3.15px rgba(16, 24, 40, 0.1), 0px 1.05px 2.1px rgba(16, 24, 40, 0.06);
  border-radius: 8.4px;

}

.base-card-title{
  /* Heading and dropdown */

  /* Auto layout */
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 8.4px;

  width: 218.4px;
  height: 26px;


  /* Inside auto layout */
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;


  /* Heading */
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 16.8px;
  line-height: 25px;
  /* identical to box height, or 150% */

  /* Gray/900 */
  color: #101828;


  /* Inside auto layout */
  flex: none;
  flex-grow: 1;

}

.base-card-amount{
  /* Number and chart */

  /* Auto layout */
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  padding: 0px;
  gap: 16.8px;

  width: 218.4px;
  height: 47px;


  /* Inside auto layout */
  flex: none;
  align-self: stretch;
  flex-grow: 0;


  /* Number and badge */

  /* Auto layout */

  /* Inside auto layout */
  flex: none;
  order: 0;
  flex-grow: 1;


  /* Number */

  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 28px;
  line-height: 46px;
  /* identical to box height, or 165% */
  letter-spacing: -0.02em;

  /* Gray/900 */
  color: #101828;


  /* Inside auto layout */
  flex: none;
  flex-grow: 0;

}
</style>

