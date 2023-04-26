import type { Role } from "@/model/role";
import type { Gender } from "@/enums/Gender";
import type { BaseModel, Paging } from "@/model/base";

export interface User extends BaseModel {
  username: string;
  nickname: string;
  gender?: Gender;
  roles: Role[];
  permissions: string[];
  locked: boolean;
  enabled: boolean;
}
export interface UserCreateRequest
  extends Pick<Partial<User>, "id" | "username" | "nickname" | "roles"> {
  password?: string;
}

export type UserEditRequest = Pick<
  Partial<User>,
  "id" | "username" | "nickname" | "roles"
>;

export interface UserFilter extends Paging {
  name: string;
}
