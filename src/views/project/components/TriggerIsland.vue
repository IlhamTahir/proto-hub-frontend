<template>
  <div class="trigger-island">
    <t-button size="large" shape="circle" variant="text" @click="goHome"
      ><icon name="chevron-left"
    /></t-button>
    <div>{{ title }}</div>
    <t-button
      size="large"
      shape="circle"
      variant="text"
      @click="$emit('click-version-list')"
      ><icon name="bulletpoint"
    /></t-button>
  </div>
</template>

<script lang="ts" setup>
import { Icon } from "tdesign-icons-vue-next";
import { useRouter } from "vue-router";

const props = defineProps<{ title: string; projectId: string }>();

const router = useRouter();

const goHome = () => {
  router.push({ name: "prototype", params: { id: props.projectId } });
};
</script>

<style lang="less" scoped>
.trigger-island {
  z-index: 999;
  width: 256px;
  height: 60px;
  background: #fff;
  border-radius: 32px;
  position: fixed;
  margin: auto;
  left: 0;
  right: 0;
  bottom: 24px;
  transition: all 0.2s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
</style>
