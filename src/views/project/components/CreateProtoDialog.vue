<template>
  <t-dialog
    ref="dialog"
    width="600px"
    :visible="visible"
    :header="$t('project.management.dialog.createTitle')"
    @close="$emit('close')"
    @confirm="handleConfirm"
  >
    <t-form ref="form" class="dialog-form" :data="proto" :rules="rules">
      <t-form-item label="迭代名称" name="name">
        <t-input
          placeholder="请输入迭代名称"
          autocomplete="off"
          v-model="proto.name"
      /></t-form-item>
    </t-form>
  </t-dialog>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from "vue";
import type { ProtoCreateRequest } from "@/model/proto";
import projectApi from "@/api/project";
import { MessagePlugin } from "tdesign-vue-next";
import type { FormInstanceFunctions } from "tdesign-vue-next";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

interface Props {
  show: boolean;
  projectId: string;
}
const emit = defineEmits(["close", "success"]);
const props = withDefaults(defineProps<Props>(), { show: false });
const visible = computed(() => props.show);
const proto = reactive<ProtoCreateRequest>({
  name: "",
});
const rules = computed(() => {
  return {
    name: [
      {
        required: true,
        message: "迭代名称不能为空",
        trigger: "blur",
      },
      {
        min: 4,
        max: 128,
        trigger: "blur",
        message: "迭代名称长度应该在4至128字符之间",
      },
    ],
  };
});
const form = ref<FormInstanceFunctions | null>(null);
const handleConfirm = async () => {
  if (form.value === null || (await form.value.validate()) !== true) {
    return;
  }
  const result = await projectApi.createProto(props.projectId, proto);
  await MessagePlugin.success(t("dialog.createSuccessMessage"));
  emit("success", result);
};
</script>

<style scoped></style>
