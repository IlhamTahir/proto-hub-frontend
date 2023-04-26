import type { BaseModel, Paging } from "@/model/base";
import type { User } from "@/model/user";

export interface Project extends BaseModel {
  name: string;
  productOwner: User;
}
export type ProjectSearchFilter = Paging;

export interface ProjectCreateRequest extends Pick<Project, "name"> {
  productOwnerId: string;
}
