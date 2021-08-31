<template>
  <el-dialog class="rj-dialog" fullscreen visible :title="title" @close="$emit('close')">
    <slot></slot>
  </el-dialog>
</template>

<script>
export default {
  name: 'RjDialog',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>
