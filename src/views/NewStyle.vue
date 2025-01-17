<script setup>
import { ref, computed, onMounted } from 'vue'
const position = [
  'top', 'left', 'bottom', 'right'
]
const align = [
  'start', 'center', 'end'
]

const selectH = ref('center')
const selectV = ref('center')

const setHPosition = computed(() => {
  let position
  if (selectH.value === 'start') {position = 'span-right'}
  else if (selectH.value === 'end') {position = 'span-left'}
  else position = selectH.value
  return position
}) 

const setVPosition = computed(() => {
  let position
  if (selectV.value === 'start') {position = 'span-bottom'}
  else if (selectV.value === 'end') {position = 'span-top'}
  else position = selectV.value
  return position
}) 

const setAnchorStyle = (pos, al) => {
  let item
  if (pos === 'top' || pos === 'bottom') {
    item = al === 'start' ? 'span-right' : al === 'end' ? 'span-left' : al
  }
  if (pos === 'left' || pos === 'right') {
    item = al === 'start' ? 'span-bottom' : al === 'end' ? 'span-top' : al
  }
  showNotice(pos, item)

}

const showNotice = (pos, align) => {
  const tt = document.createElement('div')
  tt.classList.add('positioned-notice', 'tooltip', pos)
  tt.style.positionArea = `${pos} ${align}`
  tt.textContent = 'Hello, world! Lorem ipsum dolor, sit amet consectetur adipisicing elit. '
  document.body.appendChild(tt)
  setTimeout(() => {
    tt.classList.add('show')
  },10)
}
const removeNotice = () => {
  document.querySelector('.positioned-notice').remove()
}

const checkOF = () => {
  let parent = document.querySelector('.card').parentElement;

  while (parent) {
      const hasOverflow = getComputedStyle(parent).overflow;
      if (hasOverflow !== 'visible') {
          console.log(hasOverflow, parent);
      }
      parent = parent.parentElement;
  }
}
onMounted(() => {
  checkOF()
})
</script>

<template>
  <h3>CSS Anchor API</h3>
  <div class="position-controll">
    <h4>Horizintal position</h4>
    <div class="buttons pos-h">
      <button class="ga-button" v-for="pos in posHList" :key="pos" :class="{selected: selectH === pos}" @click="selectH = pos">{{ pos }}</button>
    </div>
    <h4>Vertical position</h4>
    <div class="buttons pos-v">
      <button class="ga-button" v-for="pos in posVList" :key="pos" :class="{selected: selectV === pos}" @click="selectV = pos">{{ pos }}</button>
    </div>
  </div>
  <div class="container anchor-api">
    <div class="anchor-button ga-button icon red circle" @mouseenter="showNotice" @mouseleave="removeNotice">
      <i class="fa fa-anchor"></i>
    </div>
    
    <!-- <div class="positioned-notice tooltip">
      Hello, world!
    </div> -->
  </div>
  <div class="container tooltip-grid">
    <template v-for="pos in position" :key="pos">
      <template v-for="al in align" :key="al">
        <div class="item" @mouseenter="setAnchorStyle(pos, al)" @mouseleave="removeNotice">

          {{pos}}-{{al}}
        </div>
      </template>
    </template>
  </div>
  <h3>New Accordion</h3>
  <div class="conainer accordion">
    <details v-for="det in 4" :key="det" name="`accor-list`">
      <summary>Title summary-{{ det }}</summary>
      <p>contantes-{{det}}...</p>
    </details>
  </div>

  <div class="container">
    <div class="box" data-method="replace">replace</div>
    <div class="box" data-method="add">replace</div>
    <div class="box" data-method="accumulate">replace</div>
  </div>

  <div class="container scrolled">
    <div id="progress"></div>
    <div class="scroll-contents">
      <div class="target">
        <img src="../assets/test_svg.svg" alt="">
      </div>
      <ul class="cards">
        <li class="card"  v-for="card in 4" :key="card" :style="{'--index': card}">
          <div class="card-contents">
            <div class="title">Card {{card}}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss">
