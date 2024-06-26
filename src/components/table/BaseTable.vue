<script setup lang="ts">
const props = defineProps<{
  headers: string[],
  bodies: {items: string[], action: {}}[]
}>()
</script>

<template>
   <div class="overflow-auto rounded-lg shadow">
    <table class="w-full border-b-2">
    <thead class="bg-white-50 border-white-200">
     <tr class="bg-white">
      <th class="p-3 text-sm font-semibold, tracking-wide text-left" v-for="(header, number) in props.headers"  :key="number">{{ header }}</th>
    </tr>
    </thead>
    <tbody class="divide-y divide-gray-200">
      <tr class="bg-gray" v-for="(body, number) in props.bodies"  :key="number">
        <td class="whitespace-nowrap p-3 text-sm text-gray-700" v-for="(item, number) in body.items"  :key="number">{{item}}</td>
<!--        <td class="whitespace-nowrap p-3 text-sm text-gray-700">-->
<!--          <span>05-11-2023</span>-->
<!--          <br />-->
<!--          <span>10:42:10am</span>-->
<!--        </td>-->
<!--        <td class="whitespace-nowrap p-3 text-sm text-gray-700">-->
<!--          <span class="p-1.5 text-xs font-medium uppercase text-orange-600 bg-orange-200 rounded-lg bg-opacity-50 tracking-wider">Pending</span>-->

<!--        </td>-->
<!--        <td class="whitespace-nowrap p-3 text-sm text-gray-700">View receipt</td>-->
      </tr>
    </tbody>

  </table>
    <div>

    </div>
  </div>
 <!-- <div class="overflow-auto rounded-lg shadow">
    <table class="w-full border-b-2">
      <thead class="bg-white-50 border-white-200">
        <tr class="bg-white">
          <th v-for="header in props.headers" :key="header" class="p-3 capitalize text-sm font-semibold tracking-wide text-left ">
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody v-if="props.data?.length" class="divide-y divide-gray-200">
        <tr v-for="(item, index) in props.data" :key="index" :class="index % 2 === 0 ? 'bg-gray' : 'bg-white'">
          <td v-for="header in props.headers" :key="header" class="whitespace-nowrap p-3 text-sm text-gray-700">
            {{ item[header] }}
          </td>
        </tr>
      </tbody>
      <div v-else class="p-3  text-sm text-gray-700 py-5 text-center">No data available.</div>

    </table>
  </div> -->
</template>

<style scoped>

</style>