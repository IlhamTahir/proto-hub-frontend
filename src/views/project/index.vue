<template>
  <div class="project-page" v-loading="loading">
    <t-row :gutter="[16, 16]">
      <t-col v-for="item in data" :key="item.id" :span="3"
        ><project-card :name="item.name" :id="item.id"></project-card
      ></t-col>
    </t-row>
    <CreateProjectButton
      @click="createProject.showDialog"
    ></CreateProjectButton>
    <CreateProjectDialog
      :show="createProject.visible.value"
      @close="createProject.hideDialog"
      @success="
        () => {
          fetchData();
          createProject.hideDialog();
        }
      "
    ></CreateProjectDialog>
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

const { data, fetchData, loading } = useSearch<Project>(projectApi, {
  size: 20,
});

const createProject = useDialog();
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
