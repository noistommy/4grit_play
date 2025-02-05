<script setup>
import { ref, computed } from 'vue'
const props = defineProps({
  useFixed: {
    type: Boolean,
    default: false
  }
})
const columns = [
  { key: 'id', name: '아이디', type: 'string', isFix: true},
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

const hoveredIndex = ref(null)


</script>

<template>
<div class="be-data-table" :class="{'fixed-on': props.useFixed}">
  <div class="table-header-wrapper ">
    <div class="header-row grid-row">
      <div class="header-column grid-column" v-for="(col, idx) in columns" :key="idx" :class="[{main: idx === 0},{fixed: col.isFix}]">
        <div class="header-cell grid-cell">
          {{ col.name }} {{ idx + 1 }}
          <template v-if="col.type === 'array'">
            <span>A</span>
          </template>
        </div>
      </div>
    </div>
  </div>
  <div class="table-body-wrapper">
    <div class="table-body-row grid-row" v-for="row in 30" :key="row">
      <div 
        class="table-body-column grid-column"
        v-for="(val, jdx) in columns"
        :key="`value-${jdx}`"
        :class="[{main: jdx === 0},{fixed: val.isFix}, {'col-hover': hoveredIndex === jdx}]"
        @mouseenter="hoveredIndex = jdx" @mouseleave="hoveredIndex = null"
      >
        <div class="cell grid-cell">
          value {{ jdx + 1 }}
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<style lang="scss" scoped>
.be-data-table {
  position: relative;
  background-color: #f8f8f8;
  width: 2600px;
  .grid-row {
    display: flex;
    width: 100%;
    .grid-column {
      flex: 1 0 auto;
      flex-basis: 180px;
      // max-width: 200px;
      flex-shrink: 0;
      &.main {
        flex-basis: 400px;
        flex-grow: 1;
      }
      .grid-cell {
        
        padding: 1rem;
        line-height: 1;
        border-bottom: 1px solid;
        border-right: 1px solid;
        border-color: #ddd;
        display: flex;
        justify-content: center;
        &.header-cell {
          border-top: 1px solid;
        }
      }
    }
    &:hover {
      background-color: rgba(0, 0, 0, 0.16);
    }
  }
  .table-header-wrapper {
    position: sticky;
    top: 0;
    z-index: 200;
    .header-column {
      color: #333;
      background-color: #eee;
      font-weight: 700;
      &:first-child {
        border-top-left-radius: 14px;
        border-bottom-left-radius: 14px;
      }
      &:last-child {
        border-top-right-radius: 14px;
        border-bottom-right-radius: 14px;
      }
    }
  }
  .table-body-wrapper {
    position: relative;
    width: 100%;
    .table-body-column {
      color: #333;
      background-color: transparent;
      &.col-hover {
        background-color: rgba(0, 0, 0,0.04);
      }
    }
  }
  &.fixed-on {
    .grid-column {
      &.fixed {
        background-color: #f2f2f2;
        position: sticky;
          left: 0px;
      }
    }
  }
}
</style>