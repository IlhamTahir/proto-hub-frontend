<template>
  <div class="create-project-button">
    <add-icon size="60px" style="color: white" />
  </div>
</template>

<script lang="ts" setup>
import { AddIcon } from "tdesign-icons-vue-next";
</script>

<style lang="less" scoped>
.create-project-button {
  width: 80px;
  height: 80px;
  background: var(--td-brand-color);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.3s;
  position: fixed;
  right: 20px;
  bottom: 100px;
  cursor: pointer;
  &:hover {
    box-shadow: 0 5px 8px rgba(0, 0, 0, 0.2);
    transform: translateY(-5px);
  }
}
</style>
