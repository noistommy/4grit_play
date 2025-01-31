<script setup>

defineProps({
  type: {
    type: String,
    default: 'push'
  },
  direct: {
    type: String,
    default: 'left'
  },
  sideWidth: {
    type: Number,
    default: 250
  },
  minSideWidth: {
    type: Number,
    default: 0
  },
  isShow: {
    type: Boolean,
    default: false
  },
  duration: {
    type: Number,
    default: 500
  }
})


</script>

<template>
  <div class="slide-side-layout" :class="[type, direct, { show: isShow }]" :style="{ '--dur': duration}">
    <div class="side-pane" :style="{ '--side': sideWidth, '--min-side': minSideWidth }">
      <slot name="toggle">
      </slot>
      <slot name="side">Side</slot>
    </div>
    <div class="main-pane">
      <slot name="main">Main</slot>
    </div>
  </div>
</template>

<style lang="scss">
.slide-side-layout {
  --dur: 500;
  height: 100%;
  overflow: hidden;
  &.push {
    display: flex;
    .side-pane {
      flex-shrink: 0;
    }
    .main-pane {
      flex-grow: 1;
    }
  }
  
  &.overlay, &.cover {
    position: relative;
    .side-pane {
      position: absolute;
      // box-shadow: 0 0 8px 2px rgba(0, 0, 0, 0.6)
    }
  }
  &.cover {
    .main-pane {
      position: absolute;
      // width: calc(100% - 50px);
      top: 0;
      z-index: 100;
      transition: width calc(var(--dur) * 1ms) ease;
      box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.6)
    }
    &.left .side-pane { right: 0; }
    &.right .side-pane { left: 0; }
    .side-pane {
      margin: 0 !important;
    }
  }
  &.left .side-pane {
    left: 0;
    margin-left: calc(var(--side) * -1px);
  }
  &.right .side-pane {
    right: 0;
    margin-right: calc(var(--side) * -1px);
    order: 1;
  }
  &.expand {
    display: flex;
    .side-pane {
      width: calc(var(--min-side) * 1px);
      margin: 0;
      transition: width calc(var(--dur) * 1ms) ease;
      overflow: hidden;
    }
  }
  .side-pane {
    position: relative;
    top: 0;
    width: calc(var(--side) * 1px);
    height: 100%;
    transition: margin calc(var(--dur) * 1ms) ease;
    z-index: 1;
  }
  &.show.push,
  &.show.overlay {
    &.left .side-pane {
      transition: margin calc(var(--dur) * 1ms) ease;
      margin: 0;
    }
    &.right .side-pane {
      transition: margin calc(var(--dur) * 1ms) ease;
      margin: 0;
    }
  }
  &.show.cover {
    .side-pane {
      margin: 0;
    }
    .main-pane {
      width: calc(100% - var(--side) * 1px);
    }
  }
  &.show.expand {
    .side-pane {
      width: calc(var(--side) * 1px);
    }
  }
}
</style>