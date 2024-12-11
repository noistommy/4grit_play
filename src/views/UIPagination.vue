<script setup>
import { ref, reactive, onMounted, computed } from 'vue'

const paginationType = ref(1)
const firstPageNum = ref(1)
const dataList = new Array(431).fill(null).map((item, i) => { return i + 1 })
const pageList = ref([])
const pagination = reactive({
    page: 1,
    total: dataList.length,
    numToPage: 5, 
})
const pageRange = 5
const pageLength = ref(1)
const currentPage = ref(1)
const disablePrev = computed(() => {
  return currentPage.value === 1
})
const disableNext = computed(() => {
  return currentPage.value === pageLength.value
})

// const firstPageNum = computed(() => {
//   return currentPage.value > lastPageNum ? currentPage.value : firstPageNum
// })

const lastPageNum = computed(() => {
  const lastNum = firstPageNum.value + pageRange - 1
  return lastNum < pageLength.value ? lastNum : pageLength.value 
})

const visiablePages = computed(() => {
  const pages = []
  for (let i = firstPageNum.value; i <= lastPageNum.value; i++) {
    pages.push(i)
  }
  return pages
})

onMounted(() => {
    pageLength.value = Math.ceil(pagination.total / pagination.numToPage)
    currentPage.value = pagination.page
    setPageList()
})

const selectedToPrev = () => {
  currentPage.value--
  if (currentPage.value === firstPageNum.value - 1) firstPageNum.value = firstPageNum.value - 5
  setPageList()
}

const selectedToNext = () => {
  currentPage.value++
  if (currentPage.value === firstPageNum.value + 5 ) firstPageNum.value = currentPage.value
  setPageList()
}

const selectedToStart = () => {
  currentPage.value = 1
  firstPageNum.value = 1
}

const selectedToEnd = () => {
  firstPageNum.value = pageLength.value - pageLength.value % pageRange + 1
  currentPage.value = firstPageNum.value
}

const setPageList = () => {
  const startIndex = (currentPage.value - 1 ) * pagination.numToPage
  const endIndex = startIndex + pagination.numToPage
  pageList.value = dataList.slice( startIndex, endIndex)
}
</script>

<template>
  <h1>UI Pagination</h1>
  <div class="example-list">
    <div class="num-block" v-for="rank in pageList" :key="rank" v-btf-tooltip="rank">{{ rank }}</div>
  </div>
  <div class="btf-pagination">
    <div class="start-btn control" @click="selectedToStart">
      <span><i class="icon fa fa-chevrons-left"></i></span>
    </div>
    <div class="prev-btn control"
    v-btf-tooltip="{contents: 'PREV'}"
    :class="{disabled: disablePrev}"
    @click="selectedToPrev"
    >
      <span><i class="fa fa-chevron-left"></i></span>
    </div>
    <div class="next-btn control" :class="{disabled: disableNext}" v-btf-tooltip="`NEXT`" @click="selectedToNext">
      <span><i class="fa fa-chevron-right"></i></span>
    </div>
    <div class="end-btn control" @click="selectedToEnd">
      <span><i class="icon fa fa-chevrons-right"></i></span>
    </div>
    <div class="pagination">
      <template v-if="paginationType === 0">
        <div class="current num-block">{{ currentPage }}</div>
        <span>/</span>
        <div class="total">{{ pageLength }}</div>
      </template>
      <template v-else>
        <div class="num-block" v-for="page in visiablePages" :key="page" :class="{current: currentPage === page}">{{page}}</div>
      </template>
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
      padding: 10px 4px;
      line-height: 1;
      outline: 1px solid var(--color-border);
      border-radius: 4px;
      text-align: center;
    }
  }
  .control {
    padding: 4px;
    border-radius: 50%;
    outline: 1px solid var(--color-border);
    text-align: center;
    width: 24px;
    height: 24px;
    line-height: 1;
    &> span {
      display: inline-block;
    }
    &.next-btn, &.end-btn {
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
  min-width: 32px;
  height: 32px;
  padding: 10px 4px;
  line-height: 1;
  outline: 1px solid var(--color-border);
  border-radius: 4px;
  text-align: center;
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