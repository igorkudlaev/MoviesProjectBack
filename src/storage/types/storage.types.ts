import { GoogleService } from '../google/google.service';
import { YandexService } from '../yandex/yandex.service';

export const StorageServices = {
  yandex: YandexService,
  google: GoogleService,
};
export type StorageTypes = keyof typeof StorageServices;
