<template>
  <div class="project-page" v-loading="loading">
    <t-row :gutter="[16, 16]">
      <t-col v-for="item in data" :key="item.id" :span="3"
        ><project-card :name="item.name" :id="item.id"></project-card
      ></t-col>
    </t-row>
    <div class="footer">
      <t-pagination
        :total="pagination.total"
        :current="pagination.current"
        :size="pagination.size"
        @change="onPageChange"
      >
      </t-pagination>
      <CreateProjectButton
        @click="createProjectDialog.showDialog"
      ></CreateProjectButton>
      <CreateProjectDialog
        :show="createProjectDialog.visible.value"
        @close="createProjectDialog.hideDialog"
        @success="
          () => {
            fetchData();
            createProjectDialog.hideDialog();
          }
        "
      ></CreateProjectDialog>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ProjectCard from "@/views/project/components/ProjectCard.vue";
import { useSearch } from "@/composables/useSearch";
import projectApi from "@/api/project";
import type { Project } from "@/model/project";
import CreateProjectButton from "@/views/project/components/CreateProjectButton.vue";
import { useDialog } from "@/composables/useDialog";
import CreateProjectDialog from "@/views/project/components/CreateProjectDialog.vue";
const { data, pagination, fetchData, loading, onPageChange } =
  useSearch<Project>(projectApi);

const createProjectDialog = useDialog();
</script>

<style lang="less" scoped>
.project-page {
  flex: auto;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
