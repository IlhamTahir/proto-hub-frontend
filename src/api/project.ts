import type {
  Project,
  ProjectCreateRequest,
  ProjectSearchFilter,
} from "@/model/project";
import request from "@/api/request";
import type { ListResult } from "@/model/base";

export const list = (
  searchFilter: ProjectSearchFilter
): Promise<ListResult<Project>> => {
  return request.get("/projects", {
    params: searchFilter,
  });
};

const create = (createRequest: ProjectCreateRequest): Promise<Project> => {
  return request.post("/projects", createRequest);
};

export default {
  list,
  create,
};
