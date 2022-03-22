export interface IStorage {
  uploadFile: (path: string) => Promise<string>;
  deleteFile: (fileName: string) => Promise<void>;
}
