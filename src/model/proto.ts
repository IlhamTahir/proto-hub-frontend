import type { BaseModel, Paging } from "@/model/base";
import type { ProtoStatus } from "@/enums/proto";

export interface Proto extends BaseModel {
  name: string;
  status: ProtoStatus;
  lastVersionNumber: number;
  lastVersionUpdatedTime: Date;
  lastVersionLog: string;
}

export interface ProtoSearchFilter extends Paging {
  name: string;
}

export type ProtoCreateRequest = Pick<Proto, "name">;
