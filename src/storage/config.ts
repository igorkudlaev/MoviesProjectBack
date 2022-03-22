import { S3 } from 'aws-sdk';
import { StorageOptions } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';
import { StorageTypes } from './types/storage.types';
@Injectable()
export class StorageConfig {
  type: StorageTypes;
  googleOptions?: StorageOptions;
  s3config?: S3.ClientConfiguration;
}
