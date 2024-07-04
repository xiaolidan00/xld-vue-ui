<template>
  <button :class="[type, size]" :style="{ color: color || '' }">{{ text }}</button>
</template>

<script lang="ts" setup>
  defineOptions({
    name: 'MyButton'
  });
  export interface Props {
    text?: string;
    type?: 'primary' | 'info';
    size?: 'small' | 'medium' | 'large';
    color?: string;
  }

  const props = withDefaults(defineProps<Props>(), {
    text: 'hello',
    type: 'primary',
    size: 'medium'
  });
</script>

<style lang="scss" scoped>
  button {
    border-radius: 4px;
    &.medium {
      height: 32px;
    }
    &.small {
      height: 24px;
    }
    &.large {
      height: 40px;
    }
    &.primary {
      background-color: dodgerblue;
      color: white;
      border: solid dodgerblue;
    }
    &.info {
      border: solid 1px green;
      color: green;
      background-color: white;
    }
  }
</style>
