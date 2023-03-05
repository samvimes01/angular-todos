import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TodoItemComponent } from '../todoitem/todoitem.component';
import { TodosService } from '../todos.service';

@Component({
  selector: 'app-todolist',
  template: `
    <ng-container *ngIf="todos$ | async as todos">
      <app-todoitem
        class="block"
        *ngFor="let item of todos; trackBy: trackFn"
        [item]="item"
        (toggle)="todosService.toggleItem(item.id, $event)"
        (remove)="todosService.removeItem($event)"
        (edited)="todosService.editItem(item.id, $event)"
      ></app-todoitem>
    </ng-container>
  `,
  standalone: true,
  imports: [TodoItemComponent, NgIf, NgFor, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodolistComponent {
  todosService = inject(TodosService);

  todos$ = this.todosService.getFilteredList();

  trackFn(index, item): number {
    return item.id || index;
  }
}
