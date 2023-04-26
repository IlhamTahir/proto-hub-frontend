import type {
  Project,
  ProjectCreateRequest,
  ProjectSearchFilter,
} from "@/model/project";
import request from "@/api/request";
import type { ListResult } from "@/model/base";
import type { Proto, ProtoSearchFilter } from "@/model/proto";

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

const detail = (id: string): Promise<Project> => {
  return request.get(`/projects/${id}`);
};

export const protoList = (
  id: string,
  searchFilter: ProtoSearchFilter
): Promise<ListResult<Proto>> => {
  return request.get(`/projects/${id}/proto`, {
    params: searchFilter,
  });
};

export default {
  list,
  create,
  detail,
  protoList,
};
