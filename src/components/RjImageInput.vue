<template>
  <div class="rj-image-input">
    <div class="rj-image-box" @click="chooseImage">
      <div v-if="value" class="rj-image-img" :style="{backgroundImage:`url(${value})`}"></div>
      <div v-else class="rj-image-empty">
        <i class="el-icon-plus"></i>
      </div>
    </div>
  </div>
</template>

<script>
import chooseImage from '@/utils/chooseImage';

export default {
  name: 'RjImageInput',
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  methods: {
    chooseImage() {
      chooseImage((file) => {
        this.$emit('input', window.URL.createObjectURL(file));
      });
    },
  },
};
</script>

<style lang="less">
.rj-image-empty {
  border-color: @c_border_input;
}
.is-error .rj-image-empty {
  border-color: @c_error;
}
</style>
<style scoped lang="less">
.rj-image-input {
  width: 100%;
  display: inline-block;
}
.rj-image-box {
  width: 100px;
  height: 100px;
  cursor: pointer;
}
.rj-image-empty {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-width: 1px;
  border-style: solid;
  font-size: 32px;
  border-radius: 4px;
  color: @c_regular_b;
  box-sizing: border-box;
}
.rj-image-img {
  height: 100%;
  background-size: cover;
  background-position: center;
  border-radius: 4px;
}
</style>
