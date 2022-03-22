import { Injectable, Scope } from '@nestjs/common';
import { StorageConfig } from '../config';
import { IStorage } from '../types/storage.interface';
import { S3 } from 'aws-sdk';
import * as fs from 'fs';
import createUniqueFileName from 'src/utils/createUniqueFileName';

@Injectable({
  scope: Scope.TRANSIENT,
})
export class YandexService implements IStorage {
  private bucket: string;
  private client: S3;
  constructor(config: StorageConfig, bucketName: string) {
    this.client = new S3(config.s3config);
    this.bucket = bucketName;
  }
  async uploadFile(path: string) {
    const result = await this.client
      .upload({
        Bucket: this.bucket,
        Key: createUniqueFileName(path),
        Body: fs.readFileSync(path),
      })
      .promise();
    return result.Location;
  }
  async deleteFile(name: string) {
    await this.client
      .deleteObject({ Bucket: this.bucket, Key: name })
      .promise();
  }
}
