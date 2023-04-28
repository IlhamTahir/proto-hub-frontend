export enum ProtoStatus {
  TO_DEVELOP = "TO_DEVELOP",
  DEVELOPING = "DEVELOPING",
  DEVELOPED = "DEVELOPED",
}
export const ProtoStatusLabel = {
  [ProtoStatus.TO_DEVELOP]: {
    title: "待开发",
    type: "default",
  },
  [ProtoStatus.DEVELOPING]: {
    title: "开发中",
    type: "danger",
  },
  [ProtoStatus.DEVELOPED]: {
    title: "已开发",
    type: "success",
  },
};

export const protoStatusOptions = [
  { value: ProtoStatus.TO_DEVELOP, label: "待开发" },
  { value: ProtoStatus.DEVELOPING, label: "开发中" },
  { value: ProtoStatus.DEVELOPED, label: "已开发" },
];
