import { WebPlugin } from '@capacitor/core';
import type { PluginListenerHandle } from '@capacitor/core';
import type { CallbackID, ZeroConfPlugin, ZeroConfRegisterRequest, ZeroConfUnregisterRequest, ZeroConfUnwatchRequest, ZeroConfWatchCallback, ZeroConfWatchRequest, ZeroConfWatchResult } from './definitions';
/**
 * Web implementation of ZeroConfPlugin.
 *
 * Note: ZeroConf/mDNS service discovery requires native platform capabilities
 * and is not available in web browsers. All methods will reject with an error.
 */
export declare class ZeroConfWeb extends WebPlugin implements ZeroConfPlugin {
    private readonly notAvailableError;
    addListener(_eventName: 'discover', _listenerFunc: (result: ZeroConfWatchResult) => void): Promise<PluginListenerHandle>;
    getHostname(): Promise<{
        hostname: string;
    }>;
    register(_request: ZeroConfRegisterRequest): Promise<void>;
    unregister(_request: ZeroConfUnregisterRequest): Promise<void>;
    stop(): Promise<void>;
    watch(_request: ZeroConfWatchRequest, _callback?: ZeroConfWatchCallback): Promise<CallbackID>;
    unwatch(_request: ZeroConfUnwatchRequest): Promise<void>;
    close(): Promise<void>;
}
