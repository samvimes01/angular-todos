import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private window: Window;

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.window = this.document.defaultView;
  }

  set(key: string, val: any): boolean {
    try {
      const value = JSON.stringify(val);
      this.window.localStorage.setItem(key, value);
      return true;
    } catch {
      return false;
    }
  }

  get<T>(key: string): T | null {
    const rawVal = this.window.localStorage.getItem(key);
    try {
      return JSON.parse(rawVal);
    } catch {
      return null;
    }
  }

  remove(key: string): void {
    this.window.localStorage.removeItem(key);
  }

  clearAll(): void {
    this.window.localStorage.clear();
  }
}
