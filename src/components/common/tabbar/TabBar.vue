<template>
    <div id="tab-bar">
      <slot></slot>
    </div>
</template>
<script>
export default {
    name:'TabBar',
}
</script>
<style>
 #tab-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    background-color: #f6f6f6;
    box-shadow: 0 -2px 1px rgba(105, 103, 103, 0.1);
  }
</style>
