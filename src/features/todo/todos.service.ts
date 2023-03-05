import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { StorageService } from '../../globals/storage.service';
import { TodoItem } from '../../models/todoitem.interface';

@Injectable()
export class TodosService {
  #listKey = 'tdl_todos';
  storage = inject(StorageService);

  #list$ = new BehaviorSubject<TodoItem[]>([]);
  search$ = new BehaviorSubject<string>('');

  constructor() {
    const todos = this.storage.get<TodoItem[]>(this.#listKey);
    if (todos?.length) this.#list$.next(todos);
    this.listenListChanges();
  }

  getList(): Observable<TodoItem[]> {
    return this.#list$.asObservable();
  }

  getFilteredList(): Observable<TodoItem[]> {
    return combineLatest([this.search$, this.#list$]).pipe(
      map(([search, list]) =>
        list.filter((item) => item.label.includes(search))
      )
    );
  }

  addItem(label: string, generator = Math.random): void {
    const id = generator();
    this.#list$.next(this.#list$.value.concat({ id, label, isDone: false }));
  }

  editItem(itemId: number, label: string): void {
    this.#list$.next(
      this.#list$.value.map((item) =>
        item.id === itemId ? { ...item, label } : item
      )
    );
  }

  toggleItem(itemId: number, isDone: boolean): void {
    this.#list$.next(
      this.#list$.value.map((item) =>
        item.id === itemId ? { ...item, isDone } : item
      )
    );
  }

  removeItem(itemId: number): void {
    this.#list$.next(this.#list$.value.filter((item) => item.id !== itemId));
  }

  clearAll(): void {
    this.#list$.next([]);
  }

  private listenListChanges(): void {
    this.#list$.subscribe({
      next: (list) => {
        this.storage.set(this.#listKey, list);
      },
    });
  }
}
