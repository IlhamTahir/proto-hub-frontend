import type { BaseModel, Paging } from "@/model/base";
import type { ProtoStatus } from "@/enums/proto";

export interface Proto extends BaseModel {
  name: string;
  status: ProtoStatus;
  lastVersionId: string;
  lastVersionNumber: number;
  lastVersionUpdatedTime: Date;
  lastVersionLog: string;
  baselineVersionNumber: number;
}

export interface ProtoSearchFilter extends Paging {
  name: string;
}

export type ProtoCreateRequest = Pick<Proto, "name">;
