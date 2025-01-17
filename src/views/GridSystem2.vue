<script setup></script>

<template>
  <div class="container">
    <section>
      <h3>기본</h3>
      <div class="be-grid2">
        <div class="column dum col-1" v-for="col in 2" :key="col"></div>
      </div>
    </section>
    <section>
      <h3>다중 분할</h3>
      <div class="be-grid2">
        <div class="column dum" v-for="col in [2, 6, 4]" :key="col" :class="`col-${col}`"></div>
      </div>
    </section>
    <section>
      <h3>균등 분할 + Row</h3>
      <div class="be-grid2 divide-column-4">
        <div class="column dum" v-for="col in 8" :key="col"></div>
      </div>
    </section>
    <section>
      <h3>Auto fit</h3>
      <div class="be-grid2 auto-fit">
        <div class="column dum" v-for="col in 4" :key="col"></div>
      </div>
    </section>
    <section>
      <h3>기본</h3>
      <div class="be-grid2 set-rows row-5">
        <div class="column dum col-4 row-3"></div>
        <div class="column dum col-4"></div>
        <div class="column dum col-4 row-2"></div>
        <div class="column dum col-4 row-5"></div>
        <div class="column dum col-4"></div>
        <div class="column dum col-2" v-for="col in 7" :key="col"></div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.container {
  color: #333;
  padding: 1rem;
  section {
    border: 1px solid #d7d7d7;
    padding: 1rem;
    margin-bottom: 1rem;
  }
}

.be-grid2:not(.tabled) > .column.dum {
  &:after {
    content: '';
    width: 100%;
    height: 100%;
    text-align: center;
    background-color: #ccc;
    // box-shadow: 0 0 0 1px #ccc inset;
    min-height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.column > .be-grid2 {
  background-color: #f2f2f2;
  .column::after {
    background-color: #d6d6d6 !important;
  }
}

$gridWhole: 12;
$gridGutterSmall: 4;
$gridGutterLarge: 8;

$gridWholeMobile: 4;
$gridWholeTablet: 8;
$gridWholeLaptop: 12;

$gridPercent: calc(100 / $gridWhole);
$gridHalf: calc($gridWhole / 2);
$gridThird: calc($gridWhole / 3);
$gridQuarter: calc($gridWhole / 4);
$gridFifth: calc($gridWhole / 5);
$gridSixth: calc($gridWhole / 6);
$gridEighth: calc($gridWhole / 8);
$gridTenth: calc($gridWhole / 10);

$bp-mobile: 320px;
$bp-tablet: 768px;
$bp-laptop: 1280px;
$bp-desktop: 1440px;

$gridTableGutter: 1;
$cellVerticalPadding: 8px;
$cellHorizontalPadding: 12px;

$cellPadding: $cellVerticalPadding $cellHorizontalPadding;

$tableFontColor: #2c3e50;
$tableFontSize: 14px;
$tableBorderColor: #d7dae2;
$headerBackgroundColor: #eeeeee;

$verticalMargin: 1em;
$horizontalMargin: 0;
$margin: $verticalMargin $horizontalMargin;


.be {
  &-grid2 {
    --grid-col-num: #{$gridWhole};
    --grid-row-num: #{$gridWhole};
    --grid-gap: #{$gridGutterLarge}px;
    display: grid;
    grid-gap: var(--grid-gap);
    grid-template-columns: repeat(var(--grid-col-num), 1fr);
    margin-bottom: var(--grid-gap);
    &.set-rows {
      grid-template-rows: repeat(var(--grid-row-num), 1fr);
    }
    &.inline {
      display: inline-grid;
    }
    &.auto-fit {
      grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)) !important;
    }
    &:last-child {
      margin: 0;
    }
    &.divide-column {
      grid-template-columns: repeat($gridWhole, 1fr);
      @for $i from 1 through $gridWhole {
        &-#{$i} {
          grid-template-columns: repeat($i, calc($gridWhole / $i) * 1fr);
        }
      }
    }
    &.row {
      @for $i from 1 through $gridWhole {
        &-#{$i} {
          grid-template-rows: repeat($i, 1fr);
        }
      }
    }
    &.flow {
      &-column {
        grid-auto-flow: column;
      }
      &-row {
        grid-auto-flow: row;
      }
    }
    &.dense {
      grid-auto-flow: dense;
    }
    &.justify {
      &-start {justify-items: start;}
      &-center {justify-items: center;}
      &-end {justify-items: end;}
      &-strech {justify-items: stretch;}
    }
    &.align {
      &-start {align-items: start;}
      &-center {align-items: center;}
      &-end {align-items: end;}
      &-strech {align-items: stretch;}
    }
    > .column {
      &.col {
        @for $i from 1 through $gridWhole {
          &-#{$i} {
            grid-column: auto / span $i;
          }
        }
      }
      &.row {
        @for $i from 1 through $gridWhole {
          &-#{$i} {
            grid-row: auto / span $i;
          }
        }
      }
      &.offset {
        @for $i from 1 through $gridWhole {
          &-#{$i} {margin-left: $gridPercent * $i * 1%; }
        }
      }
    }
    &.tabled {
      --grid-gap: #{$gridTableGutter}px;
      background-color: $tableBorderColor;
      border: 1px solid $tableBorderColor;
      font-size: $tableFontSize;
      margin: $margin;
      &:first-child {
        margin-top: 0;
      }
      &:last-child {
        margin-bottom: 0;
      }
      &.labeled {
        margin-top: 0;
      }
      > .column {
        padding: $cellPadding;
        background-color: #fff;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        &.label {
          background-color: $headerBackgroundColor;
          color: $tableBorderColor;
          font-weight: 900;
        }
        &.align-left { justify-content: flex-start; }
        &.align-center { justify-content: center; }
        &.align-right { justify-content: flex-end; }
        &.align-top { align-items: flex-start; }
        &.align-middle { align-items: center; }
        &.align-bottom { align-items: flex-end; }
      }
    }
  }
}


