import { registerPlugin } from '@capacitor/core';

import type { ZeroConfPlugin } from './definitions';

const ZeroConf = registerPlugin<ZeroConfPlugin>('ZeroConf', {
  web: () => import('./web').then((m) => new m.ZeroConfWeb()),
  electron: () => {
    const win = window as typeof window & {
      CapacitorCustomPlatform?: {
        plugins?: {
          ZeroConf?: ZeroConfPlugin;
        };
      };
    };
    return win.CapacitorCustomPlatform?.plugins?.ZeroConf;
  },
});

// Export all types and interfaces for TypeScript users
export * from './definitions';

// Export the main plugin instance
export { ZeroConf };
