import { DynamicModule, Global, Module } from '@nestjs/common';
import { Config } from './config';
import { GCSOptions } from './constants';
import { StorageService } from './storage.service';

@Global()
@Module({})
export class StorageModule {
  static config(storageOptions: Config): DynamicModule {
    return {
      module: StorageModule,
      providers: [
        {
          provide: GCSOptions,
          useValue: storageOptions,
        },
        StorageService,
      ],
      exports: [StorageService],
    };
  }
}
