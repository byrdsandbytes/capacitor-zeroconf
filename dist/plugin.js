var capacitorZeroConf = (function (exports, core) {
    'use strict';

    const ZeroConf = core.registerPlugin('ZeroConf', {
        web: () => Promise.resolve().then(function () { return web; }).then((m) => new m.ZeroConfWeb()),
        electron: () => {
            var _a, _b;
            const win = window;
            return (_b = (_a = win.CapacitorCustomPlatform) === null || _a === void 0 ? void 0 : _a.plugins) === null || _b === void 0 ? void 0 : _b.ZeroConf;
        },
    });

    /**
     * Web implementation of ZeroConfPlugin.
     *
     * Note: ZeroConf/mDNS service discovery requires native platform capabilities
     * and is not available in web browsers. All methods will reject with an error.
     */
    class ZeroConfWeb extends core.WebPlugin {
        constructor() {
            super(...arguments);
            this.notAvailableError = new Error('ZeroConf plugin is not available on web platform. Use iOS, Android, or Electron instead.');
        }
        async addListener(_eventName, _listenerFunc) {
            throw this.notAvailableError;
        }
        async getHostname() {
            throw this.notAvailableError;
        }
        async register(_request) {
            throw this.notAvailableError;
        }
        async unregister(_request) {
            throw this.notAvailableError;
        }
        async stop() {
            throw this.notAvailableError;
        }
        async watch(_request, _callback) {
            throw this.notAvailableError;
        }
        async unwatch(_request) {
            throw this.notAvailableError;
        }
        async close() {
            throw this.notAvailableError;
        }
    }

    var web = /*#__PURE__*/Object.freeze({
        __proto__: null,
        ZeroConfWeb: ZeroConfWeb
    });

    exports.ZeroConf = ZeroConf;

    return exports;

})({}, capacitorExports);
//# sourceMappingURL=plugin.js.map
