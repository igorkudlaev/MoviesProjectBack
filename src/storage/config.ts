import { StorageOptions } from '@google-cloud/storage';

export interface Config extends StorageOptions {
  bucketName: string;
}
