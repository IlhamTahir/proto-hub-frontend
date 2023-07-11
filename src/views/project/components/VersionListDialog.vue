<template>
  <t-dialog
    ref="dialog"
    width="980px"
    :visible="visible"
    @close="handleClose"
    :close-btn="false"
    :confirm-btn="null"
    :cancel-btn="null"
  >
    <template #header>
      <div class="header" v-if="proto">
        <div class="header__title">
          {{ proto.name }}
        </div>
        <t-tag
          v-if="proto.status"
          :theme="ProtoStatusLabel[proto.status].type"
          variant="light-outline"
          size="large"
          >{{ ProtoStatusLabel[proto.status].title }}</t-tag
        >
      </div>
    </template>
    <t-table
      :loading="loading"
      row-key="index"
      :columns="columns"
      :data="data"
      :pagination="pagination"
      @page-change="onPageChange"
      @sort-change="onSortChange"
      cellEmptyContent="-"
      maxHeight="500px"
      paginationAffixedBottom
    >
      <template #operation="{ row }">
        <t-button
          variant="text"
          theme="primary"
          :disabled="!row.id"
          @click="handleView(projectId, protoId, row.id)"
        >
          预览
        </t-button>
        <t-button
          v-if="proto && row.number !== proto.baselineVersionNumber"
          variant="text"
          theme="primary"
          :disabled="!row.id"
          @click="handleBaselineVersion(projectId, protoId, row.id)"
        >
          设为基线版本
        </t-button>
      </template>
      <template #number="{ row }">
        {{ row.number }}
        <br />
        <t-tag
          size="small"
          v-if="proto && proto.baselineVersionNumber === row.number"
          theme="success"
          variant="light-outline"
          >基线版本</t-tag
        >
      </template>
    </t-table>
  </t-dialog>
</template>

<script lang="ts" setup>
import { computed, reactive, ref, watch } from "vue";
import { useSearch } from "@/composables/useSearch";
import projectApi from "@/api/project";
import type { VersionSearchFilter } from "@/model/version";
import type { Proto } from "@/model/proto";
import { ProtoStatusLabel } from "@/enums/proto";
import { useRouter } from "vue-router";
import { MessagePlugin } from "tdesign-vue-next";

const searchKey = reactive<{
  sortBy: string[];
  direction: string;
}>({
  sortBy: [],
  direction: "desc",
});

const router = useRouter();
const handleView = (
  projectId: string,
  prototypeId: string,
  versionId: string
) => {
  router.push({
    name: "version-view",
    params: {
      id: projectId,
      prototypeId,
      versionId,
    },
  });
};

const emit = defineEmits(["close"]);
const handleClose = () => {
  emit("close");
};

const props = withDefaults(
  defineProps<{
    projectId: string;
    protoId: string;
    show: boolean;
  }>(),
  { show: false }
);
const visible = computed(() => props.show);

const columns = [
  { colKey: "number", title: "版本号", align: "center", sorter: true },

  { colKey: "log", title: "更新日志" },
  {
    colKey: "updatedTime",
    title: "更新时间",
    align: "center",
  },
  {
    colKey: "updatedBy.username",
    title: "更新人",
    align: "center",
  },
  { colKey: "operation", title: "操作", align: "center" },
];
const list = async (filter: VersionSearchFilter) => {
  return projectApi.versionList(props.projectId, props.protoId, filter);
};
const { data, loading, onPageChange, pagination, fetchData } = useSearch(
  {
    list,
  },
  searchKey,
  { disableOnMounted: false }
);

const proto = ref<Proto | null>(null);

const fetchProtoDetail = async () => {
  proto.value = await projectApi.getProto(props.projectId, props.protoId);
};

watch(
  props,
  () => {
    if (props.protoId && props.projectId) {
      fetchProtoDetail();

      fetchData();
    }
  },
  { deep: true }
);
const onSortChange = (sort: { sortBy: string; descending: boolean }) => {
  if (!sort) {
    searchKey.sortBy = [];
    searchKey.direction = "desc";
  } else {
    searchKey.sortBy = [sort.sortBy];
    searchKey.direction = sort.descending ? "desc" : "asc";
  }
  fetchData();
};

const handleBaselineVersion = async (
  projectId: string,
  prototypeId: string,
  versionId: string
) => {
  try {
    await projectApi.setBaselineVersion(projectId, prototypeId, versionId);
    await MessagePlugin.success("基线版本设置成功！");
    await fetchProtoDetail();

    fetchData();
  } catch (e: any) {
    await MessagePlugin.error(e.message);
  }
};
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  align-items: center;
  &__title {
    font-size: 25px;
  }
}
</style>
