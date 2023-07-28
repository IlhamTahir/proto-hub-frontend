import type { BaseModel } from "@/model/base";

export interface Stage extends BaseModel {
  title: string;
  code: string;
  sort: number;
}
