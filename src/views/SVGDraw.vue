<script setup>
import { ref, reactive } from 'vue'

const TEST_COLORS = ['#f44336', '#e81e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722']

const viewSize = 940
const lcSize = 940
const scSize = 340
const sradius = scSize / 2
const selectedItem = ref(0)
const roulette = reactive({
    data: ['#f44336', '#e81e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722'],
    cx: viewSize / 2,
    cy: viewSize / 2,
    radius: lcSize / 2,
    sortedValues: [],
    strokeWidth: 270
})
const base_color = '#0085FF'
const selected_color = '#005BE3'


const length = roulette.data.length
console.log(import.meta.env.VITE_CDN_URL)

// const cdn = import.meta.env.VITE_CDN_URL
// const angleOffset = -90
// const circle = Math.PI * 2 * roulette.radius

const itemAngle = 360 / length

const offsetAngle = -180 + itemAngle

const calcAngle = (index) => {
    return `rotate(${itemAngle * index + offsetAngle}, ${roulette.cx}, ${roulette.cy})`
}

const calcTextPos = (index) => {
    const angle = (itemAngle / 2) + (itemAngle * index)
    // console.log(angle)
    return getPoint(angle, roulette.radius, roulette.cx, roulette.cy)
}

const getPoint = (ang, radius, cx, cy) => {
    const radian = ang * (Math.PI / 180)
    return {
        x: (radius * Math.cos(radian) + cx),
        y: (radius * Math.sin(radian) + cy),
    }
}

const getCircle = () => {
  const { radius: R, cx, cy } = roulette
  const sR = scSize / 2
  return `
  M 0 ${cx} 
  a ${R} ${R} 0 1 1 ${viewSize} 0 
  a ${R} ${R} 0 1 1 ${viewSize * -1} 0
  Z
  M ${cx - sR} ${cx}
  a ${sR} ${sR} 0 1 1 ${scSize} 0 
  a ${sR} ${sR} 0 1 1 ${scSize * -1} 0
  Z
  `
}

const getSectorPath = () => {
    const { radius, cx, cy } = roulette
    const {x: ax, y: ay} = getPoint(itemAngle/2, radius, cx, cy)
    const {x: bx, y: by} = getPoint(-itemAngle/2, radius, cx, cy)
    const {x: fx, y: fy} = getPoint(itemAngle/2, sradius, cx, cy)
    const {x: dx, y: dy} = getPoint(-itemAngle/2, sradius, cx, cy)
    const path = `
    M ${ax} ${ay} A ${radius} ${radius} 0 0 0 ${bx} ${by} L ${dx} ${dy} A ${sradius} ${sradius} 0 0 1  ${fx} ${fy}Z
    `
    return path
}
let degree = 0
let distance = 0
let spinCount = 0
let isCC = -1
let start
const spinning = ref(false)
const rouletteRef = ref(null)

const bounceSpin = () => {
    if (Math.abs(itemAngle * selectedItem.value - degree) < 1) return false
    degree = degree + (itemAngle * selectedItem.value - degree) * 0.1
    rouletteRef.value.style.transform = `rotate(${degree * -1}deg)`
    requestAnimationFrame(bounceSpin)
}

const rouletteSpin = (timestemp) => {
  if (start === undefined) start = timestemp
  start = timestemp - start
  console.log(Number(start))
    spinning.value = true
    const inc = 0.01
    let result = itemAngle * selectedItem.value + (spinCount * 360) + 1
    if (distance >= length / 2) {
        result = result + (360 * isCC)
    } 
    // if (result > 180) result = result - 360
    // const offset = itemAngle * (distance)
    // console.log(result, distance, selectedItem.value)
    if (Math.abs(result - degree) < 1) {
        rouletteRef.value.style.transform = `rotate(${(result - 1) * - 1 }deg)`
        console.log('bounce', degree)
        spinning.value = false
        spinCount = 0
        return 
        // result = itemAngle * (selectedItem.value - 1)
    } else {
        let offset = (result - degree) * inc > 360 ? (result - degree) * inc * 5  : (result - degree) * inc 
        degree = degree + offset
        rouletteRef.value.style.transform = `rotate(${degree * -1}deg)`
        requestAnimationFrame(rouletteSpin)
    }
    
}

