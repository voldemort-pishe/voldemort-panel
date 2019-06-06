import { FileModel } from './file.model';

export interface UploadResponse {
  progrress: number;
  body: FileModel;
}
