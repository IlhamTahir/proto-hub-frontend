import request from "@/api/request";
import type { TokenRequest } from "@/model/token";

const createToken = (tokenRequest: TokenRequest): Promise<string> => {
  return request.post("/tokens", tokenRequest);
};

export default {
  createToken,
};