@media all and (max-width: #{$bp-tablet - 1px}) {
  .be-grid2 {
    --grid-gap: #{$gridGutterSmall}px;
    &.row {
      @for $i from 1 through $gridWhole {
        &-xs-#{$i} {
          grid-template-rows: repeat($i, 1fr);
        }
      }
    }
    .column {
      &.col {
        @for $i from 1 through $gridWhole {
          &-xs-#{$i} {
            grid-column: auto / span $i;
          }
          &-row-xs-#{$i} {
            grid-row: auto / span $i;
          }
        }
      }
    }
  }
}
@media all and (min-width: #{$bp-tablet}) and (max-width: #{$bp-laptop - 1px}) {
  .be-grid2 {
    --grid-gap: #{$gridGutterSmall}px;
    &.row {
      @for $i from 1 through $gridWhole {
        &-sm-#{$i} {
          grid-template-rows: repeat($i, 1fr);
        }
      }
    }
    .column {
      &.col {
        @for $i from 1 through $gridWhole {
          &-sm-#{$i} {
            grid-column: auto / span $i;
          }
          &-row-sm-#{$i} {
            grid-row: auto / span $i;
          }
        }
      }
    }
  }
}
@media all and (min-width: #{$bp-laptop}) and (max-width: #{$bp-desktop - 1px}) {
  //@media all and (max-width: #{$bp-desktop - 1px}) {
  .be-grid2 {
    &.row {
      @for $i from 1 through $gridWhole {
        &-md-#{$i} {
          grid-template-rows: repeat($i, 1fr);
        }
      }
    }
    .column {
      &.col {
        @for $i from 1 through $gridWhole {
          &-md-#{$i} {
            grid-column: auto / span $i;
          }
          &-row-md-#{$i} {
            grid-row: auto / span $i;
          }
        }
      }
    }
  }
}
</style>