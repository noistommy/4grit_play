<script setup>
defineProps({
  columns: {
    type: Array
  }
})
</script>

<template>
  <div class="header-row grid-row">
    <div class="header-column grid-column" 
      v-for="(col, idx) in columns"
      :key="idx"
      :style="{ flexBasis: `${col.width}px`, maxWidth: `${col.width}px` }"
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
</template>

<style lang="scss" scoped>
@use './be-data-table.scss' as *;
</style>