<script setup></script>

<template>
  <div class="container">
    <section>
      <h4>basic grid</h4>
      <div class="be-grid">
        <div class="column dum" v-for="col in 12" :key="col"></div>
        <div class="column dum" v-for="col in [2, 6, 4]" :key="col" :class="`col-${col}`"></div>
      </div>
    </section>
    <section>
      <h4>basic grid-table</h4>
      <div class="be-grid tabled bordered">
        <div class="rows">
          <div class="column label align-center" v-for="col in 12" :key="col">{{col}}</div>
        </div>
        <div class="rows" v-for="row in 4" :key="row">
          <div class="column" v-for="col in 12" :key="col">{{col}}</div>
        </div>
      </div>
    </section>
    <section>
      <div class="be-grid tabled">
        <div class="rows" v-for="row in 3" :key="row">
          <div class="column label col-2">test</div>
          <div class="column col-10">is test</div>
        </div>
      </div>
    </section>
    <section>
      <div class="be-grid tabled bordered">
        <div class="rows" v-for="row in 2" :key="row">
          <div class="column label col-2">test</div>
          <div class="column col-10">is test</div>
        </div>
      </div>
    </section>
    <section>
      <div class="be-grid">
        <div class="column dum col-sm-4 col-xs-8" v-for="col in [3, 3, 3, 3, 4, 4, 4]" :key="col" :class="`col-${col}`"></div>
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

.be-grid:not(.tabled) > .column.dum {
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
.column > .be-grid {
  background-color: #f2f2f2;
  .column::after {
    background-color: #d6d6d6 !important;
  }
}

$gridWhole: 12;
$gridGutter: 4;

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
  &-form .fields,
  &-grid {
    --gutter: $gridGutter;
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    margin: $gridGutter * -1px;
    margin-bottom: $gridGutter * 1px;
    &:last-child {
      margin-bottom: $gridGutter * -1px;
    }
    &.left-side .column:first-child {flex-grow: 1}
    &.right-side .column:last-child {flex-grow: 1}
    &.divide {
      @for $i from 1 through $gridWhole {
        &-#{$i} > .column{
          width: calc(100% / $i);
        }
      }
    }
    &.divide {
      > .column{width: calc(100% / 12);}
      &.one > .column{width: calc(100% / 1);}
      &.half > .column{width: calc(100% / 2);}
      &.third > .column{width: calc(100% / 3);}
      &.quarter > .column{width: calc(100% / 4);}
      &.fifth > .column{width: calc(100% / 5);}
      &.sixth > .column{width: calc(100% / 6);}
      &.eighth > .column{width: calc(100% / 8);}
      &.tenth > .column{width: calc(100% / 10);}
      &.eleventh > .column{width: calc(100% / 11);}
    }
    &.justify {
      &-left{justify-content: flex-start;}
      &-center{justify-content: center;}
      &-right{justify-content: flex-end;}
      &-between{justify-content: space-between;}
      &-around{justify-content: space-around;}
    }
    &.align {
      &-top{align-items: flex-start;}
      &-center{align-items: center;}
      &-bottom{align-items: flex-end;}
      &-stretch{align-items: stretch;}
    }
    .column {
      padding: $gridGutter * 1px;
      > .btf-grid,
      > .btf-form .fields {
        margin-bottom: $gridGutter * -1px;;
      }
    }
    .rows > .column,
    .column {
      width: $gridPercent * 1%;
      &.two {width: $gridPercent * 2%}
      &.three {width: $gridPercent * 3%}
      &.four {width: $gridPercent * 4%}
      &.five {width: $gridPercent * 5%}
      &.six {width: $gridPercent * 6%}
      &.seven {width: $gridPercent * 7%}
      &.eight {width: $gridPercent * 8%}
      &.nine {width: $gridPercent * 9%}
      &.ten {width: $gridPercent * 10%}
      &.col {
        @for $i from 1 through $gridWhole {
          &-#{$i} {width: $gridPercent * $i * 1%; }
        }
      }
      &.order {
        @for $i from 1 through $gridWhole {
          &-#{$i} {order: $i; }
        }
      }
      &.offset {
        @for $i from 1 through $gridWhole {
          &-#{$i} {margin-left: $gridPercent * $i * 1%; }
        }
      }
    }
  }
  &-grid > .rows {
    width: 100%;
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    margin: 0;
  }
}
.be-grid {
  &.tabled, &.tabled .rows {
    --gutter: #{$gridTableGutter}px;
    
    font-size: $tableFontSize;
    margin: $gridTableGutter * -1px;
    margin-bottom: $gridTableGutter * 1px;
    &:last-child {
      margin-bottom: $gridTableGutter * -1px;
    // margin: $margin;
    // column-gap: var(--gutter);
    }
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
      
      &:last-child {
        border-right: 0;
      }
      &.label {
        background-color: $headerBackgroundColor;
        color: $tableFontColor;
        // justify-content: center;
        font-weight: bold;
      }
      &.align-left { justify-content: flex-start; }
      &.align-center { justify-content: center; }
      &.align-right { justify-content: flex-end; }
      &.align-top { align-items: flex-start; }
      &.align-middle { align-items: center; }
      &.align-bottom { align-items: flex-end; }
    }
    &.bordered {
      background-color: $tableBorderColor;
      border: 1px solid $tableBorderColor;
      &> .rows {
        border-bottom: 1px solid $tableBorderColor;
      }
      .column {
        border-right: 1px solid $tableBorderColor;
      }
    }
  }
  &.tabled .rows {
    margin: 0;
    border: 0;
    
    &:last-child {
      border-bottom: 0;
    }
  }
}

@media all and (max-width: #{$bp-tablet - 1px}) {
  .btf {
    &-form .fields,
    &-grid {
      .column {
        &.col {
          @for $i from 1 through $gridWhole {
            &-xs-#{$i} {width: $gridPercent * $i * 1% !important; }
          }
        }
        &.offset {
          @for $i from 1 through $gridWhole {
            &-xs-#{$i} {margin-left: $gridPercent * $i * 1% !important; }
          }
        }
      }
      &.divide {
        @for $i from 1 through $gridWhole {
          &-xs-#{$i} > .column { width: calc(100% / $i) !important; }
        }
      }
    }
  }
}
@media all and (min-width: #{$bp-tablet}) and (max-width: #{$bp-laptop - 1px}) {
  .btf {
    &-form .fields,
    &-grid {
      .column {
        &.col {
          @for $i from 1 through $gridWhole {
            &-sm-#{$i} {width: $gridPercent * $i * 1% !important; }
          }
        }
        &.offset {
          @for $i from 1 through $gridWhole {
            &-sm-#{$i} {margin-left: $gridPercent * $i * 1% !important; }
          }
        }
      }
      &.divide {
        @for $i from 1 through $gridWhole {
          &-sm-#{$i} > .column { width: calc(100% / $i) !important; }
        }
      }
    }
  }

}
@media all and (min-width: #{$bp-laptop}) and (max-width: #{$bp-desktop - 1px}) {
  //@media all and (max-width: #{$bp-desktop - 1px}) {
  .btf {
    &-form .fields,
    &-grid {
      .column {
        &.col {
          @for $i from 1 through $gridWhole {
            &-md-#{$i} {width: $gridPercent * $i * 1% !important; }
          }
        }
        &.offset {
          @for $i from 1 through $gridWhole {
            &-md-#{$i} {margin-left: $gridPercent * $i * 1% !important; }
          }
        }
      }
      &.divide {
        @for $i from 1 through $gridWhole {
          &-md-#{$i} > .column { width: calc(100% / $i) !important; }
        }
      }
    }
  }
}
</style>