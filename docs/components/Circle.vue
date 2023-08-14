<template>
    <span>
        <slot></slot>
    </span>
</template>

<script setup>
</script>

<style scoped>  
    span{
        background-color: var(--m-light-highlight);
        width:  50px;
        height:  25px;
        padding: 1px 10px 1px 10px;
        border-radius: 32px;
    }

    :root.dark span{
        background-color: #313136;
    }
</style>