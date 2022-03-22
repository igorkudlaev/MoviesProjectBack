import { Inject } from '@nestjs/common';

export const tokensOfBuckets: string[] = [];

export function Storage(bucket: string) {
  if (!tokensOfBuckets.includes(bucket)) {
    tokensOfBuckets.push(bucket);
  }
  return Inject(`Storage-${bucket}`);
}
