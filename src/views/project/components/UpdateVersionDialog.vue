<template>
  <t-dialog
    ref="dialog"
    width="600px"
    :visible="visible"
    header="更新版本"
    @close="handleClose"
    @confirm="handleConfirm"
  >
    <t-form ref="form" class="dialog-form" :data="version" :rules="rules">
      <t-form-item label="迭代阶段" name="stageId">
        <t-select
          v-model="version.stageId"
          :options="stageList"
          :keys="{
            value: 'id',
            label: 'title',
          }"
          placeholder="请选择迭代阶段"
        ></t-select>
      </t-form-item>
      <t-form-item label="原型文件" name="fileId">
        <t-upload
          v-model="files"
          auto-upload
          theme="file"
          draggable
          :requestMethod="uploadFile"
          tips="请上传zip压缩包，并确保压缩包包含index.html文件"
          @remove="onRemove"
        />
        <t-input readonly hidden v-model="version.fileId"></t-input>
      </t-form-item>
      <t-form-item label="更新日志" name="log">
        <t-textarea
          placeholder="请描述本次更新内容，可以回车换行"
          v-model="version.log"
        />
      </t-form-item>
    </t-form>
  </t-dialog>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, ref } from "vue";
import type { FormInstanceFunctions, UploadFile } from "tdesign-vue-next";
import fileApi from "@/api/file";
import projectApi from "@/api/project";
import { MessagePlugin } from "tdesign-vue-next";
import type { Stage } from "@/model/stage";
import { getStageList } from "@/api/stage";
const emit = defineEmits(["close", "success"]);

interface Props {
  show: boolean;
  projectId: string;
  protoId: string;
}

const props = withDefaults(defineProps<Props>(), { show: false });
const visible = computed(() => props.show);
const form = ref<FormInstanceFunctions | null>(null);

const version = reactive({
  fileId: "",
  log: "",
  stageId: undefined,
});

const rules = {
  stageId: [
    {
      required: true,
      message: "迭代阶段不能为空",
      trigger: "blur",
    },
  ],
  log: [
    {
      required: true,
      message: "更新日志不能为空",
      trigger: "blur",
    },
    {
      min: 10,
      trigger: "blur",
      message: "更新日志至少10个字符以上",
    },
  ],
  fileId: [
    {
      required: true,
      message: "请上传原型文件",
      trigger: "blur",
    },
  ],
};
const handleConfirm = async () => {
  if (form.value === null || (await form.value.validate()) !== true) {
    return;
  }
  await projectApi.createVersion(props.projectId, props.protoId, version);
  version.fileId = "";
  version.log = "";
  files.value = [];
  await MessagePlugin.success("版本更新成功");
  emit("success");
};

const handleClose = () => {
  version.fileId = "";
  version.log = "";
  files.value = [];
  emit("close");
};

const files = ref([]);
const onRemove = () => {
  version.fileId = "";
};
const uploadFile = async (file: UploadFile) => {
  if (!file.raw) return { status: "fail", error: "上传失败" };
  try {
    const result = await fileApi.initUpload({
      ext: "zip",
      key: file.raw.name,
      name: file.raw.name,
      size: file.raw.size,
    });
    version.fileId = result.fileId;
    await fileApi.upload(result.fileId, file.raw);
    const fileResult = await fileApi.finishUpload(result.fileId);
    return {
      status: "success",
      response: {
        files: [fileResult],
      },
    };
  } catch (e) {
    return {
      status: "fail",
      error: "上传失败",
      response: {
        files: [file],
      },
    };
  }
};

const stageList = ref<Stage[]>([]);

const fetchStageList = async () => {
  stageList.value = await getStageList();
};

onMounted(fetchStageList);
</script>

<style lang="less" scoped>
.uploader {
  width: 100%;
}
</style>
