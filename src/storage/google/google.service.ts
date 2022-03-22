import { Bucket, Storage } from '@google-cloud/storage';
import { Injectable, Scope } from '@nestjs/common';
import { StorageConfig } from '../config';
import createUniqueFileName from 'src/utils/createUniqueFileName';
import * as path from 'path';
import { IStorage } from '../types/storage.interface';

@Injectable({
  scope: Scope.TRANSIENT,
})
export class GoogleService implements IStorage {
  private storage: Storage;
  private bucket: Bucket;
  constructor(config: StorageConfig, bucketName: string) {
    this.storage = new Storage(config.googleOptions);
    this.bucket = this.storage.bucket(bucketName);
  }

  async uploadFile(filePath: string): Promise<string> {
    const fileName = createUniqueFileName(filePath);
    await this.bucket.upload(filePath, {
      destination: fileName,
    });
    const url = this.bucket.file(fileName).publicUrl();
    return url;
  }
  async deleteFile(filePath: string): Promise<void> {
    const fileName = path.basename(filePath);
    await this.bucket.file(fileName).delete({ ignoreNotFound: true });
  }
}
