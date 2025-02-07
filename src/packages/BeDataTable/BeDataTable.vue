<script setup>
import { ref } from 'vue'
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

const hoveredIndex = ref(null)


</script>

<template>
<div class="be-data-table" :class="{'fixed-on': props.useFixed}">
  <div class="data-table-header-group">
    <div class="data-table-header-wrapper ">
      <div class="data-table-header-title-row">title</div>
      <div class="header-row grid-row">
        <div class="header-column grid-column" v-for="(col, idx) in columns" :key="idx" :class="[{main: idx === 0},{fixed: col.isFix}]">
          <div class="header-cell grid-cell">
            <div class="title-wrapper">
              <div class="column-title">{{ col.name }} {{ idx + 1 }}</div>
              <template v-if="col.sort">
                <div class="sort-btn">
                  <i class="xi-arrow-down"></i>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="data-table-body-wrapper">
    <div class="body-row grid-row" v-for="row in 30" :key="row">
      <div 
        class="body-column grid-column"
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
$table-cell-h-padding: calc((14 / 14) * 1em);
$table-cell-v-padding: calc((9 / 14) * 1em);
$table-cell-padding: $table-cell-v-padding $table-cell-h-padding;
$table-border-color: #ddd;
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
        padding: $table-cell-padding;
        line-height: 1;
        border-bottom: 1px solid;
        border-right: 1px solid;
        border-color: $table-border-color;
        display: flex;
        justify-content: center;
        &.header-cell {
          border-top: 1px solid;
          border-color: $table-border-color;
        }
      }
    }
    &:hover {
      background-color: rgba(0, 0, 0, 0.16);
    }
  }
  .data-table-header-group {
    background-color: #eee;
    position: sticky;
    top: 0;
    z-index: 200;
  }
  .data-table-header-title-row {
    color: #333;
    padding: $table-cell-padding;
    background-color: #eee;
    max-width: 1000px;
    position: sticky;
    left: 0;
  }
  .data-table-header-wrapper {
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
      .title-wrapper {
        text-align: center;
        width: 100%;
        display: flex;
        .column-title {
          flex-grow:1;
        }
        
      }
    }
  }
  .data-table-body-wrapper {
    position: relative;
    width: 100%;
    .body-column {
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