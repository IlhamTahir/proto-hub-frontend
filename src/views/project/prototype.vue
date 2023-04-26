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
      <t-button theme="primary" style="margin-bottom: 20px">
        创建迭代
      </t-button>
      <t-table
        :loading="loading"
        row-key="index"
        :columns="columns"
        :data="data"
        :pagination="pagination"
        @page-change="onPageChange"
        resizable
      >
        <template #operation>
          <t-button variant="text" theme="primary">
            <icon name="edit"></icon>
            {{ $t("edit") }}
          </t-button>
        </template>
      </t-table>
    </t-card>
  </div>
</template>

<script lang="ts" setup>
import { IconFont } from "tdesign-icons-vue-next";
import projectApi from "@/api/project";
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import type { Project } from "@/model/project";
import { Icon } from "tdesign-vue-next";
import { useSearch } from "@/composables/useSearch";
import type { ProtoSearchFilter } from "@/model/proto";

const projectDetail = ref<Project | null>(null);
const id = useRoute().params.id as string;

const fetchProjectDetail = async () => {
  projectDetail.value = await projectApi.detail(id);
};

onMounted(fetchProjectDetail);
const list = async (filter: ProtoSearchFilter) => {
  return projectApi.protoList(id as string, filter);
};
const columns = [
  { colKey: "id", title: "ID" },
  { colKey: "name", title: "迭代名称" },
  { colKey: "status", title: "迭代状态" },
  { colKey: "createdTime", title: "创建时间" },
  { colKey: "updatedTime", title: "更新时间" },
];
const { data, loading, onPageChange, pagination } = useSearch({
  list,
});
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
