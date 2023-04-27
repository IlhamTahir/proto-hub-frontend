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
    type: "error",
  },
  [ProtoStatus.DEVELOPED]: {
    title: "已开发",
    type: "success",
  },
};
