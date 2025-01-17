<script setup></script>

<template>
  <div class="scroll-container">
    <div class="scrolled-contents">
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis, incidunt quasi placeat quisquam aliquid delectus magnam quam illo totam neque tempora blanditiis dolore. Similique quas ea eligendi ullam in numquam!</p>
      <ul class="cards">
        <li class="card"  v-for="card in 4" :key="card" :style="{'--index': card}">
          <div class="card-contents">
            <div class="title">Card {{card}}</div>
          </div>
        </li>
      </ul>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis, incidunt quasi placeat quisquam aliquid delectus magnam quam illo totam neque tempora blanditiis dolore. Similique quas ea eligendi ullam in numquam!</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.scroll-container {
  .scrolled-contents {
    height: 3000px;
  }
  
  p {
    width: 400px;
    margin: 20px auto;
    font-size: 1.5em;
  }
}
.cards {
  --numbers: 4;
  width: 400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(var(--numbers), 200px);
  height: 880px;
  gap: 20px;
  view-timeline-name: --last-section-scroller;
  //view-timeline-axis: block;
  .card {
    --index0: calc(var(--index) - 1);
    --reverse-index: calc(var(--numbers) - var(--index0));
    position: sticky;
    top: 0;
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

      --start-range: calc(var(--index0) / var(--numbers) * 100%);
      --end-range: calc(var(--index) / var(--numbers) * 100%);
      
      animation: scale linear forwards;
      animation-timeline: --last-section-scroller;
      animation-range: exit-crossing var(--start-range) exit-crossing var(--end-range);
    }
    .title {
      font-size: 2.5em;
      font-weight: 100;
    }
  }
  @keyframes scale {
    to {
      transform: scale(calc(1.1 - calc(0.1 * var(--reverse-index))));
    }
    
  }
}
</style>