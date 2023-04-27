import type {
  Project,
  ProjectCreateRequest,
  ProjectSearchFilter,
} from "@/model/project";
import request from "@/api/request";
import type { ListResult } from "@/model/base";
import type {
  Proto,
  ProtoCreateRequest,
  ProtoSearchFilter,
} from "@/model/proto";
import type { CreateVersionRequest } from "@/model/version";

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

export const createProto = (id: string, createRequest: ProtoCreateRequest) => {
  return request.post(`/projects/${id}/proto`, createRequest);
};

export const createVersion = (
  id: string,
  protoId: string,
  createRequest: CreateVersionRequest
) => {
  return request.post(
    `/projects/${id}/proto/${protoId}/version`,
    createRequest
  );
};

export default {
  list,
  create,
  detail,
  protoList,
  createProto,
  createVersion,
};
