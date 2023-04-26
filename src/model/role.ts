import type { BaseModel, Paging } from "@/model/base";

export interface Role extends BaseModel {
  name: string;
  label: string;
  permissions: string[];
}
export interface RoleFilter extends Paging, Pick<Role, "name" | "label"> {}

export type RoleCreateRequest = Role;
export type RoleEditRequest = Role;
