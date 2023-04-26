<template>
  <t-card
    class="project-card"
    :cover="cover"
    :bordered="false"
    hoverShadow
    @click="
      () =>
        $router.push({
          name: 'prototype',
          params: {
            id,
          },
        })
    "
  >
    <template #footer>
      <t-comment :author="name" />
    </template>
  </t-card>
</template>

<script lang="ts" setup>
interface Props {
  id: string;
  cover: string;
  name: string;
}

withDefaults(defineProps<Props>(), {
  cover: "https://tdesign.gtimg.com/site/source/card-demo.png",
});
</script>

<style lang="less" scoped>
.project-card {
  cursor: pointer;
}
</style>
