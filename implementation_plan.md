# Implementation Plan - Phase 2, 3, and 4

This plan details the implementation of the remaining phases of the architecture refinement: implementing plugin error boundaries, strict injector typing, removing `@ts-ignore` flags, and reorganizing modules into core vs. features.

## Proposed Changes

---

### Phase 2: Implement Error Boundaries

We will create a custom error boundary component specifically to isolate crashes in dynamically loaded plugins.

#### [NEW] [PluginErrorBoundary.tsx](file:///mnt/New_Volume/project/branching-timer-web-app/src/modules/PluginErrorBoundary.tsx)
- Create a standard class-based React `PluginErrorBoundary` component.
- Display a stylized error alert showing which plugin crashed without bringing down the entire `TimerCard`.

#### [MODIFY] [ComponentRenderer.tsx](file:///mnt/New_Volume/project/branching-timer-web-app/src/modules/ComponentRenderer.tsx)
- Import `PluginErrorBoundary`.
- Wrap each mapped plugin component dynamically in `<PluginErrorBoundary pluginName={...}>`.

---

### Phase 3: Improve TypeScript Safety

We will flatly type the didi injection services and resolve all `@ts-ignore` flags throughout the codebase.

#### [NEW] [injector.types.ts](file:///mnt/New_Volume/project/branching-timer-web-app/src/types/injector.types.ts)
- Define a `ServiceMap` type mapping injection keys (`dataStore`, `componentRegistry`, `eventBus`, `actions`, `timerList`, `timerDisplay`, `timerCard`) to their exact TypeScript types.
- Define `StrictInjector` as `Injector<ServiceMap>`.

#### [NEW] [mp3.d.ts](file:///mnt/New_Volume/project/branching-timer-web-app/src/types/mp3.d.ts)
- Declare `.mp3` module type definition so it can be cleanly imported in `TimerCard.ts`.

#### [NEW] [react-speech-kit.d.ts](file:///mnt/New_Volume/project/branching-timer-web-app/src/types/react-speech-kit.d.ts)
- Declare module `react-speech-kit` so it can be cleanly imported in `Speech.tsx`.

#### [MODIFY] [InjectorContext.ts](file:///mnt/New_Volume/project/branching-timer-web-app/src/contexts/InjectorContext.ts)
- Use `StrictInjector` instead of `Injector<ModuleType>`. Remove `@ts-ignore`.

#### [MODIFY] [TimerCard.ts](file:///mnt/New_Volume/project/branching-timer-web-app/src/contexts/TimerCards/TimerCard.ts)
- Use `StrictInjector` for `injector` property instead of `unknown`. Remove `@ts-ignore` for mp3 import.

#### [MODIFY] [TimerCards.context.tsx](file:///mnt/New_Volume/project/branching-timer-web-app/src/contexts/TimerCards/TimerCards.context.tsx)
- Cast modules list to clean up `@ts-ignore` in `setupNewTimerCard`.

#### [MODIFY] [Speech.tsx](file:///mnt/New_Volume/project/branching-timer-web-app/src/contexts/Speech.tsx)
- Remove `@ts-ignore` since `react-speech-kit` is now typed.

#### [MODIFY] [Timer.component.tsx](file:///mnt/New_Volume/project/branching-timer-web-app/src/component/organisms/Timer/Timer.component.tsx)
- Access form fields via `event.currentTarget.elements.namedItem('title')` instead of relying on `@ts-ignore`.

#### [MODIFY] Clean up Inject properties in modules:
- [ComponentRegistry.ts](file:///mnt/New_Volume/project/branching-timer-web-app/src/modules/ComponentRegistry.ts)
- [TimerList.tsx](file:///mnt/New_Volume/project/branching-timer-web-app/src/modules/CustomModules/TimerList/TimerList.tsx)
- [TimerDisplay.tsx](file:///mnt/New_Volume/project/branching-timer-web-app/src/modules/TimerDisplay/TimerDisplay.tsx)
- [HookStore.ts](file:///mnt/New_Volume/project/branching-timer-web-app/src/modules/HookStore/HookStore.ts)
- [NotificationPlugin/index.ts](file:///mnt/New_Volume/project/branching-timer-web-app/src/plugins/NotificationPlugin/index.ts)
- [TimerDisplayPlugin/index.ts](file:///mnt/New_Volume/project/branching-timer-web-app/src/plugins/TimerDisplayPlugin/index.ts)
  - Change static `$inject` property definitions from class mutation properties to `static $inject = ...` syntax to satisfy TS without `@ts-ignore`.

---

### Phase 4: Module Reorganization (Core vs. Features)

We will cleanly partition modules into two distinct directories under `src/`: `src/core/` and `src/features/`.

#### [NEW DIRECTORY] `src/core`
- Move structural core framework modules here:
  - `Event.ts` -> [Event.ts](file:///mnt/New_Volume/project/branching-timer-web-app/src/core/Event.ts)
  - `DataStore.ts` -> [DataStore.ts](file:///mnt/New_Volume/project/branching-timer-web-app/src/core/DataStore.ts)
  - `ComponentRegistry.ts` -> [ComponentRegistry.ts](file:///mnt/New_Volume/project/branching-timer-web-app/src/core/ComponentRegistry.ts)
  - `ComponentRenderer.tsx` -> [ComponentRenderer.tsx](file:///mnt/New_Volume/project/branching-timer-web-app/src/core/ComponentRenderer.tsx)
  - `PluginErrorBoundary.tsx` -> [PluginErrorBoundary.tsx](file:///mnt/New_Volume/project/branching-timer-web-app/src/core/PluginErrorBoundary.tsx)
  - `Actions/` -> [Actions/](file:///mnt/New_Volume/project/branching-timer-web-app/src/core/Actions)
  - `HookStore/` -> [HookStore/](file:///mnt/New_Volume/project/branching-timer-web-app/src/core/HookStore)

#### [NEW DIRECTORY] `src/features`
- Move feature/UI modules here:
  - `TimerDisplay/` -> [TimerDisplay/](file:///mnt/New_Volume/project/branching-timer-web-app/src/features/TimerDisplay)
  - `CustomModules/TimerList/` -> [TimerList/](file:///mnt/New_Volume/project/branching-timer-web-app/src/features/TimerList)

#### Update Imports
- Update all file references in the codebase to use the new `src/core` and `src/features` module paths.

---

## Verification Plan

### Automated Tests
- Run `yarn test` to verify all unit tests run and pass.

### Compilation
- Run `yarn build` to ensure the application builds successfully under the new directory layout.

### Manual Verification
- Start the development server (`yarn start`) and perform a visual check in the browser to ensure plugins load correctly and everything works as expected.
