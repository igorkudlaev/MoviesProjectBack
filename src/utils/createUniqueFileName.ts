import * as path from 'path';
import { uuid } from 'uuidv4';

export default function createUniqueFileName(filePath: string): string {
  const ext = path.extname(filePath);
  const newFileName = `${uuid()}${ext}`;
  return newFileName;
}
