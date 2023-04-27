<template>
  <t-dialog
    ref="dialog"
    width="600px"
    :visible="visible"
    :header="$t('project.management.dialog.createTitle')"
    @close="$emit('close')"
    @confirm="handleConfirm"
  >
    <t-form ref="form" class="dialog-form" :data="project" :rules="rules">
      <t-form-item
        :label="$t('project.management.dialog.name.label')"
        name="name"
      >
        <t-input
          :placeholder="$t('project.management.dialog.name.placeholder')"
          v-model="project.name"
          autocomplete="off"
        />
      </t-form-item>
      <t-form-item label="产品经理" name="productOwnerId">
        <t-select
          v-model="project.productOwnerId"
          filterable
          placeholder="请选择负责的产品经理"
          :keys="{
            value: 'id',
            label: 'username',
          }"
          :on-search="searchUsers"
          :loading="users.loading.value"
          :options="users.data.value"
        />
      </t-form-item>
    </t-form>
  </t-dialog>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from "vue";
import { useI18n } from "vue-i18n";
import type { ProjectCreateRequest } from "@/model/project";
import { useSearch } from "@/composables/useSearch";
import type { User } from "@/model/user";
import userApi from "@/api/user";
import projectApi from "@/api/project";
import { MessagePlugin } from "tdesign-vue-next";
import type { FormInstanceFunctions } from "tdesign-vue-next";
const { t } = useI18n();

interface Props {
  show: boolean;
}
const emit = defineEmits(["close", "success"]);

const props = withDefaults(defineProps<Props>(), { show: false });

const visible = computed(() => props.show);
const form = ref<FormInstanceFunctions | null>(null);

const handleConfirm = async () => {
  if (form.value === null || (await form.value.validate()) !== true) {
    return;
  }
  const result = await projectApi.create(project);
  await MessagePlugin.success(t("dialog.createSuccessMessage"));
  emit("success", result);
};

const project = reactive<ProjectCreateRequest>({
  name: "",
  productOwnerId: "",
});

const rules = computed(() => {
  return {
    name: [
      {
        required: true,
        message: t("project.management.dialog.name.required"),
        trigger: "blur",
      },
      {
        min: 4,
        max: 128,
        trigger: "blur",
        message: t("project.management.dialog.name.sizeRule"),
      },
    ],
    productOwnerId: [
      {
        required: true,
        message: "请选择负责的产品经理",
      },
    ],
  };
});
const searchKeys = reactive({
  username: "",
});
const users = useSearch<User>(userApi, searchKeys);

const searchUsers = (search: string) => {
  searchKeys.username = search;
  users.fetchData();
};
</script>
