<template>
  <t-card :cover="cover" theme="poster2">
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

<style scoped></style>
