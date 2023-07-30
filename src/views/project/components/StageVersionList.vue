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
      </div>
    </template>
    <t-table
      row-key="index"
      :columns="columns"
      :data="data"
      cellEmptyContent="-"
      maxHeight="500px"
      paginationAffixedBottom
    >
      <template #number="{ row }">
        <t-button variant="text" theme="primary" @click="goToVersion(row.id)">
          {{ row.number || "-" }}
        </t-button>
      </template>
    </t-table>
  </t-dialog>
</template>
<script setup lang="ts">
import { computed, ref, watch } from "vue";
import type { Ref } from "vue";
import type { Proto } from "@/model/proto";
import projectApi from "@/api/project";
import { getStageList } from "@/api/stage";
import type { Version } from "@/model/version";
import type { Stage } from "@/model/stage";
import { useRouter } from "vue-router";

const router = useRouter();
const goToVersion = (versionId: string) => {
  router.push({
    name: "version-view",
    params: {
      id: props.projectId,
      prototypeId: props.protoId,
      versionId,
    },
  });
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
const emit = defineEmits(["close", "update"]);

const handleClose = () => {
  emit("close");
};

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

const columns = [
  { colKey: "stage.title", title: "迭代阶段" },

  { colKey: "number", title: "版本号" },

  { colKey: "log", title: "更新日志" },
  {
    colKey: "updatedTime",
    title: "更新时间",
    align: "center",
  },
  {
    colKey: "updatedBy.username",
    title: "更新人",
  },
];

interface StageVersion extends Version {
  stage: Stage;
}

const data: Ref<StageVersion[]> = ref([]);
const fetchData = async () => {
  const stageList = await getStageList();
  const currenDate: StageVersion[] = [];
  for (const item of stageList) {
    const version = await projectApi.getVersionByStage(
      props.projectId,
      props.protoId,
      item.id
    );
    version &&
      currenDate.push({
        ...version,
        stage: item,
      });
  }
  data.value = currenDate;
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
