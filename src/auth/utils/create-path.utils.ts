import { mkdir } from 'fs/promises';
import { join } from 'path';

export const createPath = async (path: string[]) => {
  let currentPath = join(__dirname, '..', '..'); // Begins with root
  for (const folder of path) {
    currentPath = join(currentPath, folder);
    await mkdir(currentPath, { recursive: true });
  }
  return currentPath;
};