.container {
  // position: relative;
  border-bottom: 1px solid #454545;
}
.tooltip-grid {
  display: grid;
  grid-template-columns: repeat(3, 120px);
  grid-template-rows: repeat(3, auto);
  place-content: center;
  
  grid-gap: 5px;
  > .item {
    text-align: center;
    padding: 30px 5px;
    background-color: #2f2f2f;
    &:hover {
      background-color: #454545;
    }
  }
}
.anchor-api {
  width:100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.tooltip {
  position: relative;
  width: max-content;
  text-align: left;
  padding: 10px 20px;
  position: fixed;
  z-index: 9999;
  vertical-align: baseline;
  font-size: 13px;
  line-height: 1em;
  word-break: break-all;
  background-color: #000;
  color: #fff;
  max-width: 200px;
  // filter: drop-shadow(0 0 5px #50505033);
  border-radius: 4px;
  transition: all 500ms linear;
  transform: translate(0);
  opacity: 0;
  &.show {
    opacity: 1;
    &.top {transform: translateY(-10px);}
    &.bottom {transform: translateY(10px);}
    &.left {transform: translateX(-10px);}
    &.right {transform: translateX(10px);}
  }
  &:after {
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    clip-path: polygon(0 0, 100% 0, 50% 100%);
    background-color: inherit;
    margin: -1px;
  }
}
.anchor-button {
  anchor-name: --anchor-el;
}
.positioned-notice {
  position-anchor: --anchor-el;
  // position: absolute;
}
.accordion {
  details {
    summary {
      &:marker {
        display: none;
      }
    }
  }
}
.box {
  width: 5em;
  aspect-ratio: 1;
  outline: 1px dashed #aaa;
  display: grid;
  place-content: center;
  margin: 0 auto;
  margin-bottom: 100px;
  &:before,
  &:after {
    content: '';
    background-color: #555;
    width: 5em;
    aspect-ratio: 1;
    position: absolute;
    transform-origin: 50% 50%;
    transform: translateX(50px) rotate(45deg);
    z-index: -1;
  }
  &:after {
    background-color: lightseagreen;
    animation: adjust 5s infinite alternate;
  }
}

.box[data-method="replace"]::after {
	animation-composition: replace;
}

.box[data-method="add"]::after {
	animation-composition: add;
}

.box[data-method="accumulate"]::after {
	animation-composition: accumulate;
}

@keyframes adjust {
  to {
    transform: translateX(100px);
  }
}
.container.scrolled {
  height: 600px;
  overflow: scroll;
  
  .scroll-contents {
    width: 100%;
    height: 5000px;
    
  }
}

@keyframes grow-progress {
  from {transform: scaleX(0);}
  to {transform: scale(1);}
}

#progress {
  position: sticky;
  left: 0;
  top: 0;
  width: 100%;
  height: 1em;
  background-color: seagreen;
  transform-origin: 0 50%;
  animation: grow-progress auto linear;
  animation-timeline: scroll();
  z-index: 100;
}

.target {
  margin-top: 1500px;
  img {
    width: 50%;
    margin: 0 auto;
  }
}

@keyframes reveal-in {
  from { opacity: 0; transform: scale(0); }
  to { opacity: 1; transform: scale(1); }
}
@keyframes reveal-out {
  from { opacity: 1; transform: scale(1); }
  to { opacity: 0; transform: scale(0); }
}

img {
  animation: reveal-in linear, reveal-out linear;
  animation-timeline: view();
  animation-range: entry, exit;
}
.scroll-contents {
  .cards {
    --numbers: 4;
    width: 400px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(var(--numbers), 200px);
    height: 880px;
    gap: 20px;
    //view-timeline-axis: block;
    .card {
      padding-top: calc(var(--index)*1em);
      .card-contents {
        background-color: #fff;
        border-radius: 10px;
        padding: 20px;
        width: 100%;
        height: 200px;
        color: #333;
        transform-origin: 50% 0%;
        will-change: transform;
  
      }
    }
  }
}
</style>