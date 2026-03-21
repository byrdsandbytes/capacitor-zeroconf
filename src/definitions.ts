import type { PluginListenerHandle } from '@capacitor/core';

/**
 * Unique identifier for a watch operation
 */
export type CallbackID = string;

/**
 * Request to watch for services of a specific type
 */
export interface ZeroConfWatchRequest {
  /** Service type (e.g., '_http._tcp.', '_ssh._tcp.') */
  type: string;
  /** Domain to search in (typically 'local.') */
  domain: string;
}

/**
 * Request to stop watching for services
 * Same as ZeroConfWatchRequest
 */
export type ZeroConfUnwatchRequest = ZeroConfWatchRequest;

/**
 * Request to unregister a published service
 */
export interface ZeroConfUnregisterRequest extends ZeroConfWatchRequest {
  /** Name of the service to unregister */
  name: string;
}

/**
 * Request to register/publish a service
 */
export interface ZeroConfRegisterRequest extends ZeroConfUnregisterRequest {
  /** Port number the service is running on */
  port: number;
  /** Additional properties/metadata for the service */
  props: Record<string, string>;
}

/**
 * Discovered service information
 */
export interface ZeroConfService {
  /** Domain of the service */
  domain: string;
  /** Service type */
  type: string;
  /** Service name */
  name: string;
  /** Port number */
  port: number;
  /** Hostname/FQDN */
  hostname: string;
  /** IPv4 addresses */
  ipv4Addresses: string[];
  /** IPv6 addresses */
  ipv6Addresses: string[];
  /** TXT record data */
  txtRecord: Record<string, string>;
}

/**
 * Actions that can occur during service discovery
 */
export type ZeroConfWatchAction = 'added' | 'removed' | 'resolved';

/**
 * Result of a service discovery event
 */
export interface ZeroConfWatchResult {
  /** What happened to the service */
  action: ZeroConfWatchAction;
  /** The service that was affected */
  service: ZeroConfService;
}

/**
 * Callback function for service discovery events
 */
export type ZeroConfWatchCallback = (event: ZeroConfWatchResult) => void;

/**
 * ZeroConf/Bonjour/mDNS service discovery and publishing plugin
 */
export interface ZeroConfPlugin {
  /**
   * Listen for service discovery events
   * @param eventName - Must be 'discover'
   * @param listenerFunc - Callback function for discovery events
   * @returns Promise that resolves to a listener handle
   */
  addListener(
    eventName: 'discover',
    listenerFunc: (result: ZeroConfWatchResult) => void,
  ): Promise<PluginListenerHandle>;

  /**
   * Get the device hostname
   * @returns Promise that resolves to the hostname
   */
  getHostname(): Promise<{ hostname: string }>;

  /**
   * Register/publish a service to make it discoverable
   * @param request - Service registration details
   * @returns Promise that resolves when service is registered
   */
  register(request: ZeroConfRegisterRequest): Promise<void>;

  /**
   * Unregister/unpublish a previously registered service
   * @param request - Service to unregister
   * @returns Promise that resolves when service is unregistered
   */
  unregister(request: ZeroConfUnregisterRequest): Promise<void>;

  /**
   * Stop all service registration/publishing
   * @returns Promise that resolves when stopped
   */
  stop(): Promise<void>;

  /**
   * Start watching for services of a specific type
   * Use addListener('discover', ...) to receive the discovered services
   * @param request - What services to watch for
   * @param callback - Optional callback (deprecated, use addListener instead)
   * @returns Promise that resolves to a callback ID
   */
  watch(request: ZeroConfWatchRequest, callback?: ZeroConfWatchCallback): Promise<CallbackID>;

  /**
   * Stop watching for services
   * @param request - What services to stop watching
   * @returns Promise that resolves when stopped
   */
  unwatch(request: ZeroConfUnwatchRequest): Promise<void>;

  /**
   * Close all operations and cleanup resources
   * @returns Promise that resolves when closed
   */
  close(): Promise<void>;
}
