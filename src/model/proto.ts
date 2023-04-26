import type { BaseModel, Paging } from "@/model/base";
import type { ProtoStatus } from "@/enums/proto";

export interface Proto extends BaseModel {
  name: string;
  status: ProtoStatus;
}

export interface ProtoSearchFilter extends Paging {
  name: string;
}