const currentSpin = () => {
    degree = itemAngle * selectedItem.value
    rouletteRef.value.style.transform = `rotate(${degree * -1})`
}

const resetSpin = () => {
    degree = 0
    distance = 0
    rouletteRef.value.style.transform = `rotate(0)`
    selectedItem.value = 0
}

const setRoulette = (num) => {
  console.log(num)
    if (num < 0) num = length - 1
    if (num === length) num = 0
    isCC = num - selectedItem.value > 0 ? -1 : 1
    distance = Math.abs(num - selectedItem.value)
    console.log(distance)
    // distance = distance > length / 2 ? (length - distance) * -1 : distance 
    // console.log(distance * isCC)
    
    currentSpin()
    selectedItem.value = num
    rouletteSpin()
}

const runRoulette = () => {
  spinCount = 0
  const num = parseInt(Math.random()*100%16)
  setRoulette(num)
}

const fliped = ref(false)
</script>


<template>
    <div>
        <!-- <h3>svg circle {{ circle }}</h3> -->
        <div class="control">
            <button @click="resetSpin">RESET</button>
            <template v-for="(num, i) in roulette.data" :key="num+i">
              <button @click="setRoulette(i)">{{ i + 1 }}</button>
            </template>
            <button @click="setRoulette(selectedItem - 1)"><</button> 
            <button @click="setRoulette(selectedItem + 1)">></button> 
            <button @click="runRoulette">ROULETTE</button>
        </div>
        <div class="svg-container" :class="{span: spinning}">
            <svg width="100%" height="100%" :viewBox="`0 0 ${viewSize} ${viewSize}`"  xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <path :d="getSectorPath()" id="sector" />

                  <!-- <text id="sector-text" opacity="0.6"
                  font-size="12px" fill="#fff" text-anchor="middle" 
                  >
                    <tspan font-weight="bold"></tspan> 번입니다.
                    <tspan dx="-60" dy="16">두번째줄 처리</tspan>
                  </text> -->
                </defs>
                <path :d="getCircle()" fill-rule="evenodd" clip-rule="evenodd" :fill="base_color" />
                <!-- <circle :cx="roulette.cx" :cy="roulette.cy" :r="roulette.radius" fill="transparent" :stroke="base_color" :stroke-width="roulette.strokeWidth" ></circle> -->
                <use xlink:href="#sector" :fill="selected_color" :transform="calcAngle(0) " />
                <g ref="rouletteRef" transform-origin="center" :style="{ transsition: 'transform 250ms'}">
                    <g v-for="(color, i) in roulette.data" :key="color" :transform="calcAngle(i) " class="sector-item"
                    :class="{select: selectedItem === i}"
                    @click="setRoulette(i)"
                    >
                        <use xlink:href="#sector" fill="#45A6FF" opacity="0" />
                        <path :d="`M ${roulette.cx} ${roulette.cy} L ${getPoint(itemAngle/2, roulette.radius, roulette.cx, roulette.cy).x} ${getPoint(itemAngle/2, roulette.radius, roulette.cx, roulette.cy).y}`" stroke="#fff" stroke-opacity="0.2" />
                        <text :x="calcTextPos(0).x" :y="calcTextPos(0).y" opacity="0.6"
                        font-size="20px" fill="#fff" text-anchor="middle" dx="65" dy="85" font-family="Noto Sans KR" font-weight="700"
                        :transform="`rotate(${180}, ${calcTextPos(0).x}, ${calcTextPos(0).y})`"
                        ><tspan font-weight="bold">{{ i + 1 }}</tspan> 번입니다.
                            <tspan dx="-110" dy="20">두번째줄 처리</tspan>
                        </text>
                    </g>
                </g>
                <!-- <g class="center-area">
                  <g class="back">
                      <circle :cx="roulette.cx" :cy="roulette.cy" :r="60" fill="#2D3D91" stroke="#fff"  :stroke-width="2" >
                      </circle>
                      <text :x="roulette.cx" :y="roulette.cy"  fill="#fff" font-size="20px" font-weight="900" text-anchor="middle" dy="8">AI REPORT</text>
                  </g>
                </g> -->
                <g id="roulette-arrow" :transform="`translate(10, ${roulette.cy - 140} ) rotate(25)`" transform-origin="50%, 50%"> 
                    <path d="M 20, 0 C 60, 4 60, 16 20, 20 C 5, 20 5, 0 20, 0Z"
                    stroke="#fff" 
                    fill="#00224B" filter="drop-shadow(0px 4px 8.2px rgba(0, 0, 0, 0.25)"></path>
                    <circle cx="20" cy="10" r="5" fill="#fff"></circle>
                </g>
                <g>
                  <circle :cx="getPoint(30, roulette.radius, roulette.cx, roulette.cy).x" :cy="getPoint(30, roulette.radius, roulette.cx, roulette.cy).y" r="10" stroke="#fff" stroke-width="2"/>
                  <circle :cx="getPoint(150, roulette.radius, roulette.cx, roulette.cy).x" :cy="getPoint(150, roulette.radius, roulette.cx, roulette.cy).y" r="10" stroke="#fff" stroke-width="2"/>
                  <circle :cx="getPoint(210, roulette.radius, roulette.cx, roulette.cy).x" :cy="getPoint(210, roulette.radius, roulette.cx, roulette.cy).y" r="10" stroke="#fff" stroke-width="2"/>
                  <circle :cx="getPoint(-30, roulette.radius, roulette.cx, roulette.cy).x" :cy="getPoint(-30, roulette.radius, roulette.cx, roulette.cy).y" r="10" stroke="#fff" stroke-width="2"/>
                </g>
            </svg>
            <div class="panel" :class="{flip: fliped}">
              <div class="card front">
                
                <div class="contents" @mouseenter="fliped = true" @mouseleave="fliped = false">FRONT</div>
                <div class="extra">
                  extra
                </div>
              </div>
              <div class="card back">BACK</div>
            </div>
            <path :d="getCircle()" fill="#fff" />
        </div>
        <!-- <img :src="`${cdn}/home/images/main/top-0-2.png`" alt=""> -->
    </div>
