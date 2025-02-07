<script setup>
import { BeDataTable } from '@/packages/BeDataTable'
import { ref } from 'vue'

const fixedColumn = ref(false)
const columns = [
  { key: 'id', name: '아이디', type: 'string', isFix: true, sort: true},
  { key: 'name', name: '이름', type: 'string', isFix: false},
  { key: 'state', name: '상태', type: 'array', isFix: false},
  { key: 'state', name: '상태', type: 'array', isFix: false},
  { key: 'state', name: '상태', type: 'array', isFix: false},
  { key: 'state', name: '상태', type: 'array', isFix: false},
  { key: 'state', name: '상태', type: 'array', isFix: false},
  { key: 'state', name: '상태', type: 'array', isFix: false},
  { key: 'state', name: '상태', type: 'array', isFix: false},
  { key: 'state', name: '상태', type: 'array', isFix: false},
  { key: 'state', name: '상태', type: 'array', isFix: false},
  { key: 'state', name: '상태', type: 'array', isFix: false},
  { key: 'state', name: '상태', type: 'array', isFix: false}
]


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
        <BeDataTable :columns="columns" :use-fixed="fixedColumn"></BeDataTable>
      </div>
    </div>
</template>

<style lang="scss" scoped>
.table-control {
  padding: 1rem;
}
.table-wrapper {
  width: 100%;
  height: 600px;
  overflow: auto;
}
</style>