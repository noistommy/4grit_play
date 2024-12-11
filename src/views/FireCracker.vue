<script setup>
import { ref } from 'vue'
const container = 340
const cx = container / 2
const cy = container / 2

const type = ref(0)

const particleNum = 100
const colors = ['#007ed9', '#ffa800', '#fb2aff', '#8424ff', '#82c416']
const randomY = () => {
  return (Math.random() * 100 % 50) + 120 
}
const randomAngle = (n) => {
  return (Math.random() * 360 / particleNum) + 360 / particleNum * n
}
const randomNum = () => {
  type.value = parseInt(Math.random() * 10) % 7
  return parseInt(Math.random() * 10) % 7
}
const showFire = ref(false)
const setTime = 'indefinite' // 'once' , 'indefinite'
const time = '12s'

const runFire = () => {
  showFire.value = true
  // setTimeout(() => {
  //   showFire.value = false
  // }, 1000);
}
const toggleSide = ref(true)
runFire()
</script>

<template>
  <svg :width="container" :height="container" :viewBox="`0 0 ${container} ${container}`" v-if="showFire">
    <defs>
      <circle id="circle_0" r="4" />
      <!-- <circle id="circle_1" r="6" /> -->
      <polygon  id="circle_2" points="-3, -3 3, -3 3, 3 -3, 3" />
      <!-- <polygon  id="circle_3" points="-5, -5 5, -5 5, 5 -5, 5" /> -->
      <polygon id="circle_3" points="8.660254037844387,4.999999999999999 6.123233995736766e-16,10 -8.660254037844386,5.0000000000000036 -8.660254037844389,-4.999999999999997 -1.8369701987210296e-15,-10 8.660254037844389,-4.9999999999999964" />
      <polygon id="circle_4" points="5.000000000000001,8.660254037844386 -10,1.2246467991473533e-15 4.999999999999993,-8.66025403784439" />
      <polygon   points="4.698463103929543,1.7101007166283435 2.5000000000000004,4.330127018922193 -0.8682408883346515,4.92403876506104 -3.8302222155948895,3.2139380484326976 -5,6.123233995736766e-16 -3.83022221559489,-3.2139380484326963 -0.868240888334656,-4.92403876506104 2.4999999999999964,-4.330127018922195 4.698463103929541,-1.710100716628347" />
      <path id="circle_5" d="M4.898587196589413e-16,-8,3.000000000000001,-5.196152422706632,6.92820323027551,-3.9999999999999996,6,0,6.92820323027551,3.9999999999999996,3.000000000000001,5.196152422706632,4.898587196589413e-16,8,-2.9999999999999987,5.196152422706632,-6.92820323027551,3.9999999999999996,-6,7.347880794884119e-16,-6.928203230275509,-4.000000000000001,-3.0000000000000027,-5.19615242270663Z" />
      <path id="circle_1" d="M7.347880794884119e-16,-12,1.035276180410083,-3.8637033051562732,6.000000000000002,-10.392304845413264,2.8284271247461903,-2.82842712474619,10.392304845413264,-5.999999999999999,3.8637033051562732,-1.035276180410083,12,0,3.8637033051562732,1.035276180410083,10.392304845413264,5.999999999999999,2.8284271247461903,2.82842712474619,6.000000000000002,10.392304845413264,1.035276180410083,3.8637033051562732,7.347880794884119e-16,12,-1.0352761804100834,3.8637033051562732,-5.999999999999997,10.392304845413264,-2.82842712474619,2.8284271247461903,-10.392304845413264,5.999999999999999,-3.863703305156273,1.035276180410084,-12,1.4695761589768238e-15,-3.8637033051562737,-1.0352761804100814,-10.392304845413264,-6.000000000000002,-2.8284271247461907,-2.82842712474619,-6.000000000000005,-10.39230484541326,-1.0352761804100825,-3.8637033051562732Z"></path>
    </defs>
    <!-- <path :d="`M ${cx} ${cy} L 340 ${cy}`" stroke="#fff"></path> -->
      <g v-for="cir in particleNum" :key="cir" :transform="`rotate(${ randomAngle(cir)}, ${cx}, ${cy})`">
        <use :href="`#circle_${randomNum()}`" :fill="colors[cir % 5]" >
          <animate attributeName="fill-opacity" values="0;1;1;0" keyTimes="0;0.3;0.8;1"   :dur="time" :repeatCount="setTime" />
          <animateTransform attributeName="transform" type="scale" :dur="time" from="0 " to="1" :repeatCount="setTime" />
          <animateTransform attributeName="transform" type="rotate" :dur="time" from="0 0 0 " to="360 0 0" :repeatCount="setTime" />
          <animateMotion :dur="time" :repeatCount="setTime" :begin="`${(cir % 4) * 100}ms`" :path="`M ${cx} ${cy} l ${randomY()} 0`" keySplines="0.1 0.9 0.1 1" keyTimes="0;1" calcMode="spline"></animateMotion>
        </use>
      </g>
  </svg>
</template>

<style lang="scss">

</style>