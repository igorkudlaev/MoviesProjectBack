import { DynamicModule, Global, Module } from '@nestjs/common';
import { StorageConfig } from './config';
import { createStorageProviders } from './storage.provider';

@Module({})
@Global()
export class StorageModule {
  static forRoot(storageOptions: StorageConfig): DynamicModule {
    return {
      module: StorageModule,
      providers: [
        {
          provide: StorageConfig,
          useValue: storageOptions,
        },
        ...createStorageProviders(),
      ],
      exports: [...createStorageProviders()],
    };
  }
}
