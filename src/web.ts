import { WebPlugin } from '@capacitor/core';
import type { PluginListenerHandle } from '@capacitor/core';

import type {
  CallbackID,
  ZeroConfPlugin,
  ZeroConfRegisterRequest,
  ZeroConfUnregisterRequest,
  ZeroConfUnwatchRequest,
  ZeroConfWatchCallback,
  ZeroConfWatchRequest,
  ZeroConfWatchResult,
} from './definitions';

/**
 * Web implementation of ZeroConfPlugin.
 *
 * Note: ZeroConf/mDNS service discovery requires native platform capabilities
 * and is not available in web browsers. All methods will reject with an error.
 */
export class ZeroConfWeb extends WebPlugin implements ZeroConfPlugin {
  private readonly notAvailableError = new Error(
    'ZeroConf plugin is not available on web platform. Use iOS, Android, or Electron instead.',
  );

  async addListener(
    _eventName: 'discover',
    _listenerFunc: (result: ZeroConfWatchResult) => void,
  ): Promise<PluginListenerHandle> {
    throw this.notAvailableError;
  }

  async getHostname(): Promise<{ hostname: string }> {
    throw this.notAvailableError;
  }

  async register(_request: ZeroConfRegisterRequest): Promise<void> {
    throw this.notAvailableError;
  }

  async unregister(_request: ZeroConfUnregisterRequest): Promise<void> {
    throw this.notAvailableError;
  }

  async stop(): Promise<void> {
    throw this.notAvailableError;
  }

  async watch(_request: ZeroConfWatchRequest, _callback?: ZeroConfWatchCallback): Promise<CallbackID> {
    throw this.notAvailableError;
  }

  async unwatch(_request: ZeroConfUnwatchRequest): Promise<void> {
    throw this.notAvailableError;
  }

  async close(): Promise<void> {
    throw this.notAvailableError;
  }
}
