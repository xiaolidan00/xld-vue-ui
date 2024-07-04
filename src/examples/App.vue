<template>
  <div>
    <component :is="item.name" v-for="item in allComps"></component>
  </div>
</template>

<script setup lang="ts">
  import { allComps } from '../index';
</script>

<style scoped></style>
