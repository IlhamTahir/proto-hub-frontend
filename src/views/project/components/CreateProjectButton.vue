<template>
  <t-space>
    <t-sticky-tool
      :style="{ position: 'relative', overflow: 'hidden' }"
      :offset="offset"
    >
      <t-sticky-item label="创建项目">
        <template #icon><add-icon /></template>
      </t-sticky-item>
    </t-sticky-tool>
  </t-space>
</template>

<script lang="ts" setup>
import { AddIcon } from "tdesign-icons-vue-next";
import { computed } from "vue";

const offset = computed(() => {
  return [100 - document.documentElement.clientWidth, 100];
});
</script>

<style scoped></style>
