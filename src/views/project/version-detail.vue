<template>
  <div class="iframe-wrapper">
    <iframe
      class="iframe"
      v-if="version"
      scrolling="no"
      :src="baseUrl + version.demoPath"
    ></iframe>
    <TriggerIsland
      v-if="version"
      @click-version-list="versionListDialog.showDialog"
      :title="`版本号: ${version.number}`"
    ></TriggerIsland>
    <VersionListDialog
      :show="versionListDialog.visible.value"
      :proto-id="protoId"
      :project-id="projectId"
      @close="onClose"
    ></VersionListDialog>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import type { Version } from "@/model/version";
import projectApi from "@/api/project";
import TriggerIsland from "@/views/project/components/TriggerIsland.vue";
import VersionListDialog from "@/views/project/components/VersionListDialog.vue";
import { useDialog } from "@/composables/useDialog";

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const route = useRoute();
const projectId = route.params.id as string;
const protoId = route.params.prototypeId as string;
const versionId = route.params.versionId as string;

const version = ref<Version | null>(null);
const fetchData = async () => {
  version.value = await projectApi.getVersion(projectId, protoId, versionId);
};

onMounted(fetchData);

const versionListDialog = useDialog();

const onClose = () => {
  versionListDialog.hideDialog();
};
</script>

<style lang="less" scoped>
body {
  overflow: hidden;
}
/* 覆盖整个屏幕 */
.iframe-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* 设置iframe样式 */
  .iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
}
</style>
