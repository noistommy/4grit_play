<script setup></script>

<template>
    <div class="slide-nav">
        <div class="side-pane side-left">
            <slot name="side-left"></slot>
        </div>
        <div class="contents-pane">
            <slot />
        </div>
    </div>
</template>