<template>
  <div>
    <t-layout class="main-layout">
      <t-layout>
        <global-header></global-header>
        <t-content class="content-layout">
          <router-view></router-view>
        </t-content>
        <t-footer style="text-align: center"
          >Copyright @ 2021-2022 YiliAdmin.</t-footer
        >
      </t-layout>
    </t-layout>
  </div>
</template>

<script lang="ts" setup>
import GlobalHeader from "./header.vue";
</script>

<style lang="less" scoped>
.main-layout {
  min-height: 100vh;

  .content-layout {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 24px;
    display: flex;
    flex-direction: column;
  }
}
</style>
