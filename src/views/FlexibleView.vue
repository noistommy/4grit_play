<script setup>
import onMouseDown from '@/lib/flexible-view'
// const onMouseDown = ({ target: resizer, pageX: initX ,pageY: initY  }) => {
    
//     if (resizer.className && resizer.className.match('flexible-handle')) {
    
//         const container = resizer.parentElement
//         const layout = container.className.match('layout-h') ? 'h' : 'v'
//         const pane = resizer.previousElementSibling
//         const initPaneWidth = pane.offsetWidth
//         const initPaneHeight = pane.offsetHeight

//         const { addEventListener: addEvent, removeEventListener: removeEvent } = window

//         const resize = (initSize, offset = 0) => {
//             if (layout === 'h') {
//                 let paneWidth = initSize + offset
//                 pane.style.width = `${paneWidth}px`
//             } else {
//                 let paneHeight = initSize + offset
//                 pane.style.height = `${paneHeight}px`
//             }
//         }
        

//         const onMouseMove = ({pageX, pageY}) => {
//             const offset = layout === 'h' ? pageX - initX : pageY - initY
//             const initSize = layout === 'h' ? initPaneWidth : initPaneHeight
//             resize(initSize, offset)
//         }

//         const onMouseUp = () => {
//             const size = layout === 'h' ? pane.clientWidth : pane.clientHeight
//             resize(size)

//             removeEvent('mousemove', onMouseMove)
//             removeEvent('mouseup', onMouseUp)
//         }

//         addEvent('mousemove', onMouseMove)
//         addEvent('mouseup', onMouseUp)
//     }
// }
</script>

<template> 
    <div class="flexible-container layout-v" @mousedown="onMouseDown">
        <div class="view-1">View 1</div>
        <span class="flexible-handle"></span>
        <div class="view-2">View 2</div>
    </div>
    <div class="flexible-container layout-h" @mousedown="onMouseDown">
        <div class="view-1">View 1</div>
        <span class="flexible-handle"></span>
        <div class="view-2">
            
        </div>
    </div>
</template>

<style lang="scss" scoped>
.column > span{
    display: inline-block;
    width: 100%;
    background-color: #454545;;
}
.flexible-container {
    width: 780px;
    height: 800px;
    border: 1px solid var(--color-border);
    margin: 0 auto;
    display: flex;
    
    .view-2 {
        flex-grow: 1;
    }
    
    span.flexible-handle {
        cursor: row-resize;
        position: relative;
        display: inline-block;
        
        
        transition: all 250ms;
        &:hover {
            height: 20px;
            border-bottom: 1px solid var(--color-border);
            &:after {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 10px;
                height: 10px;
                border-radius: 8px;
                background-color: #ccc;
            }
        }
    }
    &.layout-h {
        height: 300px;
        .view-1 {
            width: 300px
        }
        span.flexible-handle {
            width: 5px;
            height: 100%;
            border-left: 1px solid var(--color-border);
            &:hover {
                width: 20px;
                border-right: 1px solid var(--color-border);
                &:after {
                    height: 80px;
                }
            }
        }
    }
    &.layout-v {
        flex-direction: column;
        .view-1 {
            height: 300px
        }
        span.flexible-handle {
            width: 100%;
            height: 5px;
            border-top: 1px solid var(--color-border);
            &:hover {
                height: 20px;
                border-bottom: 1px solid var(--color-border);
                &:after {
                    width: 80px;
                }
            }
        }
    }
}
</style>