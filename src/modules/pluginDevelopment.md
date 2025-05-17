# Plugin Development Guide

## Table of Contents
1. [Plugin Architecture Overview](#plugin-architecture-overview)
2. [Plugin Structure](#plugin-structure)
3. [Core Components](#core-components)
4. [Plugin Registration](#plugin-registration)
5. [Best Practices](#best-practices)
6. [Example Implementation](#example-implementation)

## Plugin Architecture Overview

Each plugin in our modular architecture:
- Is self-contained with its own business logic, UI components, and state management
- Interacts with core services via dependency injection
- Follows a consistent structure for maintainability
- Can be dynamically loaded and unloaded

## Plugin Structure

```typescript
my-plugin/
├── 

index.ts

                 // Plugin entry point and registration
├── Types/                   // TypeScript interfaces and types
├── Components/              // React components
├── Services/               // Business logic and data handling
└── Constants/              // Plugin-specific constants
```

## Core Components

### 1. Plugin Entry Point (index.ts)
```typescript
const myPlugin = {
  __init__: ['myPluginService', 'myPluginUI'],
  __depends__: ['eventBus', 'actions', 'navbar', 'componentRegistry'],
  myPluginService: ['type', MyPluginService],
  myPluginUI: ['type', MyPluginUIModule]
};

export default myPlugin;
```

### 2. UI Module
```typescript
export default class PluginUIModule {
  static $inject = [
    'eventBus',
    'actions',
    'navbar',
    'componentRegistry',
    'dataStore'
  ];

  constructor(
    eventBus: Event,
    actions: ActionType,
    navbar: unknown,
    componentRegistry: unknown,
    dataStore: any
  ) {
    // Initialize UI components
    // Register actions
    // Set up event listeners
  }
}
```

### 3. Service Layer
```typescript
export default class PluginService {
  static $inject = ['eventBus', 'dataStore'];

  constructor(
    private eventBus: Event,
    private dataStore: DataStore<any>
  ) {
    // Initialize service
    // Set up data stores
  }
}
```

## Plugin Registration

1. Define dependencies and initialization:
```typescript
__init__: []    // Services to initialize
__depends__: [] // Core services required
```

2. Register components:
```typescript
this.componentRegistry.register('location', 'componentName', Component);
```

3. Register actions:
```typescript
this.actions.register('plugin/action', this.handleAction.bind(this));
```

## Best Practices

1. **State Management**
   - Use dataStore for plugin state
   - Prefix keys with plugin name
   - Create typed interfaces for state

2. **Event Communication**
   - Use eventBus for cross-plugin communication
   - Define event constants
   - Document event payloads

3. **UI Components**
   - Use atomic design pattern
   - Implement proper TypeScript interfaces
   - Use React.FC for functional components

4. **Error Handling**
   - Implement proper error boundaries
   - Log errors appropriately
   - Provide user feedback

## Example Implementation

Based on AudioStore plugin:

```typescript
// Plugin registration
const myPlugin = {
  __init__: ['pluginService', 'pluginUI'],
  __depends__: ['eventBus', 'actions', 'navbar', 'componentRegistry'],
  pluginService: ['type', PluginService],
  pluginUI: ['type', PluginUIModule']
};

// Service implementation
class PluginService {
  static $inject = ['eventBus', 'dataStore'];
  
  constructor(eventBus: Event, dataStore: DataStore<any>) {
    // Initialize service
  }
}

// UI Module
class PluginUIModule {
  static $inject = ['eventBus', 'actions', 'navbar', 'componentRegistry'];
  
  constructor(eventBus: Event, actions: ActionType, navbar: any, registry: any) {
    // Register UI components and actions
  }
}
```