<script setup>
import { ref, reactive, onMounted, computed } from 'vue'

const dataList = new Array(41).fill(null).map((item, i) => { return i + 1 })
const pageList = ref([])
const pagination = reactive({
    page: 1,
    total: dataList.length,
    numToPage: 5
})
const pageLength = ref(1)

const disablePrev = computed(() => {
  return pagination.page === 1
})
const disableNext = computed(() => {
  return pagination.page === pageLength.value
})

onMounted(() => {
    pageLength.value = Math.ceil(pagination.total / pagination.numToPage)
    setPageList()
})

const selectedToPrev = () => {
  pagination.page--
  setPageList()
}

const selectedToNext = () => {
  pagination.page++
  setPageList()
}

const setPageList = () => {
  const startIndex = (pagination.page - 1 ) * pagination.numToPage
  const endIndex = startIndex + pagination.numToPage
  pageList.value = dataList.slice( startIndex, endIndex)
}
</script>

<template>
  <h1>UI Pagination</h1>
  <div class="example-list">
    <div class="num-block" v-for="rank in pageList" :key="rank">{{ rank }}</div>
  </div>
  <div class="btf-pagination">
    <div class="prev-btn control" :class="{disabled: disablePrev}" @click="selectedToPrev">
      <span><</span>
    </div>
    <div class="next-btn control" :class="{disabled: disableNext}" @click="selectedToNext">
      <span>></span>
    </div>
    <div class="pagination">
      <div class="current num-block">{{ pagination.page }}</div>
      <span>/</span>
      <div class="total">{{ pageLength }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.btf-pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 9px;
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    line-height: 1;
    .num-block {
      width: 32px;
      height: 32px;
      padding: 10px 12px;
      line-height: 1;
      outline: 1px solid var(--color-border);
      border-radius: 4px;
      text-align: center;
    }
  }
  .control {
    padding: 6px;
    border-radius: 50%;
    outline: 1px solid var(--color-border);
    text-align: center;
    width: 24px;
    height: 24px;
    line-height: 1;
    &> span {
      display: inline-block;
    }
    &.next-btn {
      order: 1
    }
    &:hover {
      background-color: rgba(255, 255, 255, 0.25);
    }
    &.disabled {
      pointer-events: none;
      background-color: #454545;
      opacity: 0.5;
    }
  }
}
.num-block {
  width: 32px;
  height: 32px;
  padding: 10px 4px;
  line-height: 1;
  outline: 1px solid var(--color-border);
  border-radius: 4px;
  text-align: center;
  font-family: Roboto;
  font-size: 13px;
  &.current {
    color: #FC004E;
    font-weight: 500;

  }
}
.example-list {
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
}
</style>