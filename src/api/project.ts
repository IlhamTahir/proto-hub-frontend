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
import type {
  CreateVersionRequest,
  Version,
  VersionSearchFilter,
} from "@/model/version";
import type { ProtoStatus } from "@/enums/proto";

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

export const createProto = (
  id: string,
  createRequest: ProtoCreateRequest
): Promise<Proto> => {
  return request.post(`/projects/${id}/proto`, createRequest);
};

export const getProto = (id: string, protoId: string): Promise<Proto> => {
  return request.get(`/projects/${id}/proto/${protoId}`);
};

const createVersion = (
  id: string,
  protoId: string,
  createRequest: CreateVersionRequest
) => {
  return request.post(
    `/projects/${id}/proto/${protoId}/version`,
    createRequest
  );
};

const versionList = (
  id: string,
  protoId: string,
  searchFilter: VersionSearchFilter
): Promise<ListResult<Version>> => {
  return request.get(`/projects/${id}/proto/${protoId}/version`, {
    params: searchFilter,
  });
};

const getVersion = (
  id: string,
  protoId: string,
  versionId: string
): Promise<Version> => {
  return request.get(`/projects/${id}/proto/${protoId}/version/${versionId}`);
};
const updateProtoStatus = (
  projectId: string,
  protoId: string,
  status: ProtoStatus
) => {
  return request.post(`/projects/${projectId}/proto/${protoId}/status`, {
    status,
  });
};

const setBaselineVersion = (
  projectId: string,
  protoId: string,
  versionId: string
) => {
  return request.post(
    `/projects/${projectId}/proto/${protoId}/baseline_version/${versionId}`
  );
};
export default {
  list,
  create,
  detail,
  protoList,
  createProto,
  createVersion,
  getVersion,
  versionList,
  getProto,
  updateProtoStatus,
  setBaselineVersion,
};
