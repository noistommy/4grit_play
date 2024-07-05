<script setup>
import { ref } from 'vue'

const TEST_COLORS = ['#f44336', '#e81e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722']

const aw = 640;

const list = ref(TEST_COLORS)

const itemWidth = aw / list.value.length

const hoverWidth = itemWidth * 0.5 * (list.value.length - 1) + itemWidth

const selected = ref(null)

</script>

<template>
  <div class="heatmap-wrapper" :style="{ width: `${aw}px`}">
    <div class="item-wrap" v-for="(item, i) in list" :key="item" :style="{ width: `${selected === i ? hoverWidth : itemWidth}px` }" @mouseenter="selected = i" @mouseleave="selected = null"> 
      <div class="contents" :style="{ backgroundColor: `${item}`, width: `${hoverWidth}px`, height: '800px'}">{{ item }}</div>
    </div>
  </div>
</template>

<style lang="scss">
.heatmap-wrapper {
  display: flex;
  .item-wrap {
    transition: width 1s;
    overflow: hidden;
  }

}
</style>