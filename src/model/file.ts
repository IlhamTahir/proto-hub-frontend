export interface FileInitUploadRequest {
  ext: "zip";
  key: string;
  name: string;
  size: number;
}

export interface File {
  id: string;
}
