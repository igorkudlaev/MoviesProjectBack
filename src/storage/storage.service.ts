import { Bucket, Storage } from '@google-cloud/storage';
import { Inject, Injectable } from '@nestjs/common';
import { Config } from './config';
import { GCSOptions } from './constants';
import * as path from 'path';
import { uuid } from 'uuidv4';

@Injectable()
export class StorageService {
  private storage: Storage;
  private bucket: Bucket;
  constructor(@Inject(GCSOptions) config: Config) {
    this.storage = new Storage(config);
    this.bucket = this.storage.bucket(config.bucketName);
  }

  private createFileName(filePath: string): string {
    const ext = path.extname(filePath);
    const newFileName = `${uuid()}${ext}`;
    return newFileName;
  }

  async uploadFile(filePath: string): Promise<string> {
    const fileName = this.createFileName(filePath);
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
