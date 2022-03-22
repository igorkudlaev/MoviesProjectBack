import { Provider } from '@nestjs/common';
import { StorageConfig } from './config';
import { bucketNames } from './storage.decorator';
import { StorageServices } from './types/storage.types';
import { IStorage } from './types/storage.interface';

function storageFactory(config: StorageConfig, bucketName: string) {
  console.log(config);
  return new StorageServices[config.type](config, bucketName);
}

function createStorageProvider(bucketName: string): Provider<IStorage> {
  return {
    provide: `STORAGE_${bucketName}`,
    useFactory: (config: StorageConfig) => storageFactory(config, bucketName),
    inject: [StorageConfig],
  };
}

export function createStorageProviders(): Provider<IStorage>[] {
  return bucketNames.map(createStorageProvider);
}