</template>

<style lang="scss" scoped>
.svg-container {
    max-width: 940px;
    max-height: 940px;
    width: 100%;
    height: 1000px;
    margin: 30px auto;
    //background-color: rgba(255, 255, 255, 0.06);
    //background-color: #f4f4f4;
    .spin {
      svg {
        pointer-events: none;
      }
    }
    position: relative;
    .panel {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 188px;
      height: 233px;
      perspective: 1000px;
      .card {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 10px;
        border: 1px solid rgba(0, 0, 0, 0.32);
        box-shadow: 0px 22px 22px -7px rgba(0, 0, 0, 0.16);
        transition: transform .5s ease-out;
        transition-delay: .25s;
        backface-visibility: hidden;
        &.front {
          z-index: 2;
          color: #333;
          font-weight: 900;
          background-color: #fff;
          display: flex;
          flex-direction: column;
          .contents {
            padding: 18px;
            flex-grow: 1;
          }
          .extra {
            padding: 18px;
            border-top: 1px solid #d6d6d6;
            height: 60px;
          }
        }
        &.back {
          padding: 18px;
          z-index: 1;
          color: var(--color-text);
          background-color: #222;
          transform: rotateY(-180deg);
        }
      }
      &.flip .front {
        z-index: 1;
        transform: rotateY(-180deg);
      }
      &.flip .back {
        z-index: 2;
        transform: rotateY(0deg);
      }
    }
}
svg {
    g.sector-item {
      &.select text {
        opacity: 1;
      }
    }
    g.sector-item:not(.select){
      cursor: pointer;
        &:hover use, &:hover text {
            opacity: 1;
        }
    }
    g.sector-cover {
      cursor: pointer;
        &:hover use {
            opacity: 0;
        }
    }
}
img {
    width: 100%;
}

#path-sector {
    &:hover {
        opacity: 0.5;
    }
}
@keyframes arrow-spin {
    0% {
        transform: rotate(25deg)
    }
    60% {
        transform: rotate(90deg)
    }
    100% {
        transform: rotate(-80deg)
    }
}
@keyframes rullet-spin {
    0% {
        transform: rotate(0)
    }
    10% {
        transform: rotate(calc(180deg * -1))
    }
    
    98% {
        transform: rotate(180deg * 100)
    }
    99.9% {
        transform: rotate(180deg * 110)
    }
    100% {
        transform: rotate(0)
    }
}
</style>

