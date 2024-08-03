interface ActionFn {
  (...args: any[]): Promise<any> | any;
}

interface Action {
  fn: ActionFn;
  metadata: Record<string, any>;
}

interface QueuedAction {
  args: any[];
  priority: number;
  resolve: (value: any) => void;
  reject: (reason?: any) => void;
}

interface ActionQueue {
  [priority: number]: QueuedAction[];
}

class ActionNotFoundError extends Error {
  constructor(key: string) {
    super(`No action is registered under the key "${key}"`);
    this.name = "ActionNotFoundError";
  }
}

class Actions {
  private actions: Record<string, Action> = {};
  private queues: Record<string, ActionQueue> = {};
  private activeQueues: Set<string> = new Set();

  register(
    key: string,
    fn: ActionFn,
    metadata: Record<string, any> = {}
  ): void {
    if (typeof fn === "function") {
      this.actions[key] = { fn, metadata };
    } else {
      console.error("The second parameter must be a function");
    }
  }

  unregister(key: string, clearQueue: boolean = false): void {
    if (this.actions[key]) {
      delete this.actions[key];
      if (clearQueue && this.queues[key]) {
        delete this.queues[key];
      }
      console.log(`Action "${key}" has been unregistered.`);
    } else {
      console.error(`No action is registered under the key "${key}".`);
    }
  }

  async invoke(key: string, priority: number, ...args: any[]): Promise<any> {
    if (!this.actions[key]) {
      throw new ActionNotFoundError(key);
    }

    return new Promise((resolve, reject) => {
      const actionQueue = this.queues[key] || {};
      const queuedAction: QueuedAction = { args, priority, resolve, reject };

      if (!actionQueue[priority]) {
        actionQueue[priority] = [];
      }

      actionQueue[priority].push(queuedAction);
      this.queues[key] = actionQueue;
      if (!this.activeQueues.has(key)) {
        this.processQueue(key);
      }
    });
  }

  private async processQueue(key: string): Promise<void> {
    const actionQueue = this.queues[key];
    if (!actionQueue || Object.keys(actionQueue).length === 0) {
      return;
    }
    this.activeQueues.add(key);

    // Process each priority level starting from the highest
    const priorities = Object.keys(actionQueue)
      .map(Number)
      .sort((a, b) => b - a);
    const topPriority = priorities[0];
    if (typeof topPriority === "number") {
      const priorityQueue = actionQueue[topPriority];
      const queuedAction = priorityQueue.shift();
      if (!queuedAction) return;
      const { args, resolve, reject } = queuedAction;
      try {
        const result = await this.actions[key].fn(...args);
        resolve(result);
      } catch (error) {
        reject(error);
      }
      if (priorityQueue.length === 0) {
        delete actionQueue[topPriority];
      }
      if (Object.keys(actionQueue).length === 0) {
        delete this.queues[key];
        this.activeQueues.delete(key);
      }
      this.processQueue(key);
    }
  }
}

export type ActionType = Actions;

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  __init__: ["actions"],
  actions: ["type", Actions],
};
