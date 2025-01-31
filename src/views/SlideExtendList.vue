<script setup>
import { ref, computed } from 'vue'

const TEST_COLORS = new Array(8).fill(null)

const aw = 700;

const list = ref(TEST_COLORS)

const itemWidth = aw / list.value.length

const hoverWidth = itemWidth * 0.5 * (list.value.length - 1) + itemWidth


const selected = ref(null)


const captureSize = ref({
  w: 1600,
  h: 9455
})
const ratio = computed(() => {
  return 1600 / 7439
})
const hoverHeight = computed(() => {
  return hoverWidth / ratio()
})

const setMove = ({target, pageY}) => {
  console.log(target, pageY)
}
</script>

<template>
  <div class="heatmap-wrapper" :style="{ width: `${aw}px`, height: `${hoverWidth / ratio}px`}">
    <div class="title-wrapper">
      <div class="item-title" v-for="(item, i) in list" :key="item" :style="{ width: `${selected === i ? hoverWidth : selected !== null ? itemWidth * 0.5 : itemWidth}px` }">{{ i + 1 }}</div>
    </div>
    <div class="item-wrap"
      v-for="(item, i) in list" :key="item"
      :style="{ width: `${selected === i ? hoverWidth : selected !== null ? itemWidth * 0.5 : itemWidth}px`}"
      :class="{hover: selected === i}"
      :data-title="i+1"
      @mouseenter="selected = i" @mouseleave="selected = null" @click="selected === i"> 
      <div class="contents"
        :style="{ 
          backgroundColor: `${item}`,
          width: `${hoverWidth}px`,
          height: `${hoverWidth / ratio}px`,
          transform: `translateX(${selected === i ? 0 : aw / list.length * i / 2 * -1}px)`
        }"></div>
    </div>
  </div>
</template>

<style lang="scss">

.heatmap-wrapper {
  display: flex;
  padding-top: 20px;
  position: relative;
  background-color: rgba(255, 255, 255, 0.16);
  .title-wrapper {
    display: flex;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    .item-title {
      text-align: center;
      transition: width .25s;
    }
  }
  .item-wrap {
    //display: flex;
    flex-grow: 1;
    transition: all .25s;
    overflow: hidden;
    border: 1px solid #000;
    .contents {
      background: url('https://s3.ap-northeast-2.amazonaws.com/beusable-cdn/capture-hc-dev/20240415/5dfb0a88cc94b12972cdac0f/desktop.jpg?v=1720598180566');
      box-shadow: 0 0 18px rgba(0, 0, 0, 0.16) inset;
      background-size: 100%;

    }
    &:not(.hover) .contents {
      //transform: translateX(-50%);
    }

  }

}
</style>