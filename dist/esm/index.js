import { registerPlugin } from '@capacitor/core';
const ZeroConf = registerPlugin('ZeroConf', {
    web: () => import('./web').then((m) => new m.ZeroConfWeb()),
    electron: () => {
        var _a, _b;
        const win = window;
        return (_b = (_a = win.CapacitorCustomPlatform) === null || _a === void 0 ? void 0 : _a.plugins) === null || _b === void 0 ? void 0 : _b.ZeroConf;
    },
});
// Export all types and interfaces for TypeScript users
export * from './definitions';
// Export the main plugin instance
export { ZeroConf };
//# sourceMappingURL=index.js.map