<script setup>
import SideBar from './fixed/SideBar.vue'
</script>

<template>
  <div class="layout">
    <div class="nav">
      <SideBar />
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<style lang="scss">
.layout {
  position: relative;
  display: grid;
  grid-template-columns: 30% 70%;
  gap: 0px;
  width: 100%;

  .content {
    width: 100%;
    padding-top: 2em;
    padding-left: 1.5em;
    padding-right: 3.5em;

    input,
    textarea,select {
      width: 100%;
      padding: 1em;
      padding-left: 1.5em;
      border: 1px solid #D9D9D9;
      border-radius: 4px;

    }
  }


}
</style>
