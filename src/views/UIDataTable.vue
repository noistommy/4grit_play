<script setup>
import { BeDataTable } from '@/packages/BeDataTable'
import { ref } from 'vue'

const fixedColumn = ref(true)
const baseWidth = null
const columns = [
  { key: 'detail', name: '자세히', type: 'tag', isFix: true,  width: 60 },
  { key: 'status', name: '상태', type: 'tag', isFix: true, sort: 'desc', width: baseWidth},
  { key: 'authName', name: '등급', type: 'mark', isFix: true, width: baseWidth},
  { key: 'userId', name: '아이디', type: 'string', isFix: true, width: baseWidth},
  { key: 'companyName', name: '회사명', type: 'string', isFix: false, width: 250},
  { key: 'department', name: '부서', type: 'string', isFix: false, width: baseWidth},
  { key: 'email', name: '이메일', type: 'string', isFix: false, width: 400},
  { key: 'phone', name: '전화번호', type: 'string', isFix: false, width: baseWidth},
  { key: 'date', name: '초대/가입일', type: 'date', isFix: false, width: baseWidth},
  { key: 'plan', name: '플랜', type: 'tag', isFix: false, width: baseWidth},
  { key: 'companyName', name: '회사명', type: 'string', isFix: false, width: 250},
  { key: 'department', name: '부서', type: 'string', isFix: false, width: baseWidth},
  { key: 'email', name: '이메일', type: 'string', isFix: false, width: 400},
  { key: 'phone', name: '전화번호', type: 'string', isFix: false, width: baseWidth},
  { key: 'date', name: '초대/가입일', type: 'date', isFix: false, width: baseWidth},
  { key: 'plan', name: '플랜', type: 'tag', isFix: false, width: baseWidth},
  { key: 'plan', name: '플랜', type: 'tag', isFix: false, width: baseWidth},
  { key: 'companyName', name: '회사명', type: 'string', isFix: false, width: 250},
  { key: 'department', name: '부서', type: 'string', isFix: false, width: baseWidth},
  { key: 'email', name: '이메일', type: 'string', isFix: false, width: 400},
  { key: 'phone', name: '전화번호', type: 'string', isFix: false, width: baseWidth},
  { key: 'date', name: '초대/가입일', type: 'date', isFix: false, width: baseWidth},
  { key: 'plan', name: '플랜', type: 'tag', isFix: false, width: baseWidth}
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