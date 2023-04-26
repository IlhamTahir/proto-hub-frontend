export enum PermissionEnum {
  PROJECT = "project",
}

type PermissionsTree = {
  label: string;
  value: string;
  children?: Array<PermissionsTree>;
};

export const permissionsTree: Array<PermissionsTree> = [
  { label: "控制台", value: PermissionEnum.PROJECT },
];
