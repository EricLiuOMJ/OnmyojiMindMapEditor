<template>
  <div class="shikigami-group-row">
    <ShikigamiGroup :args="args1" title="对方" theme="A" />
    <ShikigamiGroup :args="args2" title="我方" theme="B" />
  </div>
</template>

<script setup>
import { computed } from "vue";
import ShikigamiGroup from "./ShikigamiGroup.vue";

const props = defineProps({
  args1: {
    type: [Array, String],
    required: true,
  },
  args2: {
    type: [Array, String],
    required: true,
  },
});
</script>

<style scoped>
.shikigami-group-row {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 20px;
  align-items: stretch; /* 让子元素拉伸到相同高度 */
}

.shikigami-group-row > * {
  flex: 1;
  min-width: calc(50% - 10px);
  display: flex; /* 启用flex布局 */
  flex-direction: column; /* 垂直排列 */
  justify-content: center; /* 内容垂直居中 */
}
</style>
