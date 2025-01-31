<script setup>
import onMouseDown from '@/lib/flexible-view'
import SlideSideLayout from '@/packages/SlideSideLayout/SlideSideLayout.vue'
import { ref } from "vue";
// const toggleSideLeft = ref(true);
// const toggleSideRight = ref(true);
const toggleSide = ref(true);
const slideType = ["push", "overlay", "cover", "expand"];
const icons = ['home', 'star', 'lock', 'new']
const selectedType = ref("expand");
// const selectedTypeLeft = ref("push");
// const selectedTypeRight = ref("overlay");

const direct = ref('left')
const sideWidth = 300
</script>

<template>
  <div
    class="container">
    <!-- <SlideSideLayout :is-show="toggleSide" :type="selectedType" :min-side-width="60">
      <template #toggle>
        <button
          class="toggler ga-button primary icon circle" :class="{ show: toggleSide }"
          @click="toggleSide = !toggleSide"
        >
          <i class="icon fa fa-chevron-left"></i>
        </button>
      </template>
      <template #side>
        <div class="side-nav">SIDE NAV</div>
      </template>
      <template #main>
        <div class="item-content">
          <h1>Main Contents</h1>
          <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus libero doloremque inventore, impedit distinctio exercitationem sunt cumque dolore eaque facilis laudantium quam ducimus ex et natus animi obcaecati modi praesentium!</h3>
        </div>
      </template>
    </SlideSideLayout> -->



    <div class="silde-side-pane layout-h" :class="[{ 'show': toggleSide }, selectedType, direct]"   @mousedown="onMouseDown">
      <div class="side-pane" :class="[ `item-${direct}`]">
        <div class="side-nav">
          <div class="nav-header">
            <button
              class="ga-button primary icon circle"
              @click="toggleSide = !toggleSide"
            >
              <i class="icon fa fa-chevron-left"></i>
            </button>

          </div>
          <div class="ga-list selection">
            <div class="item" v-for="(type, i) in slideType" :key="type" :class="[{ select: selectedType === type }]" @click="selectedType = type">
              <i class="list-icon icon" :class="`xi-${icons[i]}`" :style="{ anchorName: `--nav-${i}`}"></i>
              <div class="item-title" :style="{ positionAnchor: `--nav-${i}`, positionArea: 'right center' }"> {{ type.toUpperCase() }}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="flexible-handle" :style="{width: '5px'}"></div> -->
      <div class="main-pane item-content">
        <div class="contents-wrapper">
          <h1>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique alias nobis in libero suscipit harum, qui mollitia non, ipsam commodi eveniet? Repellendus nisi nihil hic eveniet mollitia, consectetur voluptatibus voluptates.</h1>
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
.ga-list > .item {
  padding: 1rem;
  &:hover {
    background-color: #00000011;
  }
  &.select {
    background-color: #fff;
  }
}
.flexible-handle:hover {
  flex-shrink: 0;
  width: 10px;
  background-color: #6d9d72;
}
.toggler {
  position: absolute;
  top: 14px;
  transition: transform 500ms ease;
  z-index: 10;
  left: 100%;
  transform: translateX(50%) rotate(0);
  &.show {
    transform: translateX(-50%) rotate(180deg);
  }
}
.side-nav {
  width: 100%;
  height: 100%;
  color: #333;
  background-color: #d6d6d6;
  .nav-header {
    padding: 1rem;
    height: 60px;
  }
}
.item-content {
  color: #333;
  padding: 1em;
}
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
    padding: 0;
    .contents-wrapper {
      width: 100%;
      height: 100%;
      min-width: 600px;
      overflow: auto;
      display: grid;
      place-items: center;
      h1 {
        margin-left: 50px;
      }
    }
    .display-mark-width {
      width: calc(100% - 10px);
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
  --icon: 48;
  --side: 300;
  height: 100%;
  overflow: hidden;
  &.expand,
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
    box-sizing: border-box;
    button {
      position: absolute;
      top: 14px;

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
  &.expand {
    display: flex;
    .item-left,
    .item-right {
      transition: width 500ms ease;
      width: calc(var(--icon) * 1px);
      margin: 0;
      overflow:hidden;
      .ga-list .item-title {
        opacity: 0;
        transition: opacity 500ms;
      }
    }
    .side-pane {
      button {
        position: absolute;
        left: auto;
        right: 7px;
        transform: translateX(0) rotate(0);
      }
    }
  }
  .item-left, .item-right {
    button {
      position: absolute;
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
  &.show.push,
  &.show.overlay {
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
  &.show.expand {
    .item-left, .item-right {
      margin: 0;
      width: calc(var(--side) * 1px);
      .ga-list .item-title {
        opacity: 1;
      }
    }
  }
}
</style>
