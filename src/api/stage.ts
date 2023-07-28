import request from "@/api/request";
import type { Stage } from "@/model/stage";

export const getStageList = (): Promise<Stage[]> => {
  return request.get("/stages");
};
