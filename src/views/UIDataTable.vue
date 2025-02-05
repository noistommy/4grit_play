<script setup>
import { BeDataTable } from '@/packages/BeDataTable'
import { ref } from 'vue'

const fixedColumn = ref(false)


</script>

<template>
    <div class="table-container">
      <div class="table-control">
        <span class="label">컬럼고정</span>
        <label class="ga-switch button">
          <input type="checkbox" v-model="fixedColumn" :checked="fixedColumn" />
          <span class="on" :class="{active: fixedColumn}">ON</span>
          <span class="off" :class="{active: !fixedColumn}">OFF</span>
        </label>
      </div>
      <div class="table-wrapper">
        <BeDataTable :use-fixed="fixedColumn"></BeDataTable>
      </div>
    </div>
</template>

<style lang="scss" scoped>
.table-control {
  padding: 1rem;
}
.table-wrapper {
  width: 1000px;
  height: 600px;
  overflow: auto;
}
</style>