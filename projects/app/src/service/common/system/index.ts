import { initHttpAgent } from '@fastgpt/service/common/middle/httpAgent';
import { existsSync, readFileSync } from 'fs';
import path from 'node:path';
const dirName = path.resolve(__dirname, '..', '..', '..', '..');

export const readConfigData = (name: string) => {
  const isDev = process.env.NODE_ENV === 'development';

  const splitName = name.split('.');
  const devName = `${splitName[0]}.local.${splitName[1]}`;

  const filename = (() => {
    if (isDev) {
      // check local file exists
      const hasLocalFile = existsSync(`data/${devName}`);
      if (hasLocalFile) {
        return `data/${devName}`;
      }
      return `data/${name}`;
    }
    // production path
    return path.join(dirName, `app/data/${name}`);
  })();

  const content = readFileSync(filename, 'utf-8');

  return content;
};

export function initGlobal() {
  if (global.communityPlugins) return;

  global.communityPlugins = [];
  global.qaQueueLen = global.qaQueueLen ?? 0;
  global.vectorQueueLen = global.vectorQueueLen ?? 0;
  initHttpAgent();
}
