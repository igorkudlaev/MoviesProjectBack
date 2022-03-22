import { Inject } from '@nestjs/common';

export const bucketNames: string[] = [];

export function Storage(bucketName: string) {
  if (!bucketNames.includes(bucketName)) {
    bucketNames.push(bucketName);
  }
  return Inject(`STORAGE_${bucketName}`);
}
