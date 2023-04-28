import type { BaseModel, Paging } from "@/model/base";
import type { Proto } from "@/model/proto";

export interface Version extends BaseModel {
  file?: File;
  log?: string;
  number?: number;
  proto?: Proto;
  demoPath: string;
}

export interface CreateVersionRequest {
  log: string;
  fileId: string;
}

export type VersionSearchFilter = Paging;
