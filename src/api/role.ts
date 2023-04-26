import type { ListResult } from "@/model/base";

import request from "@/api/request";
import type { Role, RoleCreateRequest, RoleFilter } from "@/model/role";

const list = (filter: RoleFilter): Promise<ListResult<Role>> => {
  return request.get("/roles", {
    params: filter,
  });
};

const create = (roleCreateRequest: RoleCreateRequest): Promise<Role> => {
  return request.post("/roles", roleCreateRequest);
};

// Todo:
const edit = (
  id: string,
  roleEditRequest: RoleCreateRequest
): Promise<Role> => {
  return request.put(`/roles/${id}`, roleEditRequest);
};

export default {
  list,
  create,
  edit,
};
