<script setup>
import { ref } from 'vue'
const toggleSide = ref(true)
const slideType = ['push', 'overlay', 'cover']
const selectedType = ref('push')
</script>

<template>
  <div class="container" :class="[{show: toggleSide}, selectedType]">
    <div class="left-side-pane item-left">
      <button class="ga-button primary icon circle" @click="toggleSide = !toggleSide">
        <i class="icon fa fa-chevron-left"></i>
      </button>
    </div>
    <div class="main-pane item-right">
      <div class="ga-buttons">
        <div class="ga-button" 
        v-for="type in slideType" :key="type" 
        :class="[{selected: selectedType === type}, {disabled: type === 'cover'}]" 
        @click="selectedType = type">{{ type.toUpperCase() }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  //background-color: #f2f2f2;
  
  height: calc(100vh - 80px);
  &.push {
    display: flex;
    gap: 5px;
    .item-left {
      flex-shrink: 0;
    }
    .item-right {
      flex-grow: 1;
    }
  }
  &.overlay {
    position: relative;
    .item-left {
      position: absolute;
    }
  }
  &.cover {

  }
  .item-left {
    position: relative;
    width: 300px;
    height: 100%;
    background-color: #ddd;
    //overflow: hidden;
    transition: margin 500ms ease;
    margin-left: -300px;
    z-index: 1;
    button {
      position: absolute;
      top: 30px;
      left: 100%;
      transform: translateX(50%) rotate(0);
      transition: transform 500ms ease;
      z-index: 10;
    }
  }
  .item-right {
    width: 100%;
    height: 100%;
    // position: relative;
    background-color: #fff;
    padding: 1rem 4rem;
    display: grid;
    place-items: center;
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
  }
}
</style>