<script setup lang="ts">
import formatAmount from '@/util/helper/formatAmount';

defineProps({
  text: String,
  amount: String as any,
  analytics: Boolean,
  currency: Boolean

})
</script>

<template>
  <div class="base-card">
    <div>
      <p class="base-card-title">{{ text }}</p>
    </div>

    <div>
      <p class="base-card-amount"> <span v-if="currency">₦</span> {{ formatAmount(amount) }}</p>
    </div>
    <!-- <p v-if="analytics" class="text-green flex items-center gap-3"><img src="../../assets/icon/arrow-up.svg" /> 20% <span>vs last month</span></p> -->
  </div>

</template>

<style scoped>
.base-card {
  /* Metric item */

  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: start;
  padding: 25px;
  gap: 5px;

  width: 100%;

  /* White */
  background: var(--light-bgcolor);
  /* eff9fe */
  /* Gray/200 */
  border: 0.1px solid var(--light_color);
  /* box-shadow: 0 1px 3.15px rgba(16, 24, 40, 0.1), 0px 1.05px 2.1px rgba(16, 24, 40, 0.06); */
  border-radius: 8.4px;

}

.base-card-title {
  /* Heading and dropdown */
  /* Auto layout */
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: start;
  padding: 0px;
  gap: 5px;

  font-weight: 500;
  font-size: 1rem;

  color: #000;

}

.base-card-amount {
  /* Number and chart */
  /* Auto layout */
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  padding: 0px;
  gap: 5px;
  font-weight: 600;
  font-size: 1.2rem;
  /* Gray/900 */
  color: #101828;
}

@media (max-width: 1080px) {
  .base-card {
    padding: 15px;
    gap: 5px;
  }
}
</style>
