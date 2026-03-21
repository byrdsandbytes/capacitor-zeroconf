# capacitor-zeroconf

A Capacitor plugin for ZeroConf/Bonjour/mDNS service discovery and publishing.

## Features

- **Discover services** on your local network using mDNS/Bonjour
- **Publish services** to make your app discoverable by other devices
- **Cross-platform support** for iOS, Android, and Electron
- **Event-driven architecture** with proper service discovery callbacks
- **TypeScript support** with full type definitions

## Platform Support

| Platform | Supported |
|----------|-----------|
| iOS      | ✅        |
| Android  | ✅        |
| Electron | ✅        |
| Web      | ❌        |

**Note:** This plugin requires native platform capabilities and does not work in web browsers. Service discovery and publishing operations are automatically stopped when the application is terminated or goes into the background.

## Install

Install directly from this GitHub repository to get the latest fixes:

```bash
npm install byrdsandbytes/capacitor-zeroconf
npx cap sync
```

or

```bash
yarn add byrdsandbytes/capacitor-zeroconf
yarn cap sync
```


## Quick Start

### Discovering Services

```typescript
import { ZeroConf } from 'capacitor-zeroconf';

// Set up listener for discovered services
const listener = await ZeroConf.addListener('discover', (result) => {
  console.log(`Service ${result.action}:`, result.service.name);
  
  if (result.action === 'resolved') {
    console.log('Service details:', {
      name: result.service.name,
      host: result.service.hostname,
      port: result.service.port,
      addresses: result.service.ipv4Addresses
    });
  }
});

// Start watching for HTTP services
await ZeroConf.watch({
  type: '_http._tcp.',
  domain: 'local.'
});

// Stop watching
await ZeroConf.unwatch({
  type: '_http._tcp.',
  domain: 'local.'
});

// Clean up
listener.remove();
```

### Publishing Services

```typescript
// Publish your app as a discoverable service
await ZeroConf.register({
  type: '_http._tcp.',
  domain: 'local.',
  name: 'My App',
  port: 8080,
  props: {
    description: 'My awesome app',
    version: '1.0.0'
  }
});

// Stop publishing
await ZeroConf.unregister({
  type: '_http._tcp.',
  domain: 'local.',
  name: 'My App'
});
```

## Important Notes

⚠️ **Breaking Change Fix**: This fork fixes a critical issue where the `watch()` method only returned the first discovered service. The native implementations now properly emit all discovered services as events through the `addListener('discover', ...)` pattern.

**Migration Guide**: If you were using the old version and only getting the first result, no code changes are needed - you'll now receive all discovered services as expected.

## API

<docgen-index>

