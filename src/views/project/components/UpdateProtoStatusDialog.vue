<template>
  <t-dialog
    ref="dialog"
    width="600px"
    :visible="visible"
    header="更新迭代状态"
    @close="handleClose"
    @confirm="handleConfirm"
  >
    <t-form ref="form" class="dialog-form" :data="proto" :rules="rules">
      <t-form-item label="迭代状态" name="status">
        <t-select
          placeholder="请选择迭代状态"
          v-model="proto.status"
          :options="protoStatusOptions"
        />
      </t-form-item>
    </t-form>
  </t-dialog>
</template>

<script lang="ts" setup>
import { computed, reactive, ref, watch } from "vue";
import { ProtoStatus, protoStatusOptions } from "@/enums/proto";
import projectApi from "@/api/project";
import type { FormInstanceFunctions } from "tdesign-vue-next";
import { MessagePlugin } from "tdesign-vue-next";

interface Props {
  show: boolean;
  projectId: string;
  protoId: string;
  status: ProtoStatus;
}

console.log(protoStatusOptions);

const props = withDefaults(defineProps<Props>(), { show: false });
const visible = computed(() => props.show);

const proto = reactive({
  status: ProtoStatus.TO_DEVELOP,
});
watch(props, () => {
  proto.status = props.status;
});

const rules = {
  status: [
    {
      required: true,
      message: "请选择状态",
      trigger: "blur",
    },
  ],
};

const emit = defineEmits(["close", "success"]);
const handleClose = () => {
  emit("close");
};

const form = ref<FormInstanceFunctions | null>(null);
const handleConfirm = async () => {
  if (form.value === null || (await form.value.validate()) !== true) {
    return;
  }
  await projectApi.updateProtoStatus(
    props.projectId,
    props.protoId,
    proto.status
  );
  await MessagePlugin.success("迭代状态更新成功");
  emit("success");
};
</script>

<style scoped></style>
