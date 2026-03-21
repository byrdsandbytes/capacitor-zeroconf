import { WebPlugin } from '@capacitor/core';
/**
 * Web implementation of ZeroConfPlugin.
 *
 * Note: ZeroConf/mDNS service discovery requires native platform capabilities
 * and is not available in web browsers. All methods will reject with an error.
 */
export class ZeroConfWeb extends WebPlugin {
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
//# sourceMappingURL=web.js.map