* [`addListener('discover', ...)`](#addlistenerdiscover-)
* [`getHostname()`](#gethostname)
* [`register(...)`](#register)
* [`unregister(...)`](#unregister)
* [`stop()`](#stop)
* [`watch(...)`](#watch)
* [`unwatch(...)`](#unwatch)
* [`close()`](#close)
* [Interfaces](#interfaces)
* [Type Aliases](#type-aliases)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

ZeroConf/Bonjour/mDNS service discovery and publishing plugin

### addListener('discover', ...)

```typescript
addListener(eventName: 'discover', listenerFunc: (result: ZeroConfWatchResult) => void) => Promise<PluginListenerHandle>
```

Listen for service discovery events

| Param              | Type                                                                                     | Description                              |
| ------------------ | ---------------------------------------------------------------------------------------- | ---------------------------------------- |
| **`eventName`**    | <code>'discover'</code>                                                                  | - Must be 'discover'                     |
| **`listenerFunc`** | <code>(result: <a href="#zeroconfwatchresult">ZeroConfWatchResult</a>) =&gt; void</code> | - Callback function for discovery events |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

--------------------


### getHostname()

```typescript
getHostname() => Promise<{ hostname: string; }>
```

Get the device hostname

**Returns:** <code>Promise&lt;{ hostname: string; }&gt;</code>

--------------------


### register(...)

```typescript
register(request: ZeroConfRegisterRequest) => Promise<void>
```

Register/publish a service to make it discoverable

| Param         | Type                                                                        | Description                    |
| ------------- | --------------------------------------------------------------------------- | ------------------------------ |
| **`request`** | <code><a href="#zeroconfregisterrequest">ZeroConfRegisterRequest</a></code> | - Service registration details |

--------------------


### unregister(...)

```typescript
unregister(request: ZeroConfUnregisterRequest) => Promise<void>
```

Unregister/unpublish a previously registered service

| Param         | Type                                                                            | Description             |
| ------------- | ------------------------------------------------------------------------------- | ----------------------- |
| **`request`** | <code><a href="#zeroconfunregisterrequest">ZeroConfUnregisterRequest</a></code> | - Service to unregister |

--------------------


### stop()

```typescript
stop() => Promise<void>
```

Stop all service registration/publishing

--------------------


### watch(...)

```typescript
watch(request: ZeroConfWatchRequest, callback?: ZeroConfWatchCallback | undefined) => Promise<CallbackID>
```

Start watching for services of a specific type
Use addListener('discover', ...) to receive the discovered services

| Param          | Type                                                                    | Description                                               |
| -------------- | ----------------------------------------------------------------------- | --------------------------------------------------------- |
| **`request`**  | <code><a href="#zeroconfwatchrequest">ZeroConfWatchRequest</a></code>   | - What services to watch for                              |
| **`callback`** | <code><a href="#zeroconfwatchcallback">ZeroConfWatchCallback</a></code> | - Optional callback (deprecated, use addListener instead) |

**Returns:** <code>Promise&lt;string&gt;</code>

--------------------


### unwatch(...)

```typescript
unwatch(request: ZeroConfUnwatchRequest) => Promise<void>
```

Stop watching for services

| Param         | Type                                                                  | Description                      |
| ------------- | --------------------------------------------------------------------- | -------------------------------- |
| **`request`** | <code><a href="#zeroconfwatchrequest">ZeroConfWatchRequest</a></code> | - What services to stop watching |

--------------------


### close()

```typescript
close() => Promise<void>
```

Close all operations and cleanup resources

--------------------


### Interfaces


#### PluginListenerHandle

| Prop         | Type                                      |
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() =&gt; Promise&lt;void&gt;</code> |


#### ZeroConfWatchResult

Result of a service discovery event

| Prop          | Type                                                                | Description                   |
| ------------- | ------------------------------------------------------------------- | ----------------------------- |
| **`action`**  | <code><a href="#zeroconfwatchaction">ZeroConfWatchAction</a></code> | What happened to the service  |
| **`service`** | <code><a href="#zeroconfservice">ZeroConfService</a></code>         | The service that was affected |


#### ZeroConfService

Discovered service information

| Prop                | Type                                                            | Description           |
| ------------------- | --------------------------------------------------------------- | --------------------- |
| **`domain`**        | <code>string</code>                                             | Domain of the service |
| **`type`**          | <code>string</code>                                             | Service type          |
| **`name`**          | <code>string</code>                                             | Service name          |
| **`port`**          | <code>number</code>                                             | Port number           |
| **`hostname`**      | <code>string</code>                                             | Hostname/FQDN         |
| **`ipv4Addresses`** | <code>string[]</code>                                           | IPv4 addresses        |
| **`ipv6Addresses`** | <code>string[]</code>                                           | IPv6 addresses        |
| **`txtRecord`**     | <code><a href="#record">Record</a>&lt;string, string&gt;</code> | TXT record data       |


#### ZeroConfRegisterRequest

Request to register/publish a service

| Prop        | Type                                                            | Description                                    |
| ----------- | --------------------------------------------------------------- | ---------------------------------------------- |
| **`port`**  | <code>number</code>                                             | Port number the service is running on          |
| **`props`** | <code><a href="#record">Record</a>&lt;string, string&gt;</code> | Additional properties/metadata for the service |


#### ZeroConfUnregisterRequest

Request to unregister a published service

| Prop       | Type                | Description                       |
| ---------- | ------------------- | --------------------------------- |
| **`name`** | <code>string</code> | Name of the service to unregister |


#### ZeroConfWatchRequest

Request to watch for services of a specific type

| Prop         | Type                | Description                                      |
| ------------ | ------------------- | ------------------------------------------------ |
| **`type`**   | <code>string</code> | Service type (e.g., '_http._tcp.', '_ssh._tcp.') |
| **`domain`** | <code>string</code> | Domain to search in (typically 'local.')         |


### Type Aliases


#### ZeroConfWatchAction

Actions that can occur during service discovery

<code>'added' | 'removed' | 'resolved'</code>


#### Record

Construct a type with a set of properties K of type T

<code>{ [P in K]: T; }</code>


#### ZeroConfWatchCallback

Callback function for service discovery events

<code>(event: <a href="#zeroconfwatchresult">ZeroConfWatchResult</a>): void</code>


#### CallbackID

Unique identifier for a watch operation

<code>string</code>


#### ZeroConfUnwatchRequest

Request to stop watching for services
Same as <a href="#zeroconfwatchrequest">ZeroConfWatchRequest</a>

<code><a href="#zeroconfwatchrequest">ZeroConfWatchRequest</a></code>

</docgen-api>

## Contributing

This is a fork of the original [capacitor-zeroconf](https://github.com/trik/capacitor-zeroconf) plugin with critical bug fixes for service discovery. 

### Recent Improvements

- ✅ **Fixed service discovery**: All discovered services are now properly returned (not just the first one)
- ✅ **Proper event emission**: Native implementations now use `notifyListeners()` correctly
- ✅ **Better TypeScript support**: Improved type definitions and error handling
- ✅ **Updated documentation**: Modern terminology and better examples

## License

MIT License

This project is licensed under the MIT License - the same license as the original [cordova-plugin-zeroconf](https://github.com/becvert/cordova-plugin-zeroconf) plugin.

## Credits

Originally ported from the [Cordova ZeroConf Plugin](https://github.com/becvert/cordova-plugin-zeroconf) and based on [capacitor-zeroconf](https://github.com/trik/capacitor-zeroconf) by Marco Marche.

