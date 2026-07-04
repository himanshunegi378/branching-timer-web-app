# Path 1: Architecture Refinement Plan

This plan outlines the steps to preserve and polish the existing modular, plugin-based architecture (didi + ComponentRegistry) while bringing it up to modern React standards.

## Phase 1: Modernize React Rendering
* **Refactor ComponentsRenderer**: Replace the imperative `forceUpdate` (using `useReducer`) with React 18's `useSyncExternalStore`.
* **Why**: This properly hooks the custom `EventBus` into React's rendering cycle, preventing tearing and rendering bugs, which is especially important for modern React.

## Phase 2: Implement Error Boundaries
* **Create PluginErrorBoundary**: Develop a standard React Error Boundary component specifically for isolated plugin components.
* **Wrap Dynamic Renders**: Update the `ComponentsRenderer` to wrap every dynamically injected component inside the `PluginErrorBoundary`.
* **Why**: If a third-party remote plugin crashes or throws an exception, it will only display a local error state in its specific UI slot rather than crashing the entire `TimerCard` interface.

## Phase 3: Improve TypeScript Safety
* **Define Strict Injector Types**: Create a strictly typed interface for `didi`'s `injector.get()` so that retrieving services like `eventBus` or `componentRegistry` provides correct typings.
* **Remove `@ts-ignore` Flags**: Clean up existing type suppressions in `ComponentsRenderer.tsx`, `TimerList.tsx`, `TimerDisplay.tsx`, and the plugin initialization files.
* **Why**: Enhances long-term maintainability and helps catch plugin integration bugs at compile time instead of runtime.

## Phase 4: Module Reorganization (Core vs. Features)
* **Extract Core Infrastructure**: Move structural modules (`Event.ts`, `DataStore.ts`, `ComponentRegistry.ts`, `ComponentRenderer.tsx`, and `Actions.ts`) into a dedicated `src/core/` directory.
* **Isolate Features/UI**: Move feature-specific modules (`TimerList`, `TimerDisplay`) into a dedicated `src/features/` or keep them in a clearer `src/modules/` directory.
* **Why**: In a robust plugin architecture, establishing a strict boundary between the "Framework/Core" and the "Feature Implementations" prevents accidental tight coupling and makes the codebase much easier for new developers to navigate.
