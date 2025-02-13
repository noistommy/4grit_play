<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
const props = defineProps({
  useFixed: {
    type: Boolean,
    default: false
  },
  columns: {
    type: Array,
    default: () => {
      return []
    }
  }
})

const el = ref(null)
const hoveredIndex = ref(null)
const columnList = reactive(props.columns)
const totalWidth = computed(() => {
  return columnList.reduce((t, c) => {
    const item = c.width
    return t += item
  }, 0)
})
const minCellWidth = 100
const baseCellWidth = ref(null)

const setCellStyle = col => {
  let cellStyle = { flexBasis: `${col.width}px`, maxWidth: `${col.width}px` }
  if (col.isFix) {
    cellStyle.left = col.left + 'px'
  }
  return cellStyle
}

const setColumns = () => {
  let sumCol = 0
  columnList.forEach((column) => {
    if (!column.width) column.width = baseCellWidth
    if (column.isFix) column.left = sumCol
    sumCol += column.width
  });
}
onMounted(() => {
  const maxTable = el.value.parentElement.clientWidth
  baseCellWidth.value = Math.max(Math.floor(maxTable / props.columns.length), minCellWidth)
  setColumns()
})
</script>

<template>
<div class="be-data-table" :class="{'fixed-on': props.useFixed}" :style="{width: totalWidth + 'px'}" ref="el">
  <div class="data-table-header-group">
    <div class="data-table-header-wrapper ">
      <div class="data-table-header-title-row">
        <div class="main-title-wrapper"></div>
      </div>
      <div class="header-row grid-row">
        <div class="header-column grid-column" 
          v-for="(col, idx) in columnList"
          :key="idx"
          :style="setCellStyle(col, idx)"
          :class="[{main: idx === 0},{fixed: col.isFix}]"
          >
          <div class="header-cell grid-cell">
            <div class="title-wrapper">
              <div class="column-title">{{ col.name }}</div>
              <template v-if="col.sort">
                <div class="sort-btn">
                  <i class="xi-arrow-down" :class="{'xi-rotate-180':col.sort === 'desc'}"></i>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="data-table-body-wrapper">
    <div class="body-row grid-row" v-for="row in 80" :key="row">
      <div 
        class="body-column grid-column"
        v-for="(val, jdx) in columnList"
        :key="`value-${jdx}`"
        :style="setCellStyle(val, jdx)"
        :class="[val.type, {main: jdx === 0},{fixed: val.isFix}, {'col-hover': hoveredIndex === jdx}]"
        @mouseenter="hoveredIndex = jdx" @mouseleave="hoveredIndex = null"
      >
        <div class="cell grid-cell">
          <div :class="val.type">
            <template v-if="jdx===0">
              <div class="ga-button icon circle gray compact">
                <i class="xi-arrow-right"></i>
              </div>
            </template>
            <template v-else-if="val.type === 'tag'">
              <div class="ga-tag label blue">value {{ jdx + 1 }}</div>
            </template>
            <template v-else-if="val.type === 'mark'">
              value {{ jdx + 1 }}
              <!-- <span class="mark"></span> -->
            </template>
            <template v-else>
              value {{ jdx + 1 }}
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<style lang="scss" scoped>
$table-cell-h-padding: calc((14 / 14) * 1em);
$table-cell-v-padding: 0;
$table-cell-padding: $table-cell-v-padding $table-cell-h-padding;

$table-border-color: #eee;
$table-header-border-color: #ddd;
$table-color-bg: #fff;
$table-row-hover-color: #d7d7d7;
$table-cell-hover-color: #eeeeee; //rgba(0, 0, 0, 0.04)
$table-header-cell-bg: #eeeeee;
$table-header-title-bg: #eeeeee;

.be-data-table {
  position: relative;
  background-color: $table-color-bg;
  // width: 2600px;
  .grid-row {
    display: flex;
    width: 100%;
    .grid-column {
      flex: 1 0 auto;
      // max-width: 200px;
      flex-shrink: 0;
      border-bottom: 1px solid;
      border-right: 1px solid;
      border-color: $table-border-color;
      &.main {
        // flex-basis: 400px;
        flex-grow: 1;
      }
      .grid-cell {
        padding: $table-cell-padding;
        line-height: 1;
        // border-bottom: 1px solid;
        // border-right: 1px solid;
        // border-color: $table-border-color;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 37px;
        &.header-cell {
          padding: 0;
          margin: 0 5px;
          min-height: 42px;
          // background-color: #eee;
        }
      }
      &.header-column {
        // border-top: 1px solid;
        border-bottom: 0;
        border-color: $table-header-border-color;
        background-color: $table-header-cell-bg;
      }
    }
    &:hover:not(.header-row) {
      .grid-column {
        // background-color: rgba(0, 0, 0, 0.16);
        background-color: $table-row-hover-color;
        &.fixed {
          background-color: $table-row-hover-color;
        }
      }
    }
  }
  .data-table-header-group {
    // background-color: $table-header-cell-bg;
    position: sticky;
    top: 0;
    z-index: 200;
  }
  .data-table-header-title-row {
    color: #333;
    background-color: #fff;
    width: 100%;
    
    .main-title-wrapper {
      position: sticky;
      padding: $table-cell-padding;
      left: 0;
      width: fit-content;
    }
  }
  .data-table-header-wrapper {
    position: sticky;
    top: 0;
    z-index: 200;
    .header-column {
      cursor: pointer;
      color: #333;
      // background-color: #eeez
      font-weight: 700;
      &:first-child {
        border-top-left-radius: 14px;
        border-bottom-left-radius: 14px;
      }
      &:last-child {
        border-top-right-radius: 14px;
        border-bottom-right-radius: 14px;
      }
      .title-wrapper {
        text-align: center;
        width: 100%;
        display: flex;
        align-items: center;
        .sort-btn {
          display: block;
          cursor: pointer;
          color: #d6d6d6;
          padding: 3px;
          background-color: #fff;
          border-radius: 50%;
        }
        .column-title {
          flex-grow:1;
        }
        
      }
      &:hover {
        .sort-btn {
          color: #333;
        }
      }
      .sorted {
        .sort-btn {
          color: #6d9d72;
        }
      }
    }
  }
  .data-table-body-wrapper {
    position: relative;
    width: 100%;
    .grid-column {
      color: #333;
      background-color: transparent;
      &.col-hover {
        background-color: $table-cell-hover-color;
      }
    }
  }
  &.fixed-on {
    .grid-column {
      &.fixed {
        background-color: $table-color-bg;
        position: sticky;
        &.col-hover {
          background-color: $table-cell-hover-color;
        }
        &.header-column {
          background-color: $table-header-cell-bg;
        }
      }
    }
  }
}
</style>