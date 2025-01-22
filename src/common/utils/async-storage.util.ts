import { Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';

@Injectable()
export class AsyncStorage {
  private static asyncLocalStorage = new AsyncLocalStorage<Map<string, any>>();

  static run(fn: () => void) {
    this.asyncLocalStorage.run(new Map<string, any>(), fn);
  }

  static set(key: string, value: any) {
    const store = this.asyncLocalStorage.getStore();
    if (store) {
      store.set(key, value);
    }
  }

  static get(key: string): any {
    const store = this.asyncLocalStorage.getStore();
    return store ? store.get(key) : undefined;
  }

  static getRequestID(): any {
    const store = this.asyncLocalStorage.getStore();
    return store ? store.get('requestID') : undefined;
  }
}

export default AsyncStorage;
