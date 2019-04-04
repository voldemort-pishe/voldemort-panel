import { FileModel } from "@app/shared/model/file.model";

export interface UploadResponse {
  progrress: number;
  body: FileModel;
}
