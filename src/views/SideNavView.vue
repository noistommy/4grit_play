<script setup>
import { ref } from "vue";
// const toggleSideLeft = ref(true);
// const toggleSideRight = ref(true);
const toggleSide = ref(true);
const slideType = ["push", "overlay", "cover"];
const selectedType = ref("push");
// const selectedTypeLeft = ref("push");
// const selectedTypeRight = ref("overlay");

const direct = ref('left')

const sideWidth = 300
</script>

<template>
  <div
    class="container">
    <div class="silde-side-pane" :class="[{ 'show': toggleSide }, selectedType, direct]" :style="{'--side': sideWidth}">
      <div class="side-pane" :class="[ `item-${direct}`]">
        <button
          class="ga-button primary icon circle"
          @click="toggleSide = !toggleSide"
        >
          <i class="icon fa fa-chevron-left"></i>
        </button>

        <div class="ga-buttons">
          <div
            class="ga-button"
            v-for="type in slideType"
            :key="type"
            :class="[
              { selected: selectedType === type },
              { disabled: type === 'cover1' },
            ]"
            @click="selectedType = type"
          >
            {{ type.toUpperCase() }}
          </div>
        </div>
      </div>
      <div class="main-pane item-content">
        <div class="display-mark-width" ></div>
        <template v-if="selectedType === 'cover'">
          <button
            class="ga-button primary icon circle"
            @click="toggleSide = !toggleSide"
          >
          <i class="icon fa fa-chevron-left"></i>
        </button>
        </template>
        <div class="ga-buttons">
          <button class="ga-button" :class="{selected: direct === 'left'}" @click="direct = 'left'">Left</button>
          <button class="ga-button" :class="{selected: direct === 'right'}" @click="direct = 'right'">Right</button>
        </div>
        <!-- <div class="test-flex">
          <div class="test-item ellipsis" v-for="item in 12" :key="item">{{ item }}</div>
        </div> -->
      </div>
      <!-- <div class="side-pane item-right" :class="selectedTypeRight">
        <button
          class="ga-button primary icon circle"
          @click="toggleSideRight = !toggleSideRight"
        >
          <i class="icon fa fa-chevron-left"></i>
        </button>
        <div class="ga-buttons">
          <div
            class="ga-button"
            v-for="type in slideType"
            :key="type"
            :class="[
              { selected: selectedTypeRight === type },
              { disabled: type === 'cover' },
            ]"
            @click="selectedTypeRight = type"
          >
            {{ type.toUpperCase() }}
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
.test-flex {
  color: #333;
  display: flex;
  width: 100%;
  gap: 1px;
  position: relative;
  .test-item {
    min-width: 100px;
    max-width: 100px;
    flex-basis: 100px;
    text-align: center;
    background-color: #f2f2f2;
    &:first-child {
      position: sticky;
      left: 0;
    }
  }
}
.container {
  position: relative;
  background-color: #f0f0f0;
  
  // height: calc(100vh - 80px);
  .item-content {
    .display-mark-width {
      width: 100%;
      height: 0;
      border: 4px dashed #ccc;
      position: relative;
      padding: 0 5px;
      &:before,
      &:after {
        content: '';
        position: absolute;
        width: 40px;
        height: 40px;
        border: 10px solid #ccc;
        top: 50%;
      }
      &:before {
        left: 0;
        transform: translateY(-50%) rotate(45deg);
        border-top-width: 0;
        border-right-width: 0;
      }
      &:after {
        right: 0;
        transform: translateY(-50%) rotate(-45deg);
        border-top-width: 0;
        border-left-width: 0;
      }
    }
  }
}
.silde-side-pane {
  --side: 250;
  height: 100%;
  overflow: hidden;
  &.push {
    display: flex;
    .item-left,
    .item-right {
      flex-shrink: 0;
    }
    .item-content {
      flex-grow: 1;
    }
  }
  
  &.overlay, &.cover {
    position: relative;
    .item-left,
    .item-right {
      position: absolute;
      // box-shadow: 0 0 8px 2px rgba(0, 0, 0, 0.6)
    }
  }
  &.cover {
    .item-content {
      position: absolute;
      // width: calc(100% - 50px);
      top: 0;
      z-index: 100;
      transition: width 500ms ease;
      box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.6)
    }
    &.left .item-content { right: 0; }
    &.right .item-content { left: 0; }
    .item-left, .item-right {
      margin: 0 !important;
    }
  }
  .side-pane {
    position: relative;
    top: 0;
    width: calc(var(--side) * 1px);
    height: 100%;
    background-color: #141414EE;
    transition: margin 500ms ease;
    z-index: 1;
    padding: 1rem;
    button {
      position: absolute;
      top: 30px;

      transition: transform 500ms ease;
      z-index: 10;
    }
    &.item-left {
      left: 0;
      margin-left: calc(var(--side) * -1px);
      button {
        left: 100%;
        transform: translateX(50%) rotate(0);
      }
    }
    &.item-right {
      right: 0;
      margin-right: calc(var(--side) * -1px);
      order: 1;
      button {
        right: 100%;
        transform: translateX(-50%) rotate(180deg);
      }
    }
  }
  .item-left, .item-right {
    button {
      position: absolute;
      top: 30px;
      transition: transform 500ms ease;
      z-index: 10;
    }
  }
  .item-content {
    width: 100%;
    height: 100%;
    // position: relative;
    background-color: #fff;
    display: grid;
    place-items: center;
    overflow-x: auto;
    // justify-content: center;
    // align-items: center;
  }
  &.show:not(.cover) {
    .item-left {
      transition: margin 500ms ease;
      margin: 0;
      button {
        transform: translateX(-50%) rotate(180deg);
      }
    }
    .item-right {
      transition: margin 500ms ease;
      margin: 0;
      button {
        transform: translateX(50%) rotate(0deg);
      }
    }
  }
  &.show.cover {
    .item-left, .item-right {
      margin: 0;
    }
    .item-content {
      width: calc(100% - var(--side) * 1px);
    }
  }
}
</style>
