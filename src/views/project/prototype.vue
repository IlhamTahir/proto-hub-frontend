<template>
  <div class="prototype-page">
    <div class="header">
      <t-button variant="outline" size="large" @click="() => $router.back()">
        <template #icon> <icon-font name="chevron-left" /> </template>
        返回
      </t-button>
      <h1 class="title">
        {{ projectDetail && projectDetail.name }}
      </h1>
    </div>
    <t-card class="content" :bordered="false">
      <t-button
        theme="primary"
        style="margin-bottom: 20px"
        @click="createProtoDialog.showDialog"
      >
        创建迭代
      </t-button>
      <t-table
        :loading="loading"
        row-key="index"
        :columns="columns"
        :data="data"
        :pagination="pagination"
        @page-change="onPageChange"
        cellEmptyContent="-"
      >
        <template #operation="{ row }">
          <t-button variant="text" theme="primary"> 预览 </t-button>
          <t-button variant="text" theme="primary"> 详情 </t-button>
          <t-button
            variant="text"
            theme="primary"
            @click="clickUpdateVersion(row.id)"
          >
            更新版本
          </t-button>
          <t-button variant="text" theme="primary"> 更新状态 </t-button>
        </template>
        <template #status="{ row }">
          <t-tag
            :theme="ProtoStatusLabel[row.status].type"
            variant="light-outline"
            >{{ ProtoStatusLabel[row.status].title }}</t-tag
          >
        </template>
      </t-table>
    </t-card>
    <CreateProtoDialog
      :show="createProtoDialog.visible.value"
      :project-id="id"
      @close="createProtoDialog.hideDialog"
      @success="handleSuccess"
    ></CreateProtoDialog>
    <UpdateVersionDialog
      :show="updateVersionDialog.visible.value"
      :project-id="id"
      :proto-id="editProtoId"
      @close="onUpdateVersionDialogClose"
      @success="onUpdateVersionDialogSuccess"
    ></UpdateVersionDialog>
  </div>
</template>

<script lang="ts" setup>
import { IconFont } from "tdesign-icons-vue-next";
import projectApi from "@/api/project";
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import type { Project } from "@/model/project";
import { useSearch } from "@/composables/useSearch";
import type { Proto, ProtoSearchFilter } from "@/model/proto";
import { useDialog } from "@/composables/useDialog";
import CreateProtoDialog from "@/views/project/components/CreateProtoDialog.vue";
import UpdateVersionDialog from "@/views/project/components/UpdateVersionDialog.vue";

import { ProtoStatusLabel } from "@/enums/proto";
import type { BaseTableCellParams } from "tdesign-vue-next";
import { formatDateTime } from "@/utils/date-util";
const projectDetail = ref<Project | null>(null);
const id = useRoute().params.id as string;
const router = useRouter();
const clickUpdateVersion = (protoId: string) => {
  editProtoId.value = protoId;
  updateVersionDialog.showDialog();
};

const onUpdateVersionDialogClose = () => {
  editProtoId.value = "";
  updateVersionDialog.hideDialog();
};
const editProtoId = ref("");
const fetchProjectDetail = async () => {
  projectDetail.value = await projectApi.detail(id);
};

onMounted(fetchProjectDetail);
const list = async (filter: ProtoSearchFilter) => {
  return projectApi.protoList(id as string, filter);
};
const columns = [
  { colKey: "name", title: "迭代名称", align: "center" },
  { colKey: "status", title: "迭代状态", align: "center" },
  { colKey: "lastVersionNumber", title: "最新版本", align: "center" },
  {
    colKey: "lastVersionUpdatedTime",
    title: "更新时间",
    align: "center",
    cell: (h: never, { row }: BaseTableCellParams<Proto>) => {
      return formatDateTime(row.lastVersionUpdatedTime);
    },
  },
  { colKey: "lastVersionLog", title: "更新日志", align: "center" },
  { colKey: "operation", title: "操作", align: "center" },
];
const { data, loading, onPageChange, pagination, fetchData } = useSearch({
  list,
});

const handleSuccess = (project: Project) => {
  fetchData();
  createProtoDialog.hideDialog();
};

const createProtoDialog = useDialog();

const updateVersionDialog = useDialog();

const onUpdateVersionDialogSuccess = () => {
  fetchData();
  updateVersionDialog.hideDialog();
};
</script>

<style scoped>
.prototype-page {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  flex: auto;
  .header {
    height: 80px;
    display: flex;
    align-items: center;
    gap: 20px;
    .title {
      font-size: 2em;
    }
  }
  .content {
    flex-grow: 1;
  }
}
</style>